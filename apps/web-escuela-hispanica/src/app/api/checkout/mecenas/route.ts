import { NextResponse, type NextRequest } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
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
            customerEmail: user?.email,
            metadata: {
                tier: 'mecenas',
                userId: user?.id || 'anonymous',
                orgSlug: 'escuela-hispanica',
            },
            successUrl: `${siteUrl}/colabora/exito?tier=mecenas`,
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
