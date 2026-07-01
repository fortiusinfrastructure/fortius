import { ArrowUpRight } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { Bracketed } from "@/components/system/Bracketed";
import { PROJECTS } from "@/content/projects";

export async function InitiativesMarquee() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "marquee" });

  const featuredSlug = "transatlantic-fellowship";
  const mainProjects = PROJECTS.filter((p) => p.slug !== featuredSlug);
  const featuredProject = PROJECTS.find((p) => p.slug === featuredSlug);

  return (
    <section
      aria-label={t("kicker")}
      className="relative py-20 md:py-24 border-t border-[var(--border-subtle)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <Bracketed variant="kicker">{t("kicker")}</Bracketed>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-[1.1] tracking-tight text-[var(--text-primary)]">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--text-secondary)] leading-relaxed">
          {t("description")}
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px border border-[var(--border-default)] bg-[var(--border-default)]">
          {mainProjects.map((project) => (
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

        {featuredProject && (
          <a
            href={featuredProject.siteUrl}
            className="group mt-px flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-[var(--border-default)] bg-[var(--surface-brand)] px-8 py-7 transition-colors hover:bg-[var(--surface-primary)]"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at 90% 50%, rgba(134,239,172,0.10) 0%, transparent 55%)",
              }}
            />
            <div className="relative flex items-center gap-3">
              <span className="text-xl font-light text-[var(--color-accent-300)]">[</span>
              <div>
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-200)]">
                  {t("featured-label")}
                </p>
                <p className="mt-1 font-display text-[1.45rem] font-light text-white">
                  {featuredProject.title}
                </p>
              </div>
              <span className="text-xl font-light text-[var(--color-accent-300)]">]</span>
            </div>
            <span className="relative flex shrink-0 items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text-primary)]">
              {t("details-cta")}
              <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
        )}
      </div>
    </section>
  );
}
