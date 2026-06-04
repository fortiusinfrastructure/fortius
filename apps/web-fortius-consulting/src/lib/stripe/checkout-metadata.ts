/**
 * Stripe checkout metadata builder and validator.
 * Pattern ported from web-escuela-hispanica — extended with consulting-specific fields.
 */

export interface SubscriptionMetadataInput {
    /** Plan key used as tier (e.g. "politica-premium"). Must match membership_plans.tier. */
    tier: string;
    userId: string;
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
        userId,
        orgSlug,
        source,
    };

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
 * Called inside buildSubscriptionMetadata and inside createCheckoutSession for double safety.
 */
export function ensureSubscriptionMetadata(
    metadata: Record<string, string> | undefined,
    context: string,
) {
    if (!metadata) {
        throw new Error(`Falta metadata obligatoria para la suscripción (${context})`);
    }

    const missing = ['tier', 'userId', 'orgSlug'].filter((key) => !metadata[key]);
    if (missing.length > 0) {
        throw new Error(
            `Falta metadata obligatoria para la suscripción (${context}): ${missing.join(', ')}`,
        );
    }

    if (metadata.userId === 'anonymous') {
        throw new Error(
            'No se permiten suscripciones recurrentes sin un usuario autenticado asociado.',
        );
    }

    return metadata;
}
