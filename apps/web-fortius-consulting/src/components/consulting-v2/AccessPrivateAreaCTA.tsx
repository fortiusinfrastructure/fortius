"use client";

import { motion } from "framer-motion";
import { Lock, ArrowUpRight } from "lucide-react";

interface AccessPrivateAreaCTAProps {
    eyebrow?: string;
    label?: string;
    description?: string;
    href?: string;
}

const ease = [0.22, 0.61, 0.36, 1] as const;

export function AccessPrivateAreaCTA({
    eyebrow,
    label = "Accede al Área Privada",
    description = "Inicia sesión o solicita acceso para consultar informes, briefings y dashboards reservados.",
    href = "/area-privada",
}: AccessPrivateAreaCTAProps = {}) {
    return (
        <section
            aria-label="Acceso al Área Privada"
            className="relative border-t border-[var(--border-subtle)] py-20 md:py-28"
        >
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                <motion.a
                    href={href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease }}
                    className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-8 md:p-12 bg-[var(--color-accent-500)] hover:bg-[var(--color-accent-400)] text-white transition-colors overflow-hidden"
                >
                    <div
                        className="absolute inset-0 opacity-[0.08] pointer-events-none"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                        }}
                        aria-hidden
                    />

                    <div className="relative flex items-start gap-5">
                        <span className="inline-flex items-center justify-center w-12 h-12 border border-white/40 shrink-0">
                            <Lock size={20} strokeWidth={1.5} aria-hidden />
                        </span>
                        <div className="space-y-2">
                            {eyebrow && (
                                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/80">
                                    {eyebrow}
                                </p>
                            )}
                            <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-tight tracking-tight">
                                {label}
                            </h3>
                            <p className="text-[0.95rem] leading-relaxed text-white/85 max-w-2xl">
                                {description}
                            </p>
                        </div>
                    </div>

                    <span className="relative inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.2em] shrink-0 border-b border-white pb-1">
                        Acceder
                        <ArrowUpRight
                            size={16}
                            className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                        />
                    </span>
                </motion.a>
            </div>
        </section>
    );
}
