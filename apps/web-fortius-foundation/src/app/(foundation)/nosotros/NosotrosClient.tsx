"use client";

import { useState } from "react";
import { Bracketed } from "@/components/system/Bracketed";
import { PersonCard } from "@/components/foundation/PersonCard";
import {
    PersonDialog,
    type PersonDialogData,
} from "@/components/foundation/PersonDialog";
import {
    ABOUT_SECTIONS,
    FOUNDATION_TIMELINE,
    FOUNDATION_TIMELINE_COPY,
} from "@/content/site";
import {
    BOARD_CHAPTER_LABEL,
    CONSEJO_ASESOR,
    TEAM,
    TEAM_AREA_LABEL,
    TEAM_GROUP_LABEL,
    getBoardByChapter,
    type AdvisoryMember,
    type BoardMember,
    type TeamMember,
} from "@/content/team";

function boardToDialog(m: BoardMember): PersonDialogData {
    return {
        name: m.name,
        role: m.role,
        bio: m.bio,
        email: m.email,
        linkedin: m.linkedin,
        photo: m.photo,
        sectionLabel: BOARD_CHAPTER_LABEL[m.chapter],
    };
}

function teamToDialog(m: TeamMember): PersonDialogData {
    return {
        name: m.name,
        role: m.role,
        area: TEAM_AREA_LABEL[m.area],
        bio: m.bio,
        email: m.email,
        linkedin: m.linkedin,
        photo: m.photo,
        sectionLabel: TEAM_GROUP_LABEL[m.group],
    };
}

function advisoryToDialog(m: AdvisoryMember): PersonDialogData {
    return {
        name: m.name,
        role: "Consejo Asesor",
        bio: m.bio,
        linkedin: m.linkedin,
        photo: m.photo,
        sectionLabel: "Consejo Asesor",
    };
}

export function NosotrosClient() {
    const [active, setActive] = useState<PersonDialogData | null>(null);
    const [whoWeAre, philosophy, whoWeServe, approach] = ABOUT_SECTIONS;
    const management = TEAM.filter((m) => m.group === "gerencia");
    const directors = TEAM.filter((m) => m.group === "direccion");
    const support = TEAM.filter((m) => m.group === "equipo");

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-36">
                <Bracketed variant="tag">Nosotros</Bracketed>
                <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.6rem,5.8vw,5.1rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
                    Impulsamos a quienes entienden el liderazgo como servicio.
                </h1>
                <p className="mt-8 max-w-3xl font-display text-[clamp(1.5rem,3vw,2.3rem)] font-light leading-[1.14] text-[var(--color-accent-300)]">
                    Trabajamos para que las ideas correctas transformen la sociedad.
                </p>

                <section className="mt-20 border-t border-[var(--border-subtle)] pt-12">
                    <Bracketed variant="kicker">Bloque 1. Quiénes somos</Bracketed>
                    <div className="mt-6 max-w-3xl space-y-4">
                        {whoWeAre.body.map((paragraph) => (
                            <p
                                key={paragraph}
                                className="leading-relaxed text-[var(--text-secondary)]"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </section>

                <section className="mt-16 border-t border-[var(--border-subtle)] pt-12">
                    <Bracketed variant="kicker">Bloque 2. Nuestra filosofía</Bracketed>
                    <div className="mt-6 max-w-3xl space-y-4">
                        {philosophy.body.map((paragraph) => (
                            <p
                                key={paragraph}
                                className="leading-relaxed text-[var(--text-secondary)]"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </section>

                <section className="mt-16 border-t border-[var(--border-subtle)] pt-12">
                    <Bracketed variant="kicker">A quién servimos</Bracketed>
                    <div className="mt-6 max-w-3xl space-y-4">
                        {whoWeServe.body.map((paragraph) => (
                            <p
                                key={paragraph}
                                className="leading-relaxed text-[var(--text-secondary)]"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </section>

                <section className="mt-16 border-t border-[var(--border-subtle)] pt-12">
                    <Bracketed variant="kicker">Nuestro enfoque</Bracketed>
                    <div className="mt-6 max-w-3xl space-y-4">
                        {approach.body.map((paragraph) => (
                            <p
                                key={paragraph}
                                className="leading-relaxed text-[var(--text-secondary)]"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </section>

                <section className="mt-16 border-t border-[var(--border-subtle)] pt-12">
                    <Bracketed variant="kicker">Bloque 3. Nuestro recorrido</Bracketed>
                    <div className="mt-8 space-y-6 border-l border-[var(--color-accent-400)] pl-6">
                        {FOUNDATION_TIMELINE.map((item) => (
                            <div key={item.year} className="relative">
                                <span
                                    className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border border-[var(--color-accent-300)] bg-[var(--surface-brand)]"
                                    aria-hidden
                                />
                                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-accent-300)]">
                                    {item.year}
                                </p>
                                <p className="mt-2 font-display text-[1.7rem] font-light text-[var(--text-primary)]">
                                    {item.label} ({item.place})
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 max-w-3xl space-y-4">
                        {FOUNDATION_TIMELINE_COPY.map((paragraph) => (
                            <p
                                key={paragraph}
                                className="text-[var(--text-secondary)] leading-relaxed"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </section>

                <section className="mt-24 border-t border-[var(--border-subtle)] pt-16">
                    <Bracketed variant="kicker">Personas</Bracketed>
                    <h2 className="mt-6 max-w-4xl font-display text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-[1.06] tracking-tight text-[var(--text-primary)]">
                        Un equipo multidisciplinar formado por personas comprometidas con una causa mayor que ellas mismas.
                    </h2>
                    <div className="mt-8 max-w-3xl space-y-4">
                        <p className="leading-relaxed text-[var(--text-secondary)]">
                            Fortius reúne un equipo multidisciplinar de especialistas en estrategia, inteligencia política, asuntos públicos, comunicación, derecho y desarrollo organizativo.
                        </p>
                        <p className="leading-relaxed text-[var(--text-secondary)]">
                            Compartimos una misma convicción: las ideas correctas merecen ser defendidas con profesionalidad, rigor y excelencia.
                        </p>
                    </div>
                </section>

                {/* Patronato */}
                <section className="mt-24 space-y-14">
                    <Bracketed variant="kicker">Patronato</Bracketed>

                    {(["espana", "usa"] as const).map((chapter) => {
                        const members = getBoardByChapter(chapter);
                        if (members.length === 0) return null;
                        return (
                            <div key={chapter} className="space-y-6">
                                <div className="flex items-baseline gap-3">
                                    <span
                                        className="font-display text-2xl font-light"
                                        style={{ color: "var(--color-accent-300)" }}
                                    >
                                        {chapter === "espana" ? "España" : "Estados Unidos"}
                                    </span>
                                    <span className="text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                                        · {BOARD_CHAPTER_LABEL[chapter]}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)]">
                                    {members.map((m) => (
                                        <PersonCard
                                            key={m.slug}
                                            name={m.name}
                                            role={m.role}
                                            photo={m.photo}
                                            variant="full"
                                            onOpen={() => setActive(boardToDialog(m))}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </section>

                {/* Consejo Asesor */}
                <section className="mt-24 border-t border-[var(--border-subtle)] pt-16">
                    <div className="flex items-end justify-between mb-6">
                        <Bracketed variant="kicker">Consejo Asesor</Bracketed>
                        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                            + bio al pulsar
                        </span>
                    </div>
                    <p className="text-[var(--text-secondary)] max-w-2xl leading-relaxed mb-8">
                        Nuestro Consejo Asesor lo componen personas de reputada
                        experiencia que ayudan a la Fundación a elegir sus áreas de
                        trabajo y a evaluar sus proyectos.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)]">
                        {CONSEJO_ASESOR.map((m) => (
                            <PersonCard
                                key={m.slug}
                                name={m.name}
                                role="Consejo Asesor"
                                photo={m.photo}
                                variant="full"
                                onOpen={() => setActive(advisoryToDialog(m))}
                            />
                        ))}
                    </div>
                </section>

                {/* Equipo */}
                <section className="mt-24 border-t border-[var(--border-subtle)] pt-16 space-y-14">
                    <Bracketed variant="kicker">Equipo</Bracketed>

                    <div className="space-y-6">
                        <div className="flex items-baseline gap-3">
                            <span
                                className="font-display text-2xl font-light"
                                style={{ color: "var(--color-accent-300)" }}
                            >
                                Gerencia
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)]">
                            {management.map((m) => (
                                <PersonCard
                                    key={m.slug}
                                    name={m.name}
                                    role={m.role}
                                    area={TEAM_AREA_LABEL[m.area]}
                                    photo={m.photo}
                                    variant="full"
                                    onOpen={() => setActive(teamToDialog(m))}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-baseline gap-3">
                            <span
                                className="font-display text-2xl font-light"
                                style={{ color: "var(--color-accent-300)" }}
                            >
                                Directores de proyecto
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)]">
                            {directors.map((m) => (
                                <PersonCard
                                    key={m.slug}
                                    name={m.name}
                                    role={m.role}
                                    area={TEAM_AREA_LABEL[m.area]}
                                    photo={m.photo}
                                    variant="full"
                                    onOpen={() => setActive(teamToDialog(m))}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-baseline gap-3">
                            <span
                                className="font-display text-2xl font-light"
                                style={{ color: "var(--color-accent-300)" }}
                            >
                                Equipo
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)]">
                            {(function renderSupport() {
                                return support.map((m) => (
                                    <PersonCard
                                        key={m.slug}
                                        name={m.name}
                                        role={m.role}
                                        area={TEAM_AREA_LABEL[m.area]}
                                        photo={m.photo}
                                        variant="full"
                                        onOpen={() => setActive(teamToDialog(m))}
                                    />
                                ));
                            })()}
                        </div>
                    </div>
                </section>
            </section>

            <PersonDialog person={active} onClose={() => setActive(null)} />
        </main>
    );
}
