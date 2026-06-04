import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getWebhookOrganizationId, recordStripeEvent, insertPaymentHistory } from "@/lib/stripe/webhook-db";
import { syncSubscriptionFromStripe } from "@/lib/stripe/subscription-sync";
import {
    sendMembershipCheckoutEmails,
    sendInvoiceReceiptEmails,
    sendInvoiceFailedEmails,
} from "@/lib/stripe/webhook-notifications";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

function getInvoiceSubscriptionId(invoice: Stripe.Invoice) {
    const inv = invoice as Stripe.Invoice & { subscription?: string | null; payment_intent?: string | null };
    return {
        subscriptionId: typeof inv.subscription === "string" ? inv.subscription : null,
        paymentIntentId: typeof inv.payment_intent === "string" ? inv.payment_intent : null,
    };
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

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            if (session.mode === "subscription" && typeof session.subscription === "string") {
                const subscription = await stripe.subscriptions.retrieve(session.subscription);
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

    return NextResponse.json({ received: true });
}