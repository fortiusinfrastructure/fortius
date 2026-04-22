"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Lock,
    Search,
    FileText,
    Megaphone,
    Users,
    Network,
    UserCheck,
    BookOpen,
    Handshake,
    Monitor,
    Globe,
    Activity,
    ShieldCheck,
} from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import type { ServiceIcon, VerticalDef } from "@/content/home-v2";
import {
    getTeamByVertical,
    getExpertsByVertical,
} from "@/content/team";
import { PersonCard } from "./PersonCard";
import { PersonDialog, type PersonDialogData } from "./PersonDialog";

const ICONS: Record<ServiceIcon, typeof Search> = {
    search: Search,
    fileText: FileText,
    megaphone: Megaphone,
    users: Users,
    network: Network,
    userCheck: UserCheck,
    bookOpen: BookOpen,
    handshake: Handshake,
    monitor: Monitor,
    globe: Globe,
    activity: Activity,
    shieldCheck: ShieldCheck,
};

const ease = [0.22, 0.61, 0.36, 1] as const;

interface VerticalSectionProps {
    vertical: VerticalDef;
    accentSide?: "left" | "right";
}

export function VerticalSection({ vertical: v, accentSide = "left" }: VerticalSectionProps) {
    const featured = v.insights.find((i) => i.featured) ?? v.insights[0];
    const rest = v.insights.filter((i) => i.slug !== featured.slug).slice(0, 2);
    const team = getTeamByVertical(v.id);
    const experts = getExpertsByVertical(v.id);

    const [activePerson, setActivePerson] = useState<PersonDialogData | null>(null);

    return (
        <section
            id={v.id}
            aria-labelledby={`${v.id}-title`}
            className="relative border-t border-[var(--border-subtle)] py-24 md:py-36"
        >
            <div className="absolute top-0 left-0 right-0 pointer-events-none opacity-50">
                <div
                    className="h-px w-full"
                    style={{
                        background: `linear-gradient(90deg, ${
                            accentSide === "left" ? "var(--color-accent-500) 0%, transparent 40%" : "transparent 60%, var(--color-accent-500) 100%"
                        })`,
                    }}
                />
            </div>

            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                {/* Intro: número + label + headline + descripción */}
                <div className="grid grid-cols-12 gap-6 mb-20">
                    <div className="col-span-12 lg:col-span-5 space-y-6">
                        <div className="flex items-baseline gap-6">
                            <span className="font-display text-[clamp(4rem,8vw,7rem)] font-light leading-none text-[var(--color-accent-500)] opacity-90">
                                {v.number}
                            </span>
                            <Bracketed variant="tag">{v.kicker}</Bracketed>
                        </div>
                        <a
                            href={v.href}
                            className="group inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] hover:text-[var(--color-accent-400)] transition-colors"
                        >
                            Explorar {v.label}
                            <ArrowUpRight
                                size={14}
                                className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                            />
                        </a>
                    </div>
                    <div className="col-span-12 lg:col-span-7 space-y-6">
                        <motion.h2
                            id={`${v.id}-title`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, ease }}
                            className="font-display text-[clamp(2rem,4.2vw,3.6rem)] font-light leading-[1.05] tracking-tight text-[var(--text-primary)]"
                        >
                            {v.headline}{" "}
                            <span className="italic text-[var(--color-accent-400)]">{v.headlineItalic}</span>
                        </motion.h2>
                        <p className="text-[var(--text-secondary)] leading-relaxed max-w-xl">
                            {v.description}
                        </p>
                    </div>
                </div>

                {/* Insights — CTAs editoriales */}
                <div className="mb-24">
                    <div className="flex items-end justify-between mb-8">
                        <Bracketed variant="kicker">Insights · {v.label}</Bracketed>
                        <a
                            href={`${v.href}#insights`}
                            className="hidden md:inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            Ver todos
                            <ArrowUpRight size={14} />
                        </a>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                        <motion.a
                            href={`/publicaciones/${featured.slug}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, ease }}
                            className="group col-span-1 lg:col-span-7 block"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-tertiary)] mb-6">
                                <div
                                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
                                    style={{
                                        background:
                                            v.id === "civil"
                                                ? "linear-gradient(135deg, rgba(233,71,72,0.25), rgba(10,17,30,0.9))"
                                                : "linear-gradient(135deg, rgba(184,148,64,0.22), rgba(5,10,20,0.95))",
                                    }}
                                />
                                <div className="absolute top-4 left-4">
                                    <Bracketed variant="tag">{featured.category}</Bracketed>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                                    <span>{featured.date}</span>
                                    <span>·</span>
                                    <span>{featured.readTime}</span>
                                </div>
                                <h3 className="font-display text-[clamp(1.5rem,2.3vw,2.2rem)] font-light leading-[1.12] tracking-tight text-[var(--text-primary)] group-hover:text-[var(--color-accent-400)] transition-colors">
                                    {featured.title}
                                </h3>
                                <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                                    {featured.excerpt}
                                </p>
                            </div>
                        </motion.a>
                        <div className="col-span-1 lg:col-span-5 flex flex-col divide-y divide-[var(--border-subtle)]">
                            {rest.map((p, i) => (
                                <motion.a
                                    key={p.slug}
                                    href={`/publicaciones/${p.slug}`}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.5, delay: i * 0.08, ease }}
                                    className="group py-6 first:pt-0 last:pb-0 flex gap-5 items-start"
                                >
                                    <div className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-tertiary)] shrink-0 w-16 pt-1">
                                        {p.date.split(" ").slice(0, 2).join(" ")}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Bracketed variant="tag">{p.category}</Bracketed>
                                        <h4 className="font-display text-lg font-light leading-[1.2] text-[var(--text-primary)] group-hover:text-[var(--color-accent-400)] transition-colors">
                                            {p.title}
                                        </h4>
                                        <p className="text-[0.85rem] text-[var(--text-tertiary)] leading-relaxed line-clamp-2">
                                            {p.excerpt}
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Servicios */}
                <div className="mb-24">
                    <Bracketed variant="kicker">Servicios · {v.label}</Bracketed>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-default)] border border-[var(--border-default)]">
                        {v.services.map((s) => {
                            const Icon = ICONS[s.icon];
                            return (
                                <div
                                    key={s.title}
                                    className="bg-[var(--surface-primary)] p-6 hover:bg-[var(--surface-secondary)] transition-colors duration-300 flex flex-col gap-5"
                                >
                                    <span
                                        className="inline-flex items-center justify-center w-11 h-11 border border-[var(--color-accent-500)]/30 text-[var(--color-accent-500)]"
                                        aria-hidden
                                    >
                                        <Icon size={20} strokeWidth={1.5} />
                                    </span>
                                    <div className="space-y-2">
                                        <h4 className="font-medium text-[var(--text-primary)] text-[0.95rem] leading-snug">
                                            {s.title}
                                        </h4>
                                        <p className="text-[0.85rem] text-[var(--text-secondary)] leading-relaxed">
                                            {s.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Equipo + Testimonios (dos columnas) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                    <div className="col-span-1 lg:col-span-7">
                        <Bracketed variant="kicker">Equipo · {v.label}</Bracketed>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)]">
                            {team.map((m) => (
                                <PersonCard
                                    key={m.slug}
                                    name={m.name}
                                    role={m.role}
                                    area={m.area}
                                    photo={m.photo}
                                    onOpen={() =>
                                        setActivePerson({
                                            name: m.name,
                                            role: m.role,
                                            area: m.area,
                                            bio: m.bio,
                                            email: m.email,
                                            linkedin: m.linkedin,
                                            twitter: m.twitter,
                                            photo: m.photo,
                                            verticalLabel: v.label,
                                        })
                                    }
                                />
                            ))}
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-5 flex flex-col">
                        <Bracketed variant="kicker">Confían en nosotros</Bracketed>
                        {v.testimonials[0] && (
                            <blockquote className="mt-8 space-y-5">
                                <span className="text-[var(--color-accent-500)] font-display text-5xl leading-none block">
                                    &ldquo;
                                </span>
                                <p className="font-display text-[1.25rem] font-light leading-[1.35] italic text-[var(--text-primary)]">
                                    {v.testimonials[0].quote}
                                </p>
                                <footer className="pt-2">
                                    <p className="text-[0.85rem] font-medium text-[var(--text-primary)]">
                                        {v.testimonials[0].author}
                                    </p>
                                    <p className="text-[0.75rem] text-[var(--text-tertiary)]">
                                        {v.testimonials[0].role}
                                    </p>
                                </footer>
                            </blockquote>
                        )}

                        <div className="mt-10 pt-8 border-t border-[var(--border-subtle)] flex flex-wrap gap-x-6 gap-y-3">
                            {v.clients.map((c) => (
                                <span
                                    key={c}
                                    className="text-[0.75rem] uppercase tracking-[0.15em] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                                >
                                    {c}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Expertos vinculados — placeholders con bio emergente */}
                {experts.length > 0 && (
                    <div className="mb-20">
                        <div className="flex items-end justify-between mb-6">
                            <Bracketed variant="kicker">Expertos vinculados · {v.label}</Bracketed>
                            <span className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                                + bio al pulsar
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)]">
                            {experts.map((e) => (
                                <PersonCard
                                    key={e.slug}
                                    name={e.name}
                                    role={e.role}
                                    onOpen={() =>
                                        setActivePerson({
                                            name: e.name,
                                            role: e.role,
                                            bio: e.bio,
                                            verticalLabel: v.label,
                                        })
                                    }
                                />
                            ))}
                        </div>
                    </div>
                )}

                <PersonDialog
                    person={activePerson}
                    onClose={() => setActivePerson(null)}
                />

                {/* Área privada — CTA */}
                <a
                    href={`${v.href}#area-privada`}
                    className="group flex items-center justify-between gap-6 p-8 border border-[var(--border-default)] hover:border-[var(--color-accent-500)] transition-colors"
                >
                    <div className="flex items-start gap-4">
                        <Lock
                            size={20}
                            className="text-[var(--color-accent-500)] shrink-0 mt-0.5"
                            aria-hidden
                        />
                        <div className="space-y-1">
                            <p className="font-display text-xl font-light text-[var(--text-primary)]">
                                {v.privateArea.title}
                            </p>
                            <p className="text-[0.85rem] text-[var(--text-secondary)] max-w-xl leading-relaxed">
                                {v.privateArea.description}
                            </p>
                        </div>
                    </div>
                    <span className="hidden md:inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] shrink-0">
                        {v.privateArea.ctaLabel}
                        <ArrowUpRight
                            size={14}
                            className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                        />
                    </span>
                </a>
            </div>
        </section>
    );
}
