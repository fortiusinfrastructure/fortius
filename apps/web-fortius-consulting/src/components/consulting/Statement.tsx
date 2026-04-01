"use client";

import { motion } from "framer-motion";

export function Statement() {
  return (
    <section
      aria-label="Declaración"
      className="relative py-20 md:py-28 overflow-hidden
               border-t border-[var(--border-subtle)]
               bg-[var(--surface-secondary)]"
    >
      {/* Abstract shape — matches screenshot's triangular red form */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, rgba(233,71,72,0.06) 50%, rgba(233,71,72,0.03) 100%)",
          clipPath: "polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="max-w-3xl">
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <p className="font-display text-[clamp(1.6rem,3.5vw,2.75rem)] font-light
                        leading-[1.3] tracking-tight text-[var(--text-primary)]">
              Asesoramos a nuestros clientes
              <br />
              para maximizar el{" "}
              <em className="text-[var(--color-accent-400)]">
                impacto de sus valores
              </em>
              <br />
              en la sociedad
            </p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
