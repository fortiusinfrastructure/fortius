import Link from "next/link";
import { FoundationLockup } from "./FoundationLockup";
import {
  FOUNDATION_CONTACT,
  FOUNDATION_ENTITIES,
  LEGAL_LINKS,
} from "@/content/site";

export function FooterF() {
  const entities = [FOUNDATION_ENTITIES.spain, FOUNDATION_ENTITIES.usa];

  return (
    <footer
      role="contentinfo"
      className="border-t border-[var(--border-subtle)] bg-[var(--color-neutral-1000)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-12">
        <div className="flex flex-col items-start justify-between gap-10 border-b border-[var(--border-subtle)] pb-10 md:flex-row md:items-center">
          <div>
            <h4 className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              Contacto
            </h4>
            <p className="font-display text-[1.5rem] font-light text-[var(--text-primary)]">
              {FOUNDATION_CONTACT.email}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contacto"
                className="px-4 py-2 text-[0.7rem] text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
              >
                [ Contacto ]
              </Link>
              <Link
                href="/area-privada"
                className="px-4 py-2 text-[0.7rem] text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
              >
                [ Área Privada ]
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-8 md:gap-12">
            <Link href="/" aria-label="Fortius Foundation">
              <FoundationLockup tone="compact" />
            </Link>
            <span className="h-8 w-px bg-[var(--border-default)]" />
            <a
              href="https://fortiusconsulting.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              [ Fortius Consulting ]
            </a>
          </div>
        </div>

        <div className="grid gap-6 border-b border-[var(--border-subtle)] py-8 md:grid-cols-2">
          {entities.map((entity) => (
            <article
              key={entity.name}
              className="border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-5"
            >
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                {entity.name}
              </p>
              <p className="mt-3 text-[0.78rem] uppercase tracking-[0.16em] text-[var(--color-accent-300)]">
                {entity.codeLabel} {entity.code}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {entity.address}
              </p>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1 pt-8">
          {LEGAL_LINKS.map((link, index) => (
            <span key={link.href} className="flex items-center gap-1">
              <Link
                href={link.href}
                className="px-2 text-[0.65rem] text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-secondary)]"
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