import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Routes that require authentication
const PROTECTED_ROUTES = ['/miembros'];

// Routes that should redirect to home if already authenticated
const AUTH_ROUTES = ['/auth/login', '/auth/register'];

// Routes that bypass both i18n and auth (API, callbacks, static)
const PASSTHROUGH_ROUTES = ['/api/', '/auth/callback', '/_next/', '/favicon.ico'];

const intlMiddleware = createIntlMiddleware(routing);

function isPassthrough(pathname: string) {
  return PASSTHROUGH_ROUTES.some((route) => pathname.startsWith(route));
}

function stripLocale(pathname: string): string {
  const localePattern = /^\/(es|en|pt)(\/|$)/;
  return pathname.replace(localePattern, '/');
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip passthrough routes entirely
  if (isPassthrough(pathname)) {
    return NextResponse.next();
  }

  // 2. Run i18n middleware first to handle locale routing
  const intlResponse = intlMiddleware(request);

  // 3. Refresh Supabase session (attach/refresh cookies on every request)
  const supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          // Forward cookie changes to both the request and the response
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          cookiesToSet.forEach(({ name, value, options }) => {
            intlResponse.cookies.set(name, value, options as any);
          });
        },
      },
    },
  );

  // IMPORTANT: Do not remove this line — it refreshes the session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const normalizedPath = stripLocale(pathname);

  // 4. Redirect unauthenticated users away from protected routes
  const isProtected = PROTECTED_ROUTES.some((route) =>
    normalizedPath.startsWith(route),
  );
  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/auth/login';
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 5. Redirect authenticated users away from auth pages
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    normalizedPath.startsWith(route),
  );
  if (isAuthRoute && user) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = '/';
    return NextResponse.redirect(homeUrl);
  }

  return intlResponse;
}

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
