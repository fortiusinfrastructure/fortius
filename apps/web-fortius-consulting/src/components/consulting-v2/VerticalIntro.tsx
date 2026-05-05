"use client";

import { motion } from "framer-motion";
import { Bracketed } from "@/components/system/Bracketed";

interface VerticalIntroProps {
    kicker: string;
    hero: string;
    subcopy: string[];
    description: string[];
    claim?: {
        primary: string;
        secondary: string;
    };
}

const ease = [0.22, 0.61, 0.36, 1] as const;

export function VerticalIntro({
    kicker,
    hero,
    subcopy,
    description,
    claim,
}: VerticalIntroProps) {
    return (
        <section
            aria-labelledby="vertical-intro-title"
            className="relative pt-24 md:pt-32 pb-20 md:pb-28"
        >
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                <Bracketed variant="tag">{kicker}</Bracketed>
                <motion.h1
                    id="vertical-intro-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease }}
                    className="mt-6 font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)] max-w-4xl"
                >
                    {hero}
                </motion.h1>

                <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-6 space-y-5">
                        {subcopy.map((paragraph, i) => (
                            <p
                                key={i}
                                className={`text-[var(--text-secondary)] leading-relaxed ${
                                    i === 0 ? "text-[1.05rem]" : "text-[0.95rem]"
                                }`}
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                    <div className="lg:col-span-6 space-y-5">
                        {description.map((paragraph, i) => (
                            <p
                                key={i}
                                className="text-[var(--text-secondary)] leading-relaxed"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {claim && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease }}
                        className="mt-16 border-t border-[var(--border-subtle)] pt-10"
                    >
                        <p className="font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.05] tracking-tight text-[var(--text-primary)] max-w-4xl">
                            {claim.primary}{" "}
                            <span className="italic text-[var(--color-accent-400)]">
                                {claim.secondary}
                            </span>
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
