"use client";

import { useState, useCallback, useRef } from "react";

interface FileResult {
  filename: string;
  status: "pending" | "ok" | "error";
  slug?: string;
  title?: string;
  error?: string;
}

export default function ArticulosUploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<FileResult[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const docxFiles = Array.from(incoming).filter((f) => f.name.toLowerCase().endsWith(".docx"));
    if (!docxFiles.length) return;
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name));
      return [...prev, ...docxFiles.filter((f) => !existing.has(f.name))];
    });
    setResults([]);
  }, []);

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
    setResults((prev) => prev.filter((r) => r.filename !== name));
  };

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.length || uploading) return;
    setUploading(true);
    setResults(files.map((f) => ({ filename: f.name, status: "pending" })));

    const formData = new FormData();
    for (const file of files) formData.append("files[]", file);

    try {
      const res = await fetch("/api/admin/articulos/convert", { method: "POST", body: formData });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: res.statusText }));
        setResults(files.map((f) => ({ filename: f.name, status: "error", error })));
        return;
      }
      const { results: serverResults } = await res.json();
      setResults(serverResults);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error de red";
      setResults(files.map((f) => ({ filename: f.name, status: "error", error: msg })));
    } finally {
      setUploading(false);
    }
  };

  const successCount = results.filter((r) => r.status === "ok").length;
  const errorCount = results.filter((r) => r.status === "error").length;

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 space-y-10">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-400)]">Admin · Blog</p>
        <h1 className="text-2xl font-semibold tracking-tight">Subir entradas al blog</h1>
        <p className="text-sm text-neutral-500">
          Sube uno o varios archivos <code>.docx</code> y se importarán directamente a la base de datos.
          Usa el formato <code>YYYY_MM_DD. Título.docx</code>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          role="button"
          tabIndex={0}
          aria-label="Zona de carga de archivos .docx"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={[
            "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-8 py-12 text-center transition-colors",
            dragging ? "border-[var(--color-accent-500)] bg-[rgba(22,163,74,0.04)]" : "border-neutral-200 hover:border-neutral-400",
          ].join(" ")}
        >
          <svg className="mb-3 h-8 w-8 text-neutral-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
          </svg>
          <p className="text-sm text-neutral-600">
            Arrastra archivos aquí o{" "}
            <span className="font-medium underline underline-offset-2">haz clic para seleccionar</span>
          </p>
          <p className="mt-1 text-xs text-neutral-400">Solo archivos .docx — puedes seleccionar varios</p>
          <input ref={inputRef} type="file" accept=".docx" multiple className="sr-only" onChange={(e) => e.target.files && addFiles(e.target.files)} />
        </div>

        {files.length > 0 && (
          <ul className="divide-y divide-neutral-100 rounded-lg border border-neutral-200">
            {files.map((file) => {
              const result = results.find((r) => r.filename === file.name);
              return (
                <li key={file.name} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-neutral-800">{file.name}</p>
                    {result?.status === "ok" && <p className="truncate text-xs text-emerald-600">✓ {result.title ?? result.slug}</p>}
                    {result?.status === "error" && <p className="truncate text-xs text-red-500">✗ {result.error}</p>}
                    {result?.status === "pending" && <p className="text-xs text-neutral-400">Procesando…</p>}
                  </div>
                  <StatusBadge status={result?.status} />
                  {!uploading && (
                    <button type="button" onClick={() => removeFile(file.name)} aria-label={`Eliminar ${file.name}`} className="ml-1 shrink-0 text-neutral-400 hover:text-neutral-700">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                      </svg>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {results.length > 0 && !uploading && (
          <div className={["rounded-lg border px-4 py-3 text-sm", errorCount === 0 ? "border-emerald-200 bg-emerald-50 text-emerald-800" : successCount === 0 ? "border-red-200 bg-red-50 text-red-800" : "border-amber-200 bg-amber-50 text-amber-800"].join(" ")}>
            {successCount > 0 && <span>{successCount} entrada{successCount !== 1 ? "s" : ""} importada{successCount !== 1 ? "s" : ""} correctamente. </span>}
            {errorCount > 0 && <span>{errorCount} archivo{errorCount !== 1 ? "s" : ""} con error.</span>}
          </div>
        )}

        <button type="submit" disabled={!files.length || uploading} className="w-full rounded-lg bg-[var(--color-accent-500)] px-5 py-3 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40 hover:opacity-90">
          {uploading ? "Importando…" : `Importar ${files.length ? `${files.length} archivo${files.length !== 1 ? "s" : ""}` : "entradas"}`}
        </button>
      </form>

      <details className="group rounded-lg border border-neutral-200 text-sm">
        <summary className="cursor-pointer list-none px-4 py-3 font-medium text-neutral-700 [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between">
            Convención de nombres de archivo
            <svg className="h-4 w-4 text-neutral-400 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </span>
        </summary>
        <div className="border-t border-neutral-200 px-4 py-4 text-neutral-600 space-y-3">
          <p>El nombre del archivo determina la fecha y el título automáticamente:</p>
          <pre className="overflow-x-auto rounded bg-neutral-50 p-3 text-xs leading-relaxed">{`YYYY_MM_DD. Título del artículo.docx

Ejemplos:
  2025_04_17. Darse a los demás.docx
  2026_01_10. El futuro de la sociedad civil.docx`}</pre>
        </div>
      </details>
    </main>
  );
}

function StatusBadge({ status }: { status?: string }) {
  if (!status || status === "pending") return <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-neutral-300" />;
  if (status === "ok") return (
    <span className="shrink-0 text-emerald-500">
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
      </svg>
    </span>
  );
  return (
    <span className="shrink-0 text-red-400">
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
      </svg>
    </span>
  );
}
