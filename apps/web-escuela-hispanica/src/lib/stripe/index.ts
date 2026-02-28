import Stripe from 'stripe';

// Warning instead of throw during build so Next.js static generation doesn't crash
if (!process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV !== 'production') {
    console.warn('⚠️ STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_dummy_key_for_build', {
    typescript: true,
});

/**
 * Creates a Stripe Checkout Session.
 *
 * @param mode - 'payment' for one-time, 'subscription' for recurring
 * @param priceId - Stripe Price ID (required for subscription mode)
 * @param amount - Amount in cents (only for payment mode with dynamic pricing)
 * @param metadata - Metadata to attach to the session
 * @param successUrl - Redirect URL after successful payment
 * @param cancelUrl - Redirect URL if user cancels
 * @param customerEmail - Pre-fill customer email
 */
export async function createCheckoutSession({
    mode,
    priceId,
    amount,
    metadata,
    successUrl,
    cancelUrl,
    customerEmail,
}: {
    mode: 'payment' | 'subscription';
    priceId?: string;
    amount?: number;
    metadata?: Record<string, string>;
    successUrl: string;
    cancelUrl: string;
    customerEmail?: string;
}) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    if (priceId) {
        // Use a pre-defined Stripe Price
        lineItems.push({ price: priceId, quantity: 1 });
    } else if (amount && mode === 'payment') {
        // Dynamic amount (for Amigo tier with free contribution)
        lineItems.push({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: 'Amigo de la Escuela Hispánica',
                    description: 'Contribución como Amigo de la Escuela Hispánica',
                },
                unit_amount: amount,
            },
            quantity: 1,
        });
    }

    const session = await stripe.checkout.sessions.create({
        mode,
        line_items: lineItems,
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer_email: customerEmail,
        metadata,
        payment_intent_data: mode === 'payment' ? { metadata } : undefined,
        subscription_data: mode === 'subscription' ? { metadata } : undefined,
    });

    return session;
}
