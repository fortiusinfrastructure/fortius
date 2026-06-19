import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import {
  BENEFICIARY_BENEFITS,
  DONOR_BENEFITS,
  EXPERIENCE_COPY,
  FOUNDATION_CONTACT,
} from "@/content/site";

const PROCESS = [
  "Evaluamos la causa, el proyecto y la estructura del beneficiario.",
  "Diseñamos la ayuda, el seguimiento y los criterios de impacto.",
  "Acompañamos la ejecución con visión de largo plazo y rendición de cuentas.",
];

function AidBox({
  id,
  kicker,
  title,
  benefits,
  ctaHref,
  ctaLabel,
  ctaVariant,
}: {
  id: string;
  kicker: string;
  title: string;
  benefits: string[];
  ctaHref: string;
  ctaLabel: string;
  ctaVariant: "solid" | "outline";
}) {
  return (
    <div className="space-y-4">
      <section
        id={id}
        className="overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-primary)]"
      >
        <div className="border-b border-[var(--border-subtle)] bg-[var(--surface-brand)] px-8 py-7">
          <Bracketed variant="kicker">{kicker}</Bracketed>
          <p className="mt-4 max-w-xl font-display text-[1.95rem] font-light leading-[1.08] text-white">
            {title}
          </p>
        </div>

        <div className="p-8">
          <div className="grid gap-3">
            {benefits.map((item, index) => (
              <article
                key={item}
                className="grid grid-cols-[auto_1fr] gap-4 border border-[var(--border-subtle)] bg-[var(--surface-secondary)] px-4 py-4"
              >
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-300)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.96rem] leading-relaxed text-[var(--text-secondary)]">
                  {item}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Link
        href={ctaHref}
        className={`inline-flex items-center gap-2 px-6 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
          ctaVariant === "solid"
            ? "bg-[var(--color-accent-500)] text-white"
            : "border border-[var(--color-accent-400)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
        }`}
      >
        {ctaLabel}
        <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Ayudas — Fundación Fortius",
  description:
    "Cómo trabaja Fundación Fortius con donantes, beneficiarios y proyectos en crecimiento.",
};

export default function AyudasPage() {
  return (
    <main id="main-content" className="pt-[var(--nav-height)]">
      <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-32">
        <Bracketed variant="tag">Ayudas</Bracketed>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
          Diseñamos ayudas con criterio, seguimiento y vocación de impacto.
        </h1>
        <p className="mt-8 max-w-3xl leading-relaxed text-[var(--text-secondary)]">
          Trabajamos para que la ayuda económica o estratégica llegue mejor, se
          ejecute con más orden y fortalezca de verdad a las organizaciones que
          sirven causas valiosas.
        </p>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <AidBox
            id="donantes"
            kicker="Para donantes"
            title="Ayudamos a donar con más criterio, mejor seguimiento y más claridad institucional."
            benefits={DONOR_BENEFITS}
            ctaHref="/donaciones"
            ctaLabel="Dona"
            ctaVariant="solid"
          />

          <AidBox
            id="beneficiarios"
            kicker="Para beneficiarios"
            title="Acompañamos proyectos y organizaciones que necesitan estructura, foco y capacidad de crecimiento."
            benefits={BENEFICIARY_BENEFITS}
            ctaHref="/contacto"
            ctaLabel="Escríbenos"
            ctaVariant="outline"
          />
        </div>

        <section className="mt-16 border-t border-[var(--border-subtle)] pt-10">
          <Bracketed variant="kicker">Cómo trabajamos</Bracketed>
          <div className="mt-6 grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-3">
            {PROCESS.map((step, index) => (
              <article key={step} className="bg-[var(--surface-primary)] p-6">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                  Paso {index + 1}
                </p>
                <p className="mt-4 text-[0.96rem] leading-relaxed text-[var(--text-secondary)]">
                  {step}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-[var(--border-subtle)] pt-10">
          <Bracketed variant="kicker">Experiencia</Bracketed>
          <div className="mt-6 space-y-4 max-w-3xl">
            {EXPERIENCE_COPY.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-[var(--text-secondary)]">
                {paragraph}
              </p>
            ))}
          </div>

        </section>
      </section>
    </main>
  );
}