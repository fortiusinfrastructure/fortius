import { Bracketed } from "@/components/system/Bracketed";
import { PROJECTS } from "@/content/projects";

interface InitiativesMarqueeProps {
  kicker?: string;
  title?: string;
  description?: string;
  ariaLabel?: string;
}

export function InitiativesMarquee({
  kicker = "INICIATIVAS Y CASOS DE ÉXITO",
  title = "Iniciativas bajo incubación y proyectos consolidados en el ecosistema Fortius.",
  description = "Convertimos vocación de servicio en proyectos mejor definidos, sostenibles y capaces de dejar legado.",
  ariaLabel,
}: InitiativesMarqueeProps = {}) {
  return (
    <section
      aria-label={ariaLabel ?? kicker}
      className="relative py-20 md:py-24 border-t border-[var(--border-subtle)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <Bracketed variant="kicker">{kicker}</Bracketed>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-[1.1] tracking-tight text-[var(--text-primary)]">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px border border-[var(--border-default)] bg-[var(--border-default)]">
          {PROJECTS.map((project) => (
            <a
              key={project.slug}
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden flex min-h-[122px] items-center justify-center bg-[var(--surface-brand)] p-6 transition-colors hover:bg-[var(--surface-primary)] group"
            >
              <div
                className="absolute inset-0 opacity-50 transition-opacity group-hover:opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse at top right, rgba(134,239,172,0.12) 0%, transparent 48%), linear-gradient(135deg, rgba(11,31,22,0.18) 0%, rgba(11,31,22,0) 65%)",
                }}
              />
              <div className="absolute -right-5 top-1/2 -translate-y-1/2 text-[5rem] font-display italic leading-none text-[var(--color-accent-300)]/10">
                ]
              </div>
              <div className="relative flex items-center gap-2">
                <span className="text-xl font-light text-[var(--color-accent-300)]">[</span>
                <span className="font-display text-xl font-light text-white text-center">
                  {project.title}
                </span>
                <span className="text-xl font-light text-[var(--color-accent-300)]">]</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
