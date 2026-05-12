import Link from "next/link";
import { FoundationLockup } from "./FoundationLockup";
import {
  FOUNDATION_CONTACT,
  FOUNDATION_NAV_LINKS,
  LEGAL_LINKS,
  STRATEGIC_PARTNERS,
} from "@/content/site";

export function FooterF() {
  return (
    <footer className="border-t border-[var(--border-subtle)]">
      <div className="bg-[var(--color-neutral-550)]/30">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-12">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
                Socios estratégicos
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
                Trabajamos con aliados que refuerzan nuestra capacidad de servir,
                conectar y sostener iniciativas con impacto.
              </p>
            </div>
          </div>

          <div className="grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-3">
            {STRATEGIC_PARTNERS.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target={partner.href.startsWith("http") ? "_blank" : undefined}
                rel={partner.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="bg-[var(--surface-primary)] p-6 transition-colors hover:bg-[var(--surface-secondary)]"
              >
                <p className="font-display text-2xl font-light text-[var(--text-primary)]">
                  {partner.name}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {partner.copy}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className="border-t border-[var(--border-subtle)]"
        style={{ backgroundColor: "var(--surface-brand)" }}
      >
        <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-10 px-[var(--container-px)] py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="space-y-5">
            <Link href="/" aria-label="Fortius Fundación" className="inline-flex">
              <FoundationLockup />
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
              Fortius Foundation impulsa a quienes entienden el liderazgo como
              servicio y trabajan para dejar un legado institucional, cultural y
              cívico duradero.
            </p>
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              <p>{FOUNDATION_CONTACT.email}</p>
              <p>{FOUNDATION_CONTACT.spain}</p>
              <p>{FOUNDATION_CONTACT.usa}</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
              Navegación
            </p>
            <ul className="space-y-3">
              {FOUNDATION_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.78rem] uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    [{link.label}]
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
              Legal
            </p>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.78rem] uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    [{link.label}]
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
