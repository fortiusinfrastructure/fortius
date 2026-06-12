'use client';

import React, { useRef, useState } from 'react';
import { Upload, X, Loader2, FileText } from 'lucide-react';

interface FileUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove?: () => void;
    bucket?: string;
    folder?: string;
    supabaseUrl: string;
    supabaseAnonKey: string;
    label?: string;
}

const ALLOWED_EXT = ['pdf', 'doc', 'docx'];

/** Storage keys must be ASCII-safe. Strip diacritics and unsafe chars. */
function sanitizeName(name: string): string {
    return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^A-Za-z0-9._-]/g, '-');
}

/** Derive a human-friendly filename from a stored URL for the preview chip. */
function fileNameFromUrl(url: string): string {
    try {
        const u = new URL(url);
        const dl = u.searchParams.get('download');
        if (dl) return dl;
        return decodeURIComponent(u.pathname.split('/').pop() ?? 'documento');
    } catch {
        return url.split('/').pop() ?? 'documento';
    }
}

export function FileUpload({
    value,
    onChange,
    onRemove,
    bucket = 'library-docs',
    folder = 'ieam',
    supabaseUrl,
    supabaseAnonKey,
    label = 'Documento',
}: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleFile(file: File) {
        const ext = (file.name.split('.').pop() ?? '').toLowerCase();
        if (!ALLOWED_EXT.includes(ext)) {
            setError('Solo se permiten archivos PDF, DOC o DOCX.');
            return;
        }
        if (file.size > 50 * 1024 * 1024) {
            setError('El documento no puede superar 50 MB.');
            return;
        }

        setUploading(true);
        setError(null);

        const key = `${folder}/${Date.now()}-${sanitizeName(file.name)}`;

        try {
            const res = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${key}`, {
                method: 'POST',
                headers: {
                    apikey: supabaseAnonKey,
                    Authorization: `Bearer ${supabaseAnonKey}`,
                },
                body: file,
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.message ?? 'Error al subir el documento.');
            }

            // `?download=<name>` forces Content-Disposition: attachment with a
            // clean filename (cross-origin links ignore the HTML download attr).
            const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${key}?download=${encodeURIComponent(file.name)}`;
            onChange(publicUrl);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido.');
        } finally {
            setUploading(false);
        }
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">{label}</label>

            {value ? (
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    <FileText size={16} className="shrink-0 text-blue-600" />
                    <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 truncate text-sm text-slate-700 hover:underline"
                    >
                        {fileNameFromUrl(value)}
                    </a>
                    <button
                        type="button"
                        onClick={() => {
                            onChange('');
                            onRemove?.();
                        }}
                        className="shrink-0 rounded-full p-1 text-slate-500 hover:bg-white hover:text-slate-700"
                        aria-label="Eliminar documento"
                    >
                        <X size={14} />
                    </button>
                </div>
            ) : (
                <div
                    role="button"
                    tabIndex={0}
                    onClick={() => inputRef.current?.click()}
                    onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        uploading
                            ? 'border-slate-300 bg-slate-50'
                            : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/30'
                    }`}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center gap-2 text-slate-500">
                            <Loader2 size={22} className="animate-spin" />
                            <span className="text-sm">Subiendo…</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-500">
                            <Upload size={22} />
                            <span className="text-sm">
                                Arrastra un documento o{' '}
                                <span className="text-blue-600 underline">haz clic para seleccionar</span>
                            </span>
                            <span className="text-xs text-slate-400">PDF, DOC, DOCX · Máx 50 MB</span>
                        </div>
                    )}
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                    e.target.value = '';
                }}
            />

            {/* Manual URL fallback */}
            <input
                type="url"
                placeholder="O pega una URL de documento…"
                className="w-full text-sm border border-slate-200 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onBlur={(e) => {
                    if (e.target.value) onChange(e.target.value);
                }}
            />

            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
