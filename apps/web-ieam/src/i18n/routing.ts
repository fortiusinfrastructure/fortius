import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // IEAM soporta solo Español (predeterminado) e Inglés.
    locales: ['es', 'en'],

    // Locale por defecto cuando no hay match.
    defaultLocale: 'es',

    // No prefijar la locale por defecto (e.g. /eventos en vez de /es/eventos).
    localePrefix: 'as-needed'
});

// Wrappers alrededor de las APIs de navegación de Next.js.
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
