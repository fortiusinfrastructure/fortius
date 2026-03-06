import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@fortius/database';

/**
 * POST /api/contact
 *
 * Handles contact form submissions and event registrations.
 * Uses the Supabase Admin Client to bypass RLS policies and insert safely.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const first_name = body.first_name as string;
        const last_name = body.last_name as string;
        const email = body.email as string;
        const institution = body.institution as string;
        const message = body.message as string;
        const subject = body.subject as string;

        if (!first_name || !last_name || !email) {
            return NextResponse.json(
                { error: 'Faltan campos obligatorios' },
                { status: 400 }
            );
        }

        const admin = createAdminClient();

        // 1. Get the organization ID for Escuela Hispánica
        const { data: org, error: orgError } = await admin
            .from('organizations')
            .select('id')
            .eq('slug', 'escuela-hispanica')
            .single();

        if (orgError || !org) {
            console.error('[api/contact] org fetch error:', orgError);
            return NextResponse.json(
                { error: 'Configuración interna inválida' },
                { status: 500 }
            );
        }

        // 2. Format the message body if institution is provided
        let finalMessage = message || '';
        if (institution) {
            finalMessage = `Institución/Organización: ${institution}\n\n${finalMessage}`;
        }

        // 3. Insert into the contact_submissions table
        const { error: insertError } = await admin
            .from('contact_submissions')
            .insert({
                organization_id: org.id,
                first_name,
                last_name,
                email,
                subject: subject || 'Contacto Web',
                message: finalMessage,
                status: 'new'
            });

        if (insertError) {
            console.error('[api/contact] insert error:', insertError);
            return NextResponse.json(
                { error: 'Error al registrar su petición' },
                { status: 500 }
            );
        }

        // 4. Send email notifications via Resend
        const approverEmail = process.env.APPROVER_EMAIL || 'info@escuelahispanica.org';
        const { sendEmail } = await import('@/lib/email');

        // 4a. Notify the internal approver
        const approverResult = await sendEmail({
            to: approverEmail,
            subject: `Nuevo mensaje de contacto: ${subject || 'Contacto Web'}`,
            reply_to: email,
            html: `
                <h2>Nuevo Mensaje de Contacto</h2>
                <p><strong>De:</strong> ${first_name} ${last_name} (${email})</p>
                <p><strong>Asunto:</strong> ${subject || 'Contacto Web'}</p>
                <p><strong>Mensaje:</strong></p>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
                    ${finalMessage.replace(/\n/g, '<br>')}
                </div>
            `
        });

        if (!approverResult.success) {
            console.error('[api/contact] Approver notification failed:', approverResult.error);
            return NextResponse.json(
                { error: 'El mensaje se guardó, pero hubo un error enviando la notificación por email.' },
                { status: 500 }
            );
        }

        // 4b. Send a confirmation email to the submitter (best-effort — never blocks success)
        const confirmationResult = await sendEmail({
            to: email,
            subject: `Confirmación de registro: ${subject || 'Contacto Web'}`,
            html: `
                <h2>Hemos recibido tu solicitud</h2>
                <p>Estimado/a ${first_name} ${last_name},</p>
                <p>Gracias por ponerte en contacto con la Escuela Hispánica. Hemos recibido correctamente tu solicitud y nos pondremos en contacto contigo a la brevedad.</p>
                <p><strong>Asunto:</strong> ${subject || 'Contacto Web'}</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="color: #888; font-size: 12px;">Escuela Hispánica — <a href="https://escuelahispanica.org">escuelahispanica.org</a></p>
            `
        });

        if (!confirmationResult.success) {
            console.error('[api/contact] Confirmation email to submitter failed:', confirmationResult.error);
            // The registration was saved — do not fail the request over this
        }

        return NextResponse.json({ success: true, emailId: approverResult.id });
    } catch (error: any) {
        console.error('[api/contact] handler error:', error);
        return NextResponse.json(
            { error: 'Error inesperado del servidor', details: error.message },
            { status: 500 }
        );
    }
}
