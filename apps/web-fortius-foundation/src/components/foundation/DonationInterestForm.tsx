"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { submitFoundationContact } from "@/lib/actions/contact";

const ENTITY_OPTIONS = [
  "Fundación Fortius España",
  "Fortius Foundation United States",
] as const;

const TARGET_OPTIONS = [
  "Free Press Forum",
  "Escuela Hispánica",
  "Instituto Español de Análisis Migratorio",
  "Principios",
  "El trabajo general de Fortius",
] as const;

export function DonationInterestForm() {
  const [entity, setEntity] = useState<(typeof ENTITY_OPTIONS)[number]>(ENTITY_OPTIONS[0]);
  const [target, setTarget] = useState<(typeof TARGET_OPTIONS)[number]>(TARGET_OPTIONS[4]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setIsSuccess(false);

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const organization = String(data.get("organization") ?? "").trim();
    const amount = String(data.get("amount") ?? "").trim();
    const notes = String(data.get("notes") ?? "").trim();

    const payload = new FormData();
    payload.set("name", name);
    payload.set("email", email);
    payload.set("organization", organization);
    payload.set("subject", `Donaciones · ${entity} · ${target}`);
    payload.set(
      "message",
      [
        `Entidad elegida: ${entity}`,
        `Destino de la donación: ${target}`,
        `Importe orientativo: ${amount || "No indicado"}`,
        "",
        notes || "Sin comentarios adicionales.",
      ].join("\n"),
    );

    try {
      const result = await submitFoundationContact(payload);
      setMessage(result.message);
      setIsSuccess(result.success);
      form.reset();
      setEntity(ENTITY_OPTIONS[0]);
      setTarget(TARGET_OPTIONS[4]);
    } catch {
      setMessage("No hemos podido registrar tu interés de donación. Inténtalo de nuevo.");
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-6 md:p-8"
    >
      <p className="text-[0.92rem] leading-relaxed text-[var(--text-secondary)]">
        Indícanos desde qué entidad quieres donar y a qué proyecto o línea de trabajo quieres apoyar.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <input name="name" required placeholder="Nombre completo" className="w-full border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-[0.92rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-accent-500)] focus:outline-none" />
        <input type="email" name="email" required placeholder="Email" className="w-full border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-[0.92rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-accent-500)] focus:outline-none" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input name="organization" placeholder="Organización o empresa" className="w-full border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-[0.92rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-accent-500)] focus:outline-none" />
        <input name="amount" placeholder="Importe orientativo" className="w-full border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-[0.92rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-accent-500)] focus:outline-none" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <select value={entity} onChange={(event) => setEntity(event.target.value as (typeof ENTITY_OPTIONS)[number])} className="w-full border border-[var(--border-subtle)] bg-[var(--surface-primary)] px-4 py-3 text-[0.92rem] text-[var(--text-primary)] focus:border-[var(--color-accent-500)] focus:outline-none">
          {ENTITY_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <select value={target} onChange={(event) => setTarget(event.target.value as (typeof TARGET_OPTIONS)[number])} className="w-full border border-[var(--border-subtle)] bg-[var(--surface-primary)] px-4 py-3 text-[0.92rem] text-[var(--text-primary)] focus:border-[var(--color-accent-500)] focus:outline-none">
          {TARGET_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <textarea name="notes" rows={5} placeholder="Si quieres, añade contexto sobre la donación, periodicidad o condiciones." className="w-full resize-none border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-[0.92rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-accent-500)] focus:outline-none" />

      <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 bg-[var(--color-accent-500)] px-5 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white disabled:opacity-60">
        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {isSubmitting ? "Enviando" : "Quiero donar"}
      </button>

      {message && (
        <p className={`text-[0.82rem] leading-relaxed ${isSuccess ? "text-[#10b981]" : "text-[#f59e0b]"}`}>
          {message}
        </p>
      )}
    </form>
  );
}