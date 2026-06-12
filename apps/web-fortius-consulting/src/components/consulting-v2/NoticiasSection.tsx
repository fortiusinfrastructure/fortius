"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import { formatShortDate, estimateReadTime, type Article } from "@/lib/articles";
import { getArticleImageSources, getArticleSummary } from "@/lib/article-display";
import { ArticleCoverImage } from "./ArticleCoverImage";

const ease = [0.22, 0.61, 0.36, 1] as const;

const CATEGORY_HREF: Record<string, string> = {
    "sociedad-civil": "/sociedad-civil",
    politica: "/inteligencia",
};

interface NoticiasSectionProps {
    /** Latest public noticias, computed server-side (lib/articles-db + getLatestNoticias). */
    noticias: Article[];
}

export function NoticiasSection({ noticias }: NoticiasSectionProps) {
    if (noticias.length === 0) return null;

    return (
        <section
            id="noticias"
            aria-labelledby="noticias-title"
            className="relative border-t border-[var(--border-subtle)] py-24 md:py-32"
        >
            {/* Subtle accent line */}
            <div className="absolute top-0 left-0 right-0 pointer-events-none opacity-40">
                <div
                    className="h-px w-full"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent 0%, var(--color-accent-500) 50%, transparent 100%)",
                    }}
                />
            </div>

            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                {/* Header */}
                <div className="flex items-end justify-between mb-10">
                    <div className="space-y-2">
                        <Bracketed variant="kicker">Noticias · Fortius Consulting</Bracketed>
                        <h2
                            id="noticias-title"
                            className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-light leading-tight tracking-tight text-[var(--text-primary)]"
                        >
                            Presencia institucional y actividad en el ecosistema.
                        </h2>
                    </div>
                </div>

                {/* News grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {noticias.map((article, i) => {
                        const images = getArticleImageSources(article);
                        const href = `${CATEGORY_HREF[article.category] ?? "/sociedad-civil"}/${article.slug}`;
                        const excerpt = getArticleSummary(article);
                        const date = formatShortDate(article.published_at);
                        const readTime = estimateReadTime(article.content_markdown);

                        return (
                            <motion.a
                                key={article.slug}
                                href={href}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                                className="group flex flex-col"
                            >
                                {/* Cover image */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-tertiary)] mb-5">
                                    <ArticleCoverImage
                                        primarySrc={images.primarySrc}
                                        fallbackSources={images.fallbackSources}
                                        alt={`Portada de ${article.title}`}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                    />
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, rgba(233,71,72,0.18), rgba(10,17,30,0.75))",
                                        }}
                                    />
                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2 flex-wrap">
                                        <Bracketed variant="tag">Noticia</Bracketed>
                                        <span className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                                            Sociedad Civil y Política
                                        </span>
                                    </div>
                                </div>

                                {/* Text */}
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                                        <span>{date}</span>
                                        <span>·</span>
                                        <span>{readTime}</span>
                                    </div>
                                    <h3 className="font-display text-[1.25rem] font-light leading-[1.18] tracking-tight text-[var(--text-primary)] group-hover:text-[var(--color-accent-400)] transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-[0.88rem] text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                                        {excerpt}
                                    </p>
                                    <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-400)] group-hover:gap-2.5 transition-all pt-1">
                                        Leer noticia
                                        <ArrowUpRight size={13} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                    </span>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
