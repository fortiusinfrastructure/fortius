import { getTranslations } from "next-intl/server";
import { Bracketed } from "@/components/system/Bracketed";
import type { Article } from "@/lib/articles";
import {
    getArticleLeadData,
    getArticleSectionTitles,
    getExecutiveSummary,
    getFirstNarrativeParagraph,
} from "@/lib/article-display";

export async function ArticleFormatBlocks({ article }: { article: Article }) {
    if (article.kind === "evento") return null;

    const t = await getTranslations("article");
    const lead = getArticleLeadData(article);
    const summary = getExecutiveSummary(lead.markdown);
    const firstParagraph = getFirstNarrativeParagraph(lead.markdown);
    const sections = getArticleSectionTitles(lead.markdown);

    if (article.kind === "comentario") {
        return (
            <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <article className="xl:col-span-7 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-6 md:p-7">
                    <Bracketed variant="kicker">{t("format-thesis-kicker")}</Bracketed>
                    <p className="mt-4 text-[1rem] leading-relaxed text-[var(--text-secondary)]">
                        {firstParagraph ?? article.excerpt}
                    </p>
                </article>
                <article className="xl:col-span-5 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6 md:p-7">
                    <Bracketed variant="kicker">{t("format-reading-axes")}</Bracketed>
                    <ul className="mt-5 space-y-3">
                        {(sections.length > 0 ? sections : [t("format-reading-fallback-1"), t("format-reading-fallback-2"), t("format-reading-fallback-3")]).slice(0, 4).map((item) => (
                            <li key={item} className="flex items-start gap-3 text-[0.94rem] leading-relaxed text-[var(--text-secondary)]">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-accent-500)]" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </article>
            </section>
        );
    }

    if (article.kind === "informe") {
        return (
            <StructuredReadingBlock
                kicker={t("format-exec-summary")}
                body={summary ?? firstParagraph ?? article.excerpt}
                listTitle={t("format-report-map")}
                items={sections}
                fallbackItems={[t("format-report-fallback-1"), t("format-report-fallback-2"), t("format-report-fallback-3")]}
            />
        );
    }

    if (article.kind === "nota") {
        return (
            <StructuredReadingBlock
                kicker={t("format-signals")}
                body={summary ?? firstParagraph ?? article.excerpt}
                listTitle={t("format-watch")}
                items={sections}
                fallbackItems={[t("format-signals-fallback-1"), t("format-signals-fallback-2"), t("format-signals-fallback-3")]}
            />
        );
    }

    return (
        <StructuredReadingBlock
            kicker={t("format-article-map")}
            body={summary ?? firstParagraph ?? article.excerpt}
            listTitle={t("format-main-sections")}
            items={sections}
            fallbackItems={[t("format-article-fallback-1"), t("format-article-fallback-2"), t("format-article-fallback-3")]}
        />
    );
}

function StructuredReadingBlock({
    kicker,
    body,
    listTitle,
    items,
    fallbackItems,
}: {
    kicker: string;
    body: string;
    listTitle: string;
    items: string[];
    fallbackItems: string[];
}) {
    const list = items.length > 0 ? items : fallbackItems;

    return (
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <article className="xl:col-span-8 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-6 md:p-7">
                <Bracketed variant="kicker">{kicker}</Bracketed>
                <p className="mt-4 text-[1rem] leading-relaxed text-[var(--text-secondary)]">{body}</p>
            </article>
            <article className="xl:col-span-4 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6 md:p-7">
                <Bracketed variant="kicker">{listTitle}</Bracketed>
                <ul className="mt-5 space-y-3">
                    {list.slice(0, 5).map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[0.94rem] leading-relaxed text-[var(--text-secondary)]">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-accent-500)]" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </article>
        </section>
    );
}
