/**
 * Stripe client and session factory.
 * Pattern ported from web-escuela-hispanica — extended with consulting-specific options.
 */

import Stripe from 'stripe';
import { ensureSubscriptionMetadata } from './checkout-metadata';

if (!process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV !== 'production') {
    console.warn('⚠️ STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_dummy_key_for_build', {
    typescript: true,
});

/**
 * Creates a Stripe Checkout Session.
 * For subscription mode, validates metadata (tier, userId, orgSlug) before calling Stripe.
 *
 * @param mode - 'subscription' (consulting only uses this)
 * @param priceId - Stripe Price ID
 * @param metadata - Validated metadata (use buildSubscriptionMetadata)
 * @param successUrl / cancelUrl - Redirect URLs
 * @param customerEmail - Required for subscription mode
 * @param clientReferenceId - Supabase user.id for reconciliation
 * @param billingAddressCollection / allowPromotionCodes / locale - Consulting extras
 */
export async function createCheckoutSession({
    mode,
    priceId,
    amount,
    productName,
    metadata,
    successUrl,
    cancelUrl,
    customerEmail,
    clientReferenceId,
    billingAddressCollection,
    allowPromotionCodes,
    locale,
}: {
    mode: 'payment' | 'subscription';
    priceId?: string;
    amount?: number;
    productName?: string;
    metadata?: Record<string, string>;
    successUrl: string;
    cancelUrl: string;
    customerEmail?: string;
    clientReferenceId?: string;
    billingAddressCollection?: 'auto' | 'required';
    allowPromotionCodes?: boolean;
    locale?: Stripe.Checkout.SessionCreateParams.Locale;
}) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    if (mode === 'subscription') {
        ensureSubscriptionMetadata(metadata, 'createCheckoutSession');
        // customerEmail is optional: Stripe collects it during checkout
        // when the user is not logged in (pay-first / guest flow).
    }

    if (priceId) {
        lineItems.push({ price: priceId, quantity: 1 });
    } else if (amount && mode === 'payment') {
        lineItems.push({
            price_data: {
                currency: 'eur',
                product_data: { name: productName ?? 'Fortius Consulting' },
                unit_amount: amount,
            },
            quantity: 1,
        });
    }

    if (lineItems.length === 0) {
        throw new Error('No hay line_items válidos para crear la sesión de Stripe.');
    }

    const session = await stripe.checkout.sessions.create({
        mode,
        line_items: lineItems,
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer_email: customerEmail,
        metadata,
        client_reference_id: clientReferenceId,
        billing_address_collection: billingAddressCollection,
        allow_promotion_codes: allowPromotionCodes,
        locale,
        payment_intent_data: mode === 'payment' ? { metadata } : undefined,
        subscription_data: mode === 'subscription' ? { metadata } : undefined,
    });

    return session;
}
