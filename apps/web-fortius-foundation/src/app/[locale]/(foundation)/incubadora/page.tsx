import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Bracketed } from "@/components/system/Bracketed";
import { getProjectsByStage } from "@/content/projects";

interface Props {
  params: Promise<{ locale: string }>;
}

function ProjectCard({
  project,
  stageLabel,
  accent,
  locale,
}: {
  project: ReturnType<typeof getProjectsByStage>[number];
  stageLabel: string;
  accent: "soft" | "solid";
  locale: string;
}) {
  const isEn = locale === "en";
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
          <div className="relative h-10 w-[180px] mb-6">
            <Image
              src={project.logoSrc}
              alt={project.title}
              fill
              className="object-contain object-left"
              sizes="180px"
            />
          </div>
          <Link
            href={project.siteUrl as "/"}
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
            {isEn ? project.ctaLabel_en : project.ctaLabel}
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div>
          <p className="max-w-3xl leading-relaxed text-[var(--text-secondary)]">
            {isEn ? project.summary_en : project.summary}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {(isEn ? project.details_en : project.details).map((detail) => (
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "incubadora" });
  return {
    title: t("meta-title"),
    description: t("meta-desc"),
  };
}

export default async function IncubadoraPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "incubadora" });
  const incubating = getProjectsByStage("incubacion");
  const success = getProjectsByStage("exito");

  return (
    <main id="main-content" className="pt-[var(--nav-height)]">
      <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-32">
        <Bracketed variant="tag">{t("tag")}</Bracketed>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
          {t("h1")}
        </h1>
        <p className="mt-8 max-w-3xl leading-relaxed text-[var(--text-secondary)]">
          {t("p")}
        </p>

        <div className="mt-16 space-y-16">
          <section>
            <Bracketed variant="kicker">{t("incubacion-kicker")}</Bracketed>
            <div className="mt-6 grid gap-6">
              {incubating.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  stageLabel={t("incubacion-kicker")}
                  accent="soft"
                  locale={locale}
                />
              ))}
            </div>
          </section>

          <section>
            <Bracketed variant="kicker">{t("casos-kicker")}</Bracketed>
            <div className="mt-6 grid gap-6">
              {success.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  stageLabel={t("casos-kicker")}
                  accent="solid"
                  locale={locale}
                />
              ))}
            </div>
          </section>

          <section className="border border-[var(--border-subtle)] bg-[var(--surface-brand)] px-8 py-10">
            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-accent-200)]">
              {t("newsletter-kicker")}
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-[2.2rem] font-light leading-[1.08] text-white">
              {locale === "en"
                ? "Would you like to support our incubated projects?"
                : "¿Quieres apoyar nuestros proyectos en incubación?"}
            </h2>
            <Link
              href="/donaciones"
              className="mt-6 inline-flex items-center gap-2 bg-[var(--color-accent-500)] px-6 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-white"
            >
              {locale === "en" ? "Donate" : "Dona"}
              <ArrowUpRight size={14} />
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}
