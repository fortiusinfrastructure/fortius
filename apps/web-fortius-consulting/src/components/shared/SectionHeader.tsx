"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        className="inline-block text-[0.7rem] font-medium uppercase tracking-[0.3em]
                   text-[var(--text-tertiary)]"
      >
        [ {label} ]
      </motion.span>

      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-light
                     leading-[1.15] tracking-tight text-[var(--text-primary)]"
        >
          {title}
        </motion.h2>
      )}
    </div>
  );
}
