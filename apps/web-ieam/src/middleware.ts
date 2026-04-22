import createIntlMiddleware from 'next-intl/middleware';
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Admin routes bypass i18n entirely
    if (pathname.startsWith('/admin')) {
        // Allow login page without auth check
        if (pathname === '/admin/login') {
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

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            const loginUrl = new URL('/admin/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }

        return response;
    }

    // All public routes: apply i18n
    return intlMiddleware(request);
}

export const config = {
    matcher: [
        // Match all paths except Next.js internals and static files
        '/((?!_next|_vercel|.*\\..*).*)',
    ],
};
