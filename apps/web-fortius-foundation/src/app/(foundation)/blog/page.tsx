import type { Metadata } from "next";
import Link from "next/link";
import { Bracketed } from "@/components/system/Bracketed";
import { estimateReadTime, formatPublishedDate, listArticles } from "@/lib/articles";

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
          Ideas, análisis y reflexiones desde Fortius Foundation.
        </h1>

        <div className="mt-16 grid grid-cols-1 gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="bg-[var(--surface-primary)] p-7 transition-colors hover:bg-[var(--surface-secondary)]"
            >
              <Bracketed variant="tag">Foundation</Bracketed>
              <div className="mt-5 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                <span>{formatPublishedDate(article.published_at)}</span>
                <span>·</span>
                <span>{estimateReadTime(article.content)}</span>
              </div>
              <h2 className="mt-4 font-display text-[1.8rem] font-light leading-[1.12] text-[var(--text-primary)]">
                {article.title}
              </h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                {article.excerpt}
              </p>
              <p className="mt-5 text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-accent-300)]">
                Leer artículo
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}