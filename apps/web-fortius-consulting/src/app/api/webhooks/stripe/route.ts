import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@fortius/database";
import { SITE_URL } from "@/lib/site-config";
import {
    getWebhookOrganizationId,
    recordStripeEvent,
    releaseStripeEvent,
    insertPaymentHistory,
    upsertEventPurchase,
} from "@/lib/stripe/webhook-db";
import { syncSubscriptionFromStripe } from "@/lib/stripe/subscription-sync";
import {
    sendMembershipCheckoutEmails,
    sendEventPurchaseEmails,
    sendInvoiceReceiptEmails,
    sendInvoiceFailedEmails,
} from "@/lib/stripe/webhook-notifications";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

/**
 * Pay-first flow: looks up an existing Supabase user by email.
 * If none is found, invites them (creates account + sends activation email).
 * Returns the userId so the webhook can sync the membership immediately.
 *
 * If `fullName` is provided it is stored in `user_metadata.full_name` so the
 * `on_auth_user_created` trigger can seed `user_profiles.full_name`. For users
 * that already exist we backfill `user_profiles.full_name` only when it is
 * currently empty, to avoid overwriting edits made from the private area.
 *
 * Invites land on `/nueva-contrasena` (hash flow with `type=invite`), not on
 * `/api/auth/callback` which is PKCE-only for OAuth/recovery codes.
 */
async function resolveOrInviteUser(email: string, fullName?: string | null): Promise<string | null> {
    const admin = createAdminClient();

    // 1. Look up the user in auth.users by email (paginated).
    //    user_profiles has no email column — emails live in auth.users only.
    const normalizedEmail = email.toLowerCase();
    const perPage = 1000;
    for (let page = 1; ; page++) {
        const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
        if (error) throw new Error(`listUsers failed: ${error.message}`);

        const existingUser = data.users.find((u) => u.email?.toLowerCase() === normalizedEmail);
        if (existingUser) {
            if (fullName) {
                const { data: profile } = await admin
                    .from("user_profiles")
                    .select("full_name")
                    .eq("id", existingUser.id)
                    .single();
                if (!profile?.full_name) {
                    await admin
                        .from("user_profiles")
                        .update({ full_name: fullName })
                        .eq("id", existingUser.id);
                }
            }
            return existingUser.id;
        }

        if (data.users.length < perPage) break; // last page reached
    }

    // 2. No existing user — invite them (Supabase sends an activation email).
    //    Send the user to /nueva-contrasena where the hash tokens (type=invite)
    //    are parsed client-side and a fresh password is set.
    const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${SITE_URL}/nueva-contrasena`,
        data: fullName ? { full_name: fullName } : undefined,
    });

    if (error || !data.user) {
        console.error("[webhook] inviteUserByEmail failed:", error?.message);
        return null;
    }

    return data.user.id;
}

function getInvoiceSubscriptionId(invoice: Stripe.Invoice) {
    const inv = invoice as Stripe.Invoice & { subscription?: string | null; payment_intent?: string | null };
    return {
        subscriptionId: typeof inv.subscription === "string" ? inv.subscription : null,
        paymentIntentId: typeof inv.payment_intent === "string" ? inv.payment_intent : null,
    };
}

function getSessionPaymentIntentId(session: Stripe.Checkout.Session) {
    const paymentIntent = session.payment_intent;
    if (typeof paymentIntent === "string") return paymentIntent;
    return paymentIntent?.id ?? null;
}

export async function POST(request: Request) {
    const signature = (await headers()).get("stripe-signature");
    if (!signature) return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    if (!endpointSecret) return NextResponse.json({ error: "STRIPE_WEBHOOK_SECRET not configured" }, { status: 500 });

    const rawBody = await request.text();
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown_error";
        return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
    }

    const metadata = ((event.data.object as { metadata?: Record<string, string> }).metadata || {});
    const orgSlug = metadata.orgSlug || "fortius-consulting";
    const organizationId = await getWebhookOrganizationId(orgSlug);
    const recorded = await recordStripeEvent(event.id, event.type, organizationId);
    if (!recorded) return NextResponse.json({ received: true, duplicate: true });

    const ctx = { orgSlug, eventId: event.id, eventType: event.type };

    try {
        await processEvent(event, ctx, organizationId);
    } catch (error) {
        console.error(`[webhook] Handler failed for ${event.type} (${event.id}):`, error);
        // Release the idempotency claim so Stripe's retry can be processed
        await releaseStripeEvent(event.id);
        return NextResponse.json({ error: "handler_failed" }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}

async function processEvent(
    event: Stripe.Event,
    ctx: { orgSlug: string; eventId: string; eventType: string },
    organizationId: string | null,
) {
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;

            if (session.mode === "payment" && session.metadata?.productType === "event_purchase") {
                if (!organizationId) throw new Error("Missing organization for event purchase");

                const userId = session.metadata.userId;
                const eventSlug = session.metadata.eventSlug;
                const eventTitle = session.metadata.eventTitle;
                if (!userId || !eventSlug || !eventTitle) {
                    throw new Error("Missing event purchase metadata");
                }

                const paymentIntentId = getSessionPaymentIntentId(session);
                const purchaseId = await upsertEventPurchase({
                    userId,
                    organizationId,
                    eventSlug,
                    eventTitle,
                    stripeCheckoutSessionId: session.id,
                    stripePaymentIntentId: paymentIntentId,
                    amountCents: session.amount_total ?? 0,
                    currency: session.currency || "eur",
                    metadata: {
                        stripe_customer_id: typeof session.customer === "string" ? session.customer : session.customer?.id,
                        category: session.metadata.category,
                    },
                });

                await insertPaymentHistory({
                    userId,
                    subscriptionId: null,
                    paymentIntentId,
                    amountCents: session.amount_total ?? 0,
                    currency: session.currency || "eur",
                    status: "paid",
                    description: `Compra de oportunidad: ${eventTitle}`,
                });

                sendEventPurchaseEmails(session, purchaseId).catch(console.error);
                break;
            }

            if (session.mode === "subscription" && typeof session.subscription === "string") {
                let subscription = await stripe.subscriptions.retrieve(session.subscription);

                // Pay-first flow: if no userId in metadata, resolve/invite user by email
                if (!subscription.metadata?.userId) {
                    const email = session.customer_details?.email || session.customer_email;
                    const fullName = session.customer_details?.name ?? null;
                    if (email) {
                        const userId = await resolveOrInviteUser(email, fullName);
                        if (userId) {
                            // Stamp userId onto the Stripe subscription so future renewal events
                            // use the fast lookup path (same pattern as membershipId fast-path)
                            await stripe.subscriptions.update(session.subscription, {
                                metadata: { ...subscription.metadata, userId },
                            });
                            subscription = await stripe.subscriptions.retrieve(session.subscription);
                        } else {
                            console.error("[webhook] Could not resolve/invite user for email:", email);
                        }
                    }
                }

                await syncSubscriptionFromStripe(subscription, ctx);
                sendMembershipCheckoutEmails(session).catch(console.error);
            }
            break;
        }

        case "invoice.payment_succeeded": {
            const invoice = event.data.object as Stripe.Invoice;
            const { subscriptionId, paymentIntentId } = getInvoiceSubscriptionId(invoice);
            if (!subscriptionId) break;

            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            const synced = await syncSubscriptionFromStripe(subscription, ctx);

            if (subscription.metadata.userId && synced?.resolved) {
                await insertPaymentHistory({
                    userId: subscription.metadata.userId,
                    subscriptionId: synced.subscriptionId,
                    paymentIntentId,
                    amountCents: invoice.amount_paid,
                    currency: invoice.currency || "eur",
                    status: "paid",
                    description: invoice.lines.data[0]?.description || "Cobro recurrente",
                });
            }
            sendInvoiceReceiptEmails(invoice).catch(console.error);
            break;
        }

        case "invoice.payment_failed": {
            const invoice = event.data.object as Stripe.Invoice;
            const { subscriptionId, paymentIntentId } = getInvoiceSubscriptionId(invoice);
            if (!subscriptionId) break;

            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            const synced = await syncSubscriptionFromStripe(subscription, ctx);

            if (subscription.metadata.userId && synced?.resolved) {
                await insertPaymentHistory({
                    userId: subscription.metadata.userId,
                    subscriptionId: synced.subscriptionId,
                    paymentIntentId,
                    amountCents: invoice.amount_due,
                    currency: invoice.currency || "eur",
                    status: "failed",
                    description: invoice.lines.data[0]?.description || "Cobro fallido",
                });
            }
            sendInvoiceFailedEmails(invoice).catch(console.error);
            break;
        }

        case "customer.subscription.updated":
        case "customer.subscription.deleted": {
            const subscription = event.data.object as Stripe.Subscription;
            await syncSubscriptionFromStripe(subscription, ctx);
            break;
        }
    }
}