'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { MultilangTabs } from './MultilangTabs';
import { RichTextEditor } from './RichTextEditor';
import { ImageUpload } from './ImageUpload';
import { FileUpload } from './FileUpload';

export interface TeamMemberOption {
    name: string;
    name_en?: string;
    role_es: string;
    role_en?: string;
    bio_es: string;
    bio_en?: string;
    image_url?: string;
    linkedin?: string;
    email?: string;
}

export interface ArticleAuthorFormData {
    name: string;
    name_en: string;
    role_es: string;
    role_en: string;
    bio_es: string;
    bio_en: string;
    image_url: string;
    linkedin: string;
    email: string;
}

export interface MaterialFormData {
    label: string;
    label_en: string;
    url: string;
    url_es?: string;
    url_en?: string;
}

export interface ArticleFormData {
    slug: string;
    title_es: string;
    title_en: string;
    subtitle_es: string;
    subtitle_en: string;
    excerpt_es: string;
    excerpt_en: string;
    content_es: string;
    content_en: string;
    content_kind: string;
    category: string;
    read_time: string;
    featured_image: string;
    featured_image_es: string;
    featured_image_en: string;
    pull_quote_es: string;
    pull_quote_en: string;
    main_image_caption_es: string;
    main_image_caption_en: string;
    is_featured: boolean;
    status: 'draft' | 'published' | 'archived';
    published_at: string;
    authors: ArticleAuthorFormData[];
    materials: MaterialFormData[];
}

const EMPTY_AUTHOR: ArticleAuthorFormData = {
    name: '',
    name_en: '',
    role_es: '',
    role_en: '',
    bio_es: '',
    bio_en: '',
    image_url: '',
    linkedin: '',
    email: '',
};

const EMPTY_MATERIAL: MaterialFormData = {
    label: '',
    label_en: '',
    url: '',
    url_es: '',
    url_en: '',
};

// Per content_kind required-field rules. EN side is enforced only when
// any EN field has been touched (graceful bilingual). ES side is always required.
function validateForm(form: ArticleFormData): string[] {
    const errors: string[] = [];
    const kind = form.content_kind;

    if (!form.title_es.trim()) errors.push('El título en español es obligatorio.');
    if (!form.content_es.trim()) errors.push('El contenido en español es obligatorio.');

    const hasAnyEn = Boolean(
        form.title_en.trim() ||
            form.subtitle_en.trim() ||
            form.excerpt_en.trim() ||
            form.content_en.trim() ||
            form.featured_image_en.trim()
    );

    const heroEs = form.featured_image_es.trim() || form.featured_image.trim();
    const heroEn = form.featured_image_en.trim() || form.featured_image.trim();

    if (kind === 'infografia') {
        if (!heroEs) errors.push('Infografía: imagen destacada (ES) obligatoria.');
        if (hasAnyEn && !heroEn) errors.push('Infografía: imagen destacada (EN) obligatoria.');
        const validMaterials = form.materials.filter((m) => {
            const urlEs = (m.url_es || m.url || '').trim();
            const urlEn = (m.url_en || m.url || '').trim();
            return m.label.trim() && urlEs && (!hasAnyEn || (m.label_en.trim() && urlEn));
        });
        if (validMaterials.length === 0)
            errors.push('Infografía: al menos un material descargable con etiqueta y URL.');
    }

    if ((kind === 'analisis' || kind === 'policy') && form.content_es.trim().length < 50) {
        errors.push(
            `${kind === 'analisis' ? 'Análisis' : 'Policy brief'}: el cuerpo en español es demasiado corto.`
        );
    }

    if (hasAnyEn) {
        if (!form.title_en.trim()) errors.push('Si añades contenido en inglés, el título (EN) es obligatorio.');
        if (!form.content_en.trim()) errors.push('Si añades contenido en inglés, el cuerpo (EN) es obligatorio.');
    }

    form.materials.forEach((m, i) => {
        const hasLabel = m.label.trim() || m.label_en.trim();
        const hasUrl = (m.url || m.url_es || m.url_en || '').trim();
        if (hasLabel && !hasUrl) errors.push(`Material #${i + 1}: falta la URL.`);
        if (hasUrl && !m.label.trim() && !m.label_en.trim())
            errors.push(`Material #${i + 1}: falta la etiqueta.`);
        if (m.label.trim() && !m.label_en.trim() && hasAnyEn)
            errors.push(`Material #${i + 1}: añade la etiqueta en inglés.`);
    });

    return errors;
}

const CONTENT_KINDS = [
    { value: 'analisis', label: 'Análisis' },
    { value: 'policy', label: 'Policy Brief' },
    { value: 'infografia', label: 'Infografía' },
    { value: 'entrevista', label: 'Entrevista' },
    { value: 'nota-prensa', label: 'Nota de prensa' },
    { value: 'reseña-evento', label: 'Reseña de evento' },
];

interface FieldProps {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}

function Field({ label, required, children }: FieldProps) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {children}
        </div>
    );
}

const inputCls =
    'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

interface ArticleEditorProps {
    initialData?: Partial<ArticleFormData>;
    onSave: (data: ArticleFormData) => Promise<void>;
    supabaseUrl: string;
    supabaseAnonKey: string;
    teamMembers?: TeamMemberOption[];
}

export function ArticleEditor({
    initialData,
    onSave,
    supabaseUrl,
    supabaseAnonKey,
    teamMembers,
}: ArticleEditorProps) {
    const [form, setForm] = useState<ArticleFormData>({
        slug: '',
        title_es: '',
        title_en: '',
        subtitle_es: '',
        subtitle_en: '',
        excerpt_es: '',
        excerpt_en: '',
        content_es: '',
        content_en: '',
        content_kind: 'analisis',
        category: '',
        read_time: '',
        featured_image: '',
        featured_image_es: '',
        featured_image_en: '',
        pull_quote_es: '',
        pull_quote_en: '',
        main_image_caption_es: '',
        main_image_caption_en: '',
        is_featured: false,
        status: 'draft',
        published_at: new Date().toISOString().split('T')[0],
        authors: [{ ...EMPTY_AUTHOR }],
        materials: [],
        ...initialData,
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const set = <K extends keyof ArticleFormData>(key: K, value: ArticleFormData[K]) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const setAuthor = (index: number, field: keyof ArticleAuthorFormData, value: string) =>
        setForm((prev) => {
            const authors = [...prev.authors];
            authors[index] = { ...authors[index], [field]: value };
            return { ...prev, authors };
        });

    const setMaterial = (index: number, field: keyof MaterialFormData, value: string) =>
        setForm((prev) => {
            const materials = [...prev.materials];
            materials[index] = { ...materials[index], [field]: value };
            return { ...prev, materials };
        });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        const validationErrors = validateForm(form);
        if (validationErrors.length > 0) {
            setError(validationErrors.join('\n'));
            return;
        }

        setSaving(true);
        try {
            await onSave(form);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al guardar.');
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            {/* Metadata */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                <h2 className="text-base font-semibold text-slate-900">Metadatos</h2>
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Slug" required>
                        <input
                            type="text"
                            value={form.slug}
                            onChange={(e) => set('slug', e.target.value)}
                            className={inputCls}
                            placeholder="mi-articulo-2026"
                            required
                        />
                    </Field>
                    <Field label="Tipo de contenido" required>
                        <select
                            value={form.content_kind}
                            onChange={(e) => set('content_kind', e.target.value)}
                            className={inputCls}
                        >
                            {CONTENT_KINDS.map((k) => (
                                <option key={k.value} value={k.value}>
                                    {k.label}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Categoría" required>
                        <input
                            type="text"
                            value={form.category}
                            onChange={(e) => set('category', e.target.value)}
                            className={inputCls}
                            placeholder="Migración · Movilidad"
                        />
                    </Field>
                    <Field label="Tiempo de lectura">
                        <input
                            type="text"
                            value={form.read_time}
                            onChange={(e) => set('read_time', e.target.value)}
                            className={inputCls}
                            placeholder="12 min"
                        />
                    </Field>
                    <Field label="Estado">
                        <select
                            value={form.status}
                            onChange={(e) =>
                                set('status', e.target.value as ArticleFormData['status'])
                            }
                            className={inputCls}
                        >
                            <option value="draft">Borrador</option>
                            <option value="published">Publicado</option>
                            <option value="archived">Archivado</option>
                        </select>
                    </Field>
                    <Field label="Fecha de publicación">
                        <input
                            type="date"
                            value={form.published_at}
                            onChange={(e) => set('published_at', e.target.value)}
                            className={inputCls}
                        />
                    </Field>
                </div>
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={form.is_featured}
                        onChange={(e) => set('is_featured', e.target.checked)}
                        className="rounded"
                    />
                    Artículo destacado
                </label>
            </section>

            {/* Multilang content */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                <h2 className="text-base font-semibold text-slate-900">Contenido</h2>
                <MultilangTabs>
                    {(locale) => (
                        <div className="space-y-4">
                            <Field label="Título" required={locale === 'es'}>
                                <input
                                    type="text"
                                    value={locale === 'es' ? form.title_es : form.title_en}
                                    onChange={(e) =>
                                        set(
                                            locale === 'es' ? 'title_es' : 'title_en',
                                            e.target.value
                                        )
                                    }
                                    className={inputCls}
                                    required={locale === 'es'}
                                />
                            </Field>
                            <Field label="Subtítulo">
                                <input
                                    type="text"
                                    value={locale === 'es' ? form.subtitle_es : form.subtitle_en}
                                    onChange={(e) =>
                                        set(
                                            locale === 'es' ? 'subtitle_es' : 'subtitle_en',
                                            e.target.value
                                        )
                                    }
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Extracto (resumen corto)">
                                <textarea
                                    value={locale === 'es' ? form.excerpt_es : form.excerpt_en}
                                    onChange={(e) =>
                                        set(
                                            locale === 'es' ? 'excerpt_es' : 'excerpt_en',
                                            e.target.value
                                        )
                                    }
                                    rows={3}
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Cita destacada (pull quote)">
                                <input
                                    type="text"
                                    value={
                                        locale === 'es' ? form.pull_quote_es : form.pull_quote_en
                                    }
                                    onChange={(e) =>
                                        set(
                                            locale === 'es' ? 'pull_quote_es' : 'pull_quote_en',
                                            e.target.value
                                        )
                                    }
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Pie de imagen principal">
                                <input
                                    type="text"
                                    value={
                                        locale === 'es'
                                            ? form.main_image_caption_es
                                            : form.main_image_caption_en
                                    }
                                    onChange={(e) =>
                                        set(
                                            locale === 'es'
                                                ? 'main_image_caption_es'
                                                : 'main_image_caption_en',
                                            e.target.value
                                        )
                                    }
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Contenido" required={locale === 'es'}>
                                <RichTextEditor
                                    value={locale === 'es' ? form.content_es : form.content_en}
                                    onChange={(html) =>
                                        set(
                                            locale === 'es' ? 'content_es' : 'content_en',
                                            html
                                        )
                                    }
                                />
                            </Field>
                        </div>
                    )}
                </MultilangTabs>
            </section>

            {/* Hero image (per-locale) */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                <div>
                    <h2 className="text-base font-semibold text-slate-900">Imagen principal</h2>
                    <p className="text-xs text-slate-500 mt-1">
                        Sube una imagen por idioma. La versión EN se usa en /en/...; si no hay
                        EN, se usa la ES como fallback.
                    </p>
                </div>
                <MultilangTabs>
                    {(locale) => (
                        <ImageUpload
                            value={
                                locale === 'es' ? form.featured_image_es : form.featured_image_en
                            }
                            onChange={(url) =>
                                set(
                                    locale === 'es' ? 'featured_image_es' : 'featured_image_en',
                                    url
                                )
                            }
                            supabaseUrl={supabaseUrl}
                            supabaseAnonKey={supabaseAnonKey}
                            folder="articles"
                            label={
                                locale === 'es'
                                    ? 'Imagen de portada (ES)'
                                    : 'Imagen de portada (EN)'
                            }
                        />
                    )}
                </MultilangTabs>
            </section>

            {/* Authors */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-slate-900">Autores</h2>
                    <button
                        type="button"
                        onClick={() =>
                            setForm((prev) => ({
                                ...prev,
                                authors: [...prev.authors, { ...EMPTY_AUTHOR }],
                            }))
                        }
                        className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800"
                    >
                        <Plus size={15} /> Añadir autor
                    </button>
                </div>

                {form.authors.map((author, i) => (
                    <div key={i} className="border border-slate-100 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">
                                Autor {i + 1}
                            </span>
                            {form.authors.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setForm((prev) => ({
                                            ...prev,
                                            authors: prev.authors.filter((_, idx) => idx !== i),
                                        }))
                                    }
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 size={15} />
                                </button>
                            )}
                        </div>
                        {/* Team member picker */}
                        {teamMembers && teamMembers.length > 0 && (
                            <Field label="Seleccionar del equipo IEAM">
                                <select
                                    value=""
                                    onChange={(e) => {
                                        const idx = parseInt(e.target.value, 10);
                                        if (isNaN(idx)) return;
                                        const m = teamMembers[idx];
                                        setForm((prev) => {
                                            const authors = [...prev.authors];
                                            authors[i] = {
                                                name: m.name,
                                                name_en: m.name_en ?? m.name,
                                                role_es: m.role_es,
                                                role_en: m.role_en ?? '',
                                                bio_es: m.bio_es,
                                                bio_en: m.bio_en ?? '',
                                                image_url: m.image_url ?? '',
                                                linkedin: m.linkedin ?? '',
                                                email: m.email ?? '',
                                            };
                                            return { ...prev, authors };
                                        });
                                    }}
                                    className={inputCls}
                                >
                                    <option value="">— Seleccionar miembro del equipo —</option>
                                    {teamMembers.map((m, idx) => (
                                        <option key={idx} value={idx}>
                                            {m.name} · {m.role_es}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            {(
                                [
                                    ['name', 'Nombre (ES)'],
                                    ['name_en', 'Nombre (EN)'],
                                    ['role_es', 'Cargo (ES)'],
                                    ['role_en', 'Cargo (EN)'],
                                    ['email', 'Email'],
                                    ['linkedin', 'LinkedIn URL'],
                                ] as [keyof ArticleAuthorFormData, string][]
                            ).map(([field, label]) => (
                                <Field key={field} label={label} required={field === 'name'}>
                                    <input
                                        type="text"
                                        value={author[field]}
                                        onChange={(e) => setAuthor(i, field, e.target.value)}
                                        className={inputCls}
                                        required={field === 'name'}
                                    />
                                </Field>
                            ))}
                        </div>
                        <Field label="Imagen del autor (URL)">
                            <input
                                type="url"
                                value={author.image_url}
                                onChange={(e) => setAuthor(i, 'image_url', e.target.value)}
                                className={inputCls}
                                placeholder="/team/author.jpg"
                            />
                        </Field>
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Biografía (ES)">
                                <textarea
                                    value={author.bio_es}
                                    onChange={(e) => setAuthor(i, 'bio_es', e.target.value)}
                                    rows={3}
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Biografía (EN)">
                                <textarea
                                    value={author.bio_en}
                                    onChange={(e) => setAuthor(i, 'bio_en', e.target.value)}
                                    rows={3}
                                    className={inputCls}
                                />
                            </Field>
                        </div>
                    </div>
                ))}
            </section>

            {/* Materials */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-slate-900">
                        Materiales descargables
                    </h2>
                    <button
                        type="button"
                        onClick={() =>
                            setForm((prev) => ({
                                ...prev,
                                materials: [...prev.materials, { ...EMPTY_MATERIAL }],
                            }))
                        }
                        className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800"
                    >
                        <Plus size={15} /> Añadir material
                    </button>
                </div>

                {form.materials.length === 0 && (
                    <p className="text-sm text-slate-400">Sin materiales descargables.</p>
                )}

                {form.materials.map((mat, i) => (
                    <div
                        key={i}
                        className="border border-slate-100 rounded-lg p-4 space-y-3 relative"
                    >
                        <button
                            type="button"
                            onClick={() =>
                                setForm((prev) => ({
                                    ...prev,
                                    materials: prev.materials.filter((_, idx) => idx !== i),
                                }))
                            }
                            className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                            aria-label="Eliminar material"
                        >
                            <Trash2 size={15} />
                        </button>
                        <span className="text-sm font-medium text-slate-700">
                            Material {i + 1}
                        </span>
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Etiqueta (ES)" required>
                                <input
                                    type="text"
                                    value={mat.label}
                                    onChange={(e) => setMaterial(i, 'label', e.target.value)}
                                    className={inputCls}
                                    placeholder="Descargar PDF"
                                />
                            </Field>
                            <Field label="Etiqueta (EN)">
                                <input
                                    type="text"
                                    value={mat.label_en}
                                    onChange={(e) => setMaterial(i, 'label_en', e.target.value)}
                                    className={inputCls}
                                    placeholder="Download PDF"
                                />
                            </Field>
                        </div>
                        <FileUpload
                            value={mat.url}
                            onChange={(url) => setMaterial(i, 'url', url)}
                            supabaseUrl={supabaseUrl}
                            supabaseAnonKey={supabaseAnonKey}
                            label="Documento por defecto (fallback) *"
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <FileUpload
                                value={mat.url_es ?? ''}
                                onChange={(url) => setMaterial(i, 'url_es', url)}
                                supabaseUrl={supabaseUrl}
                                supabaseAnonKey={supabaseAnonKey}
                                label="Documento (ES, opcional — sobrescribe el fallback)"
                            />
                            <FileUpload
                                value={mat.url_en ?? ''}
                                onChange={(url) => setMaterial(i, 'url_en', url)}
                                supabaseUrl={supabaseUrl}
                                supabaseAnonKey={supabaseAnonKey}
                                label="Documento (EN, opcional — sobrescribe el fallback)"
                            />
                        </div>
                    </div>
                ))}
            </section>

            {/* Submit */}
            {error && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 whitespace-pre-line">
                    {error}
                </div>
            )}

            <div className="flex gap-3 justify-end pb-8">
                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#0A2540] hover:bg-[#1a3a5c] text-white px-6 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50 transition-colors"
                >
                    {saving && <Loader2 size={15} className="animate-spin" />}
                    {saving ? 'Guardando…' : 'Guardar artículo'}
                </button>
            </div>
        </form>
    );
}
