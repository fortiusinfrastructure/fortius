import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import {
  estimateReadTime,
  formatShortDate,
  getArticlePreview,
  getArticleVisual,
  getFeaturedArticles,
} from "@/lib/articles";
import type { ArticleVisualTheme } from "@/content/article-visuals";

const THEME_COLORS: Record<
  ArticleVisualTheme,
  { accent: string; bg: string; band: string }
> = {
  emerald: {
    accent: "rgba(58,156,110,0.18)",
    bg: "rgba(10,31,22,0.55)",
    band: "var(--color-accent-500)",
  },
  forest: {
    accent: "rgba(27,86,58,0.22)",
    bg: "rgba(6,16,12,0.65)",
    band: "var(--color-accent-600)",
  },
  gold: {
    accent: "rgba(197,160,89,0.18)",
    bg: "rgba(20,16,8,0.65)",
    band: "var(--color-gold-500)",
  },
  navy: {
    accent: "rgba(30,50,100,0.22)",
    bg: "rgba(5,10,22,0.70)",
    band: "var(--color-neutral-400)",
  },
  plum: {
    accent: "rgba(120,40,120,0.16)",
    bg: "rgba(18,8,22,0.65)",
    band: "#a855f7",
  },
  stone: {
    accent: "rgba(100,90,80,0.18)",
    bg: "rgba(16,14,12,0.65)",
    band: "var(--color-neutral-300)",
  },
};

export function BlogPreview() {
  const articles = getFeaturedArticles(4);

  return (
    <section className="border-t border-[var(--border-subtle)] py-24 md:py-32">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div className="space-y-4">
            <Bracketed variant="kicker">Blog</Bracketed>
            <h2 className="max-w-3xl font-display text-[clamp(2rem,4.2vw,3.6rem)] font-light leading-[1.05] tracking-tight text-[var(--text-primary)]">
              Reflexiones sobre liderazgo, filantropía y sociedad civil.
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
          {articles.map((article) => {
            const visual = getArticleVisual(article);
            const theme = THEME_COLORS[visual.theme];

            return (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group relative overflow-hidden bg-[var(--surface-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
              >
                {/* Themed accent band at top */}
                <div
                  className="h-1 w-full"
                  style={{ backgroundColor: theme.band }}
                />

                {/* Subtle tinted background */}
                <div
                  className="absolute inset-0 top-1 pointer-events-none opacity-60"
                  style={{
                    background: `radial-gradient(ellipse at top right, ${theme.accent} 0%, transparent 55%), linear-gradient(180deg, ${theme.bg} 0%, transparent 70%)`,
                  }}
                />

                <div className="relative p-6">
                  {/* Eyebrow label */}
                  <p
                    className="text-[0.65rem] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: theme.band }}
                  >
                    {visual.eyebrow}
                  </p>

                  {/* Date + read time */}
                  <div className="mt-3 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                    <span>{formatShortDate(article.published_at)}</span>
                    <span>·</span>
                    <span>{estimateReadTime(article.content)}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 font-display text-[1.4rem] font-light leading-[1.12] text-[var(--text-primary)] transition-colors group-hover:text-[var(--color-accent-300)]">
                    {article.title}
                  </h3>

                  {/* Author */}
                  {article.author && (
                    <p className="mt-3 text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-accent-300)]">
                      {article.author}
                    </p>
                  )}

                  {/* Excerpt */}
                  <div className="relative mt-4 min-h-[6rem]">
                    <p className="text-[0.9rem] leading-relaxed text-[var(--text-secondary)]">
                      {getArticlePreview(article.excerpt, 160)}
                    </p>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[var(--surface-primary)] to-transparent group-hover:from-[var(--surface-secondary)]" />
                  </div>

                  {/* CTA */}
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-all group-hover:gap-2.5 group-hover:text-[var(--text-primary)]">
                    Leer entrada
                    <ArrowUpRight
                      size={12}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Ver blog completo
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}