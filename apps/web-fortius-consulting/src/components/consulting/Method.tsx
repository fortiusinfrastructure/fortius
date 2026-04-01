"use client";

import { motion } from "framer-motion";
import { Search, PenLine, BarChart3 } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const STEPS = [
  {
    step: "Step 1",
    title: "Análisis y planificación",
    description:
      "Profundizamos en la esencia de cada organización para diseñar un plan de acción alineado con sus objetivos.",
    icon: Search,
  },
  {
    step: "Step 2",
    title: "Ejecución",
    description:
      "Guiamos y acompañamos a nuestros clientes en la implementación del plan, sin sustituir su rol dentro de la organización.",
    icon: PenLine,
  },
  {
    step: "Step 3",
    title: "Medición de impacto",
    description:
      "Evaluamos los resultados de los proyectos para garantizar su efectividad y optimizar la rendición de cuentas ante grupos de interés.",
    icon: BarChart3,
  },
];

export function Method() {
  return (
    <section
      id="metodo"
      aria-labelledby="method-title"
      className="py-24 md:py-32 lg:py-40 border-t border-[var(--border-subtle)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <SectionHeader label="Nuestro Método" />

        {/* Horizontal timeline */}
        <div className="mt-16 md:mt-24 relative">
          {/* The connected timeline line with icons — desktop */}
          <div className="hidden md:flex items-center justify-center mb-16 relative">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="flex items-center">
                  {/* Icon node */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.2,
                      ease: [0.22, 0.61, 0.36, 1],
                    }}
                    className="relative z-10 w-14 h-14 rounded-xl border border-[var(--border-strong)]
                             bg-[var(--surface-secondary)] flex items-center justify-center
                             hover:border-[var(--color-accent-500)] transition-colors duration-200"
                  >
                    <Icon size={22} strokeWidth={1.5} className="text-[var(--color-accent-400)]" />
                  </motion.div>

                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{
                        duration: 0.6,
                        delay: 0.3 + i * 0.2,
                        ease: [0.22, 0.61, 0.36, 1],
                      }}
                      className="w-32 lg:w-48 xl:w-64 h-[2px] origin-left
                               bg-gradient-to-r from-[var(--color-accent-500)] to-[var(--border-default)]"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.12,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                  className="text-center"
                >
                  {/* Mobile icon */}
                  <div className="md:hidden flex justify-center mb-5">
                    <div className="w-12 h-12 rounded-xl border border-[var(--border-strong)]
                                  bg-[var(--surface-secondary)] flex items-center justify-center">
                      <Icon size={20} strokeWidth={1.5} className="text-[var(--color-accent-400)]" />
                    </div>
                  </div>

                  {/* Step label */}
                  <p className="text-[0.65rem] font-mono font-medium uppercase tracking-[0.2em]
                              text-[var(--color-accent-400)] mb-3">
                    {step.step}
                  </p>

                  <h3 className="text-lg font-display font-semibold text-[var(--text-primary)] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
