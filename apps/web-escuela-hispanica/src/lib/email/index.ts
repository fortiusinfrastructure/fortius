import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY && process.env.NODE_ENV !== 'production') {
    console.warn('⚠️ RESEND_API_KEY is not set');
}

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_for_build');

const FROM_EMAIL = 'Escuela Hispánica <info@escuelahispanica.org>';

// In development, use Resend's sandbox domain
const isDev = process.env.NODE_ENV === 'development';
const fromAddress = isDev ? 'Escuela Hispánica <onboarding@resend.dev>' : FROM_EMAIL;

/**
 * Send an email using Resend.
 * Simple wrapper that handles dev/prod sender differences.
 */
export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    try {
        const { data, error } = await resend.emails.send({
            from: fromAddress,
            to,
            subject,
            html,
        });

        if (error) {
            console.error('[email] Resend error:', error);
            return { success: false, error };
        }

        return { success: true, id: data?.id };
    } catch (error) {
        console.error('[email] Failed to send:', error);
        return { success: false, error };
    }
}
