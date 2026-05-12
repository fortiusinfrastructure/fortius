import type { Metadata } from "next";
import { Bracketed } from "@/components/system/Bracketed";
import { FOUNDATION_CONTACT, STRATEGIC_PARTNERS } from "@/content/site";

export const metadata: Metadata = {
  title: "Donaciones — Fundación Fortius",
  description:
    "Opciones de colaboración y donación para apoyar el ecosistema de Fundación Fortius.",
};

export default function DonacionesPage() {
  return (
    <main id="main-content" className="pt-[var(--nav-height)]">
      <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-32">
        <Bracketed variant="tag">Donaciones</Bracketed>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
          Ayúdanos a fortalecer causas nobles con criterio, estructura y visión de largo plazo.
        </h1>
        <p className="mt-8 max-w-3xl leading-relaxed text-[var(--text-secondary)]">
          Puedes apoyar a la Fundación en general, impulsar proyectos concretos
          del ecosistema o escribirnos para estudiar la mejor forma de canalizar
          tu ayuda desde España o Estados Unidos.
        </p>

        <div className="mt-16 grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-3">
          <article className="bg-[var(--surface-primary)] p-8">
            <Bracketed variant="kicker">Fundación</Bracketed>
            <p className="mt-5 leading-relaxed text-[var(--text-secondary)]">
              Dona al trabajo institucional de Fortius Foundation para sostener
              su labor de incubación, acompañamiento y fortalecimiento de causas.
            </p>
          </article>
          <article className="bg-[var(--surface-primary)] p-8">
            <Bracketed variant="kicker">Proyectos</Bracketed>
            <p className="mt-5 leading-relaxed text-[var(--text-secondary)]">
              Si quieres apoyar un proyecto concreto, te ayudamos a identificar
              la iniciativa adecuada y a estructurar la mejor vía de colaboración.
            </p>
          </article>
          <article className="bg-[var(--surface-primary)] p-8">
            <Bracketed variant="kicker">Internacional</Bracketed>
            <p className="mt-5 leading-relaxed text-[var(--text-secondary)]">
              También trabajamos con aliados estratégicos para facilitar
              donaciones internacionales con confianza y trazabilidad.
            </p>
          </article>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <a
            href={`mailto:${FOUNDATION_CONTACT.email}?subject=Quiero%20donar%20a%20Fortius%20Foundation`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white"
            style={{ backgroundColor: "var(--color-accent-500)" }}
          >
            Escribir a {FOUNDATION_CONTACT.email}
          </a>
          <a
            href={`mailto:${FOUNDATION_CONTACT.email}?subject=Quiero%20apoyar%20un%20proyecto%20de%20Fortius%20Foundation`}
            className="inline-flex items-center justify-center gap-2 border px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
            style={{ borderColor: "var(--color-accent-400)" }}
          >
            Donar a un proyecto
          </a>
        </div>

        <section className="mt-16 border-t border-[var(--border-subtle)] pt-10">
          <Bracketed variant="kicker">Aliados para canalizar ayuda</Bracketed>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {STRATEGIC_PARTNERS.map((partner) => (
              <article key={partner.name} className="border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-6">
                <h2 className="font-display text-[1.8rem] font-light text-[var(--text-primary)]">
                  {partner.name}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {partner.copy}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}