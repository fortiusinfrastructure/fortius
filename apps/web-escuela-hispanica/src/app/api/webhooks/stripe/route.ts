import { NextResponse, type NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@fortius/database';
import { sendEmail } from '@/lib/email';
import { getPaymentReceiptTemplate, getPaymentFailedTemplate } from '@/lib/email/templates';
import type Stripe from 'stripe';

function getStripeObjectId(value: string | { id: string } | null | undefined) {
    if (!value) return null;
    return typeof value === 'string' ? value : value.id;
}

async function sendEmailWithLog(
    label: string,
    options: Parameters<typeof sendEmail>[0],
) {
    const result = await sendEmail(options);

    if (!result.success) {
        console.error(`[webhook] Failed to send ${label} email:`, result.error);
    }
}

/**
 * POST /api/webhooks/stripe
 *
 * Handles Stripe webhook events for membership lifecycle.
 * Uses stripe_events table for idempotency.
 *
 * Events handled:
 * - checkout.session.completed    → Activate membership, record initial payment
 * - customer.subscription.deleted → Deactivate membership (fallback: lookup by stripe_subscription_id)
 * - invoice.payment_succeeded     → Record recurring payments in payment_history
 * - invoice.payment_failed        → Mark subscription as past_due
 */
export async function POST(request: NextRequest) {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    if (!sig) {
        return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!,
        );
    } catch (err) {
        console.error('[webhook] Signature verification failed:', err);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const admin = createAdminClient();

    // Idempotency check — don't process the same event twice
    const { data: existingEvent } = await admin
        .from('stripe_events')
        .select('id')
        .eq('event_id', event.id)
        .single();

    if (existingEvent) {
        return NextResponse.json({ received: true, deduplicated: true });
    }

    // Record the event for idempotency
    await admin.from('stripe_events').insert({
        event_id: event.id,
        event_type: event.type,
        processed_at: new Date().toISOString(),
    });

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                const metadata = session.metadata || {};
                const { tier, userId: metadataUserId, orgSlug, membershipId } = metadata;
                const paymentReference = getStripeObjectId(session.payment_intent) ?? session.id;
                const stripeSubscriptionId = getStripeObjectId(session.subscription);
                const stripeCustomerId = getStripeObjectId(session.customer);

                let finalUserId = metadataUserId;

                // Handle anonymous user
                if (!finalUserId || finalUserId === 'anonymous') {
                    const email = session.customer_details?.email?.toLowerCase();
                    if (email) {
                        // Find or create user
                        const { data: existingUser } = await admin.auth.admin.listUsers();
                        const foundUser = existingUser.users.find(u => u.email === email);

                        if (foundUser) {
                            finalUserId = foundUser.id;
                        } else {
                            const { data: newUser, error: createError } = await admin.auth.admin.createUser({
                                email,
                                user_metadata: { full_name: session.customer_details?.name || email },
                                email_confirm: true,
                            });
                            if (!createError) {
                                finalUserId = newUser.user.id;
                            }
                        }
                    }
                }

                // Record payment only when we have a valid user_id.
                // payment_history.user_id is NOT NULL in the current schema.
                if (finalUserId && finalUserId !== 'anonymous') {
                    const { error: paymentError } = await admin.from('payment_history').insert({
                        user_id: finalUserId,
                        amount_cents: session.amount_total || 0,
                        currency: session.currency || 'eur',
                        stripe_payment_intent_id: paymentReference,
                        status: 'completed',
                    });

                    if (paymentError) {
                        console.error('[webhook] Failed to record checkout payment:', paymentError);
                    }
                } else {
                    console.warn(
                        '[webhook] Skipping payment_history insert because user_id could not be resolved for checkout session:',
                        session.id,
                    );
                }

                if (!finalUserId || finalUserId === 'anonymous') break;

                // Get organization
                const { data: org } = await admin
                    .from('organizations')
                    .select('id')
                    .eq('slug', orgSlug || 'escuela-hispanica')
                    .single();

                if (!org) break;

                if (membershipId) {
                    // Academic flow: update existing pending/approved membership to active
                    await admin
                        .from('user_memberships')
                        .update({
                            status: 'active',
                            tier: tier || 'academico',
                        })
                        .eq('id', membershipId);
                } else {
                    // Amigo/Mecenas: create or update membership
                    const { data: existing } = await admin
                        .from('user_memberships')
                        .select('id')
                        .eq('user_id', finalUserId)
                        .eq('organization_id', org.id)
                        .single();

                    if (existing) {
                        await admin
                            .from('user_memberships')
                            .update({ status: 'active', tier: tier || 'amigo' })
                            .eq('id', existing.id);
                    } else {
                        await admin.from('user_memberships').insert({
                            user_id: finalUserId,
                            organization_id: org.id,
                            role: 'member',
                            tier: tier || 'amigo',
                            status: 'active',
                        });
                    }
                }

                // Update subscription ID if it's a subscription
                if (stripeSubscriptionId && stripeCustomerId) {
                    const planSlug = tier === 'mecenas' ? 'eh-mecenas-annual'
                        : tier === 'academico' ? 'eh-academico-annual'
                            : 'eh-amigo';
                    const { data: plan } = await admin
                        .from('membership_plans')
                        .select('id')
                        .eq('id', planSlug)
                        .single();

                    await admin.from('subscriptions').upsert({
                        user_id: finalUserId,
                        plan_id: plan?.id || planSlug,
                        stripe_subscription_id: stripeSubscriptionId,
                        stripe_customer_id: stripeCustomerId,
                        status: 'active',
                    }, { onConflict: 'stripe_subscription_id' });
                } else if (stripeSubscriptionId) {
                    console.warn(
                        '[webhook] Skipping subscriptions upsert because customer id is missing for subscription:',
                        stripeSubscriptionId,
                    );
                }

                // Send tier-specific welcome email
                const { data: authUser } = await admin.auth.admin.getUserById(finalUserId);
                if (authUser?.user?.email) {
                    const fullName = authUser.user.user_metadata?.full_name || authUser.user.email;

                    // Generate activation link if it's a shadow user (no last_sign_in_at)
                    let activationSection = '';
                    if (!authUser.user.last_sign_in_at) {
                        const { data: linkData } = await admin.auth.admin.generateLink({
                            type: 'magiclink',
                            email: authUser.user.email,
                            options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/login` }
                        });
                        if (linkData?.properties?.action_link) {
                            activationSection = `
                <div style="margin-top: 30px; padding: 20px; background: #f9f9f9; border: 1px solid #eee;">
                  <p style="margin-bottom: 15px;">Para acceder a sus beneficios y configurar su perfil, active su cuenta:</p>
                  <a href="${linkData.properties.action_link}" style="display: inline-block; background: #c5a059; color: #050a14; padding: 12px 24px; text-decoration: none; font-weight: bold;">ACTIVAR MI PERFIL</a>
                </div>
              `;
                        }
                    }

                    // Build tier-specific email body
                    let emailSubject: string;
                    let emailBody: string;

                    if (tier === 'mecenas') {
                        // Template 7 — Mecenas
                        emailSubject = 'Bienvenido/a como Mecenas de Escuela Hispánica';
                        emailBody = `
              <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
                <h2 style="color: #1a1a2e; border-bottom: 2px solid #c5a059; padding-bottom: 12px;">Bienvenido/a como Mecenas</h2>
                <p>Estimado/a ${fullName},</p>
                <p>Desde Escuela Hispánica queremos expresarle nuestro más sincero agradecimiento por haberse convertido en <strong>Mecenas</strong>. Su generosidad y compromiso son fundamentales para sostener y ampliar nuestra misión cultural y académica.</p>
                <p>Nos pondremos en contacto con usted en los próximos días para agendar una reunión personal con nuestro Director, en el horario y formato que le resulten más cómodos, y nuestro Director se pondrá en contacto con usted.</p>
                <p>Como Mecenas, tendrá acceso privilegiado a actividades exclusivas y a una comunidad de académicos e investigadores comprometidos con la cultura y la reflexión. Su contribución se hará visible también en nuestras memorias anuales, reconociendo su apoyo a esta misión.</p>
                <p>Le agradecemos profundamente su confianza y quedamos a su disposición para cualquier iniciativa que quiera explorar junto a la Escuela.</p>
                ${activationSection}
                <p style="margin-top: 30px;"><strong>Secretaría</strong><br>Escuela Hispánica</p>
              </div>`;
                    } else if (tier === 'academico') {
                        // Template 6 — Académico IV (Bienvenida tras pago)
                        emailSubject = 'Bienvenido/a como Miembro Académico de Escuela Hispánica';
                        emailBody = `
              <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
                <h2 style="color: #1a1a2e; border-bottom: 2px solid #c5a059; padding-bottom: 12px;">Bienvenido/a, Miembro Académico</h2>
                <p>Estimado/a ${fullName},</p>
                <p>Es un placer darle la bienvenida oficial como <strong>Miembro Académico</strong> de Escuela Hispánica. Su suscripción ha sido procesada correctamente y su membresía está ahora activa.</p>
                <p>A partir de este momento, podrá participar en seminarios exclusivos, publicar en nuestras colecciones académicas y colaborar con investigadores de diversas disciplinas dentro de nuestra comunidad.</p>
                <p>Recibirá periódicamente información sobre las próximas actividades, convocatorias y oportunidades de colaboración reservadas a nuestros miembros.</p>
                <p>Le invitamos a explorar los recursos disponibles y a conectar con otros miembros a través de nuestros canales.</p>
                ${activationSection}
                <p style="margin-top: 30px;"><strong>Secretaría</strong><br>Escuela Hispánica</p>
              </div>`;
                    } else {
                        // Template 2 — Amigo
                        emailSubject = 'Bienvenido/a como Amigo/a de Escuela Hispánica';
                        emailBody = `
              <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
                <h2 style="color: #1a1a2e; border-bottom: 2px solid #c5a059; padding-bottom: 12px;">Bienvenido/a, Amigo/a</h2>
                <p>Estimado/a ${fullName},</p>
                <p>Queremos agradecerle sinceramente su apoyo como <strong>Amigo/a</strong> de Escuela Hispánica. Su contribución nos ayuda a seguir impulsando el pensamiento, la cultura y el diálogo en el ámbito hispánico.</p>
                <p>Como Amigo/a, tendrá acceso a nuestras comunicaciones periódicas, invitaciones a eventos abiertos y la satisfacción de formar parte de una comunidad comprometida con la reflexión y el conocimiento.</p>
                <p>Le mantendremos informado/a sobre nuestras actividades, publicaciones y novedades. Si en algún momento desea ampliar su participación, estaremos encantados de acompañarle.</p>
                ${activationSection}
                <p style="margin-top: 30px;"><strong>Secretaría</strong><br>Escuela Hispánica</p>
              </div>`;
                    }

                    await sendEmailWithLog('welcome', {
                        to: authUser.user.email,
                        subject: emailSubject,
                        html: emailBody,
                    });

                    // Send separate payment receipt (transaccional)
                    if (session.amount_total && session.amount_total > 0) {
                        const description = tier === 'amigo'
                            ? 'Contribución como Amigo de la Escuela Hispánica'
                            : tier === 'academico'
                                ? 'Membresía: Miembro Académico'
                                : tier === 'mecenas'
                                    ? 'Membresía: Mecenas'
                                    : 'Contribución General';

                        const receiptHtml = getPaymentReceiptTemplate({
                            fullName,
                            amount: session.amount_total,
                            currency: session.currency || 'eur',
                            date: new Date().toLocaleDateString('es-ES'),
                            reference: paymentReference,
                            description
                        });

                        await sendEmailWithLog('payment receipt', {
                            to: authUser.user.email,
                            subject: 'Recibo de Pago de Escuela Hispánica',
                            html: receiptHtml
                        });
                    }
                }

                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                const metadata = subscription.metadata || {};

                // Resolve userId from metadata, or fall back to our subscriptions table
                let userId = metadata.userId;
                if (!userId) {
                    const { data: sub } = await admin
                        .from('subscriptions')
                        .select('user_id')
                        .eq('stripe_subscription_id', subscription.id)
                        .single();
                    userId = sub?.user_id;
                }

                if (userId) {
                    await admin
                        .from('user_memberships')
                        .update({ status: 'inactive' })
                        .eq('user_id', userId)
                        .eq('status', 'active');
                }

                // Always mark the subscription row as canceled
                await admin
                    .from('subscriptions')
                    .update({ status: 'canceled' })
                    .eq('stripe_subscription_id', subscription.id);

                break;
            }

            case 'invoice.payment_succeeded': {
                const invoice = event.data.object as Stripe.Invoice;
                const subRef = invoice.parent?.subscription_details?.subscription;
                const subscriptionId =
                    typeof subRef === 'string' ? subRef : subRef?.id ?? null;

                // Only record recurring payments (billing_reason === 'subscription_cycle')
                // The initial payment is already captured in checkout.session.completed
                if (subscriptionId && invoice.billing_reason === 'subscription_cycle') {
                    const { data: sub } = await admin
                        .from('subscriptions')
                        .select('user_id')
                        .eq('stripe_subscription_id', subscriptionId)
                        .single();

                    await admin.from('payment_history').insert({
                        user_id: sub?.user_id || null,
                        amount_cents: invoice.amount_paid || 0,
                        currency: invoice.currency || 'eur',
                        stripe_payment_intent_id: invoice.id,
                        status: 'completed',
                    });

                    // Send recurring payment receipt if user exists
                    if (invoice.amount_paid > 0 && sub?.user_id) {
                        const { data: authUser } = await admin.auth.admin.getUserById(sub.user_id);

                        if (authUser?.user?.email) {
                            const fullName = authUser.user.user_metadata?.full_name || authUser.user.email;
                            const receiptHtml = getPaymentReceiptTemplate({
                                fullName,
                                amount: invoice.amount_paid,
                                currency: invoice.currency || 'eur',
                                date: new Date(invoice.created * 1000).toLocaleDateString('es-ES'),
                                reference: invoice.id,
                                description: 'Renovación de Membresía / Suscripción'
                            });

                            await sendEmailWithLog('recurring payment receipt', {
                                to: authUser.user.email,
                                subject: 'Recibo de Pago - Renovación de Suscripción',
                                html: receiptHtml
                            });
                        }
                    }
                }

                break;
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice;
                const subRef = invoice.parent?.subscription_details?.subscription;
                const subscriptionId =
                    typeof subRef === 'string' ? subRef : subRef?.id ?? null;

                if (subscriptionId) {
                    await admin
                        .from('subscriptions')
                        .update({ status: 'past_due' })
                        .eq('stripe_subscription_id', subscriptionId);

                    const { data: sub } = await admin
                        .from('subscriptions')
                        .select('user_id')
                        .eq('stripe_subscription_id', subscriptionId)
                        .single();

                    if (sub?.user_id) {
                        const { data: authUser } = await admin.auth.admin.getUserById(sub.user_id);
                        if (authUser?.user?.email) {
                            const fullName = authUser.user.user_metadata?.full_name || authUser.user.email;
                            const failedHtml = getPaymentFailedTemplate({
                                fullName,
                                description: 'Renovación de Membresía / Suscripción'
                            });

                            await sendEmailWithLog('failed payment', {
                                to: authUser.user.email,
                                subject: 'Aviso Importante: Problema con el pago de su suscripción',
                                html: failedHtml
                            });
                        }
                    }
                }

                break;
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('[webhook] Processing error:', error);
        return NextResponse.json(
            { error: 'Processing error' },
            { status: 500 },
        );
    }
}
