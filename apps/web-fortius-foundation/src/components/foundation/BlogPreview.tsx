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
  { accent: string; bg: string; band: string; base: string }
> = {
  emerald: {
    accent: "rgba(58,156,110,0.28)",
    bg: "rgba(10,31,22,0.55)",
    band: "var(--color-accent-500)",
    base: "#07180f",
  },
  forest: {
    accent: "rgba(27,86,58,0.32)",
    bg: "rgba(6,16,12,0.65)",
    band: "var(--color-accent-600)",
    base: "#040e08",
  },
  gold: {
    accent: "rgba(197,160,89,0.28)",
    bg: "rgba(20,16,8,0.65)",
    band: "#c5a059",
    base: "#100d05",
  },
  navy: {
    accent: "rgba(30,50,100,0.32)",
    bg: "rgba(5,10,22,0.70)",
    band: "#94a3b8",
    base: "#03060f",
  },
  plum: {
    accent: "rgba(120,40,120,0.26)",
    bg: "rgba(18,8,22,0.65)",
    band: "#a855f7",
    base: "#0d0511",
  },
  stone: {
    accent: "rgba(100,90,80,0.26)",
    bg: "rgba(16,14,12,0.65)",
    band: "#a8a29e",
    base: "#0c0a09",
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
                className="group block overflow-hidden bg-[var(--surface-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
              >
                {/* Featured image area */}
                <div
                  className="relative flex h-44 items-end overflow-hidden p-5"
                  style={{ backgroundColor: theme.base }}
                >
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse at top right, ${theme.accent} 0%, transparent 60%), radial-gradient(ellipse at bottom left, ${theme.accent} 0%, transparent 55%)`,
                    }}
                  />
                  <div className="relative">
                    <p
                      className="mb-2 text-[0.58rem] font-semibold uppercase tracking-[0.24em]"
                      style={{ color: theme.band }}
                    >
                      {visual.eyebrow}
                    </p>
                    <p className="max-w-[20ch] font-display text-[1rem] font-light leading-snug text-white/65">
                      {visual.motif}
                    </p>
                  </div>
                  <div
                    className="absolute right-0 top-0 h-full w-1"
                    style={{ backgroundColor: theme.band, opacity: 0.4 }}
                  />
                </div>

                <div className="p-6">
                  {/* Date + read time */}
                  <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                    <span>{formatShortDate(article.published_at)}</span>
                    <span>·</span>
                    <span>{estimateReadTime(article.content)}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 font-display text-[1.25rem] font-light leading-[1.14] text-[var(--text-primary)] transition-colors group-hover:text-[var(--color-accent-300)]">
                    {article.title}
                  </h3>

                  {/* Author */}
                  {article.author && (
                    <p className="mt-2 text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-accent-300)]">
                      {article.author}
                    </p>
                  )}

                  {/* CTA */}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.67rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-all group-hover:gap-2.5 group-hover:text-[var(--text-primary)]">
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