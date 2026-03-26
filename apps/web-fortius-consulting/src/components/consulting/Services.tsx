"use client";

import { motion } from "framer-motion";
import { Button } from "../shared/Button";

const SERVICES = [
  "Análisis y medición de impacto",
  "Asuntos públicos",
  "Comunicación y campañas",
  "Constitución y desarrollo",
  "Diseño y gestión de proyectos",
  "Headhunting y talento",
  "Investigaciones e informes",
  "Movilización y alianzas",
  "Diseño y audiovisuales"
];

export function Services() {
  return (
    <section id="servicios" className="py-24 bg-background px-6 md:px-12 lg:px-24">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Large Image */}
        <motion.div 
          className="w-full lg:w-1/2 aspect-[4/5] md:aspect-square relative overflow-hidden bg-neutral-100"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img 
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2670&auto=format&fit=crop" 
            alt="Fortius Services" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right Side: Editorial List */}
        <motion.div 
          className="w-full lg:w-1/2 flex flex-col items-start"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span className="font-mono text-[10px] tracking-[0.2em] font-bold text-neutral-500 uppercase mb-6">
            CAPACIDADES
          </span>
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black mb-12 leading-[1.1]">
            Soluciones integrales diseñadas para organizaciones complejas.
          </h2>

          <div className="w-full border-t border-black/10">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="group border-b border-black/10 py-5 flex items-center justify-between hover:px-4 hover:bg-neutral-50 transition-all cursor-pointer">
                <span className="font-serif text-xl md:text-2xl text-neutral-800 group-hover:text-brand-consulting transition-colors">
                  {service}
                </span>
                <span className="text-brand-consulting opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </div>
            ))}
          </div>

          <Button variant="primary" className="mt-12 group" size="lg">
            Ver detalle de servicios
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
