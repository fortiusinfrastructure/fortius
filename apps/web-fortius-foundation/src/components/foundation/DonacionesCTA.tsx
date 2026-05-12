import Link from "next/link";
import { Bracketed } from "@/components/system/Bracketed";
import { FOUNDATION_CONTACT } from "@/content/site";

export function DonacionesCTA() {
  return (
    <section
      aria-labelledby="donaciones-title"
      className="relative border-t border-[var(--border-subtle)] py-24 md:py-28"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="space-y-4 lg:col-span-5">
            <Bracketed variant="kicker">Donaciones</Bracketed>
            <h2
              id="donaciones-title"
              className="font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-light leading-[1.08] tracking-tight text-[var(--text-primary)]"
            >
              Las mejores causas merecen mejores estrategas.
            </h2>
          </div>
          <div className="space-y-8 lg:col-span-7">
            <p className="max-w-2xl leading-relaxed text-[var(--text-secondary)]">
              Tu ayuda nos permite reforzar organizaciones, incubar nuevas
              iniciativas y acompañar proyectos con visión de largo plazo. No
              financiamos protagonismos. Acompañamos causas serias con vocación
              de impacto.
            </p>
            <div className="grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] sm:grid-cols-3">
              <div className="bg-[var(--surface-primary)] p-5">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                  Donaciones
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  A la Fundación, a proyectos concretos o a campañas específicas.
                </p>
              </div>
              <div className="bg-[var(--surface-primary)] p-5">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                  Seguimiento
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Evaluación, estructura y rendición de cuentas con criterio.
                </p>
              </div>
              <div className="bg-[var(--surface-primary)] p-5">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                  Contacto
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {FOUNDATION_CONTACT.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link
                href="/donaciones"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors"
                style={{ backgroundColor: "var(--color-accent-500)" }}
              >
                [ Ver opciones para donar ]
              </Link>
              <a
                href={`mailto:${FOUNDATION_CONTACT.email}?subject=Quiero%20donar%20a%20Fortius%20Foundation`}
                className="inline-flex items-center justify-center gap-2 border px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
                style={{ borderColor: "var(--color-accent-400)" }}
              >
                [ Hablar con el equipo ]
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
