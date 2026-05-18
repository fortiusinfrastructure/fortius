import { Bracketed } from "@/components/system/Bracketed";
import { FOUNDATION_CONTACT } from "@/content/site";

export function NewsletterCTA() {
  return (
    <section
      aria-labelledby="newsletter-title"
      className="relative overflow-hidden border-t border-[var(--border-subtle)] py-24 md:py-32"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="max-w-3xl">
          <Bracketed variant="kicker">Boletín</Bracketed>
          <h2
            id="newsletter-title"
            className="mt-6 font-display text-[clamp(2rem,4.5vw,3.8rem)] font-light leading-[1.05] tracking-tight text-[var(--text-primary)]"
          >
            Sigue nuestro trabajo. Conoce nuestras oportunidades.
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-[var(--text-secondary)]">
            Lo que pensamos, lo que hacemos. Lo que no encontrarás en ningún otro
            sitio. Una vez al mes.
          </p>

          <p className="mt-8 text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
            Suscripción por correo
          </p>
          <p className="mt-3 font-display text-[1.8rem] font-light text-[var(--text-primary)]">
            {FOUNDATION_CONTACT.email}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${FOUNDATION_CONTACT.email}?subject=Alta%20bolet%C3%ADn%20Fortius%20Foundation`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors"
              style={{ backgroundColor: "var(--color-accent-500)" }}
            >
              Suscribirme
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
