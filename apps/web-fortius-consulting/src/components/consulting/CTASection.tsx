"use client";

import { Button } from "../shared/Button";

export function CTASection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-4xl text-center">
        <span className="font-mono text-[10px] tracking-[0.2em] font-bold text-neutral-500 uppercase mb-6 block">
           CONTACTO
        </span>
        
        <h2 className="font-serif text-5xl md:text-7xl text-black mb-8 leading-[1.05]">
          El primer paso hacia un impacto medible.
        </h2>
        
        <p className="text-neutral-600 text-lg mb-12 max-w-2xl mx-auto font-sans leading-relaxed">
          Déjenos sus datos y un socio de Fortius Consulting se pondrá en contacto con usted en las próximas 24 horas para agendar una sesión de análisis preliminar.
        </p>

        <form className="max-w-md mx-auto flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Su correo institucional" 
            className="w-full bg-white border border-black/20 rounded-full px-8 py-5 text-black placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors font-sans text-sm"
          />
          <Button variant="primary" className="w-full h-14" size="lg" type="submit">
            Contactar ahora
          </Button>
        </form>
      </div>
    </section>
  );
}
