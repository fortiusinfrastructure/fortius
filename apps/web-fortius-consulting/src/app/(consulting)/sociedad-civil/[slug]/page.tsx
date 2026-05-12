import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock, ArrowLeft } from "lucide-react";
import { marked } from "marked";
import { Bracketed } from "@/components/system/Bracketed";
import {
    getArticleBySlug,
    listArticlesByCategory,
    categoryLabel,
    kindLabel,
    formatPublishedDate,
    paidPreview,
} from "@/lib/articles";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return listArticlesByCategory("sociedad-civil").map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = getArticleBySlug(slug);
    if (!article || article.category !== "sociedad-civil") {
        return { title: "Artículo no encontrado" };
    }
    return {
        title: `${article.title} — Fortius Consulting`,
        description: article.excerpt,
    };
}

async function renderMarkdown(md: string): Promise<string> {
    return marked.parse(md, { async: true, breaks: false, gfm: true });
}

export default async function SociedadCivilArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);
    if (!article || article.category !== "sociedad-civil") notFound();

    const isPaid = article.access === "paid";
    const markdownToRender = isPaid
        ? paidPreview(article.content_markdown)
        : article.content_markdown;
    const html = await renderMarkdown(markdownToRender);

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <article className="relative pt-16 md:pt-24 pb-24 md:pb-32">
                <div className="mx-auto max-w-3xl px-[var(--container-px)]">
                    <Link
                        href="/sociedad-civil#analisis"
                        className="inline-flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.16em] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                        <ArrowLeft size={14} />
                        <span>Volver a Sociedad Civil</span>
                    </Link>

                    <header className="mt-8">
                        <Bracketed variant="tag">
                            {kindLabel(article.kind)} · {categoryLabel(article.category)}
                        </Bracketed>
                        <h1 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.6rem)] font-light leading-[1.08] tracking-tight text-[var(--text-primary)]">
                            {article.title}
                        </h1>
                        <div className="mt-6 flex flex-wrap items-center gap-4 text-[0.8rem] text-[var(--text-tertiary)]">
                            <span>{formatPublishedDate(article.published_at)}</span>
                            {isPaid && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-[var(--color-accent-500)] text-[var(--color-accent-400)] uppercase tracking-[0.16em] text-[0.7rem]">
                                    <Lock size={12} />
                                    Suscriptores
                                </span>
                            )}
                        </div>
                    </header>

                    <div
                        className="mt-12 prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-light prose-headings:tracking-tight prose-h1:text-[2rem] prose-h2:text-[1.6rem] prose-h3:text-[1.25rem] prose-a:text-[var(--color-accent-400)] prose-strong:text-[var(--text-primary)] prose-blockquote:border-[var(--color-accent-500)] prose-blockquote:text-[var(--text-secondary)]"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />

                    {isPaid && <PaywallGate />}

                    {isPaid && article.subproducts.length > 0 && (
                        <aside className="mt-16 border-t border-[var(--border-subtle)] pt-10">
                            <Bracketed variant="kicker">Subproductos exclusivos</Bracketed>
                            <ul className="mt-6 space-y-3">
                                {article.subproducts.map((s, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-3 text-[var(--text-secondary)]"
                                    >
                                        <Lock size={14} className="text-[var(--color-accent-500)]" />
                                        <span>{s.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    )}
                </div>
            </article>
        </main>
    );
}

function PaywallGate() {
    return (
        <div
            role="region"
            aria-label="Contenido reservado a suscriptores"
            className="relative mt-12 overflow-hidden rounded-lg border border-[var(--color-accent-500)] bg-[var(--surface-highlight)] p-8 md:p-10"
        >
            <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-transparent to-[var(--surface-primary)] pointer-events-none" />
            <div className="flex items-start gap-4">
                <div className="rounded-full bg-[var(--color-accent-500)]/15 p-3 text-[var(--color-accent-400)]">
                    <Lock size={20} />
                </div>
                <div className="flex-1">
                    <Bracketed variant="tag">Contenido para suscriptores</Bracketed>
                    <h2 className="mt-4 font-display text-[1.6rem] md:text-[2rem] font-light leading-[1.15] text-[var(--text-primary)]">
                        El contenido completo está reservado a miembros de Fortius.
                    </h2>
                    <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                        El análisis íntegro y los subproductos vinculados están disponibles
                        para miembros del Área Privada. Suscríbete para acceder a la
                        biblioteca completa.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href="/sociedad-civil#membresias"
                            className="inline-flex items-center px-5 py-2.5 rounded-sm bg-[var(--color-accent-500)] text-white text-[0.8rem] font-medium uppercase tracking-[0.16em] hover:bg-[var(--color-accent-400)] transition-colors"
                        >
                            Ver planes
                        </Link>
                        <Link
                            href="/area-privada"
                            className="inline-flex items-center px-5 py-2.5 rounded-sm border border-[var(--border-strong)] text-[var(--text-primary)] text-[0.8rem] font-medium uppercase tracking-[0.16em] hover:border-[var(--color-accent-500)] transition-colors"
                        >
                            Ya soy suscriptor
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
