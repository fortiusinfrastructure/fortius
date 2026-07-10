import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArticleArtwork } from "@/components/foundation/ArticleArtwork";
import { Bracketed } from "@/components/system/Bracketed";
import {
  getArticleAbstract,
  estimateReadTime,
  formatPublishedDate,
  getArticleBlocks,
} from "@/lib/articles";
import { getArticleBySlugDB, listArticlesDB } from "@/lib/articles-server";

interface ArticlePageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = await getArticleBySlugDB(slug, locale);
  if (!article) {
    const t = await getTranslations({ locale, namespace: "blog" });
    return { title: `${t("tag")} — Fundación Fortius` };
  }
  const pageTitle = `${article.title} — Fundación Fortius`;
  const pageUrl = `/${locale}/blog/${slug}`;
  return {
    title: pageTitle,
    description: article.excerpt,
    openGraph: {
      title: pageTitle,
      description: article.excerpt,
      type: "article",
      url: pageUrl,
      siteName: "Fundación Fortius",
      images: [{ url: "/opengraph-image.jpg", width: 1024, height: 1024, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: article.excerpt,
      images: ["/opengraph-image.jpg"],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const article = await getArticleBySlugDB(slug, locale);
  if (!article) notFound();

  const allArticles = await listArticlesDB(locale);
  const isHtml = article.content_format === "html";
  const blocks = isHtml ? [] : getArticleBlocks(article.content);
  const abstract = getArticleAbstract(article, 320);
  const related = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const firstParagraphIndex = blocks.findIndex((block) => block.type === "paragraph");

  return (
    <main id="main-content" className="pt-[var(--nav-height)]">
      <article>
        <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-32">
          <Link
            href="/blog"
            className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
          >
            [ {t("back")} ]
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:items-start">
            <div>
              <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,5.2vw,4.7rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
                {article.title}
              </h1>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-[0.74rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                <span>{formatPublishedDate(article.published_at)}</span>
                <span>·</span>
                <span>{estimateReadTime(article.content)}</span>
                {article.author && (
                  <>
                    <span>·</span>
                    <span>{t("by")} {article.author}</span>
                  </>
                )}
              </div>

              <div className="mt-10 border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-6 md:p-7">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-accent-300)]">
                  Abstract
                </p>
                <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-[var(--text-secondary)]">
                  {abstract}
                </p>
              </div>
            </div>

            <ArticleArtwork article={article} className="aspect-[4/5] md:aspect-[16/12]" />
          </div>
        </section>

        <section className="border-t border-[var(--border-subtle)]">
          <div className="mx-auto grid max-w-[var(--container-max)] gap-12 px-[var(--container-px)] py-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:py-20">
            {isHtml ? (
              <div
                className="prose prose-invert max-w-none prose-headings:font-display prose-headings:font-light prose-p:leading-8 prose-a:text-[var(--color-accent-400)]"
                style={
                  {
                    "--tw-prose-body": "var(--text-secondary)",
                    "--tw-prose-headings": "var(--text-primary)",
                    "--tw-prose-bold": "var(--text-primary)",
                    "--tw-prose-links": "var(--color-accent-400)",
                    "--tw-prose-quotes": "var(--text-primary)",
                    "--tw-prose-quote-borders": "var(--border-subtle)",
                  } as CSSProperties
                }
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <div className="space-y-6">
                {blocks.map((block, index) =>
                  block.type === "heading" ? (
                    <h2 key={`${block.content}-${index}`} className="pt-4 font-display text-[1.9rem] font-light leading-[1.12] text-[var(--text-primary)]">
                      {block.content}
                    </h2>
                  ) : (
                    <p
                      key={`${block.content}-${index}`}
                      className={index === firstParagraphIndex ? "text-[1.12rem] leading-8 text-[var(--text-primary)]" : "text-[1.02rem] leading-8 text-[var(--text-secondary)]"}
                    >
                      {block.content}
                    </p>
                  ),
                )}
              </div>
            )}

            <aside className="space-y-4 lg:sticky lg:top-[calc(var(--nav-height)+2rem)] lg:self-start">
              <div className="border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-5">
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{t("tag")}</p>
                <p className="mt-3 font-display text-[1.4rem] font-light text-[var(--text-primary)]">
                  {locale === "en" ? "Editorial piece" : "Reflexión editorial"}
                </p>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-[var(--text-secondary)]">
                  {locale === "en"
                    ? "A text for thinking about institutional work, civil society and leadership as service."
                    : "Un texto para pensar el trabajo institucional, la sociedad civil y el liderazgo como servicio."}
                </p>
              </div>
            </aside>
          </div>
        </section>

        {related.length > 0 && (
          <section className="border-t border-[var(--border-subtle)]">
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-16 md:py-20">
              <Bracketed variant="kicker">
                {locale === "en" ? "Continue reading" : "Seguir leyendo"}
              </Bracketed>
              <div className="mt-8 grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-3">
                {related.map((item) => (
                  <Link key={item.slug} href={`/blog/${item.slug}` as "/"} className="group bg-[var(--surface-primary)] p-6 transition-colors hover:bg-[var(--surface-secondary)]">
                    <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">{formatPublishedDate(item.published_at)}</p>
                    <h2 className="mt-4 font-display text-[1.4rem] font-light leading-[1.15] text-[var(--text-primary)] transition-colors group-hover:text-[var(--color-accent-300)]">{item.title}</h2>
                    <p className="mt-4 text-[0.92rem] leading-relaxed text-[var(--text-secondary)]">{getArticleAbstract(item, 150)}</p>
                    <p className="mt-5 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-accent-300)]">
                      {t("read-more")}
                      <ArrowUpRight size={14} />
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
