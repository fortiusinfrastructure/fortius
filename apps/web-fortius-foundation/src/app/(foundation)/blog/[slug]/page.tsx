import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bracketed } from "@/components/system/Bracketed";
import {
  estimateReadTime,
  formatPublishedDate,
  getArticleBySlug,
  listArticles,
  splitArticleContent,
} from "@/lib/articles";

interface ArticlePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return listArticles().map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return { title: "Artículo no encontrado — Fundación Fortius" };
  }

  return {
    title: `${article.title} — Fundación Fortius`,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const paragraphs = splitArticleContent(article.content);

  return (
    <main id="main-content" className="pt-[var(--nav-height)]">
      <article className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-32">
        <Link
          href="/blog"
          className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
        >
          [ Volver al blog ]
        </Link>
        <Bracketed variant="tag" className="mt-8">Foundation</Bracketed>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,5vw,4.4rem)] font-light leading-[1.04] tracking-tight text-[var(--text-primary)]">
          {article.title}
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-4 text-[0.74rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
          <span>{formatPublishedDate(article.published_at)}</span>
          <span>·</span>
          <span>{estimateReadTime(article.content)}</span>
          {article.author && (
            <>
              <span>·</span>
              <span>{article.author}</span>
            </>
          )}
        </div>

        <div className="mt-14 max-w-3xl space-y-6">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[1.02rem] leading-8 text-[var(--text-secondary)]">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}