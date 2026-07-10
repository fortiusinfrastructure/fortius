import type { Metadata } from "next";
import Link from "next/link";
import { Plus, FileText, Eye, EyeOff, Archive, Star } from "lucide-react";
import { requireFoundationAdminUser } from "@/lib/private/auth";
import { listAdminArticles } from "@/lib/admin/article-queries";

export const metadata: Metadata = {
    title: "Gestionar artículos | Fundación Fortius",
    robots: { index: false, follow: false },
};

const STATUS_BADGE: Record<string, { label: string; cls: string; Icon: typeof Eye }> = {
    published: { label: "Publicado", cls: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30", Icon: Eye },
    draft: { label: "Borrador", cls: "bg-amber-500/10 text-amber-300 border-amber-500/30", Icon: EyeOff },
    archived: { label: "Archivado", cls: "bg-gray-500/10 text-gray-300 border-gray-500/30", Icon: Archive },
};

function formatDate(iso: string | null) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function AdminArticlesPage() {
    await requireFoundationAdminUser();
    const articles = await listAdminArticles();

    return (
        <div className="pt-[var(--nav-height)] pb-24 md:pb-32 min-h-screen" style={{ background: "var(--surface-primary)" }}>
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16">
                <div className="flex items-center justify-between flex-wrap gap-4 border-b pb-8" style={{ borderColor: "var(--border-subtle)" }}>
                    <div>
                        <p className="text-[0.7rem] uppercase tracking-[0.16em]" style={{ color: "var(--text-tertiary)" }}>CMS · Blog</p>
                        <h1 className="mt-2 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-tight" style={{ color: "var(--text-primary)" }}>
                            Gestionar artículos
                        </h1>
                        <p className="mt-2 text-[0.9rem]" style={{ color: "var(--text-secondary)" }}>
                            {articles.length} {articles.length === 1 ? "artículo" : "artículos"} en el blog.
                        </p>
                    </div>
                    <Link
                        href="/area-privada/admin/articulos/nuevo"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm rounded-lg transition-colors"
                        style={{ background: "var(--color-accent-500)" }}
                    >
                        <Plus size={16} /> Nuevo artículo
                    </Link>
                </div>

                <div className="mt-10 space-y-3">
                    {articles.length > 0 ? articles.map((a) => {
                        const badge = STATUS_BADGE[a.status] ?? STATUS_BADGE.draft!;
                        return (
                            <Link
                                key={a.id}
                                href={`/area-privada/admin/articulos/${a.id}/editar`}
                                className="block p-5 border transition-colors"
                                style={{ borderColor: "var(--border-subtle)", background: "var(--surface-secondary)" }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                                    <div className="md:col-span-8">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <FileText size={14} style={{ color: "var(--text-tertiary)" }} />
                                            <h3 className="font-display text-[1.05rem]" style={{ color: "var(--text-primary)" }}>{a.title}</h3>
                                            {a.isFeatured && <Star size={14} className="text-amber-400" />}
                                        </div>
                                        <p className="mt-1 text-[0.75rem] font-mono" style={{ color: "var(--text-tertiary)" }}>{a.slug}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-[0.65rem] uppercase tracking-widest border ${badge.cls}`}>
                                            <badge.Icon size={11} /> {badge.label}
                                        </span>
                                    </div>
                                    <div className="md:col-span-2 md:text-right text-[0.75rem] tabular-nums" style={{ color: "var(--text-tertiary)" }}>
                                        <p>Pub: {formatDate(a.publishedAt)}</p>
                                        <p>Edit: {formatDate(a.updatedAt)}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    }) : (
                        <div className="p-6 border text-[0.9rem]" style={{ borderColor: "var(--border-subtle)", background: "var(--surface-secondary)", color: "var(--text-secondary)" }}>
                            No hay artículos todavía. Crea el primero.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
