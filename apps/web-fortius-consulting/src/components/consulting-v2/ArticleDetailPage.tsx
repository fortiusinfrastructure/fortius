import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock3, Lock } from "lucide-react";
import { marked } from "marked";
import { Bracketed } from "@/components/system/Bracketed";
import {
    categoryLabel,
    estimateReadTime,
    formatPublishedDate,
    kindLabel,
    paidPreview,
    type Article,
} from "@/lib/articles";
import {
    getArticleCover,
    getArticleImageSources,
    getArticleLeadData,
} from "@/lib/article-display";
import { ArticleCoverImage } from "./ArticleCoverImage";
import { ArticleFormatBlocks } from "./ArticleFormatBlocks";
import { ArticleKindPanel } from "./ArticleKindPanel";
import { EventArticleBlocks } from "./EventArticleBlocks";

interface ArticleDetailPageProps {
    article: Article;
    backHref: string;
    backLabel: string;
    membershipHref: string;
}

export async function buildArticleMetadata(article: Article): Promise<Metadata> {
    const cover = getArticleCover(article.category);
    return {
        title: `${article.title} — Fortius Consulting`,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            images: [{ url: cover.hardFallback }],
        },
    };
}

async function renderMarkdown(md: string): Promise<string> {
    return marked.parse(md, { async: true, breaks: true, gfm: true });
}

export async function ArticleDetailPage({
    article,
    backHref,
    backLabel,
    membershipHref,
}: ArticleDetailPageProps) {
    const cover = getArticleCover(article.category);
    const imageSources = getArticleImageSources(article);
    const lead = getArticleLeadData(article);
    const isMembersOnly = article.access === "paid" || article.kind === "evento";
    const previewParagraphs = article.kind === "evento" ? 2 : 3;
    const bodyMarkdown = isMembersOnly ? paidPreview(lead.markdown, previewParagraphs) : lead.markdown;
    const html = await renderMarkdown(bodyMarkdown);
    const readTime = estimateReadTime(lead.markdown);

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <article className="pb-24 md:pb-32">
                <section className="border-b border-[var(--border-subtle)] pt-16 md:pt-24 pb-14 md:pb-16">
                    <div className="mx-auto max-w-6xl px-[var(--container-px)]">
                        <Link href={backHref} className="inline-flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.16em] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">
                            <ArrowLeft size={14} />
                            <span>{backLabel}</span>
                        </Link>

                        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                            <div className="lg:col-span-7">
                                <div className="flex flex-wrap items-center gap-3">
                                    <Bracketed variant="tag">{kindLabel(article.kind)} · {categoryLabel(article.category)}</Bracketed>
                                    {isMembersOnly && (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-[var(--color-accent-500)] text-[var(--color-accent-400)] uppercase tracking-[0.16em] text-[0.7rem]">
                                            <Lock size={12} /> Miembros
                                        </span>
                                    )}
                                </div>
                                <h1 className="mt-6 font-display text-[clamp(2.2rem,4.8vw,4.4rem)] font-light leading-[1.02] tracking-tight text-[var(--text-primary)]">
                                    {article.title}
                                </h1>
                                <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-[var(--text-secondary)]">
                                    {article.excerpt}
                                </p>
                                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.8rem] text-[var(--text-tertiary)]">
                                    <span>{formatPublishedDate(article.published_at)}</span>
                                    <span className="hidden md:inline">·</span>
                                    <span className="inline-flex items-center gap-2">
                                        <Clock3 size={14} />
                                        {readTime}
                                    </span>
                                    <span className="hidden md:inline">·</span>
                                    <span>{lead.author ?? "Equipo Fortius"}</span>
                                </div>
                            </div>

                            <figure className="lg:col-span-5 overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)]">
                                <ArticleCoverImage
                                    primarySrc={imageSources.primarySrc}
                                    fallbackSources={imageSources.fallbackSources}
                                    alt={lead.imageNote ?? cover.alt}
                                    className="h-full w-full object-cover"
                                />
                                <figcaption className="border-t border-[var(--border-subtle)] px-5 py-4 text-[0.8rem] leading-relaxed text-[var(--text-tertiary)]">
                                    {lead.imageNote ?? cover.alt}
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-[var(--container-px)] pt-12 md:pt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-8">
                            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-6 md:p-7">
                                <Bracketed variant="kicker">Lectura</Bracketed>
                                <p className="mt-4 text-[1rem] leading-relaxed text-[var(--text-secondary)]">
                                    Esta pieza combina contexto, interpretación y criterio editorial para facilitar decisiones mejor informadas.
                                </p>
                            </div>

                            <ArticleFormatBlocks article={article} />

                            <EventArticleBlocks article={article} membersOnly={isMembersOnly} />

                            <div
                                className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-light prose-headings:tracking-tight prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed prose-h1:text-[2rem] prose-h2:text-[1.7rem] prose-h3:text-[1.3rem] prose-a:text-[var(--color-accent-400)] prose-strong:text-[var(--text-primary)] prose-ul:text-[var(--text-secondary)] prose-ol:text-[var(--text-secondary)] prose-li:marker:text-[var(--color-accent-500)] prose-blockquote:border-[var(--color-accent-500)] prose-blockquote:bg-[var(--surface-secondary)] prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:text-[var(--text-secondary)] prose-hr:border-[var(--border-subtle)]"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />

                            {isMembersOnly && <PaywallGate membershipHref={membershipHref} category={categoryLabel(article.category)} kind={kindLabel(article.kind)} isEvent={article.kind === "evento"} />}

                            {isMembersOnly && article.subproducts.length > 0 && (
                                <section className="space-y-5 border-t border-[var(--border-subtle)] pt-10">
                                    <Bracketed variant="kicker">Subproductos exclusivos</Bracketed>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {article.subproducts.map((item, index) => (
                                            <div key={`${item.title}-${index}`} className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5">
                                                <div className="flex items-center gap-2 text-[var(--color-accent-400)]">
                                                    <Lock size={14} />
                                                    <span className="text-[0.72rem] uppercase tracking-[0.16em]">Reservado</span>
                                                </div>
                                                <h3 className="mt-3 font-display text-[1.2rem] font-light text-[var(--text-primary)]">{item.title}</h3>
                                                <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--text-secondary)]">
                                                    {item.content || "Disponible para miembros del Área Privada."}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        <div className="lg:col-span-4">
                            <ArticleKindPanel article={article} author={lead.author} />
                        </div>
                    </div>
                </section>
            </article>
        </main>
    );
}

function PaywallGate({ membershipHref, category, kind, isEvent }: { membershipHref: string; category: string; kind: string; isEvent: boolean }) {
    return (
        <div role="region" aria-label="Contenido reservado a suscriptores" className="relative overflow-hidden rounded-2xl border border-[var(--color-accent-500)] bg-[var(--surface-highlight)] p-8 md:p-10">
            <div className="flex items-start gap-4">
                <div className="rounded-full bg-[var(--color-accent-500)]/15 p-3 text-[var(--color-accent-400)]">
                    <Lock size={20} />
                </div>
                <div className="flex-1">
                    <Bracketed variant="tag">Contenido para miembros</Bracketed>
                    <h2 className="mt-4 font-display text-[1.6rem] md:text-[2rem] font-light leading-[1.12] text-[var(--text-primary)]">
                        {isEvent
                            ? "Esta oportunidad está reservada a miembros de Fortius."
                            : `El ${kind.toLowerCase()} completo está reservado a miembros de Fortius.`}
                    </h2>
                    <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                        {isEvent
                            ? `Accede al detalle completo del evento, los paquetes disponibles y la gestión desde el Área Privada en Oportunidades & Eventos dentro de ${category.toLowerCase()}.`
                            : `Accede al contenido íntegro, a los subproductos vinculados y a la biblioteca completa de ${category.toLowerCase()} desde el Área Privada.`}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href={membershipHref} className="inline-flex items-center px-5 py-2.5 rounded-sm bg-[var(--color-accent-500)] text-white text-[0.8rem] font-medium uppercase tracking-[0.16em] hover:bg-[var(--color-accent-400)] transition-colors">
                            Ver planes
                        </Link>
                        <Link href="/area-privada" className="inline-flex items-center px-5 py-2.5 rounded-sm border border-[var(--border-strong)] text-[var(--text-primary)] text-[0.8rem] font-medium uppercase tracking-[0.16em] hover:border-[var(--color-accent-500)] transition-colors">
                            Ya soy suscriptor
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}