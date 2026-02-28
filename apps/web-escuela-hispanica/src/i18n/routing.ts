import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['es', 'en', 'pt'],

    // Used when no locale matches
    defaultLocale: 'es',

    // Don't prefix the default locale (e.g. /nosotros instead of /es/nosotros)
    localePrefix: 'as-needed'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
