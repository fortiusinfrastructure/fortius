"use client";

import { motion } from "framer-motion";
import { Button } from "../shared/Button";

export function Intelligence() {
  return (
    <section id="intelligence" className="relative w-full h-screen min-h-[600px] max-h-[900px] flex flex-col justify-end text-white overflow-hidden my-24">
      {/* Massive Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop" 
          alt="Intelligence Division" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 pb-24">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
             <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-300">
               NUEVO
             </span>
             <span className="w-1 h-1 bg-white rounded-full block" />
             <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-brand-intelligence-light">
               INTELLIGENCE DIVISION
             </span>
          </div>

          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-8">
            Decisiones informadas en un entorno complejo.
          </h2>

          <p className="font-sans text-lg text-neutral-200 mb-10 max-w-xl font-light leading-relaxed">
            Geopolitical Risks, Due Diligence Reputacional y Monitorización institucional. Convertimos el ruido en conocimiento estratégico.
          </p>

          <Button variant="primary" size="lg" className="bg-white text-black hover:bg-neutral-200" withArrow>
            Solicitar acceso a informes
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
