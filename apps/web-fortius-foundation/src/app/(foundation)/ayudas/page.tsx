import type { Metadata } from "next";
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
          <section id="donantes" className="border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-8">
            <Bracketed variant="kicker">Para donantes</Bracketed>
            <ul className="mt-6 space-y-4">
              {DONOR_BENEFITS.map((item) => (
                <li key={item} className="text-[0.96rem] leading-relaxed text-[var(--text-secondary)]">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="beneficiarios" className="border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-8">
            <Bracketed variant="kicker">Para beneficiarios</Bracketed>
            <ul className="mt-6 space-y-4">
              {BENEFICIARY_BENEFITS.map((item) => (
                <li key={item} className="text-[0.96rem] leading-relaxed text-[var(--text-secondary)]">
                  {item}
                </li>
              ))}
            </ul>
          </section>
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
          <a
            href={`mailto:${FOUNDATION_CONTACT.email}?subject=Consulta%20sobre%20ayudas%20de%20Fortius%20Foundation`}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white"
            style={{ backgroundColor: "var(--color-accent-500)" }}
          >
            Escribir a {FOUNDATION_CONTACT.email}
          </a>
        </section>
      </section>
    </main>
  );
}