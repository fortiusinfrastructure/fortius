import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InitiativeMark } from "@/components/foundation/InitiativeMark";
import { Bracketed } from "@/components/system/Bracketed";
import { getProjectsByStage } from "@/content/projects";

function ProjectCard({
  project,
  stageLabel,
  accent,
}: {
  project: ReturnType<typeof getProjectsByStage>[number];
  stageLabel: string;
  accent: "soft" | "solid";
}) {
  const articleClassName =
    accent === "solid"
      ? "border-[var(--color-accent-400)] bg-[var(--surface-primary)]"
      : "border-[var(--border-subtle)] bg-[var(--surface-primary)]";

  return (
    <article
      key={project.slug}
      id={project.slug}
      className={`overflow-hidden border p-8 ${articleClassName}`}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(280px,0.75fr)_minmax(0,1fr)] lg:items-start">
        <div>
          <p className="mb-4 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
            {stageLabel}
          </p>
          <InitiativeMark title={project.name} subtitle={project.title} />
          <Link
            href={project.siteUrl}
            target={project.siteUrl.startsWith("http") ? "_blank" : undefined}
            rel={project.siteUrl.startsWith("http") ? "noopener noreferrer" : undefined}
            className="mt-6 inline-flex items-center gap-2 border px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
            style={{
              borderColor:
                accent === "solid"
                  ? "var(--color-accent-400)"
                  : "var(--border-default)",
            }}
          >
            {project.ctaLabel}
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div>
          <p className="max-w-3xl leading-relaxed text-[var(--text-secondary)]">
            {project.summary}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {project.details.map((detail) => (
              <p
                key={detail}
                className="border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-4 text-sm leading-relaxed text-[var(--text-secondary)]"
              >
                {detail}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

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
                <ProjectCard
                  key={project.slug}
                  project={project}
                  stageLabel="Proyecto en incubación"
                  accent="soft"
                />
              ))}
            </div>
          </section>

          <section>
            <Bracketed variant="kicker">Casos de éxito</Bracketed>
            <div className="mt-6 grid gap-6">
              {success.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  stageLabel="Caso de éxito"
                  accent="solid"
                />
              ))}
            </div>
          </section>

          <section className="border border-[var(--border-subtle)] bg-[var(--surface-brand)] px-8 py-10">
            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-accent-200)]">
              Apoyo a proyectos
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-[2.2rem] font-light leading-[1.08] text-white">
              ¿Quieres apoyar nuestros proyectos en incubación?
            </h2>
            <Link
              href="/donaciones"
              className="mt-6 inline-flex items-center gap-2 bg-[var(--color-accent-500)] px-6 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-white"
            >
              Dona
              <ArrowUpRight size={14} />
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}