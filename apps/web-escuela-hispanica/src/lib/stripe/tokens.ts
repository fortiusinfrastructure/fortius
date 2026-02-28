import { createHmac, timingSafeEqual } from 'crypto';

const APPROVAL_SECRET = process.env.APPROVAL_SECRET || 'dev-secret-change-me';

/**
 * Creates an HMAC-SHA256 token for academic approval/rejection links.
 * The token encodes the membership ID and an action (approve/reject).
 *
 * Token format: <membershipId>.<action>.<timestamp>.<hmac>
 */
export function createApprovalToken(
    membershipId: string,
    action: 'approve' | 'reject',
): string {
    const timestamp = Date.now().toString();
    const payload = `${membershipId}.${action}.${timestamp}`;
    const hmac = createHmac('sha256', APPROVAL_SECRET)
        .update(payload)
        .digest('hex');

    return `${payload}.${hmac}`;
}

/**
 * Verifies an HMAC-SHA256 approval token.
 * Returns the decoded data if valid, null if invalid or expired.
 *
 * @param token - The full token string
 * @param maxAgeMs - Maximum token age in milliseconds (default: 30 days)
 */
export function verifyApprovalToken(
    token: string,
    maxAgeMs: number = 30 * 24 * 60 * 60 * 1000,
): { membershipId: string; action: 'approve' | 'reject' } | null {
    const parts = token.split('.');
    if (parts.length !== 4) return null;

    const [membershipId, action, timestamp, providedHmac] = parts;

    if (action !== 'approve' && action !== 'reject') return null;

    // Check expiration
    const tokenAge = Date.now() - parseInt(timestamp, 10);
    if (isNaN(tokenAge) || tokenAge > maxAgeMs) return null;

    // Verify HMAC
    const payload = `${membershipId}.${action}.${timestamp}`;
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

    return { membershipId: membershipId!, action };
}
