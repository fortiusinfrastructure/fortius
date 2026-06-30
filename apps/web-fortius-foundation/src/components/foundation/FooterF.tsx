import Link from "next/link";
import { Linkedin } from "lucide-react";
import { ConsultingLockup } from "./ConsultingLockup";
import { FoundationLockup } from "./FoundationLockup";
import {
  FOUNDATION_SOCIAL_LINKS,
  LEGAL_LINKS,
} from "@/content/site";

function XIcon({ size = 15, className }: { size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size} className={className ?? "fill-current"}>
      <path d="M18.901 2H21.99l-6.75 7.715L23 22h-6.078l-4.76-6.793L6.22 22H3.13l7.22-8.252L1 2h6.232l4.303 6.164L18.901 2Zm-1.066 18.132h1.712L6.304 3.772H4.467l13.368 16.36Z" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  LinkedIn: Linkedin,
  X: XIcon,
} as const;

export function FooterF() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-[var(--border-subtle)] bg-[var(--color-neutral-1000)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-12">
        <div className="flex flex-col items-center justify-between gap-10 border-b border-[var(--border-subtle)] pb-10 md:flex-row">
          <div>
            <h4 className="mb-5 text-center text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] md:text-left">
              Síguenos
            </h4>
            <div className="flex items-center gap-3">
              {FOUNDATION_SOCIAL_LINKS.map(({ label, href }) => {
                const Icon = SOCIAL_ICONS[label];
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border-default)] text-[var(--text-tertiary)] transition-all duration-150 hover:border-[var(--border-strong)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <Icon size={15} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-8 md:gap-12">
            <Link href="/" aria-label="Fortius Foundation">
              <FoundationLockup tone="compact" />
            </Link>
            <span className="h-8 w-px bg-[var(--border-default)]" />
            <a
              href="https://fortiusconsulting.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fortius Consulting"
            >
              <ConsultingLockup tone="compact" />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1 pt-8">
          {LEGAL_LINKS.map((link, index) => (
            <span key={link.href} className="flex items-center gap-1">
              <Link
                href={link.href}
                className="px-2 text-[0.65rem] text-[var(--text-tertiary)] transition-colors duration-150 hover:text-[var(--text-secondary)]"
              >
                [ {link.label} ]
              </Link>
              {index < LEGAL_LINKS.length - 1 && (
                <span className="text-[0.65rem] text-[var(--text-tertiary)]">|</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}