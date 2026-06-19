import type { Metadata } from "next";
import Link from "next/link";
import { Bracketed } from "@/components/system/Bracketed";
import { FOUNDATION_CONTACT } from "@/content/site";

export const metadata: Metadata = {
  title: "Área Privada — Fundación Fortius",
  description: "Acceso privado para colaboradores, donantes y beneficiarios de Fundación Fortius.",
};

const ACCESS_AREAS = [
  "Donantes y patronos con seguimiento de iniciativas y documentación compartida.",
  "Beneficiarios y proyectos con acceso a materiales, coordinación y acompañamiento.",
];

export default function AreaPrivadaPage() {
  return (
    <main id="main-content" className="pt-[var(--nav-height)]">
      <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-32">
        <Bracketed variant="tag">Área Privada</Bracketed>
        <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
          Espacio reservado para colaboradores, donantes y beneficiarios acreditados.
        </h1>
        <p className="mt-8 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
          Si ya formas parte del ecosistema Fortius o necesitas acceso, escríbenos y te indicaremos el siguiente paso.
        </p>

        <div className="mt-16 grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-2">
          {ACCESS_AREAS.map((item, index) => (
            <article key={item} className="bg-[var(--surface-primary)] p-8">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                Acceso {index + 1}
              </p>
              <p className="mt-4 font-display text-[1.6rem] font-light leading-[1.15] text-[var(--text-primary)]">
                {item}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex gap-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center bg-[var(--color-accent-500)] px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/registro"
            className="inline-flex items-center justify-center border border-[var(--border-strong)] bg-transparent px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
          >
            Crear cuenta
          </Link>
        </div>
      </section>
    </main>
  );
}