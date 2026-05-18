import type { Metadata } from "next";
import { ContactForm } from "@/components/foundation/ContactForm";
import { Bracketed } from "@/components/system/Bracketed";
import { FOUNDATION_CONTACT, FOUNDATION_ENTITIES } from "@/content/site";

export const metadata: Metadata = {
  title: "Contacto — Fundación Fortius",
  description: "Canal general de contacto institucional de Fundación Fortius.",
};

export default function ContactoPage() {
  const entities = [FOUNDATION_ENTITIES.spain, FOUNDATION_ENTITIES.usa];

  return (
    <main id="main-content" className="pt-[var(--nav-height)]">
      <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-32">
        <Bracketed variant="tag">Contacto</Bracketed>
        <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
          Escríbenos. <span className="italic text-[var(--color-accent-300)]">Centralizamos aquí las consultas institucionales.</span>
        </h1>
        <p className="mt-8 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
          Atendemos propuestas, colaboraciones, consultas sobre ayudas, donaciones y solicitudes relacionadas con la Fundación y su ecosistema.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,1.05fr)]">
          <ContactForm />

          <div className="space-y-8">
            <div className="border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-8">
              <Bracketed variant="kicker">Canal general</Bracketed>
              <p className="mt-5 font-display text-[1.9rem] font-light text-[var(--text-primary)]">
                {FOUNDATION_CONTACT.email}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                Si no sabes a quién dirigirte, este es el canal correcto. Derivamos cada mensaje al área adecuada.
              </p>
            </div>

            <div className="grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-2">
              {entities.map((entity) => (
                <article key={entity.name} className="bg-[var(--surface-primary)] p-6">
                  <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                    {entity.name}
                  </p>
                  <p className="mt-3 text-[0.78rem] uppercase tracking-[0.16em] text-[var(--color-accent-300)]">
                    {entity.codeLabel} {entity.code}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {entity.address}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}