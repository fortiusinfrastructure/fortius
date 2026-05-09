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