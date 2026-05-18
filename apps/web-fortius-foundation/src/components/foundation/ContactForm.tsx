"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { submitFoundationContact } from "@/lib/actions/contact";

const SUBJECT_OPTIONS = [
  "Colaboración",
  "Ayudas",
  "Donaciones",
  "Boletín",
  "Otros",
] as const;

export function ContactForm() {
  const [subject, setSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setIsSuccess(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await submitFoundationContact(formData);
      setSubmitMessage(result.message);
      setIsSuccess(result.success);
      form.reset();
      setSubject("");
    } catch {
      setSubmitMessage(
        "No hemos podido registrar tu mensaje. Inténtalo de nuevo.",
      );
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
        Registramos todas las consultas en el canal central de la Fundación y las
        derivamos al área adecuada.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          name="name"
          required
          placeholder="Nombre completo"
          className="w-full border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-[0.92rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-accent-500)] focus:outline-none transition-colors"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="w-full border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-[0.92rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-accent-500)] focus:outline-none transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          name="organization"
          placeholder="Organización"
          className="w-full border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-[0.92rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-accent-500)] focus:outline-none transition-colors"
        />
        <select
          name="subject"
          required
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className="w-full border border-[var(--border-subtle)] bg-[var(--surface-primary)] px-4 py-3 text-[0.92rem] text-[var(--text-primary)] focus:border-[var(--color-accent-500)] focus:outline-none transition-colors"
        >
          <option value="" disabled>
            Motivo de contacto
          </option>
          {SUBJECT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <textarea
        name="message"
        required
        rows={6}
        placeholder="Cuéntanos brevemente tu consulta, propuesta o necesidad."
        className="w-full resize-none border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-[0.92rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-accent-500)] focus:outline-none transition-colors"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 bg-[var(--color-accent-500)] px-5 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--color-accent-400)] disabled:opacity-60"
      >
        {isSubmitting ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Send size={16} />
        )}
        {isSubmitting ? "Enviando" : "Enviar mensaje"}
      </button>

      {submitMessage && (
        <p
          className={`text-[0.82rem] leading-relaxed ${
            isSuccess ? "text-[#10b981]" : "text-[#f59e0b]"
          }`}
        >
          {submitMessage}
        </p>
      )}
    </form>
  );
}