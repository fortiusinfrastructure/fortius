import type { Metadata } from "next";
import { Mail, MapPin, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/foundation/ContactForm";
import { Bracketed } from "@/components/system/Bracketed";
import { FOUNDATION_CONTACT } from "@/content/site";

export const metadata: Metadata = {
  title: "Contacto — Fundación Fortius",
  description: "Canal general de contacto institucional de Fundación Fortius.",
};

export default function ContactoPage() {
  return (
    <main id="main-content" className="pt-[var(--nav-height)]">
      <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-36">
        <Bracketed variant="tag">Contacto</Bracketed>
        <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
          Escríbenos.{" "}
          <span className="italic text-[var(--color-accent-300)]">
            Centralizamos aquí las consultas institucionales.
          </span>
        </h1>
        <p className="mt-8 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
          Atendemos propuestas, colaboraciones, consultas sobre ayudas,
          donaciones y solicitudes relacionadas con la Fundación y su ecosistema.
        </p>

        <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="col-span-1 lg:col-span-5 space-y-8">
            {/* Email */}
            <div className="space-y-2">
              <Bracketed variant="kicker">Canal general</Bracketed>
              <p className="mt-4 flex items-start gap-3 font-display text-xl text-[var(--text-primary)]">
                <Mail
                  size={18}
                  className="mt-1.5 shrink-0 text-[var(--color-accent-500)]"
                  aria-hidden
                />
                {FOUNDATION_CONTACT.email}
              </p>
              <p className="pl-7 text-[0.85rem] leading-relaxed text-[var(--text-secondary)]">
                Si no sabes a quién dirigirte, este es el canal correcto.
                Derivamos cada mensaje al área adecuada.
              </p>
            </div>

            {/* Offices — cities only, no fiscal data */}
            <div className="space-y-2">
              <Bracketed variant="kicker">Oficinas</Bracketed>
              <p className="mt-4 flex items-start gap-3 font-display text-xl text-[var(--text-primary)]">
                <MapPin
                  size={18}
                  className="mt-1.5 shrink-0 text-[var(--color-accent-500)]"
                  aria-hidden
                />
                Madrid · Washington D.C.
              </p>
              <p className="pl-7 text-[0.85rem] leading-relaxed text-[var(--text-secondary)]">
                Presencia en Europa y América. Atendemos proyectos en España,
                Europa, Estados Unidos y Norte de África.
              </p>
            </div>

            {/* Commitment */}
            <div className="space-y-2 border-t border-[var(--border-subtle)] pt-8">
              <Bracketed variant="kicker">Compromiso</Bracketed>
              <p className="mt-4 flex items-start gap-3 text-[0.85rem] leading-relaxed text-[var(--text-secondary)]">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-[var(--color-accent-500)]"
                  aria-hidden
                />
                Todas las conversaciones con la Fundación son confidenciales por
                defecto. Respondemos en un plazo de 48 horas.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}