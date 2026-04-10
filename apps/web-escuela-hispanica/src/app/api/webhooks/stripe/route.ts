import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';
import { headers } from 'next/headers';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2025-02-24.acacia',
} as any);

function createSupabaseAdmin() {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            cookies: {
                getAll: () => [],
                setAll: () => { },
            },
        }
    );
}

export async function POST(req: Request) {
    const rawBody = await req.text();
    const headersList = await headers();
    const sig = headersList.get('stripe-signature');

    if (!sig) {
        return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err: any) {
        console.error('⚠️  Webhook signature verification failed.', err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const registrationId = session.metadata?.registration_id;

        if (registrationId) {
            console.log(`✅  Payment fulfilled for registration: ${registrationId}`);

            // 1. Update the DB status to 'paid'
            const { data: registration, error: updateError } = await supabase
                .from('event_registrations')
                .update({
                    status: 'paid',
                    stripe_session_id: session.id
                })
                .eq('id', registrationId)
                .select()
                .single();

            if (updateError) {
                console.error('❌ Error updating registration:', updateError);
            }

            // 2. Send confirmation emails if DB update succeeded
            if (registration) {
                const { sendEmail } = await import('@/lib/email');
                const { first_name, last_name, email, event_slug, amount } = registration;
                const approverEmail = process.env.APPROVER_EMAIL || 'info@escuelahispanica.org';

                // 2a. Confirmation to the attendee
                await sendEmail({
                    to: email,
                    subject: `✅ Confirmación de Inscripción al Jantar Da Hispanidade e Da Lusofonia`,
                    html: `
                        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
                            <h2 style="color: #1a1a2e; border-bottom: 2px solid #c5a059; padding-bottom: 12px;">
                                Inscripción Confirmada
                            </h2>
                            <p>Estimado/a <strong>${first_name} ${last_name}</strong>,</p>
                            <p>Su pago ha sido recibido y su plaza está reservada. Le esperamos con mucho gusto.</p>
                            <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Evento</td>
                                    <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Jantar Da Hispanidade e Da Lusofonia</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Fecha</td>
                                    <td style="padding: 8px; border-bottom: 1px solid #eee;">17 de Abril de 2026, 20:00</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Lugar</td>
                                    <td style="padding: 8px; border-bottom: 1px solid #eee;">Real Clube Tauromáquico Português, Lisboa</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Importe Abonado</td>
                                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${amount ? `${amount}€` : '25€'}</td>
                                </tr>
                            </table>
                            <p>Si tiene alguna pregunta, no dude en ponerse en contacto con nosotros respondiendo a este email.</p>
                            <p style="margin-top: 30px;">Atentamente,</p>
                            <p><strong>Escuela Hispánica</strong><br>
                            <a href="https://www.escuelahispanica.org" style="color: #c5a059;">www.escuelahispanica.org</a></p>
                        </div>
                    `
                });

                // 2b. Internal notification to the organizers
                await sendEmail({
                    to: approverEmail,
                    subject: `💰 Nueva Inscripción Pagada — ${event_slug}`,
                    html: `
                        <h2>Nueva Inscripción Pagada</h2>
                        <p><strong>Evento:</strong> ${event_slug}</p>
                        <p><strong>Nombre:</strong> ${first_name} ${last_name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Importe:</strong> ${amount ? `${amount}€` : '25€'}</p>
                        <p><strong>Stripe Session:</strong> ${session.id}</p>
                    `
                });

                console.log(`✉️ Confirmation emails sent to ${email} and ${approverEmail}`);
            }
        } else {
            console.warn('⚠️  Checkout session completed but no registration_id in metadata.');
        }
    } else if (event.type === 'checkout.session.expired') {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Prevent infinite loops by checking metadata.recovery_attempt
        const attempts = parseInt(session.metadata?.recovery_attempt || '0', 10);
        
        if (attempts < 2) {
            console.log(`⚠️  Session expired for ${session.customer_email}. Attempting to regenerate (attempt ${attempts + 1}).`);
            
            try {
                // Fetch the line items from the expired session
                const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
                
                if (lineItems.data.length > 0 && session.customer_email) {
                    // Prepare the new line items format for session creation
                    const newLineItems = lineItems.data.map(item => {
                        if (item.price && item.price.id) {
                            return {
                                price: item.price.id,
                                quantity: item.quantity || 1
                            };
                        }
                        throw new Error('Line item has no price id');
                    });

                    // Create the new session
                    const newMetadata = {
                        ...session.metadata,
                        recovery_attempt: (attempts + 1).toString()
                    };

                    const newSession = await stripe.checkout.sessions.create({
                        mode: session.mode,
                        customer_email: session.customer_email,
                        line_items: newLineItems,
                        metadata: newMetadata,
                        success_url: session.success_url || 'https://www.escuelahispanica.org',
                        cancel_url: session.cancel_url || 'https://www.escuelahispanica.org',
                    });

                    // Send an email to the customer with the new link
                    const { sendEmail } = await import('@/lib/email');
                    
                    await sendEmail({
                        to: session.customer_email,
                        subject: `💡 Tu enlace de inscripción ha expirado. Aquí tienes uno nuevo.`,
                        html: `
                            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
                                <h2 style="color: #1a1a2e; border-bottom: 2px solid #c5a059; padding-bottom: 12px;">Enlace de Pago Expirado</h2>
                                <p>Hola,</p>
                                <p>Hemos detectado que tu enlace para completar tu solicitud en <strong>Escuela Hispánica</strong> ha expirado por motivos de seguridad (los enlaces caducan a las 24 horas).</p>
                                <p>Para que puedas finalizar el proceso sin interrupciones, hemos generado un enlace completamente nuevo y seguro para ti:</p>
                                <div style="text-align: center; margin: 40px 0;">
                                    <a href="${newSession.url}" style="background-color: #c5a059; color: #050a14; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 4px; text-transform: uppercase; font-size: 14px; letter-spacing: 2px;">Continuar con el Pago</a>
                                </div>
                                <p>Si necesitas cualquier tipo de asistencia adicional, no dudes en responder directamente a este correo.</p>
                                <p style="margin-top: 30px;">Atentamente,<br><strong>Escuela Hispánica</strong></p>
                            </div>
                        `
                    });
                    
                    console.log(`✅  Recovery email sent with new session: ${newSession.id}`);
                } else {
                    console.log('⚠️  Could not recover session. Missing line items or customer email.');
                }
            } catch (recoveryError) {
                console.error('❌ Error recovering expired session:', recoveryError);
            }
        } else {
            console.log(`🛑 Session expired for ${session.customer_email}. Max recovery attempts reached.`);
        }
    }

    return NextResponse.json({ received: true });
}
