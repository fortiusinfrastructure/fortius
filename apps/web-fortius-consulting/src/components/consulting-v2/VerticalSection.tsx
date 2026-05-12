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
import {
    getEditorialSlots,
    categoryLabel,
    kindLabel,
    estimateReadTime,
    formatShortDate,
    formatMonthYear,
    type Article,
    type ArticleCategory,
} from "@/lib/articles";

const VERTICAL_TO_CATEGORY: Record<string, ArticleCategory> = {
    civil: "sociedad-civil",
    intelligence: "politica",
};

function articleToInsight(a: Article) {
    return {
        slug: a.slug,
        category: kindLabel(a.kind),
        title: a.title,
        excerpt: a.excerpt,
        date: formatShortDate(a.published_at) || categoryLabel(a.category),
        readTime: estimateReadTime(a.content_markdown),
    };
}

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
    const category = VERTICAL_TO_CATEGORY[v.id];
    const slots = category ? getEditorialSlots(category) : null;

    const featured = slots?.featured
        ? articleToInsight(slots.featured)
        : v.insights.find((i) => i.featured) ?? v.insights[0];
    const featuredHref = slots?.featured
        ? `${v.href}/${slots.featured.slug}`
        : `/publicaciones/${featured.slug}`;

    const rest = slots && slots.rest.length > 0
        ? slots.rest.map(articleToInsight)
        : v.insights.filter((i) => i.slug !== featured.slug).slice(0, 2);
    const restHref = (i: number): string =>
        slots && slots.rest[i]
            ? `${v.href}/${slots.rest[i].slug}`
            : `/publicaciones/${rest[i].slug}`;

    const locked = slots?.locked
        ? {
              category: kindLabel(slots.locked.kind),
              title: slots.locked.title,
              excerpt: slots.locked.excerpt,
              readTime: estimateReadTime(slots.locked.content_markdown),
              publishedAt: formatMonthYear(slots.locked.published_at) || "Disponible",
              href: `${v.href}/${slots.locked.slug}`,
          }
        : { ...v.lockedArticle, href: "/area-privada" };

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

                {/* Área de trabajo — featured + locked preview */}
                <div className="mb-24">
                    <div className="flex items-end justify-between mb-8">
                        <Bracketed variant="kicker">Área de trabajo · {v.label}</Bracketed>
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
                            href={featuredHref}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, ease }}
                            className="group col-span-1 lg:col-span-7 block"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-tertiary)] mb-6">
                                <img
                                    src={v.id === "civil" ? "/images/eje1.png" : "/images/eje2.jpg"}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                />
                                <div
                                    className="absolute inset-0"
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

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, ease }}
                            className="col-span-1 lg:col-span-5 flex flex-col"
                        >
                            <div className="flex flex-col divide-y divide-[var(--border-subtle)] mb-6">
                                {rest.map((p, i) => (
                                    <motion.a
                                        key={p.slug}
                                        href={restHref(i)}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-60px" }}
                                        transition={{ duration: 0.5, delay: i * 0.08, ease }}
                                        className="group py-5 first:pt-0 flex gap-5 items-start"
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

                            <article
                                aria-label={`Artículo bloqueado — ${locked.title}`}
                                className="relative border border-[var(--border-default)] bg-[var(--surface-primary)] overflow-hidden"
                            >
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Bracketed variant="tag">
                                            {locked.category}
                                        </Bracketed>
                                        <span className="inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-accent-400)]">
                                            Acceso restringido
                                        </span>
                                    </div>
                                    <h4 className="font-display text-[1.35rem] font-light leading-[1.18] tracking-tight text-[var(--text-primary)]">
                                        {locked.title}
                                    </h4>
                                    <div className="flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                                        <span>{locked.publishedAt}</span>
                                        <span>·</span>
                                        <span>{locked.readTime}</span>
                                    </div>
                                    <div className="relative">
                                        <p className="text-[0.9rem] text-[var(--text-secondary)] leading-relaxed">
                                            {locked.excerpt}
                                        </p>
                                        <div
                                            className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                                            style={{
                                                background:
                                                    "linear-gradient(180deg, rgba(5,10,20,0) 0%, var(--surface-primary) 90%)",
                                            }}
                                            aria-hidden
                                        />
                                    </div>
                                </div>
                                <div className="border-t border-[var(--border-subtle)] bg-[var(--surface-secondary)] px-6 py-4 flex items-center gap-3">
                                    <p className="text-[0.75rem] text-[var(--text-secondary)] leading-snug">
                                        Contenido reservado para miembros del Área Privada.
                                    </p>
                                </div>
                            </article>

                            <a
                                href={locked.href}
                                className="group inline-flex items-center justify-between gap-4 px-5 py-4 bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-400)] transition-colors"
                            >
                                <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em]">
                                    Acceder al Área Privada
                                </span>
                                <ArrowUpRight
                                    size={16}
                                    className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                                />
                            </a>
                        </motion.div>
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

                {/* Expertos vinculados - placeholders con bio emergente */}
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

                            </div>
        </section>
    );
}
