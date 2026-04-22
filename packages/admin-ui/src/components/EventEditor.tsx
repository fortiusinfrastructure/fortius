'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { MultilangTabs } from './MultilangTabs';
import { RichTextEditor } from './RichTextEditor';
import { ImageUpload } from './ImageUpload';

export interface SpeakerFormData {
    name: string;
    role_es: string;
    role_en: string;
    group_name_es: string;
    group_name_en: string;
}

export interface AgendaItemFormData {
    time: string;
    title: string;
    title_en: string;
    speaker: string;
    speaker_en: string;
}

export interface EventFormData {
    slug: string;
    title_es: string;
    title_en: string;
    subtitle_es: string;
    subtitle_en: string;
    excerpt_es: string;
    excerpt_en: string;
    content_es: string;
    content_en: string;
    category: string;
    format: string;
    format_en: string;
    event_date: string;
    end_date: string;
    location: string;
    organizer: string;
    image_url: string;
    highlight_image_url: string;
    agenda_title_es: string;
    agenda_title_en: string;
    agenda: AgendaItemFormData[];
    registration_open: boolean;
    is_featured: boolean;
    status: 'draft' | 'published' | 'archived';
    speakers: SpeakerFormData[];
}

const EMPTY_SPEAKER: SpeakerFormData = {
    name: '',
    role_es: '',
    role_en: '',
    group_name_es: '',
    group_name_en: '',
};

const EMPTY_AGENDA_ITEM: AgendaItemFormData = {
    time: '',
    title: '',
    title_en: '',
    speaker: '',
    speaker_en: '',
};

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

interface EventEditorProps {
    initialData?: Partial<EventFormData>;
    onSave: (data: EventFormData) => Promise<void>;
    supabaseUrl: string;
    supabaseAnonKey: string;
}

export function EventEditor({ initialData, onSave, supabaseUrl, supabaseAnonKey }: EventEditorProps) {
    const [form, setForm] = useState<EventFormData>({
        slug: '',
        title_es: '',
        title_en: '',
        subtitle_es: '',
        subtitle_en: '',
        excerpt_es: '',
        excerpt_en: '',
        content_es: '',
        content_en: '',
        category: '',
        format: '',
        format_en: '',
        event_date: '',
        end_date: '',
        location: '',
        organizer: 'IEAM',
        image_url: '',
        highlight_image_url: '',
        agenda_title_es: 'Programa del evento',
        agenda_title_en: 'Event Programme',
        agenda: [],
        registration_open: false,
        is_featured: false,
        status: 'draft',
        speakers: [],
        ...initialData,
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const set = <K extends keyof EventFormData>(key: K, value: EventFormData[K]) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const setSpeaker = (index: number, field: keyof SpeakerFormData, value: string) =>
        setForm((prev) => {
            const speakers = [...prev.speakers];
            speakers[index] = { ...speakers[index], [field]: value };
            return { ...prev, speakers };
        });

    const setAgendaItem = (index: number, field: keyof AgendaItemFormData, value: string) =>
        setForm((prev) => {
            const agenda = [...prev.agenda];
            agenda[index] = { ...agenda[index], [field]: value };
            return { ...prev, agenda };
        });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
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
                <h2 className="text-base font-semibold text-slate-900">Datos del evento</h2>
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Slug" required>
                        <input
                            type="text"
                            value={form.slug}
                            onChange={(e) => set('slug', e.target.value)}
                            className={inputCls}
                            placeholder="taller-roma-2026"
                            required
                        />
                    </Field>
                    <Field label="Categoría">
                        <input
                            type="text"
                            value={form.category}
                            onChange={(e) => set('category', e.target.value)}
                            className={inputCls}
                            placeholder="Taller / Conferencia / Seminario"
                        />
                    </Field>
                    <Field label="Fecha de inicio" required>
                        <input
                            type="date"
                            value={form.event_date}
                            onChange={(e) => set('event_date', e.target.value)}
                            className={inputCls}
                            required
                        />
                    </Field>
                    <Field label="Fecha de fin">
                        <input
                            type="date"
                            value={form.end_date}
                            onChange={(e) => set('end_date', e.target.value)}
                            className={inputCls}
                        />
                    </Field>
                    <Field label="Ubicación">
                        <input
                            type="text"
                            value={form.location}
                            onChange={(e) => set('location', e.target.value)}
                            className={inputCls}
                            placeholder="Roma, Italia"
                        />
                    </Field>
                    <Field label="Organizador">
                        <input
                            type="text"
                            value={form.organizer}
                            onChange={(e) => set('organizer', e.target.value)}
                            className={inputCls}
                        />
                    </Field>
                    <Field label="Formato (ES)">
                        <input
                            type="text"
                            value={form.format}
                            onChange={(e) => set('format', e.target.value)}
                            className={inputCls}
                            placeholder="Chatham House"
                        />
                    </Field>
                    <Field label="Formato (EN)">
                        <input
                            type="text"
                            value={form.format_en}
                            onChange={(e) => set('format_en', e.target.value)}
                            className={inputCls}
                        />
                    </Field>
                    <Field label="Estado">
                        <select
                            value={form.status}
                            onChange={(e) =>
                                set('status', e.target.value as EventFormData['status'])
                            }
                            className={inputCls}
                        >
                            <option value="draft">Borrador</option>
                            <option value="published">Publicado</option>
                            <option value="archived">Archivado</option>
                        </select>
                    </Field>
                </div>
                <div className="flex gap-6">
                    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.is_featured}
                            onChange={(e) => set('is_featured', e.target.checked)}
                            className="rounded"
                        />
                        Evento destacado
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.registration_open}
                            onChange={(e) => set('registration_open', e.target.checked)}
                            className="rounded"
                        />
                        Registro abierto
                    </label>
                </div>
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
                                        set(locale === 'es' ? 'title_es' : 'title_en', e.target.value)
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
                            <Field label="Resumen corto">
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
                            <Field label="Título del programa">
                                <input
                                    type="text"
                                    value={
                                        locale === 'es'
                                            ? form.agenda_title_es
                                            : form.agenda_title_en
                                    }
                                    onChange={(e) =>
                                        set(
                                            locale === 'es'
                                                ? 'agenda_title_es'
                                                : 'agenda_title_en',
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
                                        set(locale === 'es' ? 'content_es' : 'content_en', html)
                                    }
                                />
                            </Field>
                        </div>
                    )}
                </MultilangTabs>
            </section>

            {/* Images */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
                <h2 className="text-base font-semibold text-slate-900">Imágenes</h2>
                <ImageUpload
                    value={form.image_url}
                    onChange={(url) => set('image_url', url)}
                    supabaseUrl={supabaseUrl}
                    supabaseAnonKey={supabaseAnonKey}
                    folder="events"
                    label="Imagen de portada (hero)"
                />
                <ImageUpload
                    value={form.highlight_image_url}
                    onChange={(url) => set('highlight_image_url', url)}
                    supabaseUrl={supabaseUrl}
                    supabaseAnonKey={supabaseAnonKey}
                    folder="events"
                    label="Imagen secundaria (highlight)"
                />
            </section>

            {/* Agenda */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-slate-900">Programa</h2>
                    <button
                        type="button"
                        onClick={() =>
                            setForm((prev) => ({
                                ...prev,
                                agenda: [...prev.agenda, { ...EMPTY_AGENDA_ITEM }],
                            }))
                        }
                        className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800"
                    >
                        <Plus size={15} /> Añadir sesión
                    </button>
                </div>

                {form.agenda.length === 0 && (
                    <p className="text-sm text-slate-400">Sin sesiones de programa.</p>
                )}

                {form.agenda.map((item, i) => (
                    <div key={i} className="grid grid-cols-5 gap-3 items-start border border-slate-100 rounded-lg p-3">
                        <Field label="Hora">
                            <input
                                type="text"
                                value={item.time}
                                onChange={(e) => setAgendaItem(i, 'time', e.target.value)}
                                className={inputCls}
                                placeholder="09:30"
                            />
                        </Field>
                        <Field label="Título (ES)">
                            <input
                                type="text"
                                value={item.title}
                                onChange={(e) => setAgendaItem(i, 'title', e.target.value)}
                                className={inputCls}
                            />
                        </Field>
                        <Field label="Título (EN)">
                            <input
                                type="text"
                                value={item.title_en}
                                onChange={(e) => setAgendaItem(i, 'title_en', e.target.value)}
                                className={inputCls}
                            />
                        </Field>
                        <Field label="Ponente">
                            <input
                                type="text"
                                value={item.speaker}
                                onChange={(e) => setAgendaItem(i, 'speaker', e.target.value)}
                                className={inputCls}
                            />
                        </Field>
                        <div className="flex items-end">
                            <button
                                type="button"
                                onClick={() =>
                                    setForm((prev) => ({
                                        ...prev,
                                        agenda: prev.agenda.filter((_, idx) => idx !== i),
                                    }))
                                }
                                className="mb-0.5 text-red-500 hover:text-red-700 p-2"
                            >
                                <Trash2 size={15} />
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            {/* Speakers */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-slate-900">Ponentes</h2>
                    <button
                        type="button"
                        onClick={() =>
                            setForm((prev) => ({
                                ...prev,
                                speakers: [...prev.speakers, { ...EMPTY_SPEAKER }],
                            }))
                        }
                        className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800"
                    >
                        <Plus size={15} /> Añadir ponente
                    </button>
                </div>

                {form.speakers.length === 0 && (
                    <p className="text-sm text-slate-400">Sin ponentes registrados.</p>
                )}

                {form.speakers.map((speaker, i) => (
                    <div key={i} className="border border-slate-100 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-slate-700">Ponente {i + 1}</span>
                            <button
                                type="button"
                                onClick={() =>
                                    setForm((prev) => ({
                                        ...prev,
                                        speakers: prev.speakers.filter((_, idx) => idx !== i),
                                    }))
                                }
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 size={15} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Nombre" required>
                                <input
                                    type="text"
                                    value={speaker.name}
                                    onChange={(e) => setSpeaker(i, 'name', e.target.value)}
                                    className={inputCls}
                                    required
                                />
                            </Field>
                            <Field label="Cargo (ES)">
                                <input
                                    type="text"
                                    value={speaker.role_es}
                                    onChange={(e) => setSpeaker(i, 'role_es', e.target.value)}
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Cargo (EN)">
                                <input
                                    type="text"
                                    value={speaker.role_en}
                                    onChange={(e) => setSpeaker(i, 'role_en', e.target.value)}
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Grupo (ES)">
                                <input
                                    type="text"
                                    value={speaker.group_name_es}
                                    onChange={(e) =>
                                        setSpeaker(i, 'group_name_es', e.target.value)
                                    }
                                    className={inputCls}
                                />
                            </Field>
                        </div>
                    </div>
                ))}
            </section>

            {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    {error}
                </p>
            )}

            <div className="flex gap-3 justify-end pb-8">
                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#0A2540] hover:bg-[#1a3a5c] text-white px-6 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50 transition-colors"
                >
                    {saving && <Loader2 size={15} className="animate-spin" />}
                    {saving ? 'Guardando…' : 'Guardar evento'}
                </button>
            </div>
        </form>
    );
}
