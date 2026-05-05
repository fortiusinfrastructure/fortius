"use client";

import { motion } from "framer-motion";
import { Bracketed } from "@/components/system/Bracketed";
import type { Subvertical } from "@/content/politica";

interface SubverticalsProps {
    kicker?: string;
    title: string;
    items: Subvertical[];
}

const ease = [0.22, 0.61, 0.36, 1] as const;

export function Subverticals({
    kicker = "Subverticales",
    title,
    items,
}: SubverticalsProps) {
    return (
        <section
            aria-labelledby="subverticals-title"
            className="relative border-t border-[var(--border-subtle)] py-20 md:py-28"
        >
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-end">
                    <div className="lg:col-span-7 space-y-5">
                        <Bracketed variant="kicker">{kicker}</Bracketed>
                        <h2
                            id="subverticals-title"
                            className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-[1.08] tracking-tight text-[var(--text-primary)]"
                        >
                            {title}
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-default)] border border-[var(--border-default)]">
                    {items.map((s, i) => (
                        <motion.article
                            key={s.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease }}
                            className="bg-[var(--surface-primary)] p-8 md:p-10 hover:bg-[var(--surface-secondary)] transition-colors duration-300 flex flex-col gap-5"
                        >
                            <div className="flex items-baseline gap-4">
                                <span className="font-display text-[2rem] font-light leading-none text-[var(--color-accent-500)]">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="font-display text-[1.4rem] font-light leading-tight tracking-tight text-[var(--text-primary)]">
                                    {s.title}
                                </h3>
                            </div>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                {s.description}
                            </p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
