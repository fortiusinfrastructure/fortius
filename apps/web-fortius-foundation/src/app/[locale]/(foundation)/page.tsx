import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { FoundationHomeFeatureSection } from "@/components/foundation/FoundationHomeFeatureSection";
import { TransatlanticBanner } from "@/components/foundation/TransatlanticBanner";
import { NewsletterCTA } from "@/components/foundation/NewsletterCTA";
import { InitiativesMarquee } from "@/components/foundation/InitiativesMarquee";
import { BlogPreview } from "@/components/foundation/BlogPreview";
import { AyudasSneak } from "@/components/foundation/AyudasSneak";
import { Bracketed } from "@/components/system/Bracketed";
import { PROJECTS } from "@/content/projects";
import {
  estimateReadTime,
  formatShortDate,
  getArticlePreview,
  getFeaturedArticles,
} from "@/lib/articles";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("meta-title"),
    description: t("meta-desc"),
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Fortius Fundación",
  description:
    "Fundación dedicada a fortalecer causas, liderazgos e instituciones con vocación de servicio e impacto duradero.",
  url: "https://fundacionfortius.org",
  foundingDate: "2023",
};

export default async function FoundationHome({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const articles = getFeaturedArticles(2);
  const projects = [
    ...PROJECTS.filter((project) => project.stage === "incubacion").slice(0, 1),
    ...PROJECTS.filter((project) => project.stage === "exito").slice(0, 2),
  ];
  const blogItems = articles.map((article) => ({
    label: t("blog-item-label"),
    title: article.title,
    description: getArticlePreview(article.excerpt, 170),
    href: `/blog/${article.slug}`,
    meta: `${formatShortDate(article.published_at)} · ${estimateReadTime(article.content)} · ${article.author ?? "Fundación Fortius"}`,
  }));
  const projectItems = projects.map((project) => ({
    label: project.stage === "incubacion" ? t("incubadora-item-incubacion") : t("incubadora-item-exito"),
    title: project.name,
    description: project.summary,
    href: `/incubadora#${project.slug}`,
    meta: project.title,
  }));
  const aidItems = [
    {
      label: t("ayudas-item-donantes-label"),
      title: t("ayudas-item-donantes-title"),
      description: t("ayudas-item-donantes-desc"),
      href: "/ayudas#donantes",
    },
    {
      label: t("ayudas-item-beneficiarios-label"),
      title: t("ayudas-item-beneficiarios-title"),
      description: t("ayudas-item-beneficiarios-desc"),
      href: "/ayudas#beneficiarios",
    },
    {
      label: t("ayudas-item-como-label"),
      title: t("ayudas-item-como-title"),
      description: t("ayudas-item-como-desc"),
      href: "/ayudas",
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="main-content" className="pt-[var(--nav-height)]">
        <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-20 md:py-28">
          <div className="border-b border-[var(--border-subtle)] pb-16">
            <div className="max-w-4xl">
              <Bracketed variant="hero">Fortius Foundation</Bracketed>
              <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,6.5vw,5.6rem)] font-light leading-[1.02] tracking-tight text-[var(--text-primary)]">
                {locale === "en" ? "We serve those who " : "Servimos a quienes "}
                <span className="italic text-[var(--color-accent-300)]">
                  {locale === "en" ? "have chosen to serve." : "han elegido servir."}
                </span>
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
                {t("hero-p")}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href="/donaciones" className="inline-flex items-center gap-2 bg-[var(--color-accent-500)] px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white">
                  {t("hero-cta-donate")}
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <FoundationHomeFeatureSection
          kicker={t("ayudas-kicker")}
          title={t("ayudas-title")}
          linkLabel={t("ayudas-link")}
          linkHref="/ayudas"
          feature={{
            label: t("ayudas-feature-label"),
            title: t("ayudas-feature-title"),
            description: t("ayudas-feature-desc"),
            href: "/ayudas",
            ctaLabel: t("ayudas-feature-cta"),
          }}
          items={aidItems}
        />

        <FoundationHomeFeatureSection
          kicker={t("nosotros-kicker")}
          title={t("nosotros-title")}
          linkLabel={t("nosotros-link")}
          linkHref="/nosotros"
          feature={{
            label: t("nosotros-feature-label"),
            title: t("nosotros-feature-title"),
            description: t("nosotros-feature-desc"),
            href: "/nosotros",
            ctaLabel: t("nosotros-feature-cta"),
          }}
          items={blogItems}
        />

        <FoundationHomeFeatureSection
          kicker={t("incubadora-kicker")}
          title={t("incubadora-title")}
          linkLabel={t("incubadora-link")}
          linkHref="/incubadora"
          feature={{
            label: t("incubadora-feature-label"),
            title: t("incubadora-feature-title"),
            description: t("incubadora-feature-desc"),
            href: "/incubadora",
            ctaLabel: t("incubadora-feature-cta"),
          }}
          items={projectItems}
        />

        <BlogPreview />

        <AyudasSneak />

        <TransatlanticBanner locale={locale} />

        <InitiativesMarquee />

        <NewsletterCTA />
      </main>
    </>
  );
}
