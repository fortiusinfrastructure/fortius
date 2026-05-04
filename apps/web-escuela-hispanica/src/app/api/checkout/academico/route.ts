import { NextResponse, type NextRequest } from 'next/server';
import {
    verifyAcademicPaymentToken,
    createAcademicCheckoutSession,
} from '@/lib/stripe/academic-payment';

/**
 * POST /api/checkout/academico
 *
 * On-demand Stripe Checkout Session creation for approved academic members.
 * Called by the intermediate payment page when the user clicks "Pay".
 *
 * Body: { membershipId: string, token: string }
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { membershipId, token } = body;

        if (!membershipId || typeof membershipId !== 'string') {
            return NextResponse.json(
                { error: 'membershipId es obligatorio' },
                { status: 400 },
            );
        }
        if (!token || typeof token !== 'string') {
            return NextResponse.json(
                { error: 'token es obligatorio' },
                { status: 400 },
            );
        }

        const decoded = verifyAcademicPaymentToken(token);
        if (!decoded || decoded.membershipId !== membershipId) {
            return NextResponse.json(
                { error: 'Token inválido o expirado' },
                { status: 403 },
            );
        }

        const session = await createAcademicCheckoutSession(membershipId);

        if (!session.url) {
            return NextResponse.json(
                { error: 'No se pudo generar la URL de pago' },
                { status: 500 },
            );
        }

        return NextResponse.json({ url: session.url });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error al crear la sesión de pago';
        console.error('[checkout/academico]', error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
