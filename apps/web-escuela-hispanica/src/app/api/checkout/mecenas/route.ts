import { NextResponse, type NextRequest } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { buildSubscriptionMetadata } from '@/lib/stripe/checkout-metadata';
import { createServerClient } from '@fortius/database';

/**
 * POST /api/checkout/mecenas
 *
 * Creates a Stripe Checkout subscription for the "Mecenas" tier (≥1000€/year).
 * Requires authenticated user.
 */
export async function POST(request: NextRequest) {
    try {
        const supabase = await createServerClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user?.id || !user.email) {
            return NextResponse.json(
                { error: 'Para una suscripción de Mecenas debe iniciar sesión primero.' },
                { status: 401 },
            );
        }

        const priceId = process.env.STRIPE_PRICE_MECENAS_ANNUAL;
        if (!priceId) {
            console.error('[checkout/mecenas] STRIPE_PRICE_MECENAS_ANNUAL not configured');
            return NextResponse.json(
                { error: 'Configuración de pago no disponible' },
                { status: 500 },
            );
        }

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

        const session = await createCheckoutSession({
            mode: 'subscription',
            priceId,
            customerEmail: user.email,
            metadata: buildSubscriptionMetadata({
                tier: 'mecenas',
                userId: user.id,
                orgSlug: 'escuela-hispanica',
            }),
            successUrl: `${siteUrl}/colabora/exito?tier=mecenas&session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${siteUrl}/colabora`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('[checkout/mecenas]', error);
        return NextResponse.json(
            { error: 'Error al crear la sesión de pago' },
            { status: 500 },
        );
    }
}
