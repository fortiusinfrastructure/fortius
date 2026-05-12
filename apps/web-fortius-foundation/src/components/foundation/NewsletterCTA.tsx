import { Bracketed } from "@/components/system/Bracketed";
import { FOUNDATION_CONTACT } from "@/content/site";

export function NewsletterCTA() {
  return (
    <section
      aria-labelledby="newsletter-title"
      className="relative border-t border-[var(--border-subtle)] py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-10 px-[var(--container-px)] lg:grid-cols-12 lg:items-end">
        <div className="space-y-4 lg:col-span-6">
          <Bracketed variant="kicker">Boletín</Bracketed>
          <h2
            id="newsletter-title"
            className="font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-light leading-[1.08] tracking-tight text-[var(--text-primary)]"
          >
            Recibe nuestras novedades por correo.
          </h2>
          <p className="max-w-xl leading-relaxed text-[var(--text-secondary)]">
            Para suscribirte al boletín de Fortius Foundation, escríbenos a
            nuestro email general. Así podemos darte de alta de forma real y
            responderte si necesitas algo más.
          </p>
        </div>

        <div className="space-y-4 lg:col-span-6 lg:pl-8">
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
            Email de suscripción
          </p>
          <p className="font-display text-[1.8rem] font-light text-[var(--text-primary)]">
            {FOUNDATION_CONTACT.email}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${FOUNDATION_CONTACT.email}?subject=Alta%20bolet%C3%ADn%20Fortius%20Foundation`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors"
              style={{ backgroundColor: "var(--color-accent-500)" }}
            >
              [ Quiero suscribirme ]
            </a>
            <a
              href={`mailto:${FOUNDATION_CONTACT.email}?subject=Consulta%20sobre%20el%20bolet%C3%ADn%20de%20Fortius%20Foundation`}
              className="inline-flex items-center justify-center gap-2 border px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
              style={{ borderColor: "var(--color-accent-400)" }}
            >
              [ Hacer una consulta ]
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
