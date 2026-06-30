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
            className="flex items-center gap-0 text-[0.7rem] font-medium uppercase tracking-[0.12em] disabled:opacity-40 transition-opacity"
        >
            <span
                className={
                    locale === "es"
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                }
            >
                ES
            </span>
            <span className="mx-1.5 text-[var(--border-strong)]">/</span>
            <span
                className={
                    locale === "en"
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                }
            >
                EN
            </span>
        </button>
    );
}
