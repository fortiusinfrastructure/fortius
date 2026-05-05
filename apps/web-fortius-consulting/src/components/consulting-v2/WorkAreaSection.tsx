"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import type { VerticalDef } from "@/content/home-v2";

const ease = [0.22, 0.61, 0.36, 1] as const;

interface WorkAreaSectionProps {
    vertical: VerticalDef;
}

export function WorkAreaSection({ vertical: v }: WorkAreaSectionProps) {
    const featured = v.insights.find((i) => i.featured) ?? v.insights[0];
    const rest = v.insights.filter((i) => i.slug !== featured.slug).slice(0, 2);

    return (
        <section
            aria-labelledby={`work-area-${v.id}-title`}
            className="relative border-t border-[var(--border-subtle)] py-24 md:py-32"
        >
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                <div className="flex items-end justify-between mb-8">
                    <div className="space-y-2">
                        <Bracketed variant="kicker">Área de trabajo · {v.label}</Bracketed>
                        <h2
                            id={`work-area-${v.id}-title`}
                            className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-light leading-tight tracking-tight text-[var(--text-primary)]"
                        >
                            Análisis, briefings y lecturas estratégicas.
                        </h2>
                    </div>
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
                                    href={`/publicaciones/${p.slug}`}
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
                            aria-label={`Artículo bloqueado — ${v.lockedArticle.title}`}
                            className="relative border border-[var(--border-default)] bg-[var(--surface-primary)] overflow-hidden"
                        >
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <Bracketed variant="tag">
                                        {v.lockedArticle.category}
                                    </Bracketed>
                                    <span className="inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-accent-400)]">
                                        <Lock size={11} strokeWidth={2} aria-hidden />
                                        Acceso restringido
                                    </span>
                                </div>
                                <h4 className="font-display text-[1.35rem] font-light leading-[1.18] tracking-tight text-[var(--text-primary)]">
                                    {v.lockedArticle.title}
                                </h4>
                                <div className="flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                                    <span>{v.lockedArticle.publishedAt}</span>
                                    <span>·</span>
                                    <span>{v.lockedArticle.readTime}</span>
                                </div>
                                <div className="relative">
                                    <p className="text-[0.9rem] text-[var(--text-secondary)] leading-relaxed">
                                        {v.lockedArticle.excerpt}
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
                                <Lock
                                    size={14}
                                    className="text-[var(--color-accent-500)] shrink-0"
                                    aria-hidden
                                />
                                <p className="text-[0.75rem] text-[var(--text-secondary)] leading-snug">
                                    Contenido reservado para miembros del Área Privada.
                                </p>
                            </div>
                        </article>

                        <a
                            href="/area-privada"
                            className="group mt-4 inline-flex items-center justify-between gap-4 px-5 py-4 bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-400)] transition-colors"
                        >
                            <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em]">
                                <Lock size={13} strokeWidth={2} aria-hidden />
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
        </section>
    );
}
