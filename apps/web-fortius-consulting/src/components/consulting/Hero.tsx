"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Counter } from "@/components/shared/Counter";

const IMPACT_STATS = [
  { value: 45, suffix: "%", label: "Think Tanks" },
  { value: 15, suffix: "%", label: "ONG" },
  { value: 15, suffix: "%", label: "Fundaciones y\nasociaciones" },
  { value: 20, suffix: "%", label: "Formación y\nUniversidades" },
  { value: 5, suffix: "%", label: "Plataformas\nciudadanas" },
];

const ease = [0.22, 0.61, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      aria-label="Introducción"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(233,71,72,0.12) 0%, rgba(5,10,20,0.95) 60%)",
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[var(--container-max)]
                    px-[var(--container-px)] pt-[calc(var(--nav-height)+3rem)]">
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-[var(--text-tertiary)] mb-6"
        >
          Consultora política inteligente
        </motion.p>

        {/* Headline */}
        <div className="space-y-1 md:space-y-2">
          {[
            { text: "Inteligencia política.", italic: false },
            { text: "Sociedades fuertes.", italic: true },
          ].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.3 + i * 0.12, ease }}
                className={`font-display text-[clamp(2.2rem,6vw,5rem)] font-light leading-[1.06] tracking-tight
                           ${line.italic ? "italic text-[var(--color-accent-400)]" : "text-[var(--text-primary)]"}`}
              >
                {line.text}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
          className="mt-8 max-w-2xl text-[var(--text-secondary)] text-base md:text-lg
                   font-light leading-relaxed"
        >
          Somos una consultora estratégica especializada en{" "}
          <strong className="text-[var(--text-primary)] font-medium">organizaciones con principios</strong>,
          desde empresas del Tercer Sector hasta el sector privado y público. Enfocamos nuestro
          objetivo en hacer que{" "}
          <strong className="text-[var(--text-primary)] font-medium">
            nuestros clientes maximicen el impacto de sus principios en la sociedad
          </strong>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-7 py-3 text-[0.75rem] font-semibold
                     uppercase tracking-wider bg-[var(--color-accent-500)] text-white rounded
                     hover:bg-[var(--color-accent-400)] transition-colors duration-150"
          >
            Háblanos de tu proyecto
          </a>
          <a
            href="#servicios"
            className="group inline-flex items-center gap-2 text-[0.8rem] font-medium
                     text-[var(--text-secondary)] hover:text-[var(--text-primary)]
                     transition-colors duration-150"
          >
            Nuestros servicios
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-150" />
          </a>
        </motion.div>

        {/* Impact stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease }}
          className="mt-20 md:mt-28"
        >
          <div className="flex flex-wrap items-end gap-x-8 md:gap-x-12 gap-y-6
                        border-t border-[var(--border-default)] pt-8">
            {IMPACT_STATS.map((stat) => (
              <div key={stat.label} className="min-w-[80px]">
                <Counter
                  target={stat.value}
                  suffix={stat.suffix}
                  className="text-3xl md:text-4xl font-display font-light text-[var(--text-primary)]
                           tabular-nums"
                />
                <p className="text-[0.65rem] text-[var(--text-tertiary)] mt-1.5 uppercase tracking-wider whitespace-pre-line leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
