"use client";

import { motion } from "framer-motion";
import { Bracketed } from "@/components/system/Bracketed";

interface TimelineEvent {
    title?: string;
    description?: string;
}

interface TimelineItem {
    year: string;
    consulting?: TimelineEvent;
    foundation?: TimelineEvent;
    foundationActive?: boolean;
}

const TIMELINE: TimelineItem[] = [
    {
        year: "2015",
        consulting: { title: "Nacimiento Fortius" },
    },
    {
        year: "2015-2017",
        consulting: {
            description:
                "Actividad centrada en organizaciones especializadas en desarrollo económico. Gran actividad con clientes y proyectos en Sudáfrica y Kenia.",
        },
    },
    {
        year: "2017",
        consulting: { title: "Fortius se traslada a Londres." },
    },
    {
        year: "2017-2022",
        consulting: {
            description:
                "Actividad centrada en think tanks que velan por el florecimiento humano, tanto a nivel de desarrollo económico como espiritual, y que trabajan por el bien común. Primeros proyectos en Bélgica, Reino Unido y Estados Unidos.",
        },
    },
    {
        year: "2022",
        consulting: {
            title: "Fortius se traslada a Madrid",
            description:
                "Desarrolla equipo en Barcelona, Madrid y Pamplona. Mucho trabajo en think tanks inspirados por el humanismo cristiano y rápida expansión por Europa y América.",
        },
    },
    {
        year: "2023",
        consulting: {
            description: "Fortius comienza operaciones en el Norte de África y Asia Central.",
        },
        foundation: {
            title: "Nace Fundación Fortius España",
        },
        foundationActive: true,
    },
    {
        year: "2025",
        consulting: {
            title: "Nace Fortius Americas",
        },
        foundation: {
            title: "Nace Fortius Foundation United States",
        },
        foundationActive: true,
    },
];

const ease = [0.22, 0.61, 0.36, 1] as const;

export function HistoryTimeline() {
    return (
        <section
            aria-labelledby="historia-title"
            className="mt-24 md:mt-32 border-t border-[var(--border-subtle)] pt-16 md:pt-24"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-20 md:mb-28">
                <div className="lg:col-span-6 space-y-5">
                    <Bracketed variant="kicker">Nuestro Recorrido</Bracketed>
                    <h2
                        id="historia-title"
                        className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.08] tracking-tight text-[var(--text-primary)]"
                    >
                        Más de una década acompañando a organizaciones e instituciones en{" "}
                        <span className="italic text-[var(--color-accent-400)]">
                            Europa, América y África.
                        </span>
                    </h2>
                </div>
                <div className="lg:col-span-6 lg:pl-4">
                    <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl md:text-[1.05rem]">
                        Durante este tiempo hemos trabajado junto a think tanks, fundaciones,
                        líderes políticos, instituciones internacionales y plataformas ciudadanas
                        en algunos de los entornos políticos e institucionales más complejos del espacio euroatlántico.
                    </p>
                </div>
            </div>

            <div className="relative pt-8 md:pt-16 pb-12">
                <div
                    className="overflow-x-auto scrollbar-thin -mx-[var(--container-px)] px-[var(--container-px)] pb-8"
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    <div className="flex gap-0 min-w-max">
                        {TIMELINE.map((m, i) => (
                            <div
                                key={m.year}
                                className="w-[18rem] md:w-[22rem] shrink-0 flex flex-col"
                                style={{ scrollSnapAlign: "start" }}
                            >
                                {/* 1. Consulting Content */}
                                <div className="min-h-[14rem] flex flex-col justify-end pb-6 px-4 md:px-6">
                                    {m.consulting && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, ease }}
                                        >
                                            {m.consulting.title && (
                                                <h3 className="font-display text-[1.1rem] font-light leading-snug text-[var(--text-primary)] mb-2">
                                                    {m.consulting.title}
                                                </h3>
                                            )}
                                            {m.consulting.description && (
                                                <p className="text-[0.85rem] text-[var(--text-secondary)] leading-relaxed">
                                                    {m.consulting.description}
                                                </p>
                                            )}
                                        </motion.div>
                                    )}
                                </div>

                                {/* 2. Red Line Track */}
                                <div className="relative h-6 w-full flex items-center justify-center group">
                                    <div
                                        className={`absolute h-px bg-[var(--color-accent-500)] opacity-35 ${
                                            i === 0
                                                ? "left-1/2 right-0"
                                                : i === TIMELINE.length - 1
                                                ? "left-0 right-1/2"
                                                : "left-0 right-0"
                                        }`}
                                    />
                                    {m.consulting && (
                                        <div className="w-3 h-3 rounded-full bg-[var(--color-neutral-1000,#0a111e)] border-[1px] border-[var(--color-accent-500)] ring-[6px] ring-[var(--color-neutral-1000,#0a111e)] transition-transform duration-500 ease-out group-hover:scale-150 z-10" />
                                    )}
                                </div>

                                {/* 3. Year */}
                                <div className="h-20 flex items-center justify-center">
                                    <span className="font-display text-[clamp(1.6rem,2.5vw,2.2rem)] font-light leading-none text-[var(--text-primary)]">
                                        {m.year}
                                    </span>
                                </div>

                                {/* 4. Green Line Track */}
                                <div className="relative h-6 w-full flex items-center justify-center group">
                                    {m.foundationActive && (
                                        <div
                                            className={`absolute h-px bg-[#10b981] opacity-35 ${
                                                m.year === "2023"
                                                    ? "left-1/2 right-0"
                                                    : m.year === "2025"
                                                    ? "left-0 right-1/2"
                                                    : "left-0 right-0"
                                            }`}
                                        />
                                    )}
                                    {m.foundation && (
                                        <div className="w-3 h-3 rounded-full bg-[var(--color-neutral-1000,#0a111e)] border-[1px] border-[#10b981] ring-[6px] ring-[var(--color-neutral-1000,#0a111e)] transition-transform duration-500 ease-out group-hover:scale-150 z-10" />
                                    )}
                                </div>

                                {/* 5. Foundation Content */}
                                <div className="min-h-[10rem] flex flex-col justify-start pt-6 px-4 md:px-6">
                                    {m.foundation && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, ease }}
                                        >
                                            {m.foundation.title && (
                                                <h3 className="font-display text-[1.1rem] font-light leading-snug text-[#10b981] mb-2">
                                                    {m.foundation.title}
                                                </h3>
                                            )}
                                            {m.foundation.description && (
                                                <p className="text-[0.85rem] text-[var(--text-secondary)] leading-relaxed">
                                                    {m.foundation.description}
                                                </p>
                                            )}
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
