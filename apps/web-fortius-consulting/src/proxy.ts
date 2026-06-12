import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

const PROTECTED = ['/area-privada', '/herramientas'];
const AUTH_ONLY = ['/login']; // redirect to dashboard if already logged in

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Always pass through API routes, callbacks, and static assets
    if (
        pathname.startsWith('/api/') ||
        pathname.startsWith('/_next/') ||
        pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$/)
    ) {
        return NextResponse.next();
    }

    // Build response and attach Supabase session refresh
    const response = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => request.cookies.getAll(),
                setAll: (cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) => {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value),
                    );
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options as Parameters<typeof response.cookies.set>[2]),
                    );
                },
            },
        },
    );

    // IMPORTANT: always call getUser() to refresh the session cookie
    const { data: { user } } = await supabase.auth.getUser();

    const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
    const isAuthOnly = AUTH_ONLY.some((p) => pathname.startsWith(p));

    if (isProtected && !user) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = '/login';
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isAuthOnly && user) {
        const dashUrl = request.nextUrl.clone();
        const redirect = request.nextUrl.searchParams.get('redirect');
        // Only allow internal paths (avoid open redirects)
        dashUrl.pathname = redirect?.startsWith('/') && !redirect.startsWith('//') ? redirect : '/area-privada';
        dashUrl.search = '';
        return NextResponse.redirect(dashUrl);
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
