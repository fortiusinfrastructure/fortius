'use client';

import React, { useRef, useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove?: () => void;
    bucket?: string;
    folder?: string;
    supabaseUrl: string;
    supabaseAnonKey: string;
    label?: string;
}

export function ImageUpload({
    value,
    onChange,
    onRemove,
    bucket = 'content-media',
    folder = 'images',
    supabaseUrl,
    supabaseAnonKey,
    label = 'Imagen',
}: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleFile(file: File) {
        if (!file.type.startsWith('image/')) {
            setError('Solo se permiten imágenes.');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setError('La imagen no puede superar 10 MB.');
            return;
        }

        setUploading(true);
        setError(null);

        const ext = file.name.split('.').pop();
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        try {
            const formData = new FormData();
            formData.append('', file);

            const res = await fetch(
                `${supabaseUrl}/storage/v1/object/${bucket}/${fileName}`,
                {
                    method: 'POST',
                    headers: {
                        apikey: supabaseAnonKey,
                        Authorization: `Bearer ${supabaseAnonKey}`,
                    },
                    body: file,
                }
            );

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.message ?? 'Error al subir la imagen.');
            }

            const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${fileName}`;
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
                <div className="relative w-full max-w-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg border border-slate-200"
                    />
                    <button
                        type="button"
                        onClick={() => {
                            onChange('');
                            onRemove?.();
                        }}
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white text-slate-700 rounded-full p-1 shadow-sm"
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
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                        uploading
                            ? 'border-slate-300 bg-slate-50'
                            : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/30'
                    }`}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center gap-2 text-slate-500">
                            <Loader2 size={24} className="animate-spin" />
                            <span className="text-sm">Subiendo…</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-500">
                            <Upload size={24} />
                            <span className="text-sm">
                                Arrastra una imagen o{' '}
                                <span className="text-blue-600 underline">haz clic para seleccionar</span>
                            </span>
                            <span className="text-xs text-slate-400">JPG, PNG, WebP · Máx 10 MB</span>
                        </div>
                    )}
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                    e.target.value = '';
                }}
            />

            {/* Manual URL fallback */}
            <div className="flex gap-2 items-center">
                <input
                    type="url"
                    placeholder="O pega una URL de imagen…"
                    className="flex-1 text-sm border border-slate-200 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onBlur={(e) => {
                        if (e.target.value) onChange(e.target.value);
                    }}
                />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
