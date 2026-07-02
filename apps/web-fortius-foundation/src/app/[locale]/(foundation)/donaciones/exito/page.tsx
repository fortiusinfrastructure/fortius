import type { Metadata } from "next";
import Link from "next/link";
import { Bracketed } from "@/components/system/Bracketed";

export const metadata: Metadata = {
  title: "Gracias por tu donación — Fundación Fortius",
  robots: { index: false, follow: false },
};

export default function DonacionExitoPage() {
  return (
    <main id="main-content" className="pt-[var(--nav-height)]">
      <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-32 md:py-44">
        <Bracketed variant="tag">Donación completada</Bracketed>
        <h1 className="mt-6 max-w-2xl font-display text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1.05] tracking-tight text-[var(--text-primary)]">
          Gracias por apoyar{" "}
          <span className="italic" style={{ color: "var(--color-accent-400)" }}>
            Fundación Fortius.
          </span>
        </h1>
        <p className="mt-8 max-w-xl leading-relaxed text-[var(--text-secondary)]">
          Hemos recibido tu donación. En breve recibirás un email de confirmación.
          Tu apoyo nos permite reforzar organizaciones, incubar nuevas iniciativas
          y acompañar proyectos con visión de largo plazo.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/area-privada"
            className="inline-flex items-center justify-center px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors"
            style={{ backgroundColor: "var(--color-accent-500)" }}
          >
            [ Ver mi historial ]
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center border px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
            style={{ borderColor: "var(--border-default)" }}
          >
            [ Volver al inicio ]
          </Link>
        </div>
      </section>
    </main>
  );
}
