import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import { PROJECTS } from "@/content/projects";

const STAGE_LABEL: Record<string, string> = {
    incubacion: "Incubadora",
    exito: "Caso de éxito",
};

export function IncubadoraTeaser() {
  return (
    <section
      aria-labelledby="proyectos-title"
      className="relative border-t border-[var(--border-subtle)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div className="space-y-4">
            <Bracketed variant="kicker">Incubadora</Bracketed>
            <h2
              id="proyectos-title"
              className="max-w-3xl font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.05] tracking-tight text-[var(--text-primary)]"
            >
              Incubamos causas, estructuras e instituciones con
              <span
                className="italic"
                style={{ color: "var(--color-accent-300)" }}
              >
                {" "}vocación de legado.
              </span>
            </h2>
            <p className="max-w-2xl leading-relaxed text-[var(--text-secondary)]">
              Acompañamos tanto iniciativas en fase de incubación como proyectos
              que ya son caso de éxito dentro del ecosistema Fortius.
            </p>
          </div>
          <Link
            href="/incubadora"
            className="hidden items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] md:inline-flex"
          >
            Ver incubadora
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-2 xl:grid-cols-4">
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/incubadora#${project.slug}`}
              className="group flex min-h-[280px] flex-col gap-5 bg-[var(--surface-primary)] p-6 transition-colors hover:bg-[var(--surface-secondary)]"
            >
              <span className="inline-flex items-center gap-1 text-[0.6rem] font-medium uppercase tracking-[0.22em]">
                <span style={{ color: "var(--color-accent-400)" }}>[</span>
                <span
                  className="px-1"
                  style={{
                    color:
                      project.stage === "exito"
                        ? "var(--color-accent-300)"
                        : "var(--text-secondary)",
                  }}
                >
                  {STAGE_LABEL[project.stage]}
                </span>
                <span style={{ color: "var(--color-accent-400)" }}>]</span>
              </span>

              <div className="flex-1 space-y-3">
                <h3 className="font-display text-2xl font-light leading-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--color-accent-300)]">
                  {project.name}
                </h3>
                <p className="text-[0.78rem] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                  {project.title}
                </p>
                <p className="text-[0.92rem] leading-relaxed text-[var(--text-secondary)]">
                  {project.summary}
                </p>
              </div>

              <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors group-hover:text-[var(--color-accent-300)]">
                Ver proyecto
                <ArrowUpRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
