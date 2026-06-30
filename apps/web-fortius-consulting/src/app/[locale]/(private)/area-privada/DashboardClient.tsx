"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bracketed } from "@/components/system/Bracketed";
import { LinkedInBrandIcon } from "@/components/system/LinkedInBrandIcon";
import { TEAM, type TeamMember } from "@/content/team";
import { PersonPortrait } from "@/components/consulting-v2/PersonPortrait";
import { Lock, CalendarPlus, Activity, CheckCircle2, Clock, Mail, MapPin, CreditCard, UserCircle2 } from "lucide-react";
import type { PrivateUser } from "@/lib/auth";
import type { MemberDashboardData, ClientProjectWithUsers } from "@/lib/private/queries";
import {
    formatPublishedDate,
    kindLabel,
    type Article,
    type ArticleCategory,
} from "@/lib/articles";
import { getEventArticleData } from "@/lib/article-display";

const ease = [0.22, 0.61, 0.36, 1] as const;
const CLIENT_COORDINATION_EMAIL = "info@fortiusconsulting.org";

function getCategoryFromTier(tier: string | null): ArticleCategory {
    if (tier?.startsWith("sociedad-civil")) return "sociedad-civil";
    return "politica";
}

function formatTierLabel(tier: string | null) {
    if (!tier) return "Sin plan";
    return tier.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function formatRenewal(iso: string | null) {
    if (!iso) return null;
    return new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
}

function formatAmount(cents: number, currency: string) {
    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: currency.toUpperCase(),
    }).format(cents / 100);
}

interface Props {
    user: PrivateUser;
    data: MemberDashboardData;
    /** All published articles, fetched server-side (lib/articles-db). */
    articles: Article[];
    /** Client projects visible to the viewer via RLS, with user names resolved. */
    projects: ClientProjectWithUsers[];
}

function formatKpiValue(kpi: ClientProjectWithUsers["kpis"][number]) {
    const value = kpi.value ?? "—";
    const target = kpi.target ?? null;
    const unit = kpi.unit ?? "";
    const right = target !== null ? ` / ${target}` : "";
    return `${value}${right}${unit ? ` ${unit}` : ""}`.trim();
}

function normalizeName(s: string) {
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

interface AssignedConsultant {
    userId: string;
    name: string;
    team: TeamMember | null;
}

function deriveAssignedConsultants(projects: ClientProjectWithUsers[]): AssignedConsultant[] {
    const seen = new Map<string, AssignedConsultant>();
    for (const p of projects) {
        if (!p.consultantUserId) continue;
        if (seen.has(p.consultantUserId)) continue;
        const name = p.consultantName ?? "";
        const norm = normalizeName(name);
        const team = norm ? (TEAM.find((m) => normalizeName(m.name) === norm) ?? null) : null;
        seen.set(p.consultantUserId, {
            userId: p.consultantUserId,
            name: name || "Sin nombre",
            team,
        });
    }
    return Array.from(seen.values());
}

export function DashboardClient({ user, data, articles, projects }: Props) {
    const linkedExperts = deriveAssignedConsultants(projects);
    const category = getCategoryFromTier(data.tier ?? user.tier);
    const memberContent = articles.filter((item) => item.category === category);
    const publications = memberContent
        .filter((item) => item.access === "paid" && item.kind !== "evento")
        .slice(0, 4);
    const events = memberContent
        .filter((item) => item.kind === "evento")
        .map((item) => ({ item, event: getEventArticleData(item) }))
        .slice(0, 4);
    const purchasedEvents = data.eventPurchases.map((purchase) => ({
        purchase,
        article: articles.find((item) => item.slug === purchase.eventSlug),
    }));

    const greeting = user.fullName?.split(" ")[0] ?? user.email ?? "Cliente";
    const renewalDate = formatRenewal(data.subscription?.currentPeriodEnd ?? null);
    const stripeStatus = data.subscription?.stripeStatus ?? null;
    const hasActiveSubscription =
        stripeStatus === "active" ||
        stripeStatus === "trialing" ||
        (stripeStatus === null && data.status === "active");
    const isPastDue = stripeStatus === "past_due";
    const isActive = hasActiveSubscription;
    const willCancel = data.subscription?.cancelAtPeriodEnd;

    return (
        <div className="pt-[var(--nav-height)] pb-24 md:pb-36 min-h-screen bg-[var(--color-neutral-1000,#0a111e)]">
            <header className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 border-b border-[var(--border-subtle)] pb-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
                    <Bracketed variant="kicker">Área clientes</Bracketed>
                    <h1 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-tight text-[var(--text-primary)]">
                        Bienvenido, <span className="italic text-[var(--color-accent-400)]">{greeting}</span>
                    </h1>

                    {/* Subscription card — real data from DB */}
                    <div className="mt-8 inline-flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 border border-[var(--border-default)] bg-[var(--color-neutral-900)]">
                        <CreditCard size={20} className="text-[var(--color-accent-400)] shrink-0" />
                        <div>
                            <p className="text-[0.75rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Tu plan</p>
                            <p className="mt-1 font-display text-[1.3rem] text-[var(--text-primary)]">
                                {formatTierLabel(data.tier ?? user.tier)}
                            </p>
                        </div>
                        <div className="h-px w-full sm:h-10 sm:w-px bg-[var(--border-subtle)]" />
                        <div>
                            <p className="text-[0.75rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Estado</p>
                            <span className="mt-1 inline-flex items-center gap-1.5 text-[0.8rem]" style={{ color: isActive ? "#10b981" : "#9ca3af" }}>
                                <span className="w-2 h-2 rounded-full" style={{ background: "currentColor" }} />
                                {isActive ? "Activa" : "Inactiva"}
                            </span>
                        </div>
                        {renewalDate && (
                            <>
                                <div className="h-px w-full sm:h-10 sm:w-px bg-[var(--border-subtle)]" />
                                <div>
                                    <p className="text-[0.75rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                                        {willCancel ? "Expira el" : "Próxima renovación"}
                                    </p>
                                    <p className="mt-1 text-[0.9rem] text-[var(--text-primary)]">{renewalDate}</p>
                                </div>
                            </>
                        )}
                        <div className="h-px w-full sm:h-10 sm:w-px bg-[var(--border-subtle)]" />
                        <Link
                            href="/area-privada/cuenta#suscripcion"
                            className="text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-400)] hover:text-[var(--color-accent-500)] transition-colors whitespace-nowrap"
                        >
                            Gestionar →
                        </Link>
                    </div>
                </motion.div>
            </header>

            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 space-y-24">
                {/* Equipo Asignado — derivado del consultor real del proyecto */}
                <section>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                        <Bracketed variant="tag">Equipo Asignado</Bracketed>
                        {linkedExperts.length === 0 ? (
                            <div className="mt-8 p-5 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] text-[0.9rem] text-[var(--text-secondary)]">
                                Aún no tienes un consultor asignado. En cuanto se inicie tu proyecto te lo comunicaremos.
                            </div>
                        ) : (
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {linkedExperts.map((expert) => {
                                    const team = expert.team;
                                    return (
                                        <div key={expert.userId} className="border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] p-4 transition-colors hover:border-[var(--color-accent-500)]">
                                            <div className="flex items-center gap-4">
                                                {team ? (
                                                    <PersonPortrait name={team.name} photo={team.photo} size="sm" className="shrink-0" />
                                                ) : (
                                                    <UserCircle2 size={48} className="shrink-0 text-[var(--text-tertiary)]" />
                                                )}
                                                <div>
                                                    <h3 className="font-display text-[1.1rem] text-[var(--text-primary)]">{team?.name ?? expert.name}</h3>
                                                    {team?.role && (
                                                        <p className="mt-1 text-[0.75rem] uppercase tracking-wider text-[var(--color-accent-400)]">{team.role}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-4 space-y-2 border-t border-[var(--border-subtle)] pt-4 text-[0.8rem] text-[var(--text-secondary)]">
                                                {team && (team.area || team.country) && (
                                                    <p className="flex items-start gap-2">
                                                        <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--color-accent-400)]" />
                                                        <span>{team.area ?? team.country}</span>
                                                    </p>
                                                )}
                                                <p className="flex items-start gap-2">
                                                    <Mail size={14} className="mt-0.5 shrink-0 text-[var(--color-accent-400)]" />
                                                    <span>Coordinación: {CLIENT_COORDINATION_EMAIL}</span>
                                                </p>
                                            </div>

                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {team?.linkedin && (
                                                    <a href={team.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-[var(--border-subtle)] px-3 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--text-primary)] transition-colors hover:border-[var(--color-accent-500)]">
                                                        <LinkedInBrandIcon size={14} />
                                                        LinkedIn
                                                    </a>
                                                )}
                                                <a href={`mailto:${CLIENT_COORDINATION_EMAIL}?subject=${encodeURIComponent(`Contacto para ${team?.name ?? expert.name}`)}`} className="inline-flex items-center gap-2 border border-[var(--border-subtle)] px-3 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--text-primary)] transition-colors hover:border-[var(--color-accent-500)]">
                                                    <Mail size={14} />
                                                    Escribir
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>
                </section>

                {/* Estado de Proyectos */}
                <section>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                        <Bracketed variant="tag">Estado de Proyectos</Bracketed>
                        <div className="mt-8 space-y-4">
                            {projects.length > 0 ? projects.map((project) => (
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
                                                    <CheckCircle2 size={12} /> {project.status === "completed" ? "Completado" : project.status}
                                                </span>
                                            )}
                                        </div>
                                        {project.summary && (
                                            <p className="text-[0.9rem] text-[var(--text-secondary)]">{project.summary}</p>
                                        )}
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
                                    Aún no tienes proyectos asignados. Tu equipo de Fortius te avisará cuando se inicie el primero.
                                </div>
                            )}
                        </div>
                    </motion.div>
                </section>

                {/* Ventajas: Contenido Exclusivo y Oportunidades — gateadas por suscripción Stripe */}
                <div className="relative pt-8 border-t border-[var(--border-subtle)]">
                    {!hasActiveSubscription && (
                        <div className="absolute inset-x-0 top-8 bottom-0 z-10 flex items-start md:items-center justify-center px-4 py-10 backdrop-blur-md bg-[var(--color-neutral-1000)]/70">
                            <div className="max-w-md w-full text-center p-8 border border-[var(--border-default)] bg-[var(--color-neutral-900)]">
                                <Lock size={32} className="text-[var(--color-accent-400)] mx-auto mb-4" />
                                <h3 className="font-display text-[1.4rem] text-[var(--text-primary)] mb-3">
                                    {isPastDue ? "Pago pendiente" : "Suscripción inactiva"}
                                </h3>
                                <p className="text-[0.9rem] text-[var(--text-secondary)] mb-6 leading-relaxed">
                                    {isPastDue
                                        ? "Tu último pago no se ha completado. Regulariza tu suscripción para recuperar el acceso al contenido exclusivo y a las oportunidades reservadas para clientes."
                                        : "Reactiva tu suscripción para acceder al contenido exclusivo y a las oportunidades reservadas para clientes de Fortius Consulting."}
                                </p>
                                <Link
                                    href="/area-privada/cuenta#suscripcion"
                                    className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-accent-500)] text-white text-[0.75rem] uppercase tracking-[0.16em] hover:bg-[var(--color-accent-600)] transition-colors"
                                >
                                    {isPastDue ? "Regularizar pago" : "Reactivar suscripción"} →
                                </Link>
                            </div>
                        </div>
                    )}
                    <div
                        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 ${!hasActiveSubscription ? "blur-sm pointer-events-none select-none" : ""}`}
                        aria-hidden={!hasActiveSubscription}
                    >
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
                            {purchasedEvents.length > 0 && (
                                <div className="space-y-3">
                                    <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                                        Adquiridas
                                    </p>
                                    {purchasedEvents.map(({ purchase, article }) => (
                                        <Link
                                            key={purchase.eventSlug}
                                            href={article ? `/${article.category}/${article.slug}` : "/area-privada"}
                                            className="block p-5 border border-[#10b981]/40 bg-[#10b981]/5 hover:border-[#10b981] transition-colors"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <span className="text-[0.65rem] uppercase tracking-widest text-[#10b981] mb-2 block">
                                                        Adquirida
                                                    </span>
                                                    <h4 className="font-display text-[1.15rem] text-[var(--text-primary)]">
                                                        {article?.title ?? purchase.eventTitle}
                                                    </h4>
                                                    <p className="mt-2 text-[0.8rem] text-[var(--text-secondary)]">
                                                        Compra confirmada {purchase.purchasedAt ? `el ${formatRenewal(purchase.purchasedAt)}` : ""}
                                                    </p>
                                                </div>
                                                <span className="text-[0.9rem] text-[var(--text-primary)] shrink-0">
                                                    {formatAmount(purchase.amountCents, purchase.currency)}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

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
        </div>
    );
}
