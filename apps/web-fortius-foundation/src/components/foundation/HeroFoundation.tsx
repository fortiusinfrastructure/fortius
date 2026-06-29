"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Bracketed } from "@/components/system/Bracketed";
import { IMPACT_METRICS } from "@/content/impact";
import { FOUNDATION_QUOTES } from "@/content/site";

const ease = [0.22, 0.61, 0.36, 1] as const;

export function HeroFoundation() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--surface-brand)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 15% 85%, rgba(47,122,91,0.28) 0%, transparent 60%), radial-gradient(ellipse at 85% 15%, rgba(10,40,28,0.55) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-[calc(var(--nav-height)+5rem)] pb-28 md:pb-36">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:items-start">
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="max-w-3xl space-y-10"
          >
            <Bracketed variant="hero">Fortius Foundation</Bracketed>

            <div id="hero-title" className="space-y-1">
              {[
                { text: "Servimos a quienes", accent: false },
                { text: "han elegido servir.", accent: true },
              ].map(({ text, accent }, i) => (
                <div key={text} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.3 + i * 0.12, ease }}
                    className={`font-display font-light leading-[0.98] tracking-tight text-[clamp(3rem,8.5vw,8rem)] ${
                      accent
                        ? "italic text-[var(--color-accent-300)]"
                        : "text-[var(--text-primary)]"
                    }`}
                  >
                    {text}
                  </motion.h1>
                </div>
              ))}
            </div>

            <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
              Fortius Foundation fortalece a las personas, organizaciones e
              instituciones que defienden causas nobles con criterio,
              profesionalidad y vocación de servicio. Trabajamos para que esas
              causas cuenten con estructura, aliados y capacidad real de dejar
              legado.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/nosotros"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors"
                style={{ backgroundColor: "var(--color-accent-500)" }}
              >
                Conocer la fundación
                <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/incubadora"
                className="inline-flex items-center justify-center gap-2 border px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
                style={{ borderColor: "var(--color-accent-400)" }}
              >
                Ver incubadora
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)]"
          >
            {FOUNDATION_QUOTES.slice(1).map((quote) => (
              <div
                key={quote}
                className="bg-[rgba(6,16,13,0.88)] p-6"
              >
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                  Fortius Foundation
                </p>
                <p className="mt-4 font-display text-[1.5rem] font-light leading-[1.18] text-[var(--text-primary)]">
                  {quote}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="relative mt-24 grid grid-cols-2 gap-px bg-[var(--border-subtle)] lg:grid-cols-4"
        >
          {IMPACT_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="p-6 md:p-7"
              style={{ backgroundColor: "var(--surface-brand)" }}
            >
              <p
                className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-light leading-none"
                style={{ color: "var(--color-accent-300)" }}
              >
                {metric.value}
              </p>
              <p className="mt-4 text-[0.75rem] uppercase tracking-[0.15em] leading-snug text-[var(--text-secondary)]">
                {metric.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
