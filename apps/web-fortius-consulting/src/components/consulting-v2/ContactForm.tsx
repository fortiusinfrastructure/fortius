"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { submitContact } from "@/lib/actions/contact";

function normalizeSubject(value: string | null, options: readonly string[]): string {
    if (!value) return "";
    const match = options.find(
        (option) => option.toLowerCase() === value.toLowerCase(),
    );
    return match ?? "";
}

interface ContactFormProps {
    expertSlug?: string;
    initialSubject?: string | null;
    contextPlan?: string | null;
    contextVertical?: string | null;
}

export function ContactForm({
    expertSlug = "contacto-web",
    initialSubject = "",
    contextPlan = "",
    contextVertical = "",
}: ContactFormProps) {
    const t = useTranslations("contact");
    const SUBJECT_OPTIONS = [t("subject-services"), t("subject-press"), t("subject-other")] as const;
    const normalizedInitialSubject = normalizeSubject(initialSubject, SUBJECT_OPTIONS);
    const [subject, setSubject] = useState(normalizedInitialSubject);
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
        formData.append("expertSlug", expertSlug);
        if (contextPlan) formData.append("contextPlan", contextPlan);
        if (contextVertical) formData.append("contextVertical", contextVertical);

        try {
            const result = await submitContact(formData);
            setSubmitMessage(result.message);
            setIsSuccess(result.success);
            form.reset();
            setSubject(normalizedInitialSubject);
        } catch {
            setSubmitMessage(t("error"));
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
                {t("form-intro")}
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input type="text" name="name" required placeholder={t("name")} className="w-full border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-[0.92rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-accent-500)] focus:outline-none transition-colors" />
                <input type="email" name="email" required placeholder={t("email-placeholder")} className="w-full border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-[0.92rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-accent-500)] focus:outline-none transition-colors" />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input type="text" name="organization" placeholder={t("org")} className="w-full border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-[0.92rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-accent-500)] focus:outline-none transition-colors" />
                <select name="subject" required value={subject} onChange={(event) => setSubject(event.target.value)} className="w-full border border-[var(--border-subtle)] bg-[var(--surface-primary)] px-4 py-3 text-[0.92rem] text-[var(--text-primary)] focus:border-[var(--color-accent-500)] focus:outline-none transition-colors">
                    <option value="" disabled>
                        {t("subject-default")}
                    </option>
                    {SUBJECT_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <textarea name="message" required rows={6} placeholder={t("message-placeholder")} className="w-full resize-none border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-[0.92rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-accent-500)] focus:outline-none transition-colors" />

            <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 bg-[var(--color-accent-500)] px-5 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--color-accent-400)] disabled:opacity-60">
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {isSubmitting ? t("submitting") : t("submit")}
            </button>

            {submitMessage && (
                <p className={`text-[0.82rem] leading-relaxed ${isSuccess ? "text-[#10b981]" : "text-[#f59e0b]"}`}>
                    {submitMessage}
                </p>
            )}
        </form>
    );
}