/**
 * Stripe checkout metadata builder and validator.
 * Pattern ported from web-escuela-hispanica — extended with consulting-specific fields.
 */

export interface SubscriptionMetadataInput {
    /** Plan key used as tier (e.g. "politica-premium"). Must match membership_plans.tier. */
    tier: string;
    /**
     * Supabase user UUID. Optional when using the "pay-first" flow:
     * the webhook resolves / creates the user from the Stripe customer email after payment.
     */
    userId?: string;
    orgSlug: string;
    membershipId?: string;
    planId?: string;
    source?: string;
    // Consulting-specific extras
    interval?: string;
    planKey?: string;
    vertical?: string;
}

export function buildSubscriptionMetadata({
    tier,
    userId,
    orgSlug,
    membershipId,
    planId,
    source = 'web-fortius-consulting',
    interval,
    planKey,
    vertical,
}: SubscriptionMetadataInput): Record<string, string> {
    const metadata: Record<string, string> = {
        tier,
        orgSlug,
        source,
    };

    // userId is optional for anonymous (pay-first) checkout
    if (userId) metadata.userId = userId;
    if (membershipId) metadata.membershipId = membershipId;
    if (planId) metadata.planId = planId;
    if (interval) metadata.interval = interval;
    if (planKey) metadata.planKey = planKey;
    if (vertical) metadata.vertical = vertical;

    ensureSubscriptionMetadata(metadata, 'buildSubscriptionMetadata');
    return metadata;
}

/**
 * Validates that required fields are present. Throws if anything is missing or invalid.
 * Note: userId is NOT required here — the webhook resolves it from the customer email
 * for the "pay-first" anonymous checkout flow.
 */
export function ensureSubscriptionMetadata(
    metadata: Record<string, string> | undefined,
    context: string,
) {
    if (!metadata) {
        throw new Error(`Falta metadata obligatoria para la suscripción (${context})`);
    }

    const missing = ['tier', 'orgSlug'].filter((key) => !metadata[key]);
    if (missing.length > 0) {
        throw new Error(
            `Falta metadata obligatoria para la suscripción (${context}): ${missing.join(', ')}`,
        );
    }

    return metadata;
}
