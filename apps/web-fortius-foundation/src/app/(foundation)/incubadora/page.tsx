import type { Metadata } from "next";
import { Bracketed } from "@/components/system/Bracketed";
import { getProjectsByStage } from "@/content/projects";

export const metadata: Metadata = {
  title: "Incubadora — Fundación Fortius",
  description:
    "Proyectos incubados y casos de éxito del ecosistema Fortius Foundation.",
};

export default function IncubadoraPage() {
  const incubating = getProjectsByStage("incubacion");
  const success = getProjectsByStage("exito");

  return (
    <main id="main-content" className="pt-[var(--nav-height)]">
      <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-32">
        <Bracketed variant="tag">Incubadora</Bracketed>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
          Convertimos vocación de servicio en proyectos mejor definidos,
          sostenibles y capaces de dejar legado.
        </h1>
        <p className="mt-8 max-w-3xl leading-relaxed text-[var(--text-secondary)]">
          Nuestra incubadora identifica iniciativas valiosas, las ayuda a ganar
          estructura y acompaña su desarrollo con criterio institucional,
          visión estratégica y una red de apoyo de alto valor.
        </p>

        <div className="mt-16 space-y-16">
          <section>
            <Bracketed variant="kicker">En incubación</Bracketed>
            <div className="mt-6 grid gap-6">
              {incubating.map((project) => (
                <article
                  key={project.slug}
                  id={project.slug}
                  className="border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-8"
                >
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                    {project.name}
                  </p>
                  <h2 className="mt-3 font-display text-[2rem] font-light text-[var(--text-primary)]">
                    {project.title}
                  </h2>
                  <p className="mt-4 max-w-3xl leading-relaxed text-[var(--text-secondary)]">
                    {project.summary}
                  </p>
                  <div className="mt-6 space-y-3">
                    {project.details.map((detail) => (
                      <p key={detail} className="max-w-4xl text-sm leading-relaxed text-[var(--text-secondary)]">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <a
                    href={project.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 border px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
                    style={{ borderColor: "var(--color-accent-400)" }}
                  >
                    {project.ctaLabel}
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section>
            <Bracketed variant="kicker">Casos de éxito</Bracketed>
            <div className="mt-6 grid gap-6">
              {success.map((project) => (
                <article
                  key={project.slug}
                  id={project.slug}
                  className="border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-8"
                >
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                    {project.name}
                  </p>
                  <h2 className="mt-3 font-display text-[2rem] font-light text-[var(--text-primary)]">
                    {project.title}
                  </h2>
                  <p className="mt-4 max-w-3xl leading-relaxed text-[var(--text-secondary)]">
                    {project.summary}
                  </p>
                  <div className="mt-6 space-y-3">
                    {project.details.map((detail) => (
                      <p key={detail} className="max-w-4xl text-sm leading-relaxed text-[var(--text-secondary)]">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <a
                    href={project.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white"
                    style={{ backgroundColor: "var(--color-accent-500)" }}
                  >
                    {project.ctaLabel}
                  </a>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}