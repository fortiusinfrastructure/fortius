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
            subject: 'Confirmación de Recepción de Mensaje',
            html: `
                <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
                    <h2 style="color: #1a1a2e; border-bottom: 2px solid #c5a059; padding-bottom: 12px;">Confirmación de Recepción</h2>
                    <p>Estimado/a ${first_name} ${last_name},</p>
                    <p>Le agradecemos que se haya puesto en contacto con Escuela Hispánica.</p>
                    <p>Su mensaje ha sido recibido correctamente y será atendido por el equipo a la mayor brevedad posible.</p>
                    <p>Le agradecemos su interés y la atención prestada a nuestra labor académica.</p>
                    <p style="margin-top: 30px;">Reciba un cordial saludo,</p>
                    <p><strong>Secretaría</strong><br>Escuela Hispánica</p>
                </div>
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
