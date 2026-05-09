export interface SubscriptionMetadataInput {
    tier: string;
    userId: string;
    orgSlug: string;
    membershipId?: string;
    planId?: string;
    source?: string;
}

export function buildSubscriptionMetadata({
    tier,
    userId,
    orgSlug,
    membershipId,
    planId,
    source = 'web-escuela-hispanica',
}: SubscriptionMetadataInput): Record<string, string> {
    const metadata: Record<string, string> = {
        tier,
        userId,
        orgSlug,
        source,
    };

    if (membershipId) metadata.membershipId = membershipId;
    if (planId) metadata.planId = planId;

    ensureSubscriptionMetadata(metadata, 'buildSubscriptionMetadata');
    return metadata;
}

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