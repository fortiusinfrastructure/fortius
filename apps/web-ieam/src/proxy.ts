import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// IEAM MVP: only i18n middleware. Supabase session refresh and protected
// routes will be added once Colabora (Stripe) and the member area exist.
export default createIntlMiddleware(routing);

export const config = {
    matcher: [
        // Match all routes except static files and Next.js internals.
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'
    ]
};
