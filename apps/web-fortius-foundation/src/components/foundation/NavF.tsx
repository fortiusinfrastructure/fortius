"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { FoundationLockup } from "./FoundationLockup";
import { FOUNDATION_NAV_LINKS } from "@/content/site";

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavF() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
        <Link href="/" aria-label="Fortius Foundation — inicio">
          <FoundationLockup />
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          {FOUNDATION_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors"
              style={{
                color: isActive(pathname, link.href)
                  ? "var(--text-primary)"
                  : "var(--text-secondary)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://fortiusconsulting.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.7rem] uppercase tracking-[0.15em] text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-secondary)]"
          >
            [Consulting]
          </a>
          <Link
            href="/area-privada"
            className="px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-white transition-colors"
            style={{ backgroundColor: "var(--color-accent-500)" }}
          >
            Área Privada
          </Link>
        </div>

        <button
          className="p-2 text-[var(--text-secondary)] lg:hidden"
          aria-label="Menú"
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
            {FOUNDATION_NAV_LINKS.map((link) => (
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
                {link.label}
              </Link>
            ))}
            <Link
              href="/area-privada"
              className="mt-3 inline-flex items-center justify-center px-4 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-white"
              style={{ backgroundColor: "var(--color-accent-500)" }}
            >
              Área Privada
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
}
