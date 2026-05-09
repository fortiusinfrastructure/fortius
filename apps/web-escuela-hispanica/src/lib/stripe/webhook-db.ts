import type Stripe from 'stripe';
import { createAdminClient } from '@fortius/database';

let cachedOrgId: string | null | undefined;

export async function getWebhookOrganizationId(orgSlug = 'escuela-hispanica') {
    if (cachedOrgId !== undefined && orgSlug === 'escuela-hispanica') return cachedOrgId;

    const admin = createAdminClient();
    const { data } = await admin.from('organizations').select('id').eq('slug', orgSlug).single();
    const orgId = data?.id ?? null;

    if (orgSlug === 'escuela-hispanica') cachedOrgId = orgId;
    return orgId;
}

export async function recordStripeEvent(eventId: string, eventType: string, organizationId: string | null) {
    const admin = createAdminClient();
    const { error } = await admin.from('stripe_events').insert({
        event_id: eventId,
        event_type: eventType,
        organization_id: organizationId,
    });

    if (!error) return true;
    if (error.code === '23505') return false;
    throw error;
}

export async function syncSubscriptionFromStripe(subscription: Stripe.Subscription, orgSlug = 'escuela-hispanica') {
    const organizationId = await getWebhookOrganizationId(orgSlug);
    const admin = createAdminClient();
    const metadata = subscription.metadata || {};
    const priceId = subscription.items.data[0]?.price?.id;

    if (!organizationId || !priceId || !metadata.userId) {
        return null;
    }

    const { data: plan } = await admin
        .from('membership_plans')
        .select('id')
        .eq('organization_id', organizationId)
        .eq('stripe_price_id', priceId)
        .single();

    if (!plan) {
        throw new Error(`No membership plan found for price ${priceId}`);
    }

    const normalizedStatus = normalizeSubscriptionStatus(subscription.status);
    const { data: savedSubscription } = await admin
        .from('subscriptions')
        .upsert(
            {
                user_id: metadata.userId,
                organization_id: organizationId,
                membership_id: metadata.membershipId || null,
                plan_id: plan.id,
                stripe_subscription_id: subscription.id,
                stripe_customer_id: typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id,
                status: normalizedStatus,
                current_period_start: new Date(subscription.items.data[0].current_period_start * 1000).toISOString(),
                current_period_end: new Date(subscription.items.data[0].current_period_end * 1000).toISOString(),
                cancel_at_period_end: subscription.cancel_at_period_end,
                canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
            },
            { onConflict: 'stripe_subscription_id' },
        )
        .select('id')
        .single();

    if (metadata.membershipId) {
        await admin
            .from('user_memberships')
            .update({
                status: normalizeMembershipStatus(normalizedStatus),
                joined_at:
                    normalizedStatus === 'active' || normalizedStatus === 'trialing'
                        ? new Date().toISOString()
                        : undefined,
                expires_at: new Date(subscription.items.data[0].current_period_end * 1000).toISOString(),
            })
            .eq('id', metadata.membershipId);
    }

    return { organizationId, subscriptionId: savedSubscription?.id ?? null, membershipId: metadata.membershipId ?? null };
}

export async function insertPaymentHistory({
    userId,
    subscriptionId,
    paymentIntentId,
    amountCents,
    currency,
    status,
    description,
}: {
    userId: string;
    subscriptionId: string | null;
    paymentIntentId: string | null;
    amountCents: number;
    currency: string | null;
    status: string;
    description: string;
}) {
    await createAdminClient().from('payment_history').insert({
        user_id: userId,
        subscription_id: subscriptionId,
        stripe_payment_intent_id: paymentIntentId,
        amount_cents: amountCents,
        currency,
        status,
        description,
    });
}

function normalizeSubscriptionStatus(status: Stripe.Subscription.Status) {
    if (status === 'unpaid') return 'past_due';
    if (status === 'incomplete_expired') return 'canceled';
    if (status === 'paused') return 'past_due';
    return status;
}

function normalizeMembershipStatus(status: ReturnType<typeof normalizeSubscriptionStatus>) {
    // `active` is the final operational state after Stripe confirms
    // the subscription or recurring payment lifecycle.
    if (status === 'active' || status === 'trialing') return 'active';
    if (status === 'past_due' || status === 'incomplete') return 'past_due';
    return 'inactive';
}