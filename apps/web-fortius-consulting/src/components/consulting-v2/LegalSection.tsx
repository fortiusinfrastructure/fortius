"use client";

import { motion } from "framer-motion";

const ease = [0.22, 0.61, 0.36, 1] as const;

export interface LegalItem {
    id: string;
    number: string;
    title: string;
    content: React.ReactNode;
}

interface LegalSectionProps {
    items: LegalItem[];
}

export function LegalSection({ items }: LegalSectionProps) {
    return (
        <div className="space-y-16">
            {items.map((item, i) => (
                <motion.section
                    key={item.id}
                    id={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease }}
                >
                    <div className="flex items-baseline gap-4 mb-4">
                        <span className="text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-accent-500)] font-semibold">
                            {item.number}
                        </span>
                        <h2 className="font-display text-[clamp(1.2rem,2vw,1.6rem)] font-light leading-snug text-[var(--text-primary)]">
                            {item.title}
                        </h2>
                    </div>
                    <div className="pl-[calc(1rem+3.5ch)] text-[var(--text-secondary)] leading-relaxed space-y-4">
                        {item.content}
                    </div>
                </motion.section>
            ))}
        </div>
    );
}
