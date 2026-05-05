"use client";

import { motion } from "framer-motion";
import { Bracketed } from "@/components/system/Bracketed";
import { MOCK_PROJECTS, MOCK_PUBLICATIONS, MOCK_EVENTS } from "@/content/dashboard";
import { TEAM } from "@/content/team";
import { PersonPortrait } from "@/components/consulting-v2/PersonPortrait";
import { FileText, Lock, CalendarPlus, Activity, CheckCircle2, Clock } from "lucide-react";
import type { ClientUser } from "@/lib/auth";

const ease = [0.22, 0.61, 0.36, 1] as const;

export function DashboardClient({ user }: { user: ClientUser }) {
    // Simulamos que el usuario tiene vinculados a Juan Ángel y Beatriz
    const linkedExperts = TEAM.filter(m => m.slug === "juan-angel-soto" || m.slug === "beatriz-de-leon-cobo");

    return (
        <div className="pt-[var(--nav-height)] pb-24 md:pb-36 min-h-screen bg-[var(--color-neutral-1000,#0a111e)]">
            <header className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 border-b border-[var(--border-subtle)] pb-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
                    <Bracketed variant="kicker">Área Privada</Bracketed>
                    <h1 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-tight text-[var(--text-primary)]">
                        Bienvenido, <span className="italic text-[var(--color-accent-400)]">{user.email}</span>
                    </h1>
                    <div className="mt-6 flex flex-wrap gap-4 items-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] text-[0.75rem] uppercase tracking-wider text-[var(--text-secondary)]">
                            Suscripción: <strong className="text-[var(--text-primary)]">{user.planId}</strong>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 text-[0.75rem] uppercase tracking-wider text-[#10b981]">
                            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                            {user.status === "active" ? "Activo" : "Inactivo"}
                        </span>
                    </div>
                </motion.div>
            </header>

            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 space-y-24">
                {/* Expertos Vinculados */}
                <section>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                        <Bracketed variant="tag">Equipo Asignado</Bracketed>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {linkedExperts.map((expert, i) => (
                                <div key={expert.slug} className="flex items-center gap-4 p-4 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] hover:border-[var(--color-accent-500)] transition-colors">
                                    <PersonPortrait name={expert.name} photo={expert.photo} size="sm" className="shrink-0" />
                                    <div>
                                        <h3 className="font-display text-[1.1rem] text-[var(--text-primary)]">{expert.name}</h3>
                                        <p className="text-[0.75rem] uppercase tracking-wider text-[var(--color-accent-400)] mt-1">{expert.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Estado de Proyectos */}
                <section>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                        <Bracketed variant="tag">Estado de Proyectos</Bracketed>
                        <div className="mt-8 space-y-4">
                            {MOCK_PROJECTS.map((project) => (
                                <div key={project.id} className="p-6 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-display text-[1.4rem] text-[var(--text-primary)]">{project.title}</h3>
                                            {project.status === "active" ? (
                                                <span className="flex items-center gap-1.5 px-2 py-1 bg-[var(--color-accent-500)]/10 text-[var(--color-accent-400)] text-[0.65rem] uppercase tracking-widest border border-[var(--color-accent-500)]/30">
                                                    <Activity size={12} /> En curso
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 px-2 py-1 bg-gray-500/10 text-gray-400 text-[0.65rem] uppercase tracking-widest border border-gray-500/30">
                                                    <CheckCircle2 size={12} /> Completado
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[0.9rem] text-[var(--text-secondary)]">{project.description}</p>
                                    </div>
                                    <div className="md:w-1/3 p-4 bg-[var(--color-neutral-1000)] border border-[var(--border-subtle)]">
                                        <span className="block text-[0.65rem] uppercase tracking-widest text-[var(--text-tertiary)] mb-2">Objetivo Clave (OKR)</span>
                                        <p className="text-[0.95rem] text-[var(--text-primary)]">{project.okr}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Ventajas: Contenido Exclusivo y Oportunidades */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 pt-8 border-t border-[var(--border-subtle)]">
                    <section>
                        <Bracketed variant="tag">Contenido Exclusivo</Bracketed>
                        <div className="mt-8 space-y-4">
                            {MOCK_PUBLICATIONS.map(pub => (
                                <a key={pub.id} href={pub.url || "#"} className="group block p-5 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] hover:border-[var(--color-accent-500)] transition-colors">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[0.65rem] uppercase tracking-widest text-[var(--text-tertiary)]">{pub.type}</span>
                                        {pub.isPrivate && <Lock size={14} className="text-[var(--color-accent-400)]" />}
                                    </div>
                                    <h4 className="font-display text-[1.2rem] text-[var(--text-primary)] group-hover:text-[var(--color-accent-400)] transition-colors mb-2">{pub.title}</h4>
                                    <div className="flex items-center gap-2 text-[0.75rem] text-[var(--text-secondary)]">
                                        <Clock size={12} /> {pub.date}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>

                    <section>
                        <Bracketed variant="tag">Oportunidades & Eventos</Bracketed>
                        <div className="mt-8 space-y-4">
                            {MOCK_EVENTS.map(evt => (
                                <div key={evt.id} className="p-5 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)]">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                        <div>
                                            <span className="text-[0.65rem] uppercase tracking-widest text-[#10b981] mb-2 block">{evt.location}</span>
                                            <h4 className="font-display text-[1.2rem] text-[var(--text-primary)] mb-2">{evt.title}</h4>
                                            <p className="text-[0.85rem] text-[var(--text-secondary)]">{evt.description}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className="block text-[1.4rem] font-display text-[var(--text-primary)]">{evt.price}€</span>
                                            <span className="text-[0.65rem] uppercase tracking-wider text-[var(--text-tertiary)]">Acceso único</span>
                                        </div>
                                    </div>
                                    <button className="w-full flex items-center justify-center gap-2 py-3 border border-[var(--color-accent-500)] text-[var(--color-accent-400)] hover:bg-[var(--color-accent-500)] hover:text-white transition-colors text-[0.8rem] uppercase tracking-widest">
                                        <CalendarPlus size={16} /> Adquirir Acceso
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
