"use client";

/**
 * Consulting-specific article editor.
 *
 * ES-only. Wraps the shared RichTextEditor + ImageUpload from @fortius/admin-ui
 * and binds them to the Consulting article model (category, kind, access,
 * status, featured_image, published_at, is_featured). Content is stored as HTML
 * — the public renderer branches on metadata.content_format === 'html'.
 */
import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { RichTextEditor, ImageUpload } from "@fortius/admin-ui";

export interface ConsultingArticleFormData {
    slug: string;
    title_es: string;
    excerpt_es: string;
    content_es: string;
    category: "politica" | "sociedad-civil" | "home";
    kind: "comentario" | "informe" | "nota" | "evento" | "noticia" | "articulo";
    access: "public" | "paid";
    status: "draft" | "published" | "archived";
    is_featured: boolean;
    featured_image: string;
    published_at: string;
    read_time: string;
}

const CATEGORIES = [
    { value: "politica", label: "Política" },
    { value: "sociedad-civil", label: "Sociedad Civil" },
    { value: "home", label: "Home (transversal)" },
] as const;

const KINDS = [
    { value: "comentario", label: "Comentario editorial" },
    { value: "informe", label: "Informe estratégico" },
    { value: "nota", label: "Nota de inteligencia" },
    { value: "articulo", label: "Artículo de análisis" },
    { value: "noticia", label: "Noticia" },
    { value: "evento", label: "Evento" },
] as const;

const ACCESS = [
    { value: "public", label: "Público" },
    { value: "paid", label: "Solo clientes" },
] as const;

const STATUS = [
    { value: "draft", label: "Borrador" },
    { value: "published", label: "Publicado" },
    { value: "archived", label: "Archivado" },
] as const;

const EMPTY: ConsultingArticleFormData = {
    slug: "",
    title_es: "",
    excerpt_es: "",
    content_es: "",
    category: "sociedad-civil",
    kind: "articulo",
    access: "paid",
    status: "draft",
    is_featured: false,
    featured_image: "",
    published_at: new Date().toISOString().split("T")[0]!,
    read_time: "",
};

interface Props {
    initialData?: Partial<ConsultingArticleFormData>;
    onSave: (data: ConsultingArticleFormData) => Promise<void>;
    onDelete?: () => Promise<void>;
    supabaseUrl: string;
    supabaseAnonKey: string;
}

const inputCls =
    "w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500";

export function ConsultingArticleEditor({ initialData, onSave, onDelete, supabaseUrl, supabaseAnonKey }: Props) {
    const [form, setForm] = useState<ConsultingArticleFormData>({ ...EMPTY, ...initialData });
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function set<K extends keyof ConsultingArticleFormData>(key: K, value: ConsultingArticleFormData[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        if (!form.slug.trim() || !form.title_es.trim() || !form.content_es.trim()) {
            setError("Slug, título y contenido son obligatorios.");
            return;
        }
        setSaving(true);
        try {
            await onSave(form);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al guardar el artículo.");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (!onDelete) return;
        if (!confirm("¿Eliminar este artículo? Esta acción no se puede deshacer.")) return;
        setDeleting(true);
        try {
            await onDelete();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al eliminar el artículo.");
            setDeleting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                <h2 className="text-base font-semibold text-slate-900">Metadatos</h2>
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Slug" required>
                        <input type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)} className={inputCls} placeholder="mi-articulo-2026" required />
                    </Field>
                    <Field label="Tipo de contenido">
                        <select value={form.kind} onChange={(e) => set("kind", e.target.value as ConsultingArticleFormData["kind"])} className={inputCls}>
                            {KINDS.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
                        </select>
                    </Field>
                    <Field label="Vertical / Categoría">
                        <select value={form.category} onChange={(e) => set("category", e.target.value as ConsultingArticleFormData["category"])} className={inputCls}>
                            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                    </Field>
                    <Field label="Acceso">
                        <select value={form.access} onChange={(e) => set("access", e.target.value as ConsultingArticleFormData["access"])} className={inputCls}>
                            {ACCESS.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
                        </select>
                    </Field>
                    <Field label="Estado">
                        <select value={form.status} onChange={(e) => set("status", e.target.value as ConsultingArticleFormData["status"])} className={inputCls}>
                            {STATUS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                    </Field>
                    <Field label="Fecha de publicación">
                        <input type="date" value={form.published_at} onChange={(e) => set("published_at", e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="Tiempo de lectura (opcional)">
                        <input type="text" value={form.read_time} onChange={(e) => set("read_time", e.target.value)} className={inputCls} placeholder="8 min" />
                    </Field>
                    <Field label="Destacado">
                        <label className="flex items-center gap-2 text-sm text-slate-700 pt-2">
                            <input type="checkbox" checked={form.is_featured} onChange={(e) => set("is_featured", e.target.checked)} />
                            Marcar como destacado
                        </label>
                    </Field>
                </div>
            </section>

            <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                <h2 className="text-base font-semibold text-slate-900">Contenido</h2>
                <Field label="Título" required>
                    <input type="text" value={form.title_es} onChange={(e) => set("title_es", e.target.value)} className={inputCls} required />
                </Field>
                <Field label="Extracto / Resumen breve">
                    <textarea value={form.excerpt_es} onChange={(e) => set("excerpt_es", e.target.value)} className={`${inputCls} min-h-[80px]`} placeholder="2–3 líneas para listas y vista previa." />
                </Field>
                <Field label="Cuerpo del artículo" required>
                    <RichTextEditor value={form.content_es} onChange={(html) => set("content_es", html)} placeholder="Escribe el artículo aquí. Usa encabezados, listas, citas e imágenes." />
                </Field>
            </section>

            <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-2">
                <h2 className="text-base font-semibold text-slate-900">Imagen de portada</h2>
                <p className="text-xs text-slate-500">Recomendado 1600×900. Se usa en cards y en la cabecera del artículo.</p>
                <ImageUpload value={form.featured_image} onChange={(url) => set("featured_image", url)} supabaseUrl={supabaseUrl} supabaseAnonKey={supabaseAnonKey} folder="articles" label="Portada" />
            </section>

            {error && <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</div>}

            <div className="flex items-center justify-between gap-3">
                <div>
                    {onDelete && (
                        <button type="button" onClick={handleDelete} disabled={deleting || saving} className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50">
                            {deleting ? "Eliminando…" : "Eliminar artículo"}
                        </button>
                    )}
                </div>
                <button type="submit" disabled={saving || deleting} className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 disabled:opacity-50">
                    {saving && <Loader2 size={16} className="animate-spin" />}
                    {saving ? "Guardando…" : "Guardar"}
                </button>
            </div>
        </form>
    );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
    return (
        <label className="block">
            <span className="block text-xs font-medium text-slate-600 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </span>
            {children}
        </label>
    );
}
