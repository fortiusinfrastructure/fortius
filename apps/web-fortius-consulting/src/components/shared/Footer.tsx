"use client";

import { useState } from "react";
import { Linkedin, Twitter, Instagram, Youtube } from "lucide-react";

const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://linkedin.com/company/fortiusconsulting", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/fortiusconsult", label: "X (Twitter)" },
  { icon: Instagram, href: "https://instagram.com/fortiusconsulting", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@fortiusconsulting", label: "YouTube" },
];

function BracketLogo({ name, sub }: { name: string; sub: string }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-[var(--text-tertiary)] text-base font-light">[</span>
      <div className="flex flex-col items-center leading-none -space-y-0.5">
        <span className="text-[0.85rem] font-display font-bold tracking-[0.1em] text-[var(--text-secondary)] uppercase">
          {name}
        </span>
        <span className="text-[0.42rem] font-body font-medium tracking-[0.2em] text-[var(--text-tertiary)] uppercase">
          {sub}
        </span>
      </div>
      <span className="text-[var(--text-tertiary)] text-base font-light">]</span>
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer role="contentinfo" className="border-t border-[var(--border-subtle)] bg-[var(--color-neutral-1000)]">
      {/* Social + Subscribe bar */}
      <div className="border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-10
                      grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

          {/* Síguenos */}
          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-5">
              Síguenos
            </h4>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-md border border-[var(--border-default)]
                           flex items-center justify-center
                           text-[var(--text-tertiary)] hover:text-[var(--text-primary)]
                           hover:border-[var(--border-strong)] hover:bg-[var(--surface-secondary)]
                           transition-all duration-150"
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Suscríbete */}
          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-5">
              Suscríbete
            </h4>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Introduce tu email"
                required
                className="flex-1 min-w-0 bg-[var(--surface-secondary)] border border-[var(--border-default)]
                         rounded px-4 py-2.5 text-sm text-[var(--text-primary)]
                         placeholder:text-[var(--text-tertiary)]
                         focus:border-[var(--color-accent-500)] focus:outline-none
                         transition-colors duration-150"
              />
              <button
                type="submit"
                className="shrink-0 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-wider
                         border border-[var(--border-strong)] text-[var(--text-secondary)] rounded
                         hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]
                         transition-all duration-150 whitespace-nowrap"
              >
                [ Suscribirse ]
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Dual logos */}
      <div className="border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-10
                      flex items-center justify-center gap-8 md:gap-12">
          <a href="/" aria-label="Fortius Consulting">
            <BracketLogo name="Fortius" sub="consulting" />
          </a>
          <span className="w-px h-8 bg-[var(--border-default)]" />
          <a href="https://fortiusfoundation.org" target="_blank" rel="noopener noreferrer" aria-label="Fortius Foundation">
            <BracketLogo name="Fortius" sub="foundation" />
          </a>
        </div>
      </div>

      {/* Legal links */}
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-5">
        <div className="flex items-center justify-center gap-1 flex-wrap">
          {[
            { label: "Aviso Legal", href: "/legal" },
            { label: "Política de Privacidad", href: "/privacidad" },
            { label: "Política de Cookies", href: "/cookies" },
          ].map((link, i, arr) => (
            <span key={link.label} className="flex items-center gap-1">
              <a
                href={link.href}
                className="text-[0.65rem] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]
                         transition-colors duration-150 px-2"
              >
                [ {link.label} ]
              </a>
              {i < arr.length - 1 && (
                <span className="text-[var(--text-tertiary)] text-[0.65rem]">|</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
