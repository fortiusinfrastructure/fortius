"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Análisis y planificación",
    description: "Profundizamos en la esencia de cada organización para diseñar un plan de acción alineado con sus objetivos corporativos."
  },
  {
    number: "02",
    title: "Ejecución",
    description: "Guiamos y acompañamos de manera diligente en la implementación del plan, sin sustituir su rol dentro de la organización."
  },
  {
    number: "03",
    title: "Medición de impacto",
    description: "Evaluamos los resultados de los proyectos para garantizar su efectividad y optimizar la rendición de cuentas."
  }
];

export function Method() {
  return (
    <section id="metodo" className="py-24 bg-neutral-100 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="mb-20">
          <span className="font-mono text-[10px] tracking-[0.2em] font-bold text-neutral-500 uppercase mb-6 block">
            NUESTRO MÉTODO
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black max-w-4xl leading-[1.1]">
            Un enfoque estructurado para el cambio sistémico.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative border-t border-black pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <div className="flex justify-between items-start mb-8">
                <span className="font-mono text-sm font-bold text-brand-consulting">
                  {step.number}
                </span>
                <span className="w-2 h-2 rounded-full bg-brand-consulting" />
              </div>
              
              <h3 className="font-serif text-2xl text-black mb-4">
                {step.title}
              </h3>
              
              <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-sans">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
