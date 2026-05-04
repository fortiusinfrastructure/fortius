import { createHmac, timingSafeEqual } from 'crypto';
import { createCheckoutSession } from './index';
import { createAdminClient } from '@fortius/database';

const APPROVAL_SECRET = process.env.APPROVAL_SECRET || 'dev-secret-change-me';

/**
 * Creates a secure HMAC token for the academic payment intermediate page.
 * Token format: <membershipId>.payment.<timestamp>.<hmac>
 * Valid for 90 days by default — long enough to avoid the 24h Stripe Checkout expiry.
 */
export function createAcademicPaymentToken(membershipId: string): string {
    const timestamp = Date.now().toString();
    const payload = `${membershipId}.payment.${timestamp}`;
    const hmac = createHmac('sha256', APPROVAL_SECRET)
        .update(payload)
        .digest('hex');

    return `${payload}.${hmac}`;
}

/**
 * Verifies an academic payment token.
 * Returns the membershipId if valid, null otherwise.
 *
 * @param token - The full token string
 * @param maxAgeMs - Maximum token age (default: 90 days)
 */
export function verifyAcademicPaymentToken(
    token: string,
    maxAgeMs: number = 90 * 24 * 60 * 60 * 1000,
): { membershipId: string } | null {
    const parts = token.split('.');
    if (parts.length !== 4) return null;

    const [membershipId, action, timestamp, providedHmac] = parts;
    if (action !== 'payment') return null;

    const tokenAge = Date.now() - parseInt(timestamp, 10);
    if (isNaN(tokenAge) || tokenAge > maxAgeMs) return null;

    const payload = `${membershipId}.payment.${timestamp}`;
    const expectedHmac = createHmac('sha256', APPROVAL_SECRET)
        .update(payload)
        .digest('hex');

    const providedBuffer = Buffer.from(providedHmac, 'hex');
    const expectedBuffer = Buffer.from(expectedHmac, 'hex');

    if (
        providedBuffer.length !== expectedBuffer.length ||
        !timingSafeEqual(providedBuffer, expectedBuffer)
    ) {
        return null;
    }

    return { membershipId: membershipId! };
}

/**
 * Builds the public URL for the intermediate academic payment page.
 */
export function buildAcademicPaymentUrl(membershipId: string, token: string): string {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const params = new URLSearchParams({ membershipId, token });
    return `${siteUrl}/colabora/pago-academico?${params.toString()}`;
}

/**
 * Creates a fresh Stripe Checkout Session for an approved academic membership.
 * Called on-demand when the user visits the intermediate payment page.
 *
 * Throws if the membership is not found, not approved, or if Stripe prices are missing.
 */
export async function createAcademicCheckoutSession(membershipId: string) {
    const admin = createAdminClient();

    const { data: membership } = await admin
        .from('user_memberships')
        .select('*')
        .eq('id', membershipId)
        .single();

    if (!membership) {
        throw new Error('Membresía no encontrada');
    }
    if (membership.status === 'active') {
        throw new Error('Membresía ya activa');
    }
    if (membership.status !== 'approved') {
        throw new Error('Membresía no aprobada');
    }

    const { data: authUser } = await admin.auth.admin.getUserById(membership.user_id);
    if (!authUser?.user?.email) {
        throw new Error('Email de usuario no encontrado');
    }

    const priceId =
        process.env.STRIPE_PRICE_ACADEMICO_ANNUAL ||
        process.env.STRIPE_PRICE_ACADEMICO_MONTHLY;

    if (!priceId) {
        throw new Error('Precio académico no configurado');
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await createCheckoutSession({
        mode: 'subscription',
        priceId,
        customerEmail: authUser.user.email,
        metadata: {
            tier: 'academico',
            userId: membership.user_id,
            membershipId,
            orgSlug: 'escuela-hispanica',
        },
        successUrl: `${siteUrl}/colabora/exito?tier=academico&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${siteUrl}/colabora`,
    });

    return session;
}
