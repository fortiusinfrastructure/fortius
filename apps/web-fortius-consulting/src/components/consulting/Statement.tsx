"use client";

import { motion } from "framer-motion";

export function Statement() {
  return (
    <section className="py-32 bg-white border-y border-black/5 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <span className="text-brand-consulting text-6xl md:text-8xl font-serif leading-none block mb-8">"</span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl italic font-light leading-snug tracking-tight text-neutral-400">
            Asesoramos a nuestros clientes para <span className="text-black font-medium">maximizar el impacto</span> de sus valores en la sociedad.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
