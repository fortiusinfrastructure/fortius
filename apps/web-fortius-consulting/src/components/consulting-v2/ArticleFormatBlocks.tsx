import { Bracketed } from "@/components/system/Bracketed";
import type { Article } from "@/lib/articles";
import {
    getArticleLeadData,
    getArticleSectionTitles,
    getExecutiveSummary,
    getFirstNarrativeParagraph,
} from "@/lib/article-display";

export function ArticleFormatBlocks({ article }: { article: Article }) {
    if (article.kind === "evento") return null;

    const lead = getArticleLeadData(article);
    const summary = getExecutiveSummary(lead.markdown);
    const firstParagraph = getFirstNarrativeParagraph(lead.markdown);
    const sections = getArticleSectionTitles(lead.markdown);

    if (article.kind === "comentario") {
        return (
            <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <article className="xl:col-span-7 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-6 md:p-7">
                    <Bracketed variant="kicker">Tesis del comentario</Bracketed>
                    <p className="mt-4 text-[1rem] leading-relaxed text-[var(--text-secondary)]">
                        {firstParagraph ?? article.excerpt}
                    </p>
                </article>
                <article className="xl:col-span-5 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6 md:p-7">
                    <Bracketed variant="kicker">Ejes de lectura</Bracketed>
                    <ul className="mt-5 space-y-3">
                        {(sections.length > 0 ? sections : ["Contexto político", "Tesis central", "Implicaciones estratégicas"]).slice(0, 4).map((item) => (
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
                kicker="Resumen ejecutivo"
                body={summary ?? firstParagraph ?? article.excerpt}
                listTitle="Mapa del informe"
                items={sections}
                fallbackItems={["Diagnóstico", "Riesgos estructurales", "Conclusiones estratégicas"]}
            />
        );
    }

    if (article.kind === "nota") {
        return (
            <StructuredReadingBlock
                kicker="Señales clave"
                body={summary ?? firstParagraph ?? article.excerpt}
                listTitle="Qué seguir"
                items={sections}
                fallbackItems={["Movimiento de actores", "Riesgos emergentes", "Impacto inmediato"]}
            />
        );
    }

    return (
        <StructuredReadingBlock
            kicker="Mapa del artículo"
            body={summary ?? firstParagraph ?? article.excerpt}
            listTitle="Secciones principales"
            items={sections}
            fallbackItems={["Marco de análisis", "Desarrollo", "Conclusiones"]}
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
