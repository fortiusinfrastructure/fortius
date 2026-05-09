import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { headers } from 'next/headers';
import { createAdminClient } from '@fortius/database';
import { stripe } from '@/lib/stripe';
import { insertPaymentHistory, getWebhookOrganizationId, recordStripeEvent } from '@/lib/stripe/webhook-db';
import { syncSubscriptionFromStripe } from '@/lib/stripe/subscription-sync';
import {
    sendEventRecoveryEmail,
    sendEventRegistrationEmails,
    sendInvoiceFailedEmails,
    sendInvoiceReceiptEmails,
    sendMembershipCheckoutEmails,
} from '@/lib/stripe/webhook-notifications';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

function getInvoiceSubscriptionId(invoice: Stripe.Invoice) {
    const invoiceWithLegacyFields = invoice as Stripe.Invoice & {
        subscription?: string | null;
        payment_intent?: string | null;
    };

    return {
        subscriptionId:
            typeof invoiceWithLegacyFields.subscription === 'string'
                ? invoiceWithLegacyFields.subscription
                : null,
        paymentIntentId:
            typeof invoiceWithLegacyFields.payment_intent === 'string'
                ? invoiceWithLegacyFields.payment_intent
                : null,
    };
}

export async function POST(req: Request) {
    const rawBody = await req.text();
    const signature = (await headers()).get('stripe-signature');

    if (!signature) {
        return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'unknown_error';
        return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
    }

    const metadata = ((event.data.object as { metadata?: Record<string, string> }).metadata || {});
    const orgSlug = metadata.orgSlug || 'escuela-hispanica';
    const organizationId = await getWebhookOrganizationId(orgSlug);
    const recorded = await recordStripeEvent(event.id, event.type, organizationId);
    if (!recorded) return NextResponse.json({ received: true, duplicate: true });

    const admin = createAdminClient();

    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;
            const registrationId = session.metadata?.registration_id;

            if (registrationId) {
                const { data: registration } = await admin
                    .from('event_registrations')
                    .update({ status: 'paid', stripe_session_id: session.id })
                    .eq('id', registrationId)
                    .select('id, first_name, last_name, email, event_slug, amount')
                    .single();

                if (registration) await sendEventRegistrationEmails(registration);
                break;
            }

            if (session.mode === 'subscription' && typeof session.subscription === 'string') {
                const subscription = await stripe.subscriptions.retrieve(session.subscription);
                await syncSubscriptionFromStripe(subscription, {
                    orgSlug,
                    eventId: event.id,
                    eventType: event.type,
                });
            }

            if (session.metadata?.tier) {
                await sendMembershipCheckoutEmails(session);
            }
            break;
        }

        case 'checkout.session.expired': {
            const session = event.data.object as Stripe.Checkout.Session;
            const attempts = parseInt(session.metadata?.recovery_attempt || '0', 10);
            const registrationId = session.metadata?.registration_id;

            if (!registrationId || !session.customer_email || attempts >= 2) break;

            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
            const recoveredLineItems = lineItems.data
                .filter((item) => item.price?.id)
                .map((item) => ({ price: item.price!.id, quantity: item.quantity || 1 }));

            if (recoveredLineItems.length === 0) break;

            const newSession = await stripe.checkout.sessions.create({
                mode: 'payment',
                customer_email: session.customer_email,
                line_items: recoveredLineItems,
                metadata: { ...session.metadata, recovery_attempt: String(attempts + 1) },
                success_url: session.success_url || process.env.NEXT_PUBLIC_SITE_URL || 'https://escuelahispanica.org',
                cancel_url: session.cancel_url || process.env.NEXT_PUBLIC_SITE_URL || 'https://escuelahispanica.org',
            });

            await sendEventRecoveryEmail({
                email: session.customer_email,
                recoveryUrl: newSession.url!,
                registrationId,
                eventSlug: session.metadata?.event_slug || 'evento',
            });
            break;
        }

        case 'invoice.payment_succeeded': {
            const invoice = event.data.object as Stripe.Invoice;
            const { subscriptionId, paymentIntentId } = getInvoiceSubscriptionId(invoice);
            if (!subscriptionId) break;

            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            const synced = await syncSubscriptionFromStripe(subscription, {
                orgSlug,
                eventId: event.id,
                eventType: event.type,
            });
            if (subscription.metadata.userId && synced) {
                await insertPaymentHistory({
                    userId: subscription.metadata.userId,
                    subscriptionId: synced.subscriptionId,
                    paymentIntentId,
                    amountCents: invoice.amount_paid,
                    currency: invoice.currency || 'eur',
                    status: 'paid',
                    description: invoice.lines.data[0]?.description || 'Cobro recurrente',
                });
            }

            if (invoice.billing_reason !== 'subscription_create') {
                await sendInvoiceReceiptEmails(invoice);
            }
            break;
        }

        case 'invoice.payment_failed': {
            const invoice = event.data.object as Stripe.Invoice;
            const { subscriptionId, paymentIntentId } = getInvoiceSubscriptionId(invoice);
            if (!subscriptionId) break;

            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            const synced = await syncSubscriptionFromStripe(subscription, {
                orgSlug,
                eventId: event.id,
                eventType: event.type,
            });
            if (subscription.metadata.userId && synced) {
                await insertPaymentHistory({
                    userId: subscription.metadata.userId,
                    subscriptionId: synced.subscriptionId,
                    paymentIntentId,
                    amountCents: invoice.amount_due,
                    currency: invoice.currency || 'eur',
                    status: 'failed',
                    description: invoice.lines.data[0]?.description || 'Cobro fallido',
                });
            }

            await sendInvoiceFailedEmails(invoice);
            break;
        }

        case 'customer.subscription.updated':
        case 'customer.subscription.deleted': {
            const subscription = event.data.object as Stripe.Subscription;
            await syncSubscriptionFromStripe(subscription, {
                orgSlug,
                eventId: event.id,
                eventType: event.type,
            });
            break;
        }
    }

    return NextResponse.json({ received: true });
}
