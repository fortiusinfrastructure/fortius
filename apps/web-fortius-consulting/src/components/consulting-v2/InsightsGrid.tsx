"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import {
    kindLabel,
    categoryLabel,
    formatShortDate,
    estimateReadTime,
    type Article,
    type ArticleAccess,
    type ArticleCategory,
} from "@/lib/articles";
import { getArticleImageSources, getArticleLeadData, getArticleSummary } from "@/lib/article-display";
import { ArticleCoverImage } from "./ArticleCoverImage";

const ease = [0.22, 0.61, 0.36, 1] as const;

const ACCESS_LABEL: Record<ArticleAccess, string> = {
    public: "Abierto",
    paid: "Privado",
};

type AccessFilter = "all" | ArticleAccess;

const ACCESS_FILTERS: Array<{ value: AccessFilter; label: string }> = [
    { value: "all", label: "Todos" },
    { value: "public", label: "Abierto" },
    { value: "paid", label: "Privado" },
];

interface InsightsGridProps {
    /** Full article list fetched server-side (lib/articles-db). */
    articles: Article[];
    /** Filter by category. Omit to show all categories. */
    category?: ArticleCategory;
    /** Base path for article links, e.g. "/sociedad-civil". Omit to use "/publicaciones". */
    baseHref?: string;
    /** When true, paid articles are shown with a lock indicator. Default: false. */
    includePrivate?: boolean;
    kicker?: string;
    title?: string;
}

export function InsightsGrid({
    articles: sourceArticles,
    category,
    baseHref,
    includePrivate = false,
    kicker = "Archivo completo",
    title = "Todos los artículos y análisis.",
}: InsightsGridProps) {
    const [accessFilter, setAccessFilter] = useState<AccessFilter>("all");
    const allArticles = category
        ? sourceArticles.filter((a) => a.category === category)
        : sourceArticles;
    const availableArticles = includePrivate
        ? allArticles
        : allArticles.filter((a) => a.access === "public");
    const articles = useMemo(
        () => availableArticles.filter((article) => accessFilter === "all" || article.access === accessFilter),
        [accessFilter, availableArticles],
    );
    const counts = useMemo(
        () => ({
            all: availableArticles.length,
            public: availableArticles.filter((article) => article.access === "public").length,
            paid: availableArticles.filter((article) => article.access === "paid").length,
        }),
        [availableArticles],
    );

    if (availableArticles.length === 0) return null;

    return (
        <section
            id="insights"
            aria-labelledby="insights-title"
            className="relative border-t border-[var(--border-subtle)] py-24 md:py-32"
        >
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                <div className="mb-12">
                    <Bracketed variant="kicker">{kicker}</Bracketed>
                    <h2
                        id="insights-title"
                        className="mt-3 font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-light leading-tight tracking-tight text-[var(--text-primary)]"
                    >
                        {title}
                    </h2>
                </div>

                {includePrivate && (
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                        <p className="text-[0.75rem] uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                            Mostrando {articles.length} de {availableArticles.length} contenidos
                        </p>
                        <div
                            className="inline-flex rounded-full border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-1"
                            role="tablist"
                            aria-label="Filtrar publicaciones por acceso"
                        >
                            {ACCESS_FILTERS.map((filter) => {
                                const isActive = accessFilter === filter.value;
                                return (
                                    <button
                                        key={filter.value}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() => setAccessFilter(filter.value)}
                                        className="relative min-w-24 rounded-full px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition-colors"
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="insights-access-filter"
                                                className="absolute inset-0 rounded-full bg-[var(--color-accent-500)]"
                                                transition={{ duration: 0.28, ease }}
                                            />
                                        )}
                                        <span className={`relative z-10 ${isActive ? "text-white" : "text-[var(--text-secondary)]"}`}>
                                            {filter.label} · {counts[filter.value]}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)]">
                    <AnimatePresence mode="popLayout">
                    {articles.map((article, i) => {
                        const isPaid = article.access === "paid";
                        const images = getArticleImageSources(article);
                        const lead = getArticleLeadData(article);
                        const excerpt = getArticleSummary(article);
                        const date = formatShortDate(article.published_at);
                        const readTime = estimateReadTime(article.content_markdown);
                        // If no baseHref provided (all-categories mode), use the generic /publicaciones route.
                        const resolvedBase = baseHref ?? "/publicaciones";
                        const href = `${resolvedBase}/${article.slug}`;

                        return (
                            <motion.a
                                key={article.slug}
                                layout
                                href={href}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3), ease }}
                                className="group bg-[var(--surface-primary)] hover:bg-[var(--surface-secondary)] transition-colors duration-200 p-6 flex flex-col gap-4"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-tertiary)] shrink-0">
                                    <ArticleCoverImage
                                        primarySrc={images.primarySrc}
                                        fallbackSources={images.fallbackSources}
                                        alt={article.title}
                                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                                            isPaid ? "grayscale-[35%]" : "group-hover:scale-[1.04]"
                                        }`}
                                    />
                                    <div
                                        className="absolute inset-0"
                                        style={{ background: "linear-gradient(180deg, transparent 40%, rgba(5,10,20,0.6))" }}
                                    />
                                    {/* Lock overlay for private articles */}
                                    {isPaid && (
                                        <div className="absolute inset-0 flex items-end p-3">
                                            <span className="inline-flex items-center gap-1.5 bg-[rgba(5,10,20,0.75)] text-[var(--text-secondary)] text-[0.6rem] font-semibold uppercase tracking-[0.15em] px-2.5 py-1.5">
                                                <Lock size={9} strokeWidth={2.5} aria-hidden />
                                                Privado
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Meta */}
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${
                                            isPaid
                                                ? "border-[var(--border-strong)] text-[var(--text-secondary)]"
                                                : "border-[var(--color-accent-500)] text-[var(--color-accent-400)]"
                                        }`}
                                    >
                                        {isPaid && <Lock size={9} strokeWidth={2.5} aria-hidden />}
                                        {ACCESS_LABEL[article.access]}
                                    </span>
                                    <Bracketed variant="tag">{kindLabel(article.kind)}</Bracketed>
                                    {/* Show category label when listing all categories */}
                                    {!category && (
                                        <Bracketed variant="tag">{categoryLabel(article.category)}</Bracketed>
                                    )}
                                    <span className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                                        {date}
                                    </span>
                                    <span className="text-[0.65rem] text-[var(--text-tertiary)]">·</span>
                                    <span className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                                        {readTime}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="font-display text-[1.1rem] font-light leading-[1.22] tracking-tight text-[var(--text-primary)] group-hover:text-[var(--color-accent-400)] transition-colors">
                                    {article.title}
                                </h3>

                                {/* Author */}
                                {lead.author && (
                                    <p className="text-[0.78rem] text-[var(--text-secondary)]">{lead.author}</p>
                                )}

                                {/* Excerpt */}
                                <p className="text-[0.85rem] text-[var(--text-tertiary)] leading-relaxed line-clamp-2 flex-1">
                                    {excerpt}
                                </p>

                                {/* CTA */}
                                {isPaid ? (
                                    <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-400)] group-hover:gap-2.5 transition-all">
                                        <Lock size={10} strokeWidth={2.5} aria-hidden />
                                        Ver vista previa
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-400)] group-hover:gap-2.5 transition-all">
                                        Leer
                                        <ArrowUpRight size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                    </span>
                                )}
                            </motion.a>
                        );
                    })}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
