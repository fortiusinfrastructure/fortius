import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { marked } from "marked";
import { requireConsultantUser } from "@/lib/auth";
import { getAdminArticleById } from "@/lib/admin/article-queries";
import { EditArticleForm } from "./EditArticleForm";

export const metadata: Metadata = {
    title: "Editar artículo | Fortius Consulting",
    robots: { index: false, follow: false },
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: PageProps) {
    await requireConsultantUser();
    const { id } = await params;
    const article = await getAdminArticleById(id);
    if (!article) notFound();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    return (
        <div className="pt-[var(--nav-height)] pb-24 md:pb-32 min-h-screen bg-[var(--color-neutral-1000,#0a111e)]">
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16">
                <Link
                    href="/area-privada/admin/articulos"
                    className="inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                    <ArrowLeft size={14} /> Volver al listado
                </Link>
                <h1 className="mt-6 font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-light leading-tight text-[var(--text-primary)]">
                    Editar artículo
                </h1>
                <p className="mt-2 text-[0.85rem] text-[var(--text-tertiary)] font-mono">{article.slug}</p>
                <div className="mt-10 bg-slate-50 rounded-xl p-6">
                    <EditArticleForm
                        articleId={article.id}
                        initialData={{
                            slug: article.slug,
                            title_es: article.title_es,
                            excerpt_es: article.excerpt_es,
                            content_es: article.content_format === "markdown" ? await marked.parse(article.content_es) : article.content_es,
                            category: article.category as "politica" | "sociedad-civil" | "home",
                            kind: article.kind as "comentario" | "informe" | "nota" | "evento" | "noticia" | "articulo",
                            access: article.access,
                            status: article.status,
                            is_featured: article.is_featured,
                            featured_image: article.featured_image,
                            published_at: article.published_at || new Date().toISOString().split("T")[0]!,
                            read_time: article.read_time,
                        }}
                        supabaseUrl={supabaseUrl}
                        supabaseAnonKey={supabaseAnonKey}
                    />
                </div>
            </div>
        </div>
    );
}
