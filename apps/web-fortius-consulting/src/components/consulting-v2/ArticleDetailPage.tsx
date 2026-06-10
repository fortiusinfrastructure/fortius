import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, CreditCard, Lock } from "lucide-react";
import { marked } from "marked";
import { createAdminClient, createServerClient } from "@fortius/database";
import { Bracketed } from "@/components/system/Bracketed";
import {
    categoryLabel,
    estimateReadTime,
    formatPublishedDate,
    getArticleOriginalSource,
    kindLabel,
    paidPreview,
    type Article,
} from "@/lib/articles";
import {
    getArticleCover,
    getArticleImageSources,
    getArticleLeadData,
    getArticleSummary,
} from "@/lib/article-display";
import { ArticleCoverImage } from "./ArticleCoverImage";
import { ArticleFormatBlocks } from "./ArticleFormatBlocks";
import { ArticleKindPanel } from "./ArticleKindPanel";
import { EventArticleBlocks } from "./EventArticleBlocks";
import { CONSULTING_ORG_SLUG } from "@/lib/billing/plans";

interface ArticleDetailPageProps {
    article: Article;
    backHref: string;
    backLabel: string;
    membershipHref: string;
}

export async function buildArticleMetadata(article: Article): Promise<Metadata> {
    const summary = getArticleSummary(article);
    const imageSources = getArticleImageSources(article);
    return {
        title: `${article.title} — Fortius Consulting`,
        description: summary,
        openGraph: {
            title: article.title,
            description: summary,
            images: [{ url: imageSources.primarySrc }],
        },
    };
}

async function renderMarkdown(md: string): Promise<string> {
    return marked.parse(md, { async: true, breaks: true, gfm: true });
}

async function getViewerArticleAccess(article: Article) {
    if (article.access !== "paid" && article.kind !== "evento") {
        return { canReadFull: true, canPurchaseEvent: false, hasPurchasedEvent: false };
    }

    try {
        const supabase = await createServerClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { canReadFull: false, canPurchaseEvent: false, hasPurchasedEvent: false };

        const admin = createAdminClient();
        const { data: org } = await admin
            .from("organizations")
            .select("id")
            .eq("slug", CONSULTING_ORG_SLUG)
            .single();

        if (!org) return { canReadFull: false, canPurchaseEvent: false, hasPurchasedEvent: false };

        const [{ data: membership }, { data: subscription }, { data: purchase }] = await Promise.all([
            admin
                .from("user_memberships")
                .select("role, status")
                .eq("user_id", user.id)
                .eq("organization_id", org.id)
                .eq("status", "active")
                .maybeSingle(),
            admin
                .from("subscriptions")
                .select("status")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false })
                .limit(1)
                .maybeSingle(),
            article.kind === "evento"
                ? admin
                      .from("event_purchases")
                      .select("id")
                      .eq("user_id", user.id)
                      .eq("organization_id", org.id)
                      .eq("event_slug", article.slug)
                      .eq("status", "paid")
                      .maybeSingle()
                : Promise.resolve({ data: null }),
        ]);

        const isAdmin = membership?.role === "admin" || membership?.role === "super_admin";
        const hasActiveSubscription = subscription?.status === "active";
        const hasPurchasedEvent = Boolean(purchase);
        const hasMemberAccess = Boolean(membership) && (isAdmin || hasActiveSubscription);

        return {
            canReadFull: article.kind === "evento" ? hasPurchasedEvent || isAdmin : hasMemberAccess,
            canPurchaseEvent: article.kind === "evento" && hasMemberAccess && !hasPurchasedEvent && !isAdmin,
            hasPurchasedEvent,
        };
    } catch (error) {
        console.error("[article-access]", error);
        return { canReadFull: false, canPurchaseEvent: false, hasPurchasedEvent: false };
    }
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
    const access = await getViewerArticleAccess(article);
    const previewParagraphs = article.kind === "evento" ? 2 : 3;
    const bodyMarkdown = isMembersOnly && !access.canReadFull ? paidPreview(lead.markdown, previewParagraphs) : lead.markdown;
    const html = await renderMarkdown(bodyMarkdown);
    const readTime = estimateReadTime(lead.markdown);
    const summary = getArticleSummary(article);
    const originalSource = getArticleOriginalSource(article);

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
                                            <Lock size={12} /> Clientes
                                        </span>
                                    )}
                                </div>
                                <h1 className="mt-6 font-display text-[clamp(2.2rem,4.8vw,4.4rem)] font-light leading-[1.02] tracking-tight text-[var(--text-primary)]">
                                    {article.title}
                                </h1>
                                <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-[var(--text-secondary)]">
                                    {summary}
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
                            </figure>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-[var(--container-px)] pt-12 md:pt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-8">
                            <ArticleFormatBlocks article={article} />

                            <EventArticleBlocks article={article} membersOnly={isMembersOnly && !access.canReadFull} />

                            <div
                                className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-light prose-headings:tracking-tight prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed prose-h1:text-[2rem] prose-h2:text-[1.7rem] prose-h3:text-[1.3rem] prose-a:text-[var(--color-accent-400)] prose-strong:text-[var(--text-primary)] prose-ul:text-[var(--text-secondary)] prose-ol:text-[var(--text-secondary)] prose-li:marker:text-[var(--color-accent-500)] prose-blockquote:border-[var(--color-accent-500)] prose-blockquote:bg-[var(--surface-secondary)] prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:text-[var(--text-secondary)] prose-hr:border-[var(--border-subtle)]"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />

                            {originalSource && (
                                <section className="border-t border-[var(--border-subtle)] pt-8">
                                    <Bracketed variant="kicker">Fuente original</Bracketed>
                                    <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                                        Publicación original en{" "}
                                        <a
                                            href={originalSource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[var(--color-accent-400)] underline underline-offset-4"
                                        >
                                            {originalSource.label}
                                        </a>
                                        .
                                    </p>
                                </section>
                            )}

                            {isMembersOnly && !access.canReadFull && (
                                article.kind === "evento" && access.canPurchaseEvent ? (
                                    <EventPurchaseGate article={article} />
                                ) : (
                                    <PaywallGate membershipHref={membershipHref} category={categoryLabel(article.category)} kind={kindLabel(article.kind)} isEvent={article.kind === "evento"} />
                                )
                            )}

                            {article.kind === "evento" && access.hasPurchasedEvent && <EventPurchasedNotice />}

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
                                                    {item.content || "Disponible para clientes del Área clientes."}
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

function EventPurchaseGate({ article }: { article: Article }) {
    return (
        <div role="region" aria-label="Adquisición de oportunidad" className="relative overflow-hidden rounded-2xl border border-[var(--color-accent-500)] bg-[var(--surface-highlight)] p-8 md:p-10">
            <div className="flex items-start gap-4">
                <div className="rounded-full bg-[var(--color-accent-500)]/15 p-3 text-[var(--color-accent-400)]">
                    <CreditCard size={20} />
                </div>
                <div className="flex-1">
                    <Bracketed variant="tag">Adquisición para clientes</Bracketed>
                    <h2 className="mt-4 font-display text-[1.6rem] md:text-[2rem] font-light leading-[1.12] text-[var(--text-primary)]">
                        Adquiere esta oportunidad por 10€.
                    </h2>
                    <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                        El pago se procesa de forma segura en Stripe. Después de la confirmación, recibirás un email y la oportunidad aparecerá en tu Área clientes.
                    </p>
                    <form action="/api/checkout/event" method="post" className="mt-6">
                        <input type="hidden" name="slug" value={article.slug} />
                        <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[var(--color-accent-500)] text-white text-[0.8rem] font-medium uppercase tracking-[0.16em] hover:bg-[var(--color-accent-400)] transition-colors">
                            <CreditCard size={15} /> Comprar por 10€
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function EventPurchasedNotice() {
    return (
        <div className="rounded-2xl border border-[#10b981]/40 bg-[#10b981]/5 p-6 text-[var(--text-primary)]">
            <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 text-[#10b981]" />
                <div>
                    <Bracketed variant="kicker">Oportunidad adquirida</Bracketed>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                        Esta oportunidad ya está asociada a tu perfil. También puedes verla desde el Área clientes.
                    </p>
                </div>
            </div>
        </div>
    );
}

function PaywallGate({ membershipHref, category, kind, isEvent }: { membershipHref: string; category: string; kind: string; isEvent: boolean }) {
    return (
        <div role="region" aria-label="Contenido reservado a clientes" className="relative overflow-hidden rounded-2xl border border-[var(--color-accent-500)] bg-[var(--surface-highlight)] p-8 md:p-10">
            <div className="flex items-start gap-4">
                <div className="rounded-full bg-[var(--color-accent-500)]/15 p-3 text-[var(--color-accent-400)]">
                    <Lock size={20} />
                </div>
                <div className="flex-1">
                    <Bracketed variant="tag">Contenido para clientes</Bracketed>
                    <h2 className="mt-4 font-display text-[1.6rem] md:text-[2rem] font-light leading-[1.12] text-[var(--text-primary)]">
                        {isEvent
                            ? "Esta oportunidad está reservada a clientes de Fortius."
                            : `El ${kind.toLowerCase()} completo está reservado a clientes de Fortius.`}
                    </h2>
                    <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                        {isEvent
                            ? `Accede al detalle completo del evento, los paquetes disponibles y la gestión desde el Área clientes en Oportunidades & Eventos dentro de ${category.toLowerCase()}.`
                            : `Accede al contenido íntegro, a los subproductos vinculados y a la biblioteca completa de ${category.toLowerCase()} desde el Área clientes.`}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href={membershipHref} className="inline-flex items-center px-5 py-2.5 rounded-sm bg-[var(--color-accent-500)] text-white text-[0.8rem] font-medium uppercase tracking-[0.16em] hover:bg-[var(--color-accent-400)] transition-colors">
                            Ver planes
                        </Link>
                        <Link href="/area-privada" className="inline-flex items-center px-5 py-2.5 rounded-sm border border-[var(--border-strong)] text-[var(--text-primary)] text-[0.8rem] font-medium uppercase tracking-[0.16em] hover:border-[var(--color-accent-500)] transition-colors">
                            Ya soy cliente
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}