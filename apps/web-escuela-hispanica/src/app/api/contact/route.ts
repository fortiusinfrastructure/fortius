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
        const formData = await request.formData();

        const first_name = formData.get('first_name') as string;
        const last_name = formData.get('last_name') as string;
        const email = formData.get('email') as string;
        const institution = formData.get('institution') as string;
        const message = formData.get('message') as string;
        const subject = formData.get('subject') as string;

        if (!first_name || !last_name || !email || !message) {
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

        // 4. Trigger email notification via Resend
        const approverEmail = process.env.APPROVER_EMAIL || 'info@escuelahispanica.org';
        const { sendEmail } = await import('@/lib/email');

        await sendEmail({
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

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[api/contact] handler error:', error);
        return NextResponse.json(
            { error: 'Error inesperado del servidor' },
            { status: 500 }
        );
    }
}
