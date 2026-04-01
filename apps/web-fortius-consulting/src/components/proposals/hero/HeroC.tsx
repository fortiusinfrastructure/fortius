"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowUpRight, Minus } from "lucide-react";

/**
 * HERO C — "Editorial Split"
 *
 * Concepto: Inspirado en la maquetación editorial de revistas de alta gama
 * (Monocle, Foreign Affairs). Split vertical asimétrico: lado izquierdo
 * con headline tipográfico puro, lado derecho con un bloque visual abstracto
 * (composición de líneas y formas geométricas animadas que representan
 * "estructura" y "conexión"). Un cursor-follower sutil añade interactividad.
 */

function AbstractComposition() {
  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-0 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--surface-secondary)]" />

      {/* Animated geometric elements */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 700"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Horizontal lines */}
        {[120, 250, 380, 510].map((y, i) => (
          <motion.line
            key={`h-${y}`}
            x1="0"
            y1={y}
            x2="500"
            y2={y}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.3 + i * 0.15,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          />
        ))}

        {/* Accent diagonal */}
        <motion.line
          x1="80"
          y1="600"
          x2="420"
          y2="100"
          stroke="var(--color-accent-500)"
          strokeWidth="1.5"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        />

        {/* Circle nodes */}
        {[
          { cx: 150, cy: 200, r: 4 },
          { cx: 320, cy: 350, r: 6 },
          { cx: 250, cy: 500, r: 3 },
          { cx: 380, cy: 180, r: 5 },
        ].map((circle, i) => (
          <motion.circle
            key={`c-${i}`}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            fill="var(--color-accent-500)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 0.4, delay: 1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        {/* Connection lines between nodes */}
        <motion.path
          d="M150 200 Q 235 275 320 350 Q 285 425 250 500"
          fill="none"
          stroke="rgba(233, 71, 72, 0.15)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
        />

        {/* Large accent circle (background) */}
        <motion.circle
          cx="350"
          cy="350"
          r="120"
          fill="none"
          stroke="rgba(233, 71, 72, 0.06)"
          strokeWidth="1"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        />
      </svg>

      {/* Floating label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-8 right-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-accent-500)] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
            Network reach
          </span>
        </div>
        <div className="flex gap-6">
          {[
            { label: "Instituciones", value: "80+" },
            { label: "Regiones", value: "12" },
            { label: "Publicaciones", value: "45+" },
          ].map((item) => (
            <div key={item.label}>
              <span className="text-xl font-display font-light text-[var(--text-primary)]">
                {item.value}
              </span>
              <p className="text-[9px] uppercase tracking-wider text-[var(--text-tertiary)] mt-0.5">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function HeroC() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightX = useSpring(mouseX, { stiffness: 80, damping: 30 });
  const spotlightY = useSpring(mouseY, { stiffness: 80, damping: 30 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const el = containerRef.current;
    el?.addEventListener("mousemove", handleMouse);
    return () => el?.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4 + i * 0.08,
        ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--surface-primary)" }}
    >
      {/* Cursor spotlight */}
      <motion.div
        className="absolute pointer-events-none w-[500px] h-[500px] rounded-full"
        style={{
          x: spotlightX,
          y: spotlightY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(233, 71, 72, 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left — Editorial typography */}
        <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-24 py-20">
          {/* Issue/Edition number — editorial detail */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
              EST. 2010
            </span>
            <Minus size={12} className="text-[var(--border-strong)]" />
            <span className="text-[11px] font-mono text-[var(--color-accent-400)]">
              MADRID
            </span>
          </motion.div>

          {/* Main headline — large editorial typography */}
          <div className="space-y-2">
            {["Pensamiento", "estratégico", "para un", "mundo"].map((word, i) => (
              <motion.div
                key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="overflow-hidden"
              >
                <span className="block font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.1] tracking-tight text-[var(--text-primary)]">
                  {word}
                </span>
              </motion.div>
            ))}
            <motion.div
              custom={4}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="overflow-hidden"
            >
              <span className="block font-display text-[clamp(2rem,5vw,4rem)] italic leading-[1.1] tracking-tight text-[var(--color-accent-400)]">
                en transformación.
              </span>
            </motion.div>
          </div>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-10 max-w-md text-[var(--text-secondary)] font-light leading-relaxed"
          >
            Combinamos análisis riguroso, visión histórica y red global para
            asesorar a quienes lideran instituciones, gobiernos y organizaciones
            del mundo hispánico.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-10 flex items-center gap-6"
          >
            <button className="group flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-400)] hover:text-[var(--color-accent-300)] transition-colors duration-150">
              Explorar servicios
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
              />
            </button>
            <span className="text-[var(--border-strong)]">|</span>
            <button className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors duration-150">
              Contacto directo
            </button>
          </motion.div>

          {/* Bottom editorial line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="mt-auto pt-12"
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="h-px bg-[var(--border-default)]"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
              />
              <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
                Scroll para descubrir
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right — Abstract composition */}
        <div className="relative border-l border-[var(--border-subtle)]">
          <AbstractComposition />
        </div>
      </div>
    </section>
  );
}
