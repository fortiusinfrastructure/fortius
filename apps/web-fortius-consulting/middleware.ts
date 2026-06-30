import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const PROTECTED = ["/area-privada", "/herramientas"];
const AUTH_ONLY = ["/login"];

/** Strip the /en locale prefix to get the bare path for auth checks. */
function barePath(pathname: string): string {
    for (const locale of routing.locales) {
        if (pathname === `/${locale}`) return "/";
        if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
    }
    return pathname;
}

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Pass through static assets and API routes unmodified
    if (
        pathname.startsWith("/api/") ||
        pathname.startsWith("/_next/") ||
        pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$/)
    ) {
        return NextResponse.next();
    }

    // Run i18n routing — this sets locale cookie and handles prefix redirects
    const intlResponse = intlMiddleware(request);

    const bare = barePath(pathname);
    const isProtected = PROTECTED.some((p) => bare.startsWith(p));
    const isAuthOnly = AUTH_ONLY.some((p) => bare.startsWith(p));

    // Fast path: no auth needed
    if (!isProtected && !isAuthOnly) return intlResponse;

    // Auth check needed — build response inheriting intl cookies
    const response = intlResponse ?? NextResponse.next({ request });

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

    const { data: { user } } = await supabase.auth.getUser();

    if (isProtected && !user) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/login";
        loginUrl.searchParams.set("redirect", bare);
        return NextResponse.redirect(loginUrl);
    }

    if (isAuthOnly && user) {
        const dashUrl = request.nextUrl.clone();
        const redirect = request.nextUrl.searchParams.get("redirect");
        dashUrl.pathname =
            redirect?.startsWith("/") && !redirect.startsWith("//")
                ? redirect
                : "/area-privada";
        dashUrl.search = "";
        return NextResponse.redirect(dashUrl);
    }

    return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
