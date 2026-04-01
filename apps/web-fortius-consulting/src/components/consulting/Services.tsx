"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Landmark,
  Megaphone,
  Building2,
  FolderKanban,
  UserSearch,
  FileSearch,
  Users,
  MonitorPlay,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const SERVICES = [
  {
    icon: BarChart3,
    title: "Análisis y medición de impacto",
    description:
      "Medimos lo que importa para que tomes las mejores decisiones.",
  },
  {
    icon: Landmark,
    title: "Asuntos públicos",
    description:
      "Conectamos tu voz con quienes toman decisiones clave.",
  },
  {
    icon: Megaphone,
    title: "Comunicación y campañas",
    description:
      "Damos vida a tu marca y la conectamos con tu público ideal.",
  },
  {
    icon: Building2,
    title: "Constitución y desarrollo de organizaciones",
    description:
      "Te ayudamos a construir una organización fuerte y preparada para crecer.",
  },
  {
    icon: FolderKanban,
    title: "Diseño y gestión de proyectos",
    description:
      "Hacemos que tus ideas cobren vida con planificación y resultados reales.",
  },
  {
    icon: UserSearch,
    title: "Headhunting y desarrollo de talento",
    description:
      "Encontramos el talento que tu organización necesita para triunfar.",
  },
  {
    icon: FileSearch,
    title: "Investigaciones e informes",
    description:
      "Transformamos datos en información que impulsa tus decisiones.",
  },
  {
    icon: Users,
    title: "Movilización social y alianzas",
    description:
      "Creamos conexiones estratégicas que generan cambios reales.",
  },
  {
    icon: MonitorPlay,
    title: "Comunicación, diseño y audiovisuales",
    description:
      "Diseñamos y optimizamos tu presencia online para destacar en el mundo digital.",
  },
];

export function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="servicios"
      aria-labelledby="services-title"
      className="py-24 md:py-32 lg:py-40 border-t border-[var(--border-subtle)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <SectionHeader label="Servicios" />

        {/* Intro text */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 max-w-2xl mx-auto text-center"
        >
          <p className="text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--color-accent-400)] font-semibold">Lo que hacemos.</span>{" "}
            Somos una consultora estratégica especializada en organizaciones con
            principios. Asesoramos a nuestros clientes a{" "}
            <span className="underline decoration-[var(--color-accent-500)] underline-offset-4">
              maximizar el impacto
            </span>{" "}
            de sus principios en la sociedad.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const isHovered = hovered === i;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`relative p-6 rounded-lg border transition-all duration-200 cursor-default
                  ${isHovered
                    ? "bg-[var(--surface-tertiary)] border-[var(--border-strong)]"
                    : "bg-[var(--surface-secondary)] border-[var(--border-default)]"
                  }`}
              >
                {/* Icon */}
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  className={`mb-4 transition-colors duration-200
                    ${isHovered ? "text-[var(--color-accent-400)]" : "text-[var(--text-tertiary)]"}`}
                />

                {/* Title */}
                <h3 className="text-[0.9rem] font-semibold text-[var(--text-primary)] leading-snug mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[0.8rem] text-[var(--text-secondary)] leading-relaxed">
                  {service.description}
                </p>

                {/* Bottom accent */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      exit={{ width: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
                      className="absolute bottom-0 left-0 h-[2px] bg-[var(--color-accent-500)] rounded-b-lg"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
