"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Método", href: "#metodo" },
  { label: "Servicios", href: "#servicios" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Contacto", href: "#contacto" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
                   focus:px-4 focus:py-2 focus:bg-[var(--color-accent-500)] focus:text-white focus:rounded-md"
      >
        Saltar al contenido
      </a>

      <motion.header
        role="banner"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(5,10,20,0.92)] backdrop-blur-md border-b border-[var(--border-subtle)]"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex items-center justify-between h-[var(--nav-height)]
                     max-w-[var(--container-max)] px-[var(--container-px)]"
        >
          {/* Logo — bracket style matching the brand identity */}
          <a href="/" className="flex items-center gap-1 group" aria-label="Fortius Consulting — Inicio">
            <span className="text-[var(--text-tertiary)] text-lg font-light">[</span>
            <div className="flex flex-col items-center leading-none -space-y-0.5">
              <span className="text-[1.05rem] font-display font-bold tracking-[0.08em] text-[var(--text-primary)]
                             group-hover:text-[var(--color-accent-400)] transition-colors duration-150 uppercase">
                Fortius
              </span>
              <span className="text-[0.5rem] font-body font-medium tracking-[0.25em] text-[var(--text-tertiary)] uppercase">
                consulting
              </span>
            </div>
            <span className="text-[var(--text-tertiary)] text-lg font-light">]</span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-[var(--text-secondary)]
                         hover:text-[var(--text-primary)] transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://fortiusfoundation.org"
              className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-[var(--text-tertiary)]
                       hover:text-[var(--text-secondary)] transition-colors duration-150"
            >
              [Fundación]
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contacto"
              className="px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-wider
                       bg-[var(--color-accent-500)] text-white rounded
                       hover:bg-[var(--color-accent-400)] transition-colors duration-150"
            >
              Háblanos de tu proyecto
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]
                     transition-colors duration-150"
            aria-label="Abrir menú"
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-[var(--surface-primary)]"
          >
            <div className="flex items-center justify-between h-[var(--nav-height)] px-[var(--container-px)]">
              <span className="text-lg font-display font-bold tracking-[0.08em] text-[var(--text-primary)] uppercase">
                [Fortius]
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[var(--text-secondary)]"
                aria-label="Cerrar menú"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col px-[var(--container-px)] pt-8 gap-1" aria-label="Menú móvil">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  className="py-4 text-2xl font-display font-light text-[var(--text-primary)]
                           border-b border-[var(--border-subtle)]
                           hover:text-[var(--color-accent-400)] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="https://fortiusfoundation.org"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="py-4 text-lg text-[var(--text-tertiary)]"
              >
                [Fundación] →
              </motion.a>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="mt-8"
              >
                <a
                  href="#contacto"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-6 py-3.5 text-sm font-semibold uppercase tracking-wider
                           bg-[var(--color-accent-500)] text-white rounded
                           hover:bg-[var(--color-accent-400)] transition-colors duration-150"
                >
                  Háblanos de tu proyecto
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
