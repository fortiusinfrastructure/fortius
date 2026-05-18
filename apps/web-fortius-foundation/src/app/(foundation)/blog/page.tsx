import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArticleSubmissionForm } from "@/components/foundation/ArticleSubmissionForm";
import { Bracketed } from "@/components/system/Bracketed";
import {
  estimateReadTime,
  formatPublishedDate,
  getArticlePreview,
  listArticles,
} from "@/lib/articles";
import { FOUNDATION_CONTACT } from "@/content/site";

export const metadata: Metadata = {
  title: "Blog — Fundación Fortius",
  description:
    "Entradas y artículos de Fundación Fortius cargados desde public/entradas.",
};

export default function BlogPage() {
  const articles = listArticles();

  return (
    <main id="main-content" className="pt-[var(--nav-height)]">
      <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-32">
        <Bracketed variant="tag">Blog</Bracketed>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
          Una selección de nuestras ideas y reflexiones.
        </h1>

        <div className="mt-16 grid grid-cols-1 gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group relative overflow-hidden bg-[var(--surface-primary)] p-7 transition-colors hover:bg-[var(--surface-secondary)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.18),transparent_34%),linear-gradient(135deg,rgba(20,83,45,0.08),transparent_64%)]" />
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(34,197,94,0.045) 0, rgba(34,197,94,0.045) 2px, transparent 2px, transparent 18px), repeating-linear-gradient(45deg, rgba(21,128,61,0.03) 0, rgba(21,128,61,0.03) 1px, transparent 1px, transparent 14px)",
                }}
              />
              <div className="absolute -right-5 bottom-0 font-display text-[5.5rem] italic leading-none text-[var(--color-accent-500)]/10">
                FF
              </div>
              <div className="relative">
              <Bracketed variant="tag">Foundation</Bracketed>
              <div className="mt-5 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                <span>{formatPublishedDate(article.published_at)}</span>
                <span>·</span>
                <span>{estimateReadTime(article.content)}</span>
              </div>
              <h2 className="mt-4 font-display text-[1.8rem] font-light leading-[1.12] text-[var(--text-primary)]">
                {article.title}
              </h2>
              {article.author && (
                <p className="mt-3 text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-accent-300)]">
                  {article.author}
                </p>
              )}
              <div className="relative mt-4 min-h-[7.5rem]">
                <p className="text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                  {getArticlePreview(article.excerpt, 240)}
                </p>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[var(--surface-primary)] via-[var(--surface-primary)]/90 to-transparent" />
              </div>
              <p className="mt-5 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-accent-300)]">
                Leer artículo
                <ArrowUpRight size={14} />
              </p>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-16 border border-[var(--border-subtle)] bg-[var(--surface-brand)] px-8 py-10">
          <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-accent-200)]">
            Comunidad editorial
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-[2.2rem] font-light leading-[1.08] text-white">
            ¿Quieres compartir tus ideas con nuestra comunidad?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-[var(--color-accent-100)]">
            Mándanos tu artículo. Puedes enviarlo por correo y adjuntar el texto o el archivo correspondiente para que el equipo lo revise.
          </p>
          <ArticleSubmissionForm />
        </section>
      </section>
    </main>
  );
}