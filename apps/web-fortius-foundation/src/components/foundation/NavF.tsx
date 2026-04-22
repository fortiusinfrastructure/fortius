"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { FoundationLockup } from "./FoundationLockup";

const LINKS = [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Incubadora", href: "/incubadora" },
    { label: "Ayudas", href: "/ayudas" },
    { label: "Blog", href: "/blog" },
];

export function NavF() {
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
                <a href="/" aria-label="Fortius Fundación — inicio">
                    <FoundationLockup />
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
                </div>

                <div className="hidden lg:flex items-center gap-3">
                    <a
                        href="https://fortiusconsulting.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.7rem] uppercase tracking-[0.15em] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                    >
                        [Consulting]
                    </a>
                    <a
                        href="/donaciones"
                        className="px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-white transition-colors"
                        style={{ backgroundColor: "var(--color-accent-500)" }}
                    >
                        Donar
                    </a>
                </div>

                <button className="lg:hidden p-2 text-[var(--text-secondary)]" aria-label="Menú">
                    <Menu size={22} />
                </button>
            </nav>
        </motion.header>
    );
}
