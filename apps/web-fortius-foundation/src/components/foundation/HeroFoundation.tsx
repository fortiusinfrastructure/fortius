"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Bracketed } from "@/components/system/Bracketed";
import { IMPACT_METRICS } from "@/content/impact";

const ease = [0.22, 0.61, 0.36, 1] as const;

export function HeroFoundation() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

    return (
        <section
            ref={ref}
            aria-labelledby="hero-title"
            className="relative overflow-hidden"
            style={{ backgroundColor: "var(--surface-brand)" }}
        >
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.035]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 15% 85%, rgba(47,122,91,0.28) 0%, transparent 60%), radial-gradient(ellipse at 85% 15%, rgba(10,40,28,0.55) 0%, transparent 55%)",
                }}
            />

            <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-[calc(var(--nav-height)+5rem)] pb-28 md:pb-36">
                <motion.div
                    style={{ y }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease }}
                    className="max-w-3xl space-y-10"
                >
                    <Bracketed variant="hero">Fortius Fundación</Bracketed>

                    <h1
                        id="hero-title"
                        className="font-display font-light leading-[1.02] tracking-tight text-[var(--text-primary)] text-[clamp(2.8rem,7vw,6rem)]"
                    >
                        Queremos una{" "}
                        <span
                            className="italic"
                            style={{ color: "var(--color-accent-300)" }}
                        >
                            sociedad más fuerte.
                        </span>
                    </h1>

                    <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl">
                        Nos dedicamos a profesionalizar el ecosistema de organizaciones
                        de la sociedad civil en España, maximizando el{" "}
                        <span className="text-[var(--text-primary)]">impacto</span> de su
                        trabajo y generando{" "}
                        <span className="text-[var(--text-primary)]">mayor retorno</span>{" "}
                        sobre la inversión. Aportamos{" "}
                        <span className="text-[var(--text-primary)]">independencia</span>{" "}
                        en sus intereses y contribuimos a una{" "}
                        <span
                            className="italic"
                            style={{ color: "var(--color-accent-300)" }}
                        >
                            sociedad libre y virtuosa.
                        </span>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35, ease }}
                    className="relative mt-24 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-subtle)]"
                >
                    {IMPACT_METRICS.map((m) => (
                        <div
                            key={m.label}
                            className="p-6 md:p-7"
                            style={{ backgroundColor: "var(--surface-brand)" }}
                        >
                            <p
                                className="font-display font-light leading-none text-[clamp(2.2rem,4.5vw,3.6rem)]"
                                style={{ color: "var(--color-accent-300)" }}
                            >
                                {m.value}
                            </p>
                            <p className="mt-4 text-[0.75rem] uppercase tracking-[0.15em] text-[var(--text-secondary)] leading-snug">
                                {m.label}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
