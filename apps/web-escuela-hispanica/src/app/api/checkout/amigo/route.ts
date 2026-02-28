import { NextResponse, type NextRequest } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { createServerClient } from '@fortius/database';

/**
 * POST /api/checkout/amigo
 *
 * Creates a Stripe Checkout session for the "Amigo" tier.
 * Supports both one-time payment (libre) and subscription modes.
 *
 * Body: { amount: number (cents), mode: 'payment' | 'subscription' }
 */
export async function POST(request: NextRequest) {
    try {
        const { amount, mode } = await request.json();

        if (!amount || amount < 100) {
            return NextResponse.json(
                { error: 'El monto mínimo es 1€' },
                { status: 400 },
            );
        }

        if (mode !== 'payment' && mode !== 'subscription') {
            return NextResponse.json(
                { error: 'Modo de pago inválido' },
                { status: 400 },
            );
        }

        const supabase = await createServerClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

        const session = await createCheckoutSession({
            mode,
            amount: mode === 'payment' ? amount : undefined,
            priceId: mode === 'subscription' ? process.env.STRIPE_PRICE_AMIGO_MONTHLY : undefined,
            customerEmail: user?.email,
            metadata: {
                tier: 'amigo',
                userId: user?.id || 'anonymous',
                orgSlug: 'escuela-hispanica',
            },
            successUrl: `${siteUrl}/colabora/exito?tier=amigo`,
            cancelUrl: `${siteUrl}/colabora`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('[checkout/amigo]', error);
        return NextResponse.json(
            { error: 'Error al crear la sesión de pago' },
            { status: 500 },
        );
    }
}
