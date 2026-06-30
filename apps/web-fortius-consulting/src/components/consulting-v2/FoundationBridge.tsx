"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { BrandLockup } from "@/components/system/BrandLockup";

const ease = [0.22, 0.61, 0.36, 1] as const;

export function FoundationBridge() {
    const t = useTranslations("foundation");
    const PILLARS = t("pillars").split("|");
    return (
        <section
            aria-label="Fortius Foundation"
            className="relative py-28 md:py-40 border-t border-[var(--border-subtle)] overflow-hidden"
        >
            {/* Gradiente de transición: el rojo se apaga, entra el verde */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 20% 10%, rgba(233,71,72,0.05) 0%, transparent 40%), radial-gradient(ellipse at 85% 90%, rgba(58,156,110,0.14) 0%, transparent 55%)",
                }}
            />
            {/* Grid sutil — idéntico al hero, marca coherencia visual */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />
            {/* Línea de acento superior: gradiente rojo → verde, firma el hand-off */}
            <div
                className="absolute top-0 inset-x-0 h-px pointer-events-none"
                style={{
                    background:
                        "linear-gradient(90deg, rgba(233,71,72,0.6) 0%, rgba(58,156,110,0.6) 100%)",
                }}
            />

            <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                <div className="mb-16 flex items-center gap-4 text-[0.7rem] font-medium uppercase tracking-[0.28em]">
                    <BrandLockup variant="consulting" tone="compact" />
                    <span className="text-[var(--text-tertiary)] text-xs">&rarr;</span>
                    <BrandLockup variant="foundation" tone="compact" />
                </div>

                <div className="grid grid-cols-12 gap-6 items-end">
                    <div className="col-span-12 lg:col-span-7 space-y-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.75, ease }}
                            className="font-display text-[clamp(2.2rem,5vw,4.4rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]"
                        >
                            {t("h2")}{" "}
                            <span
                                className="italic"
                                style={{ color: "var(--color-foundation-400)" }}
                            >
                                {t("h2italic")}
                            </span>
                        </motion.h2>
                        <p className="text-[var(--text-secondary)] max-w-xl leading-relaxed">
                            {t("body")}
                        </p>

                        <ul className="flex flex-wrap gap-x-3 gap-y-2 pt-2">
                            {PILLARS.map((p) => (
                                <li
                                    key={p}
                                    className="text-[0.75rem] font-medium uppercase tracking-[0.18em] py-1.5 px-3 border rounded-sm"
                                    style={{
                                        color: "var(--color-foundation-300)",
                                        borderColor: "var(--color-foundation-muted)",
                                        backgroundColor: "var(--color-foundation-muted)",
                                    }}
                                >
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.2, ease }}
                        className="col-span-12 lg:col-span-5 lg:pb-4"
                    >
                        <a
                            href="https://fundacionfortius.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block p-8 border transition-colors duration-300"
                            style={{
                                borderColor: "var(--color-foundation-muted)",
                                backgroundColor: "rgba(58,156,110,0.04)",
                            }}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <BrandLockup variant="foundation" />
                                <ArrowUpRight
                                    size={20}
                                    className="shrink-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                                    style={{ color: "var(--color-foundation-400)" }}
                                />
                            </div>
                            <p className="mt-8 text-[0.9rem] text-[var(--text-secondary)] leading-relaxed">
                                {t("card-body")}
                            </p>
                            <p
                                className="mt-6 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] pb-1 border-b"
                                style={{
                                    color: "var(--color-foundation-400)",
                                    borderColor: "var(--color-foundation-muted)",
                                }}
                            >
                                {t("cta")}
                            </p>
                            <p className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                                {t("tagline")}
                            </p>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
