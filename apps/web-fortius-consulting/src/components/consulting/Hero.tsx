"use client";

import { motion } from "framer-motion";
import { Button } from "../shared/Button";

const IMAGES = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop", // Meeting/Consulting
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop", // Strategy
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop"  // Analysis
];

export function Hero() {
  return (
    <section className="pt-40 md:pt-56 pb-24 bg-background px-6 md:px-12 lg:px-24">
      {/* Top Header layout (Similar to Tony Blair Institute style) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
        
        {/* Massive Serif Headline */}
        <motion.div 
          className="md:w-[60%]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-1.5 bg-brand-consulting rounded-full block" />
            <h2 className="font-sans text-[10px] tracking-[0.2em] font-bold text-neutral-500 uppercase">
              Fortius Consulting
            </h2>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-black">
            Consultoría estratégica para transformar la sociedad.
          </h1>
        </motion.div>

        {/* Right subtext block */}
        <motion.div 
          className="md:w-[35%] flex flex-col items-start gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-lg md:text-xl text-neutral-900 leading-relaxed font-light">
            Asesoramos a organizaciones con principios para maximizar el impacto de sus valores. Desde la investigación profunda hasta la ejecución sobre el terreno.
          </p>
          <Button variant="primary" size="md" className="group">
            Descubrir nuestro método
            <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
          </Button>
        </motion.div>
      </div>

      {/* 3 Column Image Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {IMAGES.map((src, idx) => (
          <div key={idx} className="aspect-[4/5] md:aspect-square relative overflow-hidden bg-neutral-100 group">
            <img 
              src={src} 
              alt={`Consulting visual ${idx + 1}`} 
              className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        ))}
      </motion.div>

      {/* Stats row below images */}
      <motion.div 
        className="mt-6 flex flex-col sm:flex-row items-center justify-between border-t border-black/10 pt-6 text-sm font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="font-semibold tracking-wide text-black mb-2 sm:mb-0">
          The global strategy partner for principled organizations.
        </div>
        <div className="flex items-center gap-6">
          <a href="#intelligence" className="text-neutral-500 hover:text-black transition-colors font-medium">Read our Intelligence Reports →</a>
        </div>
      </motion.div>
    </section>
  );
}
