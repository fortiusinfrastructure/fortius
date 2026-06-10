import {
    CalendarDays,
    Lock,
    MessageSquareQuote,
    Newspaper,
    FileSearch,
    NotebookText,
} from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import {
    categoryLabel,
    formatPublishedDate,
    kindLabel,
    type Article,
    type ArticleKind,
} from "@/lib/articles";

const KIND_ICONS: Record<ArticleKind, typeof MessageSquareQuote> = {
    comentario: MessageSquareQuote,
    informe: FileSearch,
    nota: NotebookText,
    evento: CalendarDays,
    noticia: Newspaper,
    articulo: Newspaper,
};

interface ArticleKindPanelProps {
    article: Article;
    author: string | null;
}

export function ArticleKindPanel({ article, author }: ArticleKindPanelProps) {
    const Icon = KIND_ICONS[article.kind] ?? Newspaper;
    const isMembersOnly = article.access === "paid" || article.kind === "evento";

    return (
        <aside className="space-y-6 lg:sticky lg:top-28">
            <section className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-6">
                <div className="flex items-center gap-3">
                    <span className="rounded-full bg-[var(--color-accent-500)]/12 p-3 text-[var(--color-accent-400)]">
                        <Icon size={18} />
                    </span>
                    <Bracketed variant="tag">{kindLabel(article.kind)}</Bracketed>
                </div>
                <dl className="mt-5 space-y-4 text-[0.92rem]">
                    <MetaRow label="Formato" value={kindLabel(article.kind)} />
                    <MetaRow label="Área" value={categoryLabel(article.category)} />
                    {article.published_at && (
                        <MetaRow label="Fecha" value={formatPublishedDate(article.published_at)} />
                    )}
                    {author && <MetaRow label="Firma" value={author} />}
                    <MetaRow label="Acceso" value={isMembersOnly ? "Clientes" : "Abierto"} />
                    {article.kind === "evento" && (
                        <MetaRow label="Sección" value="Área clientes · Oportunidades & Eventos" />
                    )}
                    {isMembersOnly && (
                        <div className="flex items-center gap-2 rounded-xl border border-[var(--color-accent-500)]/25 bg-[var(--color-accent-500)]/8 px-3 py-2 text-[var(--color-accent-300)]">
                            <Lock size={14} />
                            <span>Contenido visible al desbloquear el Área clientes.</span>
                        </div>
                    )}
                </dl>
            </section>
        </aside>
    );
}

function MetaRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-3 last:border-b-0 last:pb-0">
            <dt className="text-[var(--text-tertiary)] uppercase tracking-[0.12em] text-[0.68rem]">{label}</dt>
            <dd className="text-right text-[var(--text-primary)]">{value}</dd>
        </div>
    );
}