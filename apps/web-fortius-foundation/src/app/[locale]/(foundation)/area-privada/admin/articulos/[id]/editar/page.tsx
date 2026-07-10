import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireFoundationAdminUser } from "@/lib/private/auth";
import { getAdminArticleById } from "@/lib/admin/article-queries";
import { EditArticleForm } from "./EditArticleForm";

export const metadata: Metadata = {
    title: "Editar artículo | Fundación Fortius",
    robots: { index: false, follow: false },
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: PageProps) {
    await requireFoundationAdminUser();
    const { id } = await params;
    const article = await getAdminArticleById(id);
    if (!article) notFound();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    return (
        <div className="pt-[var(--nav-height)] pb-24 md:pb-32 min-h-screen" style={{ background: "var(--surface-primary)" }}>
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16">
                <Link
                    href="/area-privada/admin/articulos"
                    className="inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.16em] transition-colors"
                    style={{ color: "var(--text-tertiary)" }}
                >
                    <ArrowLeft size={14} /> Volver al listado
                </Link>
                <h1 className="mt-6 font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-light leading-tight" style={{ color: "var(--text-primary)" }}>
                    Editar artículo
                </h1>
                <p className="mt-2 text-[0.85rem] font-mono" style={{ color: "var(--text-tertiary)" }}>{article.slug}</p>
                <div className="mt-10 bg-slate-50 rounded-xl p-6">
                    <EditArticleForm
                        articleId={article.id}
                        initialData={{
                            slug: article.slug,
                            title_es: article.title_es,
                            excerpt_es: article.excerpt_es,
                            content_es: article.content_es,
                            title_en: article.title_en,
                            excerpt_en: article.excerpt_en,
                            content_en: article.content_en,
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
