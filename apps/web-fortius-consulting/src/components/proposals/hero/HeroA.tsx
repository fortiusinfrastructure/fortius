"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

/**
 * HERO A — "Cinematic Reveal"
 *
 * Concepto: Texto heroico que se revela con un efecto de máscara cinematográfica.
 * Una línea horizontal animada divide la pantalla, revelando el headline.
 * Números de métricas se animan con un counter effect.
 * Mínimo, dramático, institucional.
 */

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  return (
    <motion.span
      className="font-mono tabular-nums"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.4 }}
      >
        {target}{suffix}
      </motion.span>
    </motion.span>
  );
}

export function HeroA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Stagger animation config
  const lineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3 + i * 0.15,
        ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--surface-primary)" }}
    >
      {/* Ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(233, 71, 72, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Animated reveal line */}
      <motion.div
        className="absolute top-1/2 left-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-500)] to-transparent"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity: textOpacity, y: bgY }}
        className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-16"
      >
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
          className="mb-8"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
            [ Strategic Consulting ]
          </span>
        </motion.div>

        {/* Headline */}
        <div className="space-y-1">
          <motion.h1
            custom={0}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light leading-[1.05] tracking-tight text-[var(--text-primary)]"
          >
            Transformamos
          </motion.h1>
          <motion.h1
            custom={1}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light leading-[1.05] tracking-tight text-[var(--text-primary)]"
          >
            la complejidad en
          </motion.h1>
          <motion.h1
            custom={2}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="font-display text-[clamp(2.5rem,7vw,6rem)] italic leading-[1.05] tracking-tight text-[var(--color-accent-400)]"
          >
            ventaja estratégica.
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-8 max-w-xl text-[var(--text-secondary)] text-lg font-light leading-relaxed"
        >
          Consultoría de alto nivel para organizaciones que buscan impacto
          duradero en la sociedad y las instituciones.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-10 flex items-center gap-4"
        >
          <button className="px-8 py-3.5 bg-[var(--color-accent-500)] text-[var(--surface-primary)] text-sm font-semibold uppercase tracking-wider rounded-md hover:bg-[var(--color-accent-400)] transition-colors duration-150">
            Iniciar Conversación
          </button>
          <button className="px-8 py-3.5 text-sm font-semibold text-[var(--text-secondary)] border border-[var(--border-strong)] rounded-md hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--text-primary)] transition-all duration-150">
            Nuestro Método
          </button>
        </motion.div>

        {/* Metrics bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-20 flex items-center gap-12 border-t border-[var(--border-default)] pt-8"
        >
          {[
            { value: 15, suffix: "+", label: "Años de experiencia" },
            { value: 200, suffix: "+", label: "Proyectos realizados" },
            { value: 12, suffix: "", label: "Países" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-3xl font-display font-light text-[var(--text-primary)]">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-[11px] text-[var(--text-tertiary)] mt-1 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-[var(--text-tertiary)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
