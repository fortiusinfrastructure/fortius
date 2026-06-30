"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bracketed } from "@/components/system/Bracketed";
import { Activity, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import type { PrivateUser } from "@/lib/auth";
import type { ClientProjectWithUsers } from "@/lib/private/queries";

const ease = [0.22, 0.61, 0.36, 1] as const;

interface Props {
    user: PrivateUser;
    projects: ClientProjectWithUsers[];
}

function formatKpiValue(kpi: ClientProjectWithUsers["kpis"][number]) {
    const value = kpi.value ?? "—";
    const target = kpi.target ?? null;
    const unit = kpi.unit ?? "";
    const right = target !== null ? ` / ${target}` : "";
    return `${value}${right}${unit ? ` ${unit}` : ""}`.trim();
}

function formatDate(iso: string | null) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}

export function DashboardConsultant({ user, projects }: Props) {
    const greeting = user.fullName?.split(" ")[0] ?? user.email ?? "Equipo";
    const activeProjects = projects.filter((p) => p.status === "active");

    return (
        <div className="pt-[var(--nav-height)] pb-24 md:pb-36 min-h-screen bg-[var(--color-neutral-1000,#0a111e)]">
            <header className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 border-b border-[var(--border-subtle)] pb-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
                    <Bracketed variant="kicker">Panel de consultor</Bracketed>
                    <h1 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-tight text-[var(--text-primary)]">
                        Hola, <span className="italic text-[var(--color-accent-400)]">{greeting}</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-[0.95rem] text-[var(--text-secondary)]">
                        Estos son los proyectos asignados a ti. Tienes {activeProjects.length} en curso.
                    </p>
                </motion.div>
            </header>

            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 space-y-24">
                <section>
                    <Bracketed variant="tag">Herramientas</Bracketed>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link
                            href="/area-privada/admin/articulos"
                            className="group p-5 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] hover:border-[var(--color-accent-500)]/40 transition-colors flex items-center gap-4"
                        >
                            <FileText size={22} className="text-[var(--color-accent-400)] shrink-0" />
                            <div className="flex-1">
                                <p className="font-display text-[1.05rem] text-[var(--text-primary)]">Gestionar artículos</p>
                                <p className="text-[0.8rem] text-[var(--text-tertiary)]">Publicar, editar y archivar tus contenidos.</p>
                            </div>
                            <ArrowRight size={16} className="text-[var(--text-tertiary)] group-hover:text-[var(--color-accent-400)] transition-colors" />
                        </Link>
                    </div>
                </section>

                <section>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                        <Bracketed variant="tag">Mis proyectos</Bracketed>
                        <div className="mt-8 space-y-4">
                            {projects.length > 0 ? projects.map((project) => (
                                <div key={project.id} className="p-6 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <h3 className="font-display text-[1.3rem] text-[var(--text-primary)]">{project.title}</h3>
                                            {project.status === "active" ? (
                                                <span className="flex items-center gap-1.5 px-2 py-1 bg-[var(--color-accent-500)]/10 text-[var(--color-accent-400)] text-[0.65rem] uppercase tracking-widest border border-[var(--color-accent-500)]/30">
                                                    <Activity size={12} /> En curso
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 px-2 py-1 bg-gray-500/10 text-gray-400 text-[0.65rem] uppercase tracking-widest border border-gray-500/30">
                                                    <CheckCircle2 size={12} /> {project.status === "completed" ? "Completado" : project.status}
                                                </span>
                                            )}
                                        </div>
                                        {project.summary && (
                                            <p className="text-[0.9rem] text-[var(--text-secondary)]">{project.summary}</p>
                                        )}
                                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[0.8rem]">
                                            <div>
                                                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Cliente</p>
                                                <p className="mt-1 text-[var(--text-primary)]">
                                                    {project.clientName ?? <span className="text-[var(--text-tertiary)]">Sin nombre</span>}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Última actualización</p>
                                                <p className="mt-1 text-[var(--text-primary)] tabular-nums">{formatDate(project.updatedAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-1/3 p-4 bg-[var(--color-neutral-1000)] border border-[var(--border-subtle)]">
                                        <span className="block text-[0.65rem] uppercase tracking-widest text-[var(--text-tertiary)] mb-2">Objetivos / KPIs</span>
                                        {project.kpis.length > 0 ? (
                                            <ul className="space-y-1.5">
                                                {project.kpis.map((kpi, i) => (
                                                    <li key={i} className="flex items-baseline justify-between gap-3 text-[0.85rem]">
                                                        <span className="text-[var(--text-secondary)]">{kpi.label || "—"}</span>
                                                        <span className="text-[var(--text-primary)] tabular-nums">{formatKpiValue(kpi)}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-[0.85rem] text-[var(--text-tertiary)]">Sin KPIs definidos.</p>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="p-6 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] text-[0.9rem] text-[var(--text-secondary)]">
                                    Aún no tienes proyectos asignados. Tu coordinador te avisará cuando se inicie el primero.
                                </div>
                            )}
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
}
