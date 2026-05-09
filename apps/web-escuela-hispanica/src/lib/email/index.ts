import { Resend } from 'resend';
import { createAdminClient, type Json } from '@fortius/database';

if (!process.env.RESEND_API_KEY && process.env.NODE_ENV !== 'production') {
    console.warn('⚠️ RESEND_API_KEY is not set');
}

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_for_build');

const FROM_EMAIL = 'Escuela Hispánica <noreply@escuelahispanica.org>';
const fromAddress = FROM_EMAIL;
const ORG_SLUG = process.env.NEXT_PUBLIC_ORG_SLUG || 'escuela-hispanica';

let cachedOrgId: string | null | undefined;

async function getOrganizationId() {
    if (cachedOrgId !== undefined) return cachedOrgId;

    const admin = createAdminClient();
    const { data } = await admin
        .from('organizations')
        .select('id')
        .eq('slug', ORG_SLUG)
        .single();

    cachedOrgId = data?.id ?? null;
    return cachedOrgId;
}

async function logEmailAttempt({
    to,
    subject,
    kind,
    status,
    providerMessageId,
    relatedTable,
    relatedId,
    metadata,
}: {
    to: string;
    subject: string;
    kind: string;
    status: 'sent' | 'failed';
    providerMessageId?: string;
    relatedTable?: string;
    relatedId?: string;
    metadata?: Json;
}) {
    try {
        const organizationId = await getOrganizationId();
        if (!organizationId) return;

        await createAdminClient().from('communication_logs').insert({
            organization_id: organizationId,
            channel: 'email',
            kind,
            recipient_email: to,
            subject,
            status,
            provider: 'resend',
            provider_message_id: providerMessageId ?? null,
            related_table: relatedTable ?? null,
            related_id: relatedId ?? null,
            metadata: metadata ?? {},
        });
    } catch (error) {
        console.error('[email] Failed to persist communication log:', error);
    }
}

/**
 * Send an email using Resend.
 * Simple wrapper that handles dev/prod sender differences.
 */
export async function sendEmail({
    to,
    subject,
    html,
    reply_to,
    kind = 'notification',
    relatedTable,
    relatedId,
    metadata,
}: {
    to: string;
    subject: string;
    html: string;
    reply_to?: string;
    kind?: string;
    relatedTable?: string;
    relatedId?: string;
    metadata?: Json;
}) {
    try {
        const { data, error } = await resend.emails.send({
            from: fromAddress,
            to,
            subject,
            html,
            ...(reply_to && { reply_to }),
        });

        if (error) {
            console.error('[email] Resend error:', error);
            await logEmailAttempt({
                to,
                subject,
                kind,
                status: 'failed',
                relatedTable,
                relatedId,
                metadata: {
                    ...(metadata && typeof metadata === 'object' && !Array.isArray(metadata) ? metadata : {}),
                    error: JSON.stringify(error),
                },
            });
            return { success: false, error };
        }

        await logEmailAttempt({
            to,
            subject,
            kind,
            status: 'sent',
            providerMessageId: data?.id,
            relatedTable,
            relatedId,
            metadata,
        });

        return { success: true, id: data?.id };
    } catch (error) {
        console.error('[email] Failed to send:', error);
        await logEmailAttempt({
            to,
            subject,
            kind,
            status: 'failed',
            relatedTable,
            relatedId,
            metadata: {
                ...(metadata && typeof metadata === 'object' && !Array.isArray(metadata) ? metadata : {}),
                error: error instanceof Error ? error.message : 'unknown_error',
            },
        });
        return { success: false, error };
    }
}
