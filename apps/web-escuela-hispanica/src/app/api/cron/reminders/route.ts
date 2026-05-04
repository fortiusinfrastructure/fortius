import { NextResponse, type NextRequest } from 'next/server';
import { sendPendingPaymentReminders } from '@/lib/reminders';

export const dynamic = 'force-dynamic';

/**
 * GET /api/cron/reminders
 *
 * Secure endpoint for Vercel Cron Jobs (or manual invocation).
 * Identifies approved-but-not-active academic memberships and sends
 * payment reminder emails via Resend.
 *
 * Protected by CRON_SECRET header.
 */
export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    const expected = `Bearer ${process.env.CRON_SECRET || ''}`;

    if (!process.env.CRON_SECRET) {
        console.error('[cron/reminders] CRON_SECRET is not configured');
        return NextResponse.json(
            { error: 'CRON_SECRET not configured on server' },
            { status: 500 },
        );
    }

    if (authHeader !== expected) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 },
        );
    }

    try {
        const result = await sendPendingPaymentReminders();
        return NextResponse.json({ success: true, ...result });
    } catch (error) {
        console.error('[cron/reminders] Unhandled error:', error);
        return NextResponse.json(
            { error: 'Failed to process reminders' },
            { status: 500 },
        );
    }
}
