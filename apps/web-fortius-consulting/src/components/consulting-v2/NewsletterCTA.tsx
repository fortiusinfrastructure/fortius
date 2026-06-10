"use client";

import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { Bracketed } from "@/components/system/Bracketed";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";

export function NewsletterCTA() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");
        setMessage("");

        try {
            const formData = new FormData();
            formData.append("email", email);
            const result = await subscribeToNewsletter(formData);
            setStatus(result.success ? "success" : "error");
            setMessage(result.message);
            if (result.success) setEmail("");
        } catch {
            setStatus("error");
            setMessage("No hemos podido completar la suscripción. Inténtalo de nuevo.");
        }
    }

    return (
        <section
            aria-label="Boletín"
            className="relative py-24 md:py-32 border-t border-[var(--border-subtle)] overflow-hidden"
        >
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 50%, rgba(233,71,72,0.08) 0%, transparent 60%)",
                }}
            />
            <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                <div className="max-w-3xl">
                    <Bracketed variant="kicker">Boletín</Bracketed>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                        className="mt-6 font-display text-[clamp(2rem,4.5vw,3.8rem)] font-light leading-[1.05] tracking-tight text-[var(--text-primary)]"
                    >
                        Ideas útiles para decidir mejor. {" "}
                        <span className="italic text-[var(--color-accent-400)]">Una vez al mes.</span>
                    </motion.h2>
                    <p className="mt-6 text-[var(--text-secondary)] max-w-xl leading-relaxed">
                        Recibe análisis, lecturas y señales relevantes para
                        organizaciones con vocación de impacto. Sin ruido y con
                        criterio editorial.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@organizacion.org"
                            disabled={status === "loading"}
                            className="flex-1 bg-transparent border border-[var(--border-strong)] px-5 py-3.5 text-[0.9rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-accent-500)] focus:outline-none transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-400)] transition-colors"
                        >
                            {status === "loading" ? <Loader2 size={14} className="animate-spin" /> : null}
                            {status === "success" ? "¡Gracias!" : "Suscribirme"}
                            {status !== "loading" && (
                                <ArrowRight
                                    size={14}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            )}
                        </button>
                    </form>

                    {message && (
                        <p className={`mt-4 text-[0.85rem] leading-relaxed ${status === "error" ? "text-[#f59e0b]" : "text-[#10b981]"}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
