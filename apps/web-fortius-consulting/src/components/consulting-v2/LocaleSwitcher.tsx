"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export function LocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const other = locale === "es" ? "en" : "es";

    const toggle = () => {
        startTransition(() => {
            router.replace(pathname, { locale: other });
        });
    };

    return (
        <button
            onClick={toggle}
            disabled={isPending}
            aria-label={`Switch to ${other.toUpperCase()}`}
            className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-secondary)] disabled:opacity-40"
        >
            [{other.toUpperCase()}]
        </button>
    );
}
