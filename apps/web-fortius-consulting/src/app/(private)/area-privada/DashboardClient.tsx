"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bracketed } from "@/components/system/Bracketed";
import { LinkedInBrandIcon } from "@/components/system/LinkedInBrandIcon";
import { MOCK_PROJECTS } from "@/content/dashboard";
import { TEAM } from "@/content/team";
import { PersonPortrait } from "@/components/consulting-v2/PersonPortrait";
import { Lock, CalendarPlus, Activity, CheckCircle2, Clock, Mail, MapPin, CreditCard } from "lucide-react";
import type { PrivateUser } from "@/lib/auth";
import type { MemberDashboardData } from "@/lib/private/queries";
import {
    formatPublishedDate,
    kindLabel,
    listArticles,
    listArticlesByCategory,
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
}

export function DashboardClient({ user, data }: Props) {
    const linkedExperts = TEAM.filter(m => m.slug === "juan-angel-soto" || m.slug === "beatriz-de-leon-cobo");
    const category = getCategoryFromTier(data.tier ?? user.tier);
    const memberContent = listArticlesByCategory(category);
    const publications = memberContent
        .filter((item) => item.access === "paid" && item.kind !== "evento")
        .slice(0, 4);
    const events = memberContent
        .filter((item) => item.kind === "evento")
        .map((item) => ({ item, event: getEventArticleData(item) }))
        .slice(0, 4);
    const allArticles = listArticles();
    const purchasedEvents = data.eventPurchases.map((purchase) => ({
        purchase,
        article: allArticles.find((item) => item.slug === purchase.eventSlug),
    }));

    const greeting = user.fullName?.split(" ")[0] ?? user.email ?? "Cliente";
    const renewalDate = formatRenewal(data.subscription?.currentPeriodEnd ?? null);
    const isActive = (data.subscription?.stripeStatus ?? data.status) === "active";
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
    );
}
