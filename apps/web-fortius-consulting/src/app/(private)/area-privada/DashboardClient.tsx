"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bracketed } from "@/components/system/Bracketed";
import { LinkedInBrandIcon } from "@/components/system/LinkedInBrandIcon";
import { MOCK_PROJECTS } from "@/content/dashboard";
import { TEAM } from "@/content/team";
import { PersonPortrait } from "@/components/consulting-v2/PersonPortrait";
import { FileText, Lock, CalendarPlus, Activity, CheckCircle2, Clock, Mail, MapPin } from "lucide-react";
import type { ClientUser } from "@/lib/auth";
import {
    formatPublishedDate,
    kindLabel,
    listArticlesByCategory,
    type ArticleCategory,
} from "@/lib/articles";
import { getEventArticleData } from "@/lib/article-display";

const ease = [0.22, 0.61, 0.36, 1] as const;
const PLAN_TO_CATEGORY: Record<string, ArticleCategory> = {
    politica: "politica",
    "sociedad-civil": "sociedad-civil",
};
const CLIENT_COORDINATION_EMAIL = "info@fortiusconsulting.org";

export function DashboardClient({ user }: { user: ClientUser }) {
    // Simulamos que el usuario tiene vinculados a Juan Ángel y Beatriz
    const linkedExperts = TEAM.filter(m => m.slug === "juan-angel-soto" || m.slug === "beatriz-de-leon-cobo");
    const category = PLAN_TO_CATEGORY[user.planId] ?? "politica";
    const memberContent = listArticlesByCategory(category);
    const publications = memberContent
        .filter((item) => item.access === "paid" && item.kind !== "evento")
        .slice(0, 4);
    const events = memberContent
        .filter((item) => item.kind === "evento")
        .map((item) => ({ item, event: getEventArticleData(item) }))
        .slice(0, 4);

    return (
        <div className="pt-[var(--nav-height)] pb-24 md:pb-36 min-h-screen bg-[var(--color-neutral-1000,#0a111e)]">
            <header className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 border-b border-[var(--border-subtle)] pb-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
                    <Bracketed variant="kicker">Área clientes</Bracketed>
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
                                <div key={expert.slug} className="border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] p-4 transition-colors hover:border-[var(--color-accent-500)]">
                                    <div className="flex items-center gap-4">
                                        <PersonPortrait name={expert.name} photo={expert.photo} size="sm" className="shrink-0" />
                                        <div>
                                            <h3 className="font-display text-[1.1rem] text-[var(--text-primary)]">{expert.name}</h3>
                                            <p className="mt-1 text-[0.75rem] uppercase tracking-wider text-[var(--color-accent-400)]">{expert.role}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-2 border-t border-[var(--border-subtle)] pt-4 text-[0.8rem] text-[var(--text-secondary)]">
                                        {(expert.area || expert.country) && (
                                            <p className="flex items-start gap-2">
                                                <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--color-accent-400)]" />
                                                <span>{expert.area ?? expert.country}</span>
                                            </p>
                                        )}
                                        <p className="flex items-start gap-2">
                                            <Mail size={14} className="mt-0.5 shrink-0 text-[var(--color-accent-400)]" />
                                            <span>Coordinación: {CLIENT_COORDINATION_EMAIL}</span>
                                        </p>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {expert.linkedin && (
                                            <a href={expert.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-[var(--border-subtle)] px-3 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--text-primary)] transition-colors hover:border-[var(--color-accent-500)]">
                                                <LinkedInBrandIcon size={14} />
                                                LinkedIn
                                            </a>
                                        )}
                                        <a href={`mailto:${CLIENT_COORDINATION_EMAIL}?subject=${encodeURIComponent(`Contacto para ${expert.name}`)}`} className="inline-flex items-center gap-2 border border-[var(--border-subtle)] px-3 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--text-primary)] transition-colors hover:border-[var(--color-accent-500)]">
                                            <Mail size={14} />
                                            Escribir
                                        </a>
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
                                        <span className="block text-[0.65rem] uppercase tracking-widest text-[var(--text-tertiary)] mb-2">Objetivo prioritario (OKR / KPI)</span>
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
                            {publications.length > 0 ? publications.map((pub) => (
                                <Link
                                    key={pub.slug}
                                    href={`/${pub.category}/${pub.slug}`}
                                    className="group block p-5 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] hover:border-[var(--color-accent-500)] transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-3 gap-4">
                                        <span className="text-[0.65rem] uppercase tracking-widest text-[var(--text-tertiary)]">{kindLabel(pub.kind)}</span>
                                        <Lock size={14} className="text-[var(--color-accent-400)] shrink-0" />
                                    </div>
                                    <h4 className="font-display text-[1.2rem] text-[var(--text-primary)] group-hover:text-[var(--color-accent-400)] transition-colors mb-2">
                                        {pub.title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-[0.75rem] text-[var(--text-secondary)]">
                                        <Clock size={12} /> {formatPublishedDate(pub.published_at)}
                                    </div>
                                </Link>
                            )) : (
                                <div className="p-5 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] text-[0.9rem] text-[var(--text-secondary)]">
                                    Todavía no hay publicaciones exclusivas disponibles para este plan.
                                </div>
                            )}
                        </div>
                    </section>

                    <section>
                        <Bracketed variant="tag">Oportunidades & Eventos</Bracketed>
                        <div className="mt-8 space-y-4">
                            {events.length > 0 ? events.map(({ item, event }) => (
                                <div key={item.slug} className="p-5 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)]">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                        <div>
                                            <span className="text-[0.65rem] uppercase tracking-widest text-[#10b981] mb-2 block">
                                                {event?.location ?? "Oportunidad exclusiva para miembros"}
                                            </span>
                                            <h4 className="font-display text-[1.2rem] text-[var(--text-primary)] mb-2">{item.title}</h4>
                                            <p className="text-[0.85rem] text-[var(--text-secondary)]">
                                                {event?.date ?? formatPublishedDate(item.published_at)}
                                            </p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className="block text-[1.1rem] font-display text-[var(--text-primary)]">
                                                {event?.packages[0]?.price ? `Desde ${event.packages[0].price}` : "Consultar"}
                                            </span>
                                            <span className="text-[0.65rem] uppercase tracking-wider text-[var(--text-tertiary)]">Clientes</span>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/${item.category}/${item.slug}`}
                                        className="w-full flex items-center justify-center gap-2 py-3 border border-[var(--color-accent-500)] text-[var(--color-accent-400)] hover:bg-[var(--color-accent-500)] hover:text-white transition-colors text-[0.8rem] uppercase tracking-widest"
                                    >
                                        <CalendarPlus size={16} /> Ver oportunidad
                                    </Link>
                                </div>
                            )) : (
                                <div className="p-5 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] text-[0.9rem] text-[var(--text-secondary)]">
                                    No hay oportunidades activas disponibles en este momento.
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
