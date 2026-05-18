import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { InitiativeMark } from "@/components/foundation/InitiativeMark";
import { Bracketed } from "@/components/system/Bracketed";
import { PROJECTS } from "@/content/projects";
import { FOUNDATION_CONTACT } from "@/content/site";
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
  const article = getFeaturedArticles(1)[0];
  const projects = [
    ...PROJECTS.filter((project) => project.stage === "incubacion").slice(0, 1),
    ...PROJECTS.filter((project) => project.stage === "exito").slice(0, 2),
  ];
  const aids = [
    ["Para donantes", "Estructuramos ayudas con criterio, seguimiento y visión de largo plazo.", "/ayudas#donantes"],
    ["Para beneficiarios", "Acompañamos proyectos que necesitan orden, profesionalización y más capacidad.", "/ayudas#beneficiarios"],
    ["Incubación a medida", "Trabajamos con ideas valiosas antes de que se conviertan en instituciones sólidas.", "/incubadora"],
  ] as const;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="main-content" className="pt-[var(--nav-height)]">
        <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-20 md:py-28">
          <div className="grid gap-12 border-b border-[var(--border-subtle)] pb-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-end">
            <div>
              <Bracketed variant="hero">Fortius Foundation</Bracketed>
              <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,6.5vw,5.6rem)] font-light leading-[1.02] tracking-tight text-[var(--text-primary)]">Servimos a quienes han elegido servir.</h1>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">Fortius Foundation fortalece personas, organizaciones e instituciones que necesitan más estructura, mejores aliados y una visión de largo plazo.</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href="/nosotros" className="inline-flex items-center gap-2 bg-[var(--color-accent-500)] px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white">Conocer la fundación<ArrowUpRight size={14} /></Link>
                <Link href="/contacto" className="inline-flex items-center gap-2 border border-[var(--border-subtle)] px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]">Contacto<ArrowUpRight size={14} /></Link>
              </div>
            </div>

            <div className="grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)]">
              <article className="bg-[var(--surface-primary)] p-6">
                <Bracketed variant="kicker">Nosotros</Bracketed>
                <p className="mt-4 font-display text-[1.7rem] font-light leading-[1.15] text-[var(--text-primary)]">Una plataforma para fortalecer causas serias, equipos sólidos e instituciones duraderas.</p>
              </article>
              {article && (
                <Link href={`/blog/${article.slug}`} className="group bg-[var(--surface-primary)] p-6 transition-colors hover:bg-[var(--surface-secondary)]">
                  <Bracketed variant="kicker">Blog</Bracketed>
                  <div className="mt-4 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]"><span>{formatShortDate(article.published_at)}</span><span>·</span><span>{estimateReadTime(article.content)}</span></div>
                  <h2 className="mt-4 font-display text-[1.7rem] font-light leading-[1.14] text-[var(--text-primary)] transition-colors group-hover:text-[var(--color-accent-300)]">{article.title}</h2>
                  {article.author && <p className="mt-3 text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-accent-300)]">{article.author}</p>}
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[var(--text-secondary)]">{getArticlePreview(article.excerpt, 180)}</p>
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--border-subtle)] py-20 md:py-28">
          <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <Bracketed variant="kicker">Incubadora</Bracketed>
                <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4vw,3.3rem)] font-light leading-[1.06] tracking-tight text-[var(--text-primary)]">Incubamos proyectos con vocación de impacto y estructura institucional.</h2>
              </div>
              <Link href="/incubadora" className="hidden items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] md:inline-flex">Ver incubadora<ArrowUpRight size={14} /></Link>
            </div>
            <div className="grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-3">
              {projects.map((project) => (
                <Link key={project.slug} href="/incubadora" className="group bg-[var(--surface-primary)] p-6 transition-colors hover:bg-[var(--surface-secondary)]">
                  <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-accent-300)]">{project.stage === "incubacion" ? "Proyecto incubado" : "Caso de éxito"}</p>
                  <div className="mt-4">
                    <InitiativeMark title={project.name} subtitle={project.title} />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">{project.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--border-subtle)] py-20 md:py-28">
          <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
            <Bracketed variant="kicker">Ayudas</Bracketed>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4vw,3.3rem)] font-light leading-[1.06] tracking-tight text-[var(--text-primary)]">Ayudamos tanto a quienes quieren dar mejor como a quienes necesitan crecer mejor.</h2>
            <div className="mt-10 grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-3">
              {aids.map(([title, description, href]) => (
                <Link key={title} href={href} className="group bg-[var(--surface-primary)] p-6 transition-colors hover:bg-[var(--surface-secondary)]">
                  <h3 className="font-display text-[1.7rem] font-light leading-[1.12] text-[var(--text-primary)] transition-colors group-hover:text-[var(--color-accent-300)]">{title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">{description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--border-subtle)] bg-[var(--surface-brand)] py-20 md:py-28">
          <div className="mx-auto grid max-w-[var(--container-max)] gap-8 px-[var(--container-px)] lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.7fr)] lg:items-end">
            <div>
              <Bracketed variant="kicker">Boletín</Bracketed>
              <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.06] tracking-tight text-[var(--text-primary)]">Recibe nuestras novedades y abre una conversación con el equipo.</h2>
            </div>
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Suscripciones y consultas</p>
              <p className="mt-3 font-display text-[1.9rem] font-light text-[var(--text-primary)]">{FOUNDATION_CONTACT.email}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={`mailto:${FOUNDATION_CONTACT.email}?subject=Alta%20bolet%C3%ADn%20Fortius%20Foundation`} className="inline-flex items-center justify-center bg-[var(--color-accent-500)] px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white">Suscribirme</a>
                <Link href="/contacto" className="inline-flex items-center justify-center border border-[var(--border-subtle)] px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]">Hablar con el equipo</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}