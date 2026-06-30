"use client";

import { Linkedin, Instagram } from "lucide-react";
import { useTranslations } from "next-intl";
import { BrandLockup } from "@/components/system/BrandLockup";

function XIcon({ size = 15, className }: { size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} className={className ?? "fill-current"}>
      <path d="M18.901 2H21.99l-6.75 7.715L23 22h-6.078l-4.76-6.793L6.22 22H3.13l7.22-8.252L1 2h6.232l4.303 6.164L18.901 2Zm-1.066 18.132h1.712L6.304 3.772H4.467l13.368 16.36Z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://linkedin.com/company/fortiusconsulting", label: "LinkedIn" },
  { icon: XIcon, href: "https://x.com/Fortius_C", label: "X" },
  { icon: Instagram, href: "https://www.instagram.com/fortius_consulting/", label: "Instagram" },
];

export function Footer() {
  const t = useTranslations("footer");
  return (
    <footer role="contentinfo" className="border-t border-[var(--border-subtle)] bg-[var(--color-neutral-1000)]">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-12">
        {/* Main footer grid: Social + Logos */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 pb-10 border-b border-[var(--border-subtle)]">
          {/* Social links */}
          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-5 text-center md:text-left">
              {t("follow")}
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
              <BrandLockup variant="consulting" tone="compact" />
            </a>
            <span className="w-px h-8 bg-[var(--border-default)]" />
            <a href="https://fortiusfoundation.org" target="_blank" rel="noopener noreferrer" aria-label="Fortius Foundation">
              <BrandLockup variant="foundation" tone="compact" />
            </a>
          </div>
        </div>

        {/* Legal links */}
        <div className="pt-8 flex items-center justify-center gap-1 flex-wrap">
          {[
            { label: t("legal-notice"), href: "/aviso-legal" },
            { label: t("privacy"), href: "/politica-de-privacidad" },
            { label: t("cookies"), href: "/cookies" },
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
