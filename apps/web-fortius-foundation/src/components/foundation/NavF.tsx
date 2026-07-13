"use client";

import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { FoundationLockup } from "./FoundationLockup";
import { useSessionUser, UserMenuF } from "./UserMenuF";

const NAV_HREF_KEYS = [
  { href: "/nosotros", key: "nosotros" },
  { href: "/incubadora", key: "incubadora" },
  { href: "/programas/transatlantic-fellowship", key: "transatlantic" },
  { href: "/ayudas", key: "ayudas" },
  { href: "/blog", key: "blog" },
  { href: "/contacto", key: "contacto" },
] as const;

function isActive(pathname: string, href: string): boolean {
  const bare = pathname.replace(/^\/en/, "") || "/";
  return bare === href || bare.startsWith(`${href}/`);
}

export function NavF() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useSessionUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function switchLocale() {
    const nextLocale = locale === "es" ? "en" : "es";
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-[var(--border-subtle)] bg-[rgba(5,10,20,0.94)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[var(--nav-height)] max-w-[var(--container-max)] items-center justify-between px-[var(--container-px)]">
        <Link href="/" aria-label={t("home-aria")}>
          <FoundationLockup />
        </Link>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_HREF_KEYS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors"
              style={{
                color: isActive(pathname, link.href)
                  ? "var(--text-primary)"
                  : "var(--text-secondary)",
              }}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={switchLocale}
            className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-secondary)]"
            aria-label={`Switch to ${locale === "es" ? "English" : "Español"}`}
          >
            [{t("lang-switch")}]
          </button>
          <Link
            href="/donaciones"
            className="text-[0.7rem] uppercase tracking-[0.15em] text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-secondary)]"
          >
            [{t("donate-cta")}]
          </Link>
          {user ? (
            <UserMenuF user={user} />
          ) : (
            <Link
              href="/area-privada"
              className="px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-white transition-colors"
              style={{ backgroundColor: "var(--color-accent-500)" }}
            >
              {t("private-area")}
            </Link>
          )}
        </div>

        <button
          className="p-2 text-[var(--text-secondary)] lg:hidden"
          aria-label={t("menu-aria")}
          aria-expanded={open}
          aria-controls="foundation-mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <Menu size={22} />
        </button>
      </nav>

      {open && (
        <div
          id="foundation-mobile-menu"
          className="border-t border-[var(--border-subtle)] bg-[rgba(5,10,20,0.98)] lg:hidden"
        >
          <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-1 px-[var(--container-px)] py-4">
            {NAV_HREF_KEYS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2 py-3 text-[0.78rem] font-medium uppercase tracking-[0.14em]"
                style={{
                  color: isActive(pathname, link.href)
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                }}
              >
                {t(link.key)}
              </Link>
            ))}
            <Link
              href="/donaciones"
              className="px-2 py-3 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              [{t("donate-cta")}]
            </Link>
            <button
              onClick={switchLocale}
              className="px-2 py-3 text-left text-[0.78rem] font-medium uppercase tracking-[0.14em] text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-secondary)]"
            >
              [{t("lang-switch")}]
            </button>
            {user ? (
              <div className="mt-3 px-2 py-3">
                <UserMenuF user={user} />
              </div>
            ) : (
              <Link
                href="/area-privada"
                className="mt-3 inline-flex items-center justify-center px-4 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-white"
                style={{ backgroundColor: "var(--color-accent-500)" }}
              >
                {t("private-area")}
              </Link>
            )}
          </div>
        </div>
      )}
    </motion.header>
  );
}
