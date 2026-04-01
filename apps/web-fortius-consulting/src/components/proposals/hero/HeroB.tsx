"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, TrendingUp, Globe, Shield, Zap } from "lucide-react";

/**
 * HERO B — "Grid Intelligence"
 *
 * Concepto: Layout asimétrico basado en grid, con micro-tarjetas de
 * capability que flotan alrededor del headline. Estilo dashboard
 * institucional. Las tarjetas se animan con stagger. El fondo tiene
 * un grid sutil que refuerza la idea de estructura y método.
 */

const capabilities = [
  { icon: TrendingUp, label: "Estrategia", desc: "Planificación a largo plazo" },
  { icon: Globe, label: "Asuntos Públicos", desc: "Relaciones institucionales" },
  { icon: Shield, label: "Gestión de Crisis", desc: "Respuesta y reputación" },
  { icon: Zap, label: "Intelligence", desc: "Análisis y prospectiva" },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.8 + i * 0.12,
      ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function HeroB() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--surface-primary)" }}
    >
      {/* Grid background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Accent orb */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          right: -100,
          top: "10%",
          background:
            "radial-gradient(circle, rgba(233, 71, 72, 0.08) 0%, transparent 60%)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left — Text */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-px bg-[var(--color-accent-500)]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-accent-400)]">
                Fortius Consulting
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
              className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-light leading-[1.08] tracking-tight text-[var(--text-primary)]"
            >
              Donde la{" "}
              <span className="relative inline-block">
                <span className="relative z-10">inteligencia</span>
                <motion.span
                  className="absolute bottom-1 left-0 h-[3px] bg-[var(--color-accent-500)] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
                />
              </span>
              <br />
              se convierte en{" "}
              <em className="text-[var(--color-accent-400)]">influencia</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 max-w-lg text-[var(--text-secondary)] text-lg font-light leading-relaxed"
            >
              Asesoría estratégica para líderes, instituciones y organizaciones
              que configuran el futuro del mundo hispanohablante.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <button className="group flex items-center gap-2 px-7 py-3.5 bg-[var(--color-accent-500)] text-[var(--surface-primary)] text-sm font-semibold uppercase tracking-wider rounded-md hover:bg-[var(--color-accent-400)] transition-colors duration-150">
                Agendar Consulta
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform duration-150"
                />
              </button>
              <button className="px-7 py-3.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150 underline underline-offset-4 decoration-[var(--border-strong)]">
                Ver casos de éxito
              </button>
            </motion.div>
          </div>

          {/* Right — Capability cards */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <motion.div
                    key={cap.label}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{
                      y: -4,
                      borderColor: "rgba(233, 71, 72, 0.3)",
                      transition: { duration: 0.2 },
                    }}
                    className="group p-5 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border-default)]
                               cursor-default transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[rgba(233,71,72,0.1)] flex items-center justify-center mb-4
                                    group-hover:bg-[rgba(233,71,72,0.15)] transition-colors duration-200">
                      <Icon size={16} className="text-[var(--color-accent-400)]" />
                    </div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {cap.label}
                    </p>
                    <p className="text-[11px] text-[var(--text-tertiary)] mt-1 leading-relaxed">
                      {cap.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mt-4 px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-secondary)]
                         flex items-center justify-between"
            >
              <span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
                Confianza de instituciones en 12 países
              </span>
              <div className="flex -space-x-1">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="w-5 h-5 rounded-full bg-[var(--surface-tertiary)] border border-[var(--border-default)]"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
