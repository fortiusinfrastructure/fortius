"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Variant = "kicker" | "tag" | "nav" | "hero";

const VARIANT_STYLES: Record<Variant, { wrap: string; bracket: string; text: string }> = {
    kicker: {
        wrap: "inline-flex items-center gap-1.5 text-[0.7rem] font-medium uppercase tracking-[0.28em]",
        bracket: "text-[var(--text-tertiary)]",
        text: "text-[var(--text-tertiary)]",
    },
    tag: {
        wrap: "inline-flex items-center gap-1 text-[0.65rem] font-medium uppercase tracking-[0.2em]",
        bracket: "text-[var(--color-accent-500)]",
        text: "text-[var(--text-secondary)]",
    },
    nav: {
        wrap: "inline-flex items-center gap-0.5 text-[0.75rem] font-medium uppercase tracking-[0.12em]",
        bracket: "text-[var(--text-tertiary)]",
        text: "text-[var(--text-primary)]",
    },
    hero: {
        wrap: "inline-flex items-center gap-3 text-[0.75rem] font-medium uppercase tracking-[0.32em]",
        bracket: "text-[var(--color-accent-500)]",
        text: "text-[var(--text-secondary)]",
    },
};

interface BracketedProps {
    children: ReactNode;
    variant?: Variant;
    className?: string;
    as?: "span" | "div" | "p" | "h2";
}

export function Bracketed({
    children,
    variant = "kicker",
    className = "",
    as: Tag = "span",
}: BracketedProps) {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const styles = VARIANT_STYLES[variant];

    return (
        <Tag
            ref={ref as never}
            className={`${styles.wrap} ${className}`}
            aria-label={typeof children === "string" ? children : undefined}
        >
            <motion.span
                aria-hidden
                className={styles.bracket}
                initial={{ opacity: 0, x: -4 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            >
                [
            </motion.span>
            <motion.span
                className={styles.text}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
            >
                {children}
            </motion.span>
            <motion.span
                aria-hidden
                className={styles.bracket}
                initial={{ opacity: 0, x: 4 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            >
                ]
            </motion.span>
        </Tag>
    );
}
