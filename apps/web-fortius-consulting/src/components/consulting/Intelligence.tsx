"use client";

import { motion } from "framer-motion";
import { Globe, Eye, ShieldCheck, Network, Lock, ArrowRight } from "lucide-react";

const PRODUCTS = [
  {
    icon: Globe,
    title: "Geopolitical Risks & Intelligence Reports",
    description:
      "Informes periódicos sobre riesgos geopolíticos que afectan a su sector y geografías de interés.",
    tag: "Reports",
  },
  {
    icon: Eye,
    title: "Monitorización política y legislativa",
    description:
      "Seguimiento en tiempo real de iniciativas legislativas, nombramientos y cambios regulatorios relevantes.",
    tag: "Monitoring",
  },
  {
    icon: ShieldCheck,
    title: "Due diligence reputacional",
    description:
      "Análisis exhaustivo del perfil público y riesgos reputacionales de personas, organizaciones y socios potenciales.",
    tag: "Analysis",
  },
  {
    icon: Network,
    title: "Investigación de ecosistemas institucionales",
    description:
      "Mapeo de actores clave, relaciones de poder y dinámicas de influencia en ecosistemas institucionales complejos.",
    tag: "Research",
  },
];

export function Intelligence() {
  return (
    <section
      id="intelligence"
      aria-labelledby="intelligence-title"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden
               border-t border-[var(--border-subtle)]"
    >
      {/* Steel-blue ambient — differentiates this section visually */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(40,82,136,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px
                    bg-gradient-to-r from-transparent via-[#3668a5] to-transparent opacity-25" />

      <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 text-[0.65rem] font-semibold
                           uppercase tracking-[0.3em] text-[#5a8cc2] mb-5">
              <Lock size={11} />
              [ Intelligence ]
            </span>

            <h2
              id="intelligence-title"
              className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-light
                       leading-[1.15] tracking-tight text-[var(--text-primary)]"
            >
              El núcleo de la{" "}
              <em className="text-[#5a8cc2]">consultora política inteligente</em>
            </h2>

            <p className="mt-5 text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Una línea de productos diseñada para líderes que necesitan
              información precisa y contextualizada antes de actuar. Análisis
              profundo, entregado con claridad.
            </p>
          </motion.div>
        </div>

        {/* Product cards — 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {PRODUCTS.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className="group p-6 rounded-lg border border-[var(--border-default)]
                         bg-[var(--surface-secondary)]
                         hover:border-[rgba(90,140,194,0.3)] hover:bg-[var(--surface-tertiary)]
                         transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                             bg-[rgba(40,82,136,0.1)] group-hover:bg-[rgba(40,82,136,0.15)]
                             transition-colors duration-200"
                  >
                    <Icon size={18} strokeWidth={1.5} className="text-[#5a8cc2]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="text-[0.9rem] font-semibold text-[var(--text-primary)] leading-snug">
                        {product.title}
                      </h3>
                    </div>
                    <p className="text-[0.8rem] text-[var(--text-secondary)] leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 text-center flex flex-col items-center gap-3"
        >
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 px-7 py-3 text-[0.75rem] font-semibold
                     uppercase tracking-wider bg-[#285288] text-white rounded
                     hover:bg-[#3668a5] transition-colors duration-150"
          >
            Solicitar acceso
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-150" />
          </a>
          <span className="text-[0.7rem] text-[var(--text-tertiary)]">
            Disponibilidad limitada · Acceso bajo solicitud
          </span>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-[10%] right-[10%] h-px
                    bg-gradient-to-r from-transparent via-[#3668a5] to-transparent opacity-25" />
    </section>
  );
}
