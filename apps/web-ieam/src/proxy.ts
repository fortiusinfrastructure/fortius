import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Admin routes that are public (no auth required)
const ADMIN_PUBLIC_ROUTES = ['/admin/login'];

// Routes that bypass both i18n and auth
const PASSTHROUGH_ROUTES = ['/api/', '/auth/callback', '/_next/', '/favicon.ico', '/docs/'];

const intlMiddleware = createIntlMiddleware(routing);

function isPassthrough(pathname: string) {
    return PASSTHROUGH_ROUTES.some((route) => pathname.startsWith(route));
}

export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Admin routes bypass i18n entirely
    if (pathname.startsWith('/admin')) {
        if (ADMIN_PUBLIC_ROUTES.includes(pathname)) {
            return NextResponse.next();
        }

        const response = NextResponse.next({
            request: { headers: request.headers },
        });

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll: () => request.cookies.getAll(),
                    setAll: (cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) => {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            request.cookies.set(name, value);
                            response.cookies.set(name, value, options as Parameters<typeof response.cookies.set>[2]);
                        });
                    },
                },
            }
        );

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            const loginUrl = new URL('/admin/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }

        return response;
    }

    // Skip passthrough routes
    if (isPassthrough(pathname)) {
        return NextResponse.next();
    }

    // Public routes: apply i18n
    return intlMiddleware(request);
}

export const config = {
    matcher: [
        // Match all paths except Next.js internals and static files
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf)$).*)',
    ],
};
