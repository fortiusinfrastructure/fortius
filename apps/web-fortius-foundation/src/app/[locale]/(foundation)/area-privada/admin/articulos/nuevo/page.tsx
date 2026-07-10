import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireFoundationAdminUser } from "@/lib/private/auth";
import { NewArticleForm } from "./NewArticleForm";

export const metadata: Metadata = {
    title: "Nuevo artículo | Fundación Fortius",
    robots: { index: false, follow: false },
};

export default async function NewArticlePage() {
    await requireFoundationAdminUser();

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
                    Nuevo artículo
                </h1>
                <div className="mt-10 bg-slate-50 rounded-xl p-6">
                    <NewArticleForm supabaseUrl={supabaseUrl} supabaseAnonKey={supabaseAnonKey} />
                </div>
            </div>
        </div>
    );
}
