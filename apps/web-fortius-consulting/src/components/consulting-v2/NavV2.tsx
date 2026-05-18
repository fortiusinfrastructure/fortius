"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Lock } from "lucide-react";
import { BrandLockup } from "@/components/system/BrandLockup";

const LINKS = [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Sociedad Civil", href: "/sociedad-civil" },
    { label: "Política", href: "/politica" },
    { label: "Contacto", href: "/contacto" },
];

const FOUNDATION_URL = "https://fortiusfoundation.org";

export function NavV2() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 32);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
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
                    <a
                        href="/area-privada"
                        className="inline-flex items-center gap-2 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.15em] bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-400)] transition-colors"
                    >
                        <Lock size={12} strokeWidth={2} aria-hidden />
                        Área clientes
                    </a>
                </div>

                <button className="lg:hidden p-2 text-[var(--text-secondary)]" aria-label="Menú">
                    <Menu size={22} />
                </button>
            </nav>
        </motion.header>
    );
}
