"use client";

import { useState, type FormEvent } from "react";
import { Bracketed } from "@/components/system/Bracketed";

export function NewsletterCTA() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!email) return;
        setSent(true);
        setEmail("");
    }

    return (
        <section
            aria-labelledby="newsletter-title"
            className="relative border-t border-[var(--border-subtle)] py-20 md:py-28"
        >
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                <div className="lg:col-span-6 space-y-4">
                    <Bracketed variant="kicker">Boletín</Bracketed>
                    <h2
                        id="newsletter-title"
                        className="font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-light leading-[1.08] tracking-tight text-[var(--text-primary)]"
                    >
                        Suscríbete a{" "}
                        <span
                            className="italic"
                            style={{ color: "var(--color-accent-300)" }}
                        >
                            nuestras novedades.
                        </span>
                    </h2>
                    <p className="text-[var(--text-secondary)] leading-relaxed max-w-xl">
                        Avances de la incubadora, proyectos en campaña y análisis de la
                        red Fortius directamente en tu correo.
                    </p>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="lg:col-span-6 flex flex-col sm:flex-row gap-3"
                >
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu correo"
                        aria-label="Correo electrónico"
                        className="flex-1 bg-transparent border border-[var(--border-default)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--color-accent-400)] transition-colors"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors"
                        style={{ backgroundColor: "var(--color-accent-500)" }}
                    >
                        [ Suscribirse ]
                    </button>
                </form>

                {sent && (
                    <p
                        role="status"
                        className="lg:col-span-12 text-[0.8rem]"
                        style={{ color: "var(--color-accent-300)" }}
                    >
                        ¡Gracias! Te escribiremos pronto.
                    </p>
                )}
            </div>
        </section>
    );
}
