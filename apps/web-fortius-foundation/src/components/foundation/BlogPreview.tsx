import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import { estimateReadTime, formatShortDate, getFeaturedArticles } from "@/lib/articles";

export function BlogPreview() {
  const articles = getFeaturedArticles(4);

  return (
    <section className="border-t border-[var(--border-subtle)] py-24 md:py-32">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div className="space-y-4">
            <Bracketed variant="kicker">Blog</Bracketed>
            <h2 className="max-w-3xl font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.05] tracking-tight text-[var(--text-primary)]">
              Entradas de Foundation, sin divisiones por vertical.
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Ver blog completo
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-2 xl:grid-cols-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group bg-[var(--surface-primary)] p-6 hover:bg-[var(--surface-secondary)] transition-colors"
            >
              <Bracketed variant="tag">Foundation</Bracketed>
              <div className="mt-5 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                <span>{formatShortDate(article.published_at)}</span>
                <span>·</span>
                <span>{estimateReadTime(article.content)}</span>
              </div>
              <h3 className="mt-4 font-display text-[1.45rem] font-light leading-[1.12] text-[var(--text-primary)] group-hover:text-[var(--color-accent-300)] transition-colors">
                {article.title}
              </h3>
              <p className="mt-4 line-clamp-5 text-[0.9rem] leading-relaxed text-[var(--text-secondary)]">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}