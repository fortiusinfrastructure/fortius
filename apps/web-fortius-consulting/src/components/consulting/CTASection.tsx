"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/shared/Button";

export function CTASection() {
  return (
    <section
      id="contacto"
      aria-labelledby="cta-title"
      className="py-24 md:py-32 lg:py-40 bg-[var(--surface-secondary)]
               border-t border-[var(--border-subtle)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="text-center mb-12"
          >
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
              [ Contacto ]
            </span>
            <h2
              id="cta-title"
              className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-light
                       leading-[1.15] tracking-tight text-[var(--text-primary)]"
            >
              Háblanos de tu proyecto
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] max-w-lg mx-auto">
              Cuéntanos sobre tu organización y tus objetivos. Te respondemos en
              menos de 48 horas con una propuesta inicial.
            </p>
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)] mb-2"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Tu nombre"
                  className="w-full bg-[var(--surface-tertiary)] border border-[var(--border-default)]
                           rounded-md px-4 py-3 text-sm text-[var(--text-primary)]
                           placeholder:text-[var(--text-tertiary)]
                           focus:border-[var(--color-accent-500)] focus:outline-none
                           focus:ring-1 focus:ring-[rgba(233,71,72,0.3)]
                           transition-colors duration-150"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)] mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="tu@organizacion.org"
                  className="w-full bg-[var(--surface-tertiary)] border border-[var(--border-default)]
                           rounded-md px-4 py-3 text-sm text-[var(--text-primary)]
                           placeholder:text-[var(--text-tertiary)]
                           focus:border-[var(--color-accent-500)] focus:outline-none
                           focus:ring-1 focus:ring-[rgba(233,71,72,0.3)]
                           transition-colors duration-150"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="org"
                className="block text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)] mb-2"
              >
                Organización
              </label>
              <input
                id="org"
                type="text"
                placeholder="Nombre de la organización"
                className="w-full bg-[var(--surface-tertiary)] border border-[var(--border-default)]
                         rounded-md px-4 py-3 text-sm text-[var(--text-primary)]
                         placeholder:text-[var(--text-tertiary)]
                         focus:border-[var(--color-accent-500)] focus:outline-none
                         focus:ring-1 focus:ring-[rgba(233,71,72,0.3)]
                         transition-colors duration-150"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)] mb-2"
              >
                Cuéntanos sobre tu proyecto
              </label>
              <textarea
                id="message"
                rows={5}
                required
                placeholder="Describe brevemente tu organización, tus objetivos y cómo crees que podemos ayudarte..."
                className="w-full bg-[var(--surface-tertiary)] border border-[var(--border-default)]
                         rounded-md px-4 py-3 text-sm text-[var(--text-primary)]
                         placeholder:text-[var(--text-tertiary)]
                         focus:border-[var(--color-accent-500)] focus:outline-none
                         focus:ring-1 focus:ring-[rgba(233,71,72,0.3)]
                         transition-colors duration-150 resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                <Send size={14} />
                Enviar mensaje
              </Button>
              <p className="text-xs text-[var(--text-tertiary)]">
                Sin compromiso. Máxima confidencialidad.
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
