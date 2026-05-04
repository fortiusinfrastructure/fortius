import { createAdminClient } from '@fortius/database';
import { sendEmail } from './email';
import { getAcademicReminderTemplate } from './email/templates';
import { buildAcademicPaymentUrl } from './stripe/academic-payment';

const MAX_REMINDERS = 3;
const FIRST_REMINDER_HOURS = 12;
const SUBSEQUENT_REMINDER_HOURS = 24;

/**
 * Identifies approved-but-not-active academic memberships that need a reminder,
 * sends emails via Resend, and updates reminder tracking in the database.
 *
 * Idempotency is guaranteed by:
 * - Updating last_reminder_sent_at atomically before sending (race-condition safe)
 * - Checking reminder_count < MAX_REMINDERS in the query
 */
export async function sendPendingPaymentReminders(): Promise<{
    sent: number;
    skipped: number;
    errors: number;
    details: Array<{ membershipId: string; sent: boolean; reason?: string }>;
}> {
    const admin = createAdminClient();
    const now = new Date();

    // Fetch all approved academic memberships with fewer than max reminders.
    // We filter by time logic in-memory because the condition is complex.
    const { data: memberships, error } = await admin
        .from('user_memberships')
        .select('*')
        .eq('status', 'approved')
        .eq('tier', 'academico')
        .lt('reminder_count', MAX_REMINDERS);

    if (error) {
        console.error('[reminders] Failed to fetch memberships:', error);
        throw new Error('Database query failed');
    }

    const results: Array<{ membershipId: string; sent: boolean; reason?: string }> = [];
    let sentCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    if (!memberships || memberships.length === 0) {
        return { sent: 0, skipped: 0, errors: 0, details: [] };
    }

    for (const membership of memberships) {
        const membershipId = membership.id;

        if (!shouldSendReminder(membership, now)) {
            skippedCount++;
            results.push({ membershipId, sent: false, reason: 'Not due yet' });
            continue;
        }

        try {
            // Lock this membership by incrementing reminder_count and setting last_reminder_sent_at
            // BEFORE sending the email. This prevents duplicate sends in concurrent executions.
            const { error: updateError } = await admin
                .from('user_memberships')
                .update({
                    reminder_count: (membership.reminder_count || 0) + 1,
                    last_reminder_sent_at: now.toISOString(),
                })
                .eq('id', membershipId)
                .eq('reminder_count', membership.reminder_count || 0); // optimistic lock

            if (updateError) {
                // Another process likely updated this row concurrently — skip
                skippedCount++;
                results.push({ membershipId, sent: false, reason: 'Concurrent update detected' });
                continue;
            }

            // Fetch user email + name
            const { data: authUser } = await admin.auth.admin.getUserById(membership.user_id);
            if (!authUser?.user?.email) {
                console.warn(`[reminders] No email for user ${membership.user_id}`);
                errorCount++;
                results.push({ membershipId, sent: false, reason: 'No user email' });
                continue;
            }

            const { data: profile } = await admin
                .from('user_profiles')
                .select('full_name')
                .eq('user_id', membership.user_id)
                .single();

            const fullName = profile?.full_name || authUser.user.email;
            const paymentUrl = buildAcademicPaymentUrl(
                membershipId,
                membership.payment_link_id || '',
            );

            const emailResult = await sendEmail({
                to: authUser.user.email,
                subject: 'Recordatorio: Complete su membresía académica',
                html: getAcademicReminderTemplate({
                    fullName,
                    paymentUrl,
                    reminderNumber: (membership.reminder_count || 0) + 1,
                }),
            });

            if (emailResult.success) {
                sentCount++;
                results.push({ membershipId, sent: true });
            } else {
                // Revert the counter increment so we can retry next run
                await admin
                    .from('user_memberships')
                    .update({
                        reminder_count: membership.reminder_count || 0,
                        last_reminder_sent_at: membership.last_reminder_sent_at,
                    })
                    .eq('id', membershipId);

                errorCount++;
                console.error(`[reminders] Email failed for ${membershipId}:`, emailResult.error);
                results.push({ membershipId, sent: false, reason: 'Email delivery failed' });
            }
        } catch (err) {
            errorCount++;
            console.error(`[reminders] Exception for ${membershipId}:`, err);
            results.push({ membershipId, sent: false, reason: String(err) });
        }
    }

    return { sent: sentCount, skipped: skippedCount, errors: errorCount, details: results };
}

/**
 * Determines whether a reminder should be sent for a given membership.
 */
interface MembershipReminderData {
    reminder_count: number | null;
    approved_at: string | null;
    last_reminder_sent_at: string | null;
}

function shouldSendReminder(membership: MembershipReminderData, now: Date): boolean {
    const reminderCount = membership.reminder_count || 0;
    const approvedAt = membership.approved_at
        ? new Date(membership.approved_at)
        : null;
    const lastReminderAt = membership.last_reminder_sent_at
        ? new Date(membership.last_reminder_sent_at)
        : null;

    if (!approvedAt) return false;

    if (reminderCount === 0) {
        const hoursSinceApproval = (now.getTime() - approvedAt.getTime()) / (1000 * 60 * 60);
        return hoursSinceApproval >= FIRST_REMINDER_HOURS;
    }

    if (!lastReminderAt) return false;
    const hoursSinceLastReminder =
        (now.getTime() - lastReminderAt.getTime()) / (1000 * 60 * 60);
    return hoursSinceLastReminder >= SUBSEQUENT_REMINDER_HOURS;
}
