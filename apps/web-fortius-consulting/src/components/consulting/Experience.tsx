"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";

// Real clients from the current Fortius website
const CLIENTS = [
  { name: "Principios", style: "text-xl font-display italic" },
  { name: "Acton Institute", style: "text-sm font-semibold uppercase tracking-wider" },
  { name: "Universidad de Navarra", style: "text-sm font-medium" },
  { name: "The Lex Fellowship", style: "text-sm font-semibold uppercase tracking-wider" },
  { name: "ACI Prensa", style: "text-sm font-bold uppercase tracking-widest" },
  { name: "Chapel & York", style: "text-sm font-medium italic" },
  { name: "Axioma", style: "text-xl font-display font-light" },
  { name: "ISI", style: "text-sm font-bold uppercase tracking-[0.3em]" },
];

// Duplicate for seamless loop
const MARQUEE = [...CLIENTS, ...CLIENTS];

export function Experience() {
  return (
    <section
      id="experiencia"
      aria-label="Experiencia y colaboradores"
      className="py-24 md:py-32 border-t border-[var(--border-subtle)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        {/* Header + description split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-16">
          <SectionHeader label="Experiencia" align="left" />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[var(--text-secondary)] leading-relaxed max-w-md lg:pt-8"
          >
            Tenemos experiencia tanto consultora como directiva, lo que nos permite
            conocer cómo funcionan por dentro las organizaciones a las que asesoramos.{" "}
            <a
              href="#contacto"
              className="text-[var(--color-accent-400)] underline underline-offset-4
                       hover:text-[var(--color-accent-300)] transition-colors duration-150"
            >
              Confía en nosotros.
            </a>
          </motion.p>
        </div>
      </div>

      {/* Marquee — full width with fade edges */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10
                      bg-gradient-to-r from-[var(--surface-primary)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10
                      bg-gradient-to-l from-[var(--surface-primary)] to-transparent pointer-events-none" />

        <motion.div
          className="flex items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 28,
              ease: "linear",
            },
          }}
        >
          {MARQUEE.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="shrink-0 mx-6 px-8 py-5 border border-[var(--border-default)] rounded-lg
                       bg-[var(--surface-secondary)] min-w-[160px] flex items-center justify-center
                       hover:border-[var(--border-strong)] hover:bg-[var(--surface-tertiary)]
                       transition-all duration-200 group"
            >
              <span
                className={`${client.style} text-[var(--text-secondary)]
                           group-hover:text-[var(--text-primary)] transition-colors duration-200
                           whitespace-nowrap`}
              >
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
