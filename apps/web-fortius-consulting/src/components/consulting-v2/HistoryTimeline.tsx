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
        year: "2017-2022",
        consulting: {
            title: "Fortius se traslada a Londres.",
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

            <div className="relative pt-8 md:pt-16 pb-12 max-w-5xl mx-auto">
                <div className="flex flex-col">
                    {TIMELINE.map((m, i) => (
                        <div key={m.year} className="flex relative group">
                            {/* Track Area */}
                            <div className="w-16 md:w-24 shrink-0 relative flex justify-center">
                                <div className="relative w-4 md:w-6">
                                    {/* Red Line */}
                                    <div
                                        className="w-px bg-[var(--color-accent-500)] opacity-35 absolute left-0"
                                        style={{
                                            top: i === 0 ? "2rem" : 0,
                                            bottom: i === TIMELINE.length - 1 ? "calc(100% - 2.5rem)" : 0,
                                        }}
                                    />

                                    {/* Green Line */}
                                    {m.foundationActive && (
                                        <div
                                            className="w-px bg-[#10b981] opacity-35 absolute right-0"
                                            style={{
                                                top: m.year === "2023" ? "2rem" : 0,
                                                bottom: i === TIMELINE.length - 1 ? "calc(100% - 2.5rem)" : 0,
                                            }}
                                        />
                                    )}

                                    {/* Red Node */}
                                    {m.consulting && (
                                        <div className="absolute top-[2rem] left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--color-neutral-1000,#0a111e)] border border-[var(--color-accent-500)] ring-[4px] ring-[var(--color-neutral-1000,#0a111e)] transition-transform duration-500 ease-out group-hover:scale-150 z-10" />
                                    )}

                                    {/* Green Node */}
                                    {m.foundation && (
                                        <div className="absolute top-[2rem] right-0 translate-x-1/2 w-3 h-3 rounded-full bg-[var(--color-neutral-1000,#0a111e)] border border-[#10b981] ring-[4px] ring-[var(--color-neutral-1000,#0a111e)] transition-transform duration-500 ease-out group-hover:scale-150 z-10" />
                                    )}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 pb-16 pt-[1.6rem] pr-4">
                                <h3 className="font-display text-[1.8rem] md:text-[2.2rem] text-[var(--text-primary)] leading-none mb-6">
                                    {m.year}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Consulting */}
                                    {m.consulting && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, ease }}
                                        >
                                            {m.consulting.title && (
                                                <h4 className="text-[1.1rem] text-[var(--color-accent-500)] mb-2">
                                                    {m.consulting.title}
                                                </h4>
                                            )}
                                            {m.consulting.description && (
                                                <p className="text-[0.95rem] text-[var(--text-secondary)] leading-relaxed">
                                                    {m.consulting.description}
                                                </p>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Foundation */}
                                    {m.foundation && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, ease, delay: 0.1 }}
                                        >
                                            {m.foundation.title && (
                                                <h4 className="text-[1.1rem] text-[#10b981] mb-2">
                                                    {m.foundation.title}
                                                </h4>
                                            )}
                                            {m.foundation.description && (
                                                <p className="text-[0.95rem] text-[var(--text-secondary)] leading-relaxed">
                                                    {m.foundation.description}
                                                </p>
                                            )}
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
