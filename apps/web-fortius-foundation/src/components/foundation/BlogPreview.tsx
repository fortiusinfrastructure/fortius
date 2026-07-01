import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Bracketed } from "@/components/system/Bracketed";
import {
  estimateReadTime,
  formatShortDate,
  getArticleVisual,
  getFeaturedArticles,
} from "@/lib/articles";
import type { ArticleVisualTheme } from "@/content/article-visuals";

const BAND: Record<ArticleVisualTheme, string> = {
  emerald: "var(--color-accent-500)",
  forest: "var(--color-accent-600)",
  gold: "#c5a059",
  navy: "#94a3b8",
  plum: "#a855f7",
  stone: "#a8a29e",
};

export async function BlogPreview() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "blog" });
  const articles = getFeaturedArticles(4);
  const isEn = locale === "en";

  return (
    <section className="border-t border-[var(--border-subtle)] py-24 md:py-32">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div className="space-y-4">
            <Bracketed variant="kicker">{t("tag")}</Bracketed>
            <h2 className="max-w-3xl font-display text-[clamp(2rem,4.2vw,3.6rem)] font-light leading-[1.05] tracking-tight text-[var(--text-primary)]">
              {t("h1")}
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            {isEn ? "View full blog" : "Ver blog completo"}
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-2 xl:grid-cols-4">
          {articles.map((article) => {
            const visual = getArticleVisual(article);
            const band = BAND[visual.theme];

            return (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}` as "/"}
                className="group block overflow-hidden bg-[var(--surface-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={`/entradas/images/${article.slug}.png`}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span
                    className="absolute bottom-3 left-4 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/80"
                    style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
                  >
                    {visual.eyebrow}
                  </span>
                  <div
                    className="absolute right-0 top-0 h-full w-0.5"
                    style={{ backgroundColor: band, opacity: 0.5 }}
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                    <span>{formatShortDate(article.published_at)}</span>
                    <span>·</span>
                    <span>{estimateReadTime(article.content)}</span>
                  </div>

                  <h3 className="mt-3 font-display text-[1.25rem] font-light leading-[1.14] text-[var(--text-primary)] transition-colors group-hover:text-[var(--color-accent-300)]">
                    {article.title}
                  </h3>

                  {article.author && (
                    <p
                      className="mt-2 text-[0.7rem] uppercase tracking-[0.18em]"
                      style={{ color: band }}
                    >
                      {article.author}
                    </p>
                  )}

                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.67rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-all group-hover:gap-2.5 group-hover:text-[var(--text-primary)]">
                    {t("read-more")}
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
            {isEn ? "View full blog" : "Ver blog completo"}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
