"use client";

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
  return (
    <footer role="contentinfo" className="border-t border-[var(--border-subtle)] bg-[var(--color-neutral-1000)]">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-12">
        {/* Main footer grid: Social + Logos */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 pb-10 border-b border-[var(--border-subtle)]">
          {/* Social links */}
          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-5 text-center md:text-left">
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

          {/* Dual logos */}
          <div className="flex items-center gap-8 md:gap-12">
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
        <div className="pt-8 flex items-center justify-center gap-1 flex-wrap">
          {[
            { label: "Aviso Legal", href: "/aviso-legal" },
            { label: "Política de Privacidad", href: "/politica-de-privacidad" },
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
