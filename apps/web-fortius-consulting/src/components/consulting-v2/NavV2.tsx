"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Lock } from "lucide-react";
import { BrandLockup } from "@/components/system/BrandLockup";
import { useSessionUser, UserMenu, SignOutButton, USER_MENU_LINKS } from "./UserMenu";

const LINKS = [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Sociedad Civil", href: "/sociedad-civil" },
    { label: "Política", href: "/politica" },
    { label: "Contacto", href: "/contacto" },
];

const FOUNDATION_URL = "https://fundacionfortius.org";

export function NavV2() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const user = useSessionUser();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 32);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <>
            <motion.header
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? "bg-[rgba(5,10,20,0.92)] backdrop-blur-md border-b border-[var(--border-subtle)]"
                        : "bg-transparent"
                }`}
            >
                <nav className="mx-auto flex items-center justify-between h-[var(--nav-height)] max-w-[var(--container-max)] px-[var(--container-px)]">
                    <a href="/" aria-label="Fortius Consulting — inicio">
                        <BrandLockup variant="consulting" />
                    </a>

                    <div className="hidden lg:flex items-center gap-10">
                        {LINKS.map((l) => (
                            <a
                                key={l.label}
                                href={l.href}
                                className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                {l.label}
                            </a>
                        ))}
                        <a
                            href={FOUNDATION_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Fortius Foundation"
                        >
                            <BrandLockup variant="foundation" tone="compact" />
                        </a>
                    </div>

                    <div className="hidden lg:flex items-center gap-3">
                        {user ? (
                            <UserMenu user={user} />
                        ) : (
                            <a
                                href="/area-privada"
                                className="inline-flex items-center gap-2 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.15em] bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-400)] transition-colors"
                            >
                                <Lock size={12} strokeWidth={2} aria-hidden />
                                Área Privada
                            </a>
                        )}
                    </div>

                    <button
                        onClick={() => setMobileOpen(true)}
                        className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        aria-label="Abrir menú"
                        aria-expanded={mobileOpen}
                    >
                        <Menu size={22} />
                    </button>
                </nav>
            </motion.header>

            {/* Mobile overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[60] bg-[var(--surface-primary)]"
                    >
                        <div className="flex items-center justify-between h-[var(--nav-height)] px-[var(--container-px)]">
                            <a href="/" aria-label="Fortius Consulting — inicio" onClick={() => setMobileOpen(false)}>
                                <BrandLockup variant="consulting" />
                            </a>
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                aria-label="Cerrar menú"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <nav className="flex flex-col px-[var(--container-px)] pt-8 gap-1" aria-label="Menú móvil">
                            {LINKS.map((l, i) => (
                                <motion.a
                                    key={l.href}
                                    href={l.href}
                                    onClick={() => setMobileOpen(false)}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * i, duration: 0.28 }}
                                    className="py-4 text-2xl font-display font-light text-[var(--text-primary)] border-b border-[var(--border-subtle)] hover:text-[var(--color-accent-400)] transition-colors"
                                >
                                    {l.label}
                                </motion.a>
                            ))}
                            <motion.a
                                href={FOUNDATION_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.22, duration: 0.28 }}
                                className="py-4 text-lg text-[var(--text-tertiary)]"
                            >
                                [Fundación] →
                            </motion.a>
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.32, duration: 0.28 }}
                                className="mt-8"
                            >
                                {user ? (
                                    <div className="border border-[var(--border-default)] bg-[var(--color-neutral-900)]">
                                        <div className="px-5 py-3 border-b border-[var(--border-subtle)]">
                                            {user.name && (
                                                <p className="text-sm text-[var(--text-primary)] truncate">{user.name}</p>
                                            )}
                                            <p className="text-xs text-[var(--text-tertiary)] truncate">{user.email}</p>
                                        </div>
                                        {USER_MENU_LINKS.map(({ label, href, icon: Icon }) => (
                                            <a
                                                key={href}
                                                href={href}
                                                onClick={() => setMobileOpen(false)}
                                                className="flex items-center gap-3 px-5 py-3 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-b border-[var(--border-subtle)] transition-colors"
                                            >
                                                <Icon size={15} strokeWidth={2} aria-hidden className="text-[var(--text-tertiary)]" />
                                                {label}
                                            </a>
                                        ))}
                                        <SignOutButton
                                            onDone={() => setMobileOpen(false)}
                                            className="flex w-full items-center gap-3 px-5 py-3 text-sm text-[var(--color-accent-400)] transition-colors disabled:opacity-60"
                                        />
                                    </div>
                                ) : (
                                    <a
                                        href="/area-privada"
                                        onClick={() => setMobileOpen(false)}
                                        className="inline-flex items-center gap-2 w-full justify-center px-6 py-3.5 text-sm font-semibold uppercase tracking-wider bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-400)] transition-colors"
                                    >
                                        <Lock size={14} strokeWidth={2} aria-hidden />
                                        Área Privada
                                    </a>
                                )}
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
