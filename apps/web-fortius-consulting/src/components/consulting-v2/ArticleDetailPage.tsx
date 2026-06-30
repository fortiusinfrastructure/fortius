import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, CreditCard, Lock } from "lucide-react";
import { marked } from "marked";
import { getLocale, getTranslations } from "next-intl/server";
import { createAdminClient, createServerClient } from "@fortius/database";
import { Bracketed } from "@/components/system/Bracketed";
import {
    estimateReadTime,
    formatPublishedDate,
    getArticleOriginalSource,
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
        title: `${article.title} | Fortius Consulting`,
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

function stripHtmlTags(html: string): string {
    return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
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
                .eq("organization_id", org.id)
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
    const locale = await getLocale();
    const t = await getTranslations("article");

    const kindStr = t(`kind-${article.kind}` as Parameters<typeof t>[0]);
    const categoryStr = t(`cat-${article.category}` as Parameters<typeof t>[0]);

    const cover = getArticleCover(article.category);
    const imageSources = getArticleImageSources(article);
    const isHtmlBody = article.content_format === "html";
    const lead = getArticleLeadData(article);
    const isMembersOnly = article.access === "paid" || article.kind === "evento";
    const access = await getViewerArticleAccess(article);
    const previewParagraphs = article.kind === "evento" ? 2 : 3;
    let html: string;
    if (isHtmlBody) {
        html = isMembersOnly && !access.canReadFull
            ? `${article.excerpt || stripHtmlTags(lead.html || article.content_markdown).slice(0, 600)}…`
            : (lead.html || article.content_markdown);
    } else {
        const bodyMarkdown = isMembersOnly && !access.canReadFull ? paidPreview(lead.markdown, previewParagraphs) : lead.markdown;
        html = await renderMarkdown(bodyMarkdown);
    }
    const readTimeBasis = isHtmlBody ? stripHtmlTags(article.content_markdown) : lead.markdown;
    const readTime = article.read_time || estimateReadTime(readTimeBasis);
    const summary = isHtmlBody
        ? (article.excerpt || stripHtmlTags(article.content_markdown).slice(0, 240))
        : getArticleSummary(article);
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
                                    <Bracketed variant="tag">{kindStr} · {categoryStr}</Bracketed>
                                    {isMembersOnly && (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-[var(--color-accent-500)] text-[var(--color-accent-400)] uppercase tracking-[0.16em] text-[0.7rem]">
                                            <Lock size={12} /> {t("clients-badge")}
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
                                    <span>{lead.author ?? t("author-fallback")}</span>
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
                                className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-light prose-headings:tracking-tight prose-p:text-[var(--text-secondary)] prose-p:leading-[1.85] prose-p:text-[1.05rem] prose-h1:text-[2rem] prose-h2:text-[1.7rem] prose-h3:text-[1.3rem] prose-a:text-[var(--color-accent-400)] prose-strong:text-[var(--text-primary)] prose-ul:text-[var(--text-secondary)] prose-ol:text-[var(--text-secondary)] prose-li:leading-[1.8] prose-li:marker:text-[var(--color-accent-500)] prose-blockquote:border-[var(--color-accent-500)] prose-blockquote:bg-[var(--surface-secondary)] prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:text-[var(--text-secondary)] prose-blockquote:leading-[1.8] prose-hr:border-[var(--border-subtle)] prose-code:text-[var(--text-secondary)]"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />

                            {originalSource && (
                                <section className="border-t border-[var(--border-subtle)] pt-8">
                                    <Bracketed variant="kicker">{t("original-source")}</Bracketed>
                                    <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                                        {t("original-source-published")}{" "}
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
                                    <EventPurchaseGate article={article} t={t} />
                                ) : (
                                    <PaywallGate membershipHref={membershipHref} category={categoryStr} kind={kindStr} isEvent={article.kind === "evento"} t={t} />
                                )
                            )}

                            {article.kind === "evento" && access.hasPurchasedEvent && <EventPurchasedNotice t={t} />}

                            {isMembersOnly && article.subproducts.length > 0 && (
                                <section className="space-y-5 border-t border-[var(--border-subtle)] pt-10">
                                    <Bracketed variant="kicker">{t("subproducts-title")}</Bracketed>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {article.subproducts.map((item, index) => (
                                            <div key={`${item.title}-${index}`} className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5">
                                                <div className="flex items-center gap-2 text-[var(--color-accent-400)]">
                                                    <Lock size={14} />
                                                    <span className="text-[0.72rem] uppercase tracking-[0.16em]">{t("reserved-badge")}</span>
                                                </div>
                                                <h3 className="mt-3 font-display text-[1.2rem] font-light text-[var(--text-primary)]">{item.title}</h3>
                                                <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--text-secondary)]">
                                                    {item.content || t("subproduct-fallback")}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        <div className="lg:col-span-4">
                            <ArticleKindPanel article={article} author={lead.author} locale={locale} />
                        </div>
                    </div>
                </section>
            </article>
        </main>
    );
}

type TranslationFn = Awaited<ReturnType<typeof getTranslations<"article">>>;

function EventPurchaseGate({ article, t }: { article: Article; t: TranslationFn }) {
    return (
        <div role="region" aria-label={t("event-purchase-tag")} className="relative overflow-hidden rounded-2xl border border-[var(--color-accent-500)] bg-[var(--surface-highlight)] p-8 md:p-10">
            <div className="flex items-start gap-4">
                <div className="rounded-full bg-[var(--color-accent-500)]/15 p-3 text-[var(--color-accent-400)]">
                    <CreditCard size={20} />
                </div>
                <div className="flex-1">
                    <Bracketed variant="tag">{t("event-purchase-tag")}</Bracketed>
                    <h2 className="mt-4 font-display text-[1.6rem] md:text-[2rem] font-light leading-[1.12] text-[var(--text-primary)]">
                        {t("event-purchase-title")}
                    </h2>
                    <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                        {t("event-purchase-desc")}
                    </p>
                    <form action="/api/checkout/event" method="post" className="mt-6">
                        <input type="hidden" name="slug" value={article.slug} />
                        <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[var(--color-accent-500)] text-white text-[0.8rem] font-medium uppercase tracking-[0.16em] hover:bg-[var(--color-accent-400)] transition-colors">
                            <CreditCard size={15} /> {t("event-purchase-cta")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function EventPurchasedNotice({ t }: { t: TranslationFn }) {
    return (
        <div className="rounded-2xl border border-[#10b981]/40 bg-[#10b981]/5 p-6 text-[var(--text-primary)]">
            <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 text-[#10b981]" />
                <div>
                    <Bracketed variant="kicker">{t("event-purchased-tag")}</Bracketed>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                        {t("event-purchased-desc")}
                    </p>
                </div>
            </div>
        </div>
    );
}

function PaywallGate({ membershipHref, category, kind, isEvent, t }: { membershipHref: string; category: string; kind: string; isEvent: boolean; t: TranslationFn }) {
    return (
        <div role="region" aria-label={t("paywall-tag")} className="relative overflow-hidden rounded-2xl border border-[var(--color-accent-500)] bg-[var(--surface-highlight)] p-8 md:p-10">
            <div className="flex items-start gap-4">
                <div className="rounded-full bg-[var(--color-accent-500)]/15 p-3 text-[var(--color-accent-400)]">
                    <Lock size={20} />
                </div>
                <div className="flex-1">
                    <Bracketed variant="tag">{t("paywall-tag")}</Bracketed>
                    <h2 className="mt-4 font-display text-[1.6rem] md:text-[2rem] font-light leading-[1.12] text-[var(--text-primary)]">
                        {isEvent
                            ? t("paywall-title-event")
                            : t("paywall-title", { kind: kind.toLowerCase() })}
                    </h2>
                    <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                        {isEvent
                            ? t("paywall-desc-event", { category: category.toLowerCase() })
                            : t("paywall-desc", { category: category.toLowerCase() })}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href={membershipHref} className="inline-flex items-center px-5 py-2.5 rounded-sm bg-[var(--color-accent-500)] text-white text-[0.8rem] font-medium uppercase tracking-[0.16em] hover:bg-[var(--color-accent-400)] transition-colors">
                            {t("paywall-see-plans")}
                        </Link>
                        <Link href="/area-privada" className="inline-flex items-center px-5 py-2.5 rounded-sm border border-[var(--border-strong)] text-[var(--text-primary)] text-[0.8rem] font-medium uppercase tracking-[0.16em] hover:border-[var(--color-accent-500)] transition-colors">
                            {t("paywall-already-client")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
