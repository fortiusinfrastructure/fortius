"use client";

import { useState, useTransition } from "react";
import { submitGrantApplication } from "@/lib/actions/grant";
import type { Ayuda } from "@/content/ayudas";

const inputBase =
  "w-full border border-[var(--border-default)] bg-[var(--surface-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-colors focus:border-[var(--color-accent-400)]";
const labelBase =
  "block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--text-tertiary)] mb-1.5";

export function GrantApplicationForm({ ayuda }: { ayuda: Ayuda }) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; error?: string } | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("grantSlug", ayuda.slug);
    formData.set("grantTitle", ayuda.title);

    startTransition(async () => {
      const res = await submitGrantApplication(formData);
      setResult(res);
    });
  }

  if (result?.success) {
    return (
      <div className="border border-[var(--color-accent-400)]/40 bg-[var(--color-accent-500)]/10 p-8 text-center">
        <p className="font-display text-[1.4rem] font-light text-[var(--text-primary)] mb-3">
          Solicitud enviada
        </p>
        <p className="text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
          Hemos recibido tu solicitud para <strong>{ayuda.title}</strong>. El equipo de Fundación Fortius
          la revisará y se pondrá en contacto contigo en los próximos días.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelBase}>
            Nombre completo *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Tu nombre completo"
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelBase}>
            Correo electrónico *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="tu@email.com"
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelBase}>
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+34 600 000 000"
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor="organization" className={labelBase}>
            Organización
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            placeholder="Nombre de tu organización (opcional)"
            className={inputBase}
          />
        </div>
      </div>

      <div>
        <label htmlFor="amount" className={labelBase}>
          Importe solicitado
        </label>
        <input
          id="amount"
          name="amount"
          type="text"
          placeholder="Ej. 5.000 €"
          className={inputBase}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelBase}>
          Descripción del proyecto o situación *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          placeholder="Describe brevemente tu proyecto o situación y el impacto esperado."
          className={`${inputBase} resize-y`}
        />
      </div>

      <div>
        <label htmlFor="motivation" className={labelBase}>
          Motivación y uso de los fondos *
        </label>
        <textarea
          id="motivation"
          name="motivation"
          required
          rows={4}
          placeholder="Explica cómo utilizarías la ayuda y por qué es necesaria."
          className={`${inputBase} resize-y`}
        />
      </div>

      {result?.error && (
        <p
          className="border px-4 py-3 text-sm"
          style={{
            background: "rgba(220,38,38,0.07)",
            borderColor: "rgba(220,38,38,0.25)",
            color: "#dc2626",
          }}
        >
          {result.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 bg-[var(--color-accent-500)] px-8 py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Enviando solicitud…" : "Enviar solicitud"}
      </button>
    </form>
  );
}
