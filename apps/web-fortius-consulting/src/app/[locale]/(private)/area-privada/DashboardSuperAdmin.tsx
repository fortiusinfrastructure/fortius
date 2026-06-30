"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bracketed } from "@/components/system/Bracketed";
import { Activity, Users, Briefcase, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import type { PrivateUser } from "@/lib/auth";
import type { ClientProjectWithUsers } from "@/lib/private/queries";

const ease = [0.22, 0.61, 0.36, 1] as const;

interface Props {
    user: PrivateUser;
    projects: ClientProjectWithUsers[];
}

function formatDate(iso: string | null) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}

export function DashboardSuperAdmin({ user, projects }: Props) {
    const greeting = user.fullName?.split(" ")[0] ?? user.email ?? "Equipo";

    const activeProjects = projects.filter((p) => p.status === "active");
    const uniqueClients = new Set(projects.map((p) => p.clientUserId));
    const uniqueConsultants = new Set(
        projects.map((p) => p.consultantUserId).filter((id): id is string => Boolean(id)),
    );

    const stats = [
        { icon: Briefcase, label: "Proyectos activos", value: activeProjects.length },
        { icon: Users, label: "Clientes únicos", value: uniqueClients.size },
        { icon: Activity, label: "Consultores asignados", value: uniqueConsultants.size },
    ];

    return (
        <div className="pt-[var(--nav-height)] pb-24 md:pb-36 min-h-screen bg-[var(--color-neutral-1000,#0a111e)]">
            <header className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 border-b border-[var(--border-subtle)] pb-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
                    <Bracketed variant="kicker">Panel de control · Super admin</Bracketed>
                    <h1 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-tight text-[var(--text-primary)]">
                        Hola, <span className="italic text-[var(--color-accent-400)]">{greeting}</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-[0.95rem] text-[var(--text-secondary)]">
                        Vista global de los proyectos en curso de Fortius Consulting.
                    </p>
                </motion.div>
            </header>

            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 space-y-24">
                {/* Herramientas editoriales */}
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
                                <p className="text-[0.8rem] text-[var(--text-tertiary)]">Publicar, editar y archivar contenidos del sitio.</p>
                            </div>
                            <ArrowRight size={16} className="text-[var(--text-tertiary)] group-hover:text-[var(--color-accent-400)] transition-colors" />
                        </Link>
                    </div>
                </section>

                {/* KPIs agregados */}
                <section>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                        <Bracketed variant="tag">Resumen</Bracketed>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {stats.map((s) => (
                                <div key={s.label} className="p-5 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] flex items-center gap-4">
                                    <s.icon size={22} className="text-[var(--color-accent-400)] shrink-0" />
                                    <div>
                                        <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">{s.label}</p>
                                        <p className="mt-1 font-display text-[1.8rem] text-[var(--text-primary)] tabular-nums">{s.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Tabla de proyectos */}
                <section>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                        <Bracketed variant="tag">Proyectos en la organización</Bracketed>
                        <div className="mt-8 space-y-3">
                            {projects.length > 0 ? projects.map((project) => (
                                <div key={project.id} className="p-5 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                                    <div className="md:col-span-5">
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <h3 className="font-display text-[1.15rem] text-[var(--text-primary)]">{project.title}</h3>
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
                                            <p className="text-[0.85rem] text-[var(--text-secondary)]">{project.summary}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-3">
                                        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Cliente</p>
                                        <p className="mt-1 text-[0.9rem] text-[var(--text-primary)]">
                                            {project.clientName ?? <span className="text-[var(--text-tertiary)]">Sin nombre</span>}
                                        </p>
                                    </div>

                                    <div className="md:col-span-3">
                                        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Consultor</p>
                                        <p className="mt-1 text-[0.9rem] text-[var(--text-primary)]">
                                            {project.consultantUserId
                                                ? (project.consultantName ?? <span className="text-[var(--text-tertiary)]">Sin nombre</span>)
                                                : <span className="text-[var(--text-tertiary)]">Sin asignar</span>}
                                        </p>
                                    </div>

                                    <div className="md:col-span-1 md:text-right">
                                        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Última act.</p>
                                        <p className="mt-1 text-[0.8rem] text-[var(--text-secondary)] tabular-nums">{formatDate(project.updatedAt)}</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-6 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] text-[0.9rem] text-[var(--text-secondary)]">
                                    No hay proyectos registrados en la organización.
                                </div>
                            )}
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
}
