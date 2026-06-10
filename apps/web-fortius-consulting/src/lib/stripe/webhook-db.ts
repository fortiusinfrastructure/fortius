import { createAdminClient } from "@fortius/database";

let cachedOrgId: string | null | undefined;

export async function getWebhookOrganizationId(orgSlug = "fortius-consulting") {
    if (cachedOrgId !== undefined && orgSlug === "fortius-consulting") return cachedOrgId;

    const admin = createAdminClient();
    const { data } = await admin.from("organizations").select("id").eq("slug", orgSlug).single();
    const orgId = data?.id ?? null;

    if (orgSlug === "fortius-consulting") cachedOrgId = orgId;
    return orgId;
}

export async function recordStripeEvent(eventId: string, eventType: string, organizationId: string | null) {
    const admin = createAdminClient();
    const { error } = await admin.from("stripe_events").insert({
        event_id: eventId,
        event_type: eventType,
        organization_id: organizationId,
    });

    if (!error) return true;
    if (error.code === "23505") return false; // duplicate — already processed
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
    await createAdminClient().from("payment_history").insert({
        user_id: userId,
        subscription_id: subscriptionId,
        stripe_payment_intent_id: paymentIntentId,
        amount_cents: amountCents,
        currency,
        status,
        description,
    });
}

export async function upsertEventPurchase({
    userId,
    organizationId,
    eventSlug,
    eventTitle,
    stripeCheckoutSessionId,
    stripePaymentIntentId,
    amountCents,
    currency,
    metadata,
}: {
    userId: string;
    organizationId: string;
    eventSlug: string;
    eventTitle: string;
    stripeCheckoutSessionId: string;
    stripePaymentIntentId: string | null;
    amountCents: number;
    currency: string;
    metadata?: Record<string, unknown>;
}) {
    const { data, error } = await createAdminClient()
        .from("event_purchases")
        .upsert(
            {
                user_id: userId,
                organization_id: organizationId,
                event_slug: eventSlug,
                event_title: eventTitle,
                stripe_checkout_session_id: stripeCheckoutSessionId,
                stripe_payment_intent_id: stripePaymentIntentId,
                amount_cents: amountCents,
                currency,
                status: "paid",
                metadata: metadata ?? {},
                purchased_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id,organization_id,event_slug" },
        )
        .select("id")
        .single();

    if (error) throw error;
    return data?.id as string | undefined;
}
