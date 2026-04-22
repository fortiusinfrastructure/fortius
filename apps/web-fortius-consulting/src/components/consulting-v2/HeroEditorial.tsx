"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";

const ease = [0.22, 0.61, 0.36, 1] as const;

export function HeroEditorial() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={ref}
            aria-label="Introducción"
            className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden pt-32 pb-20"
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 80% 20%, rgba(233,71,72,0.10) 0%, transparent 55%), linear-gradient(180deg, rgba(5,10,20,0) 0%, rgba(5,10,20,0.9) 100%)",
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)]"
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease }}
                    className="mb-10"
                >
                    <Bracketed variant="hero">Fortius Consulting — desde 2010</Bracketed>
                </motion.div>

                <div className="grid grid-cols-12 gap-6 items-end">
                    <div className="col-span-12 lg:col-span-8 space-y-2">
                        {["Inteligencia política.", "Sociedades fuertes."].map((line, i) => (
                            <div key={line} className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: 60, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.85, delay: 0.3 + i * 0.12, ease }}
                                    className={`font-display font-light leading-[0.98] tracking-tight text-[clamp(3rem,8.5vw,8rem)] ${
                                        i === 1 ? "italic text-[var(--color-accent-400)]" : "text-[var(--text-primary)]"
                                    }`}
                                >
                                    {line}
                                </motion.h1>
                            </div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9, ease }}
                        className="col-span-12 lg:col-span-4 space-y-8 lg:pb-6"
                    >
                        <p className="text-[var(--text-secondary)] text-base leading-relaxed font-light max-w-sm">
                            Consultoría estratégica para organizaciones con principios.
                            Dos verticales, un mismo objetivo: maximizar el impacto de sus valores en la sociedad.
                        </p>
                        <a
                            href="#verticales"
                            className="group inline-flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-primary)] border-b border-[var(--border-strong)] hover:border-[var(--color-accent-500)] transition-colors pb-2"
                        >
                            Explorar verticales
                            <ArrowDownRight
                                size={14}
                                className="group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                            />
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
