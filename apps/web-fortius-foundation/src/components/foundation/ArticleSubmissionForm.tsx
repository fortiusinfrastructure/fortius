"use client";

import { useState } from "react";
import { Loader2, Paperclip, Send } from "lucide-react";
import { submitFoundationContact } from "@/lib/email/actions";

export function ArticleSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setIsSuccess(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("subject", "Propuesta de artículo");

    const notes = String(formData.get("message") ?? "").trim();
    const attachment = formData.get("attachment");
    const attachmentText =
      attachment instanceof File && attachment.size > 0
        ? `Archivo adjunto: ${attachment.name}`
        : "Sin archivo adjunto.";

    formData.set(
      "message",
      [
        "Nueva propuesta editorial enviada desde el blog.",
        "",
        notes || "Sin mensaje adicional.",
        "",
        attachmentText,
      ].join("\n"),
    );

    try {
      const result = await submitFoundationContact(formData);
      setSubmitMessage(result.message);
      setIsSuccess(result.success);
      form.reset();
      setFileName("");
    } catch (error) {
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "No hemos podido registrar tu propuesta. Inténtalo de nuevo.",
      );
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-4 lg:grid-cols-2">
      <input
        type="text"
        name="name"
        required
        placeholder="Nombre completo"
        className="w-full border border-[var(--color-accent-400)] bg-transparent px-4 py-3 text-[0.92rem] text-white placeholder:text-[var(--color-accent-100)]/70 focus:border-[var(--color-accent-200)] focus:outline-none"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        className="w-full border border-[var(--color-accent-400)] bg-transparent px-4 py-3 text-[0.92rem] text-white placeholder:text-[var(--color-accent-100)]/70 focus:border-[var(--color-accent-200)] focus:outline-none"
      />
      <input
        type="text"
        name="organization"
        placeholder="Organización o medio (opcional)"
        className="w-full border border-[var(--color-accent-400)] bg-transparent px-4 py-3 text-[0.92rem] text-white placeholder:text-[var(--color-accent-100)]/70 focus:border-[var(--color-accent-200)] focus:outline-none lg:col-span-2"
      />
      <textarea
        name="message"
        rows={5}
        placeholder="Cuéntanos brevemente el enfoque de tu artículo."
        className="w-full resize-none border border-[var(--color-accent-400)] bg-transparent px-4 py-3 text-[0.92rem] text-white placeholder:text-[var(--color-accent-100)]/70 focus:border-[var(--color-accent-200)] focus:outline-none lg:col-span-2"
      />
      <label className="flex cursor-pointer items-center gap-3 border border-dashed border-[var(--color-accent-300)] px-4 py-3 text-[0.88rem] text-[var(--color-accent-100)] transition-colors hover:border-[var(--color-accent-200)] lg:col-span-2">
        <Paperclip size={16} />
        <span>{fileName || "Adjuntar artículo (PDF, DOC, DOCX, TXT o MD · máx. 8 MB)"}</span>
        <input
          type="file"
          name="attachment"
          accept=".pdf,.doc,.docx,.txt,.md"
          className="hidden"
          onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
        />
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent-500)] px-6 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-white disabled:opacity-60 lg:w-fit"
      >
        {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
        {isSubmitting ? "Enviando" : "Mándanos tu artículo"}
      </button>
      {submitMessage && (
        <p className={`text-[0.82rem] leading-relaxed lg:col-span-2 ${isSuccess ? "text-[#bbf7d0]" : "text-[#fde68a]"}`}>
          {submitMessage}
        </p>
      )}
    </form>
  );
}