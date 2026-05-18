import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { FoundationHomeFeatureSection } from "@/components/foundation/FoundationHomeFeatureSection";
import { NewsletterCTA } from "@/components/foundation/NewsletterCTA";
import { Bracketed } from "@/components/system/Bracketed";
import { PROJECTS } from "@/content/projects";
import {
  estimateReadTime,
  formatShortDate,
  getArticlePreview,
  getFeaturedArticles,
} from "@/lib/articles";

export const metadata: Metadata = {
  title: "Fundación Fortius — Servimos a quienes han elegido servir",
  description:
    "Fortius Foundation fortalece personas, organizaciones e instituciones que entienden el liderazgo como servicio y aspiran a dejar legado.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Fortius Fundación",
  description:
    "Fundación dedicada a fortalecer causas, liderazgos e instituciones con vocación de servicio e impacto duradero.",
  url: "https://fundacionfortius.org",
  foundingDate: "2023",
};

export default function FoundationHome() {
  const articles = getFeaturedArticles(2);
  const projects = [
    ...PROJECTS.filter((project) => project.stage === "incubacion").slice(0, 1),
    ...PROJECTS.filter((project) => project.stage === "exito").slice(0, 2),
  ];
  const blogItems = articles.map((article) => ({
    label: "Blog",
    title: article.title,
    description: getArticlePreview(article.excerpt, 170),
    href: `/blog/${article.slug}`,
    meta: `${formatShortDate(article.published_at)} · ${estimateReadTime(article.content)} · ${article.author ?? "Fundación Fortius"}`,
  }));
  const projectItems = projects.map((project) => ({
    label: project.stage === "incubacion" ? "Bajo incubación" : "Caso de éxito",
    title: project.name,
    description: project.summary,
    href: `/incubadora#${project.slug}`,
    meta: project.title,
  }));
  const aidItems = [
    {
      label: "Para donantes",
      title: "Dar mejor, con más criterio.",
      description:
        "Estructuramos ayudas con visión de largo plazo, seguimiento y estándares profesionales.",
      href: "/ayudas#donantes",
    },
    {
      label: "Para beneficiarios",
      title: "Crecer mejor, con más estructura.",
      description:
        "Acompañamos proyectos que necesitan orden, profesionalización y más capacidad institucional.",
      href: "/ayudas#beneficiarios",
    },
    {
      label: "Cómo trabajamos",
      title: "Evaluación, estructura y rendición de cuentas.",
      description:
        "Buscamos que cada ayuda llegue mejor, se gestione mejor y deje un impacto más duradero.",
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
              <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,6.5vw,5.6rem)] font-light leading-[1.02] tracking-tight text-[var(--text-primary)]">Servimos a quienes han elegido servir.</h1>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">Fortius Foundation fortalece personas, organizaciones e instituciones que necesitan más estructura, mejores aliados y una visión de largo plazo.</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href="/donaciones" className="inline-flex items-center gap-2 bg-[var(--color-accent-500)] px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white">Donar<ArrowUpRight size={14} /></Link>
              </div>
            </div>
          </div>
        </section>

        <FoundationHomeFeatureSection
          kicker="Nosotros & Blog"
          title="Una plataforma para fortalecer causas serias, equipos sólidos e instituciones duraderas."
          linkLabel="Ir a nosotros"
          linkHref="/nosotros"
          feature={{
            label: "Nosotros",
            title: "Fortalecemos a quienes necesitan estructura, aliados y criterio para servir mejor.",
            description:
              "Trabajamos con personas, organizaciones e instituciones que entienden el liderazgo como servicio y quieren construir algo que dure.",
            href: "/nosotros",
            ctaLabel: "Conocer la fundación",
          }}
          items={blogItems}
        />

        <FoundationHomeFeatureSection
          kicker="Incubadora"
          title="Casos de éxito y proyectos bajo incubación dentro del ecosistema Fortius."
          linkLabel="Ver incubadora"
          linkHref="/incubadora"
          feature={{
            label: "Incubadora",
            title: "Incubamos iniciativas con vocación de impacto y reforzamos otras que ya empiezan a dar fruto.",
            description:
              "Acompañamos proyectos antes de que sean institución y también cuando necesitan estructura para consolidarse.",
            href: "/incubadora",
            ctaLabel: "Explorar incubadora",
          }}
          items={projectItems}
        />

        <FoundationHomeFeatureSection
          kicker="Ayudas"
          title="Ayudamos tanto a quienes quieren dar mejor como a quienes necesitan crecer mejor."
          linkLabel="Ver ayudas"
          linkHref="/ayudas"
          feature={{
            label: "Ayudas",
            title: "Diseñamos ayudas con criterio, seguimiento y visión de largo plazo.",
            description:
              "Buscamos que la ayuda llegue a buenos proyectos, se administre mejor y contribuya a construir instituciones más sólidas.",
            href: "/ayudas",
            ctaLabel: "Conocer ayudas",
          }}
          items={aidItems}
        />

        <NewsletterCTA />
      </main>
    </>
  );
}