import { NextResponse, type NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@fortius/database';
import { sendEmail } from '@/lib/email';
import type Stripe from 'stripe';

/**
 * POST /api/webhooks/stripe
 *
 * Handles Stripe webhook events for membership lifecycle.
 * Uses stripe_events table for idempotency.
 *
 * Events handled:
 * - checkout.session.completed → Activate membership
 * - customer.subscription.deleted → Deactivate membership
 * - invoice.payment_failed → Mark as past_due
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

                let finalUserId = metadataUserId;

                // Handle anonymous user
                if (!finalUserId || finalUserId === 'anonymous') {
                    const email = session.customer_details?.email?.toLowerCase();
                    if (!email) break;

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
                        if (createError) throw createError;
                        finalUserId = newUser.user.id;
                    }
                }

                if (!finalUserId) break;

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
                if (session.subscription) {
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
                        stripe_subscription_id: session.subscription as string,
                        stripe_customer_id: session.customer as string,
                        status: 'active',
                    }, { onConflict: 'user_id' });
                }

                // Record payment
                await admin.from('payment_history').insert({
                    user_id: finalUserId,
                    amount_cents: session.amount_total || 0,
                    currency: session.currency || 'eur',
                    stripe_payment_intent_id: session.payment_intent as string || session.id,
                    status: 'completed',
                });

                // Send welcome email
                const { data: authUser } = await admin.auth.admin.getUserById(finalUserId);
                if (authUser?.user?.email) {
                    const fullName = authUser.user.user_metadata?.full_name || authUser.user.email;
                    const tierName = tier === 'mecenas' ? 'Mecenas' : tier === 'academico' ? 'Miembro Académico' : 'Amigo';

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

                    await sendEmail({
                        to: authUser.user.email,
                        subject: `¡Bienvenido/a, ${tierName}! — Escuela Hispánica`,
                        html: `
              <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
                <h2 style="color: #1a1a2e; border-bottom: 2px solid #c5a059; padding-bottom: 12px;">¡Bienvenido/a a la Escuela Hispánica!</h2>
                <p>Estimado/a ${fullName},</p>
                <p>Su membresía como <strong>${tierName}</strong> se ha activado correctamente.</p>
                <p>Ahora forma parte de una comunidad dedicada a preservar y difundir el pensamiento hispánico.</p>
                ${activationSection}
                <p style="margin-top: 30px; color: #666;">Atentamente,<br>Secretaría — Escuela Hispánica</p>
              </div>
            `,
                    });
                }

                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                const metadata = subscription.metadata || {};

                // Deactivate membership
                if (metadata.userId) {
                    await admin
                        .from('user_memberships')
                        .update({ status: 'inactive' })
                        .eq('user_id', metadata.userId)
                        .eq('status', 'active');

                    await admin
                        .from('subscriptions')
                        .update({ status: 'cancelled' })
                        .eq('stripe_subscription_id', subscription.id);
                }

                break;
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice;
                // In Stripe v20, subscription is accessed differently
                const invoiceAny = invoice as any;
                const subscriptionId =
                    typeof invoiceAny.subscription === 'string'
                        ? invoiceAny.subscription
                        : invoiceAny.subscription?.id;

                if (subscriptionId) {
                    await admin
                        .from('subscriptions')
                        .update({ status: 'past_due' })
                        .eq('stripe_subscription_id', subscriptionId);
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
