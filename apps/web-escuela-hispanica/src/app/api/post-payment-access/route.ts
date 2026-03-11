import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@fortius/database';
import { stripe } from '@/lib/stripe';

const VALID_TIERS = new Set(['amigo', 'academico', 'mecenas']);
const VALID_LOCALES = new Set(['es', 'en', 'pt']);

function getLocalePrefix(locale: string) {
    return locale === 'es' ? '' : `/${locale}`;
}

function getSuccessPath(locale: string, tier: string, access: 'ready' | 'pending' | 'email') {
    const prefix = getLocalePrefix(locale);
    return `${prefix}/colabora/exito?${new URLSearchParams({ tier, access }).toString()}`;
}

export async function GET(request: NextRequest) {
    const sessionId = request.nextUrl.searchParams.get('session_id');
    const tierParam = request.nextUrl.searchParams.get('tier') || 'amigo';
    const localeParam = request.nextUrl.searchParams.get('locale') || 'es';
    const tier = VALID_TIERS.has(tierParam) ? tierParam : 'amigo';
    const locale = VALID_LOCALES.has(localeParam) ? localeParam : 'es';
    const fallbackUrl = new URL(getSuccessPath(locale, tier, 'email'), request.nextUrl.origin);

    if (!sessionId) {
        return NextResponse.redirect(fallbackUrl);
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== 'paid') {
            return NextResponse.redirect(
                new URL(getSuccessPath(locale, tier, 'pending'), request.nextUrl.origin),
            );
        }

        const email = (session.customer_details?.email || session.customer_email || '').toLowerCase();

        if (!email) {
            return NextResponse.redirect(fallbackUrl);
        }

        const admin = createAdminClient();
        const { error: createError } = await admin.auth.admin.createUser({
            email,
            email_confirm: true,
            user_metadata: { full_name: session.customer_details?.name || email },
        });

        if (createError && !createError.message.toLowerCase().includes('already')) {
            console.error('[post-payment-access] Failed to ensure user exists:', createError.message);
        }

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
        const callbackUrl = new URL('/api/auth/callback', siteUrl);
        callbackUrl.searchParams.set('next', getSuccessPath(locale, tier, 'ready'));

        const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
            type: 'magiclink',
            email,
            options: { redirectTo: callbackUrl.toString() },
        });

        if (linkError || !linkData?.properties?.action_link) {
            console.error('[post-payment-access] Failed to generate magic link:', linkError?.message);
            return NextResponse.redirect(fallbackUrl);
        }

        return NextResponse.redirect(linkData.properties.action_link);
    } catch (error) {
        console.error('[post-payment-access] Unexpected error:', error);
        return NextResponse.redirect(fallbackUrl);
    }
}