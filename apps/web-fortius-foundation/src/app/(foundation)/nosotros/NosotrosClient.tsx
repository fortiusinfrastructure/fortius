"use client";

import { useState } from "react";
import { Bracketed } from "@/components/system/Bracketed";
import { PersonCard } from "@/components/foundation/PersonCard";
import {
    PersonDialog,
    type PersonDialogData,
} from "@/components/foundation/PersonDialog";
import {
    BOARD_CHAPTER_LABEL,
    CONSEJO_ASESOR,
    TEAM,
    TEAM_AREA_LABEL,
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
        bio: m.bio,
        email: m.email,
        linkedin: m.linkedin,
        photo: m.photo,
        sectionLabel: TEAM_AREA_LABEL[m.area],
    };
}

function advisoryToDialog(m: AdvisoryMember): PersonDialogData {
    return {
        name: m.name,
        role: "Consejo Asesor",
        bio: m.bio,
        photo: m.photo,
        sectionLabel: "Consejo Asesor",
    };
}

export function NosotrosClient() {
    const [active, setActive] = useState<PersonDialogData | null>(null);
    const directors = TEAM.filter((m) => m.isDirector);
    const support = TEAM.filter((m) => !m.isDirector);

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-36">
                <Bracketed variant="tag">Nosotros</Bracketed>
                <h1 className="mt-6 font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)] max-w-3xl">
                    Un equipo comprometido con{" "}
                    <span
                        className="italic"
                        style={{ color: "var(--color-accent-300)" }}
                    >
                        una sociedad fuerte.
                    </span>
                </h1>
                <p className="mt-8 text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                    La Fundación Fortius está gobernada por un Patronato en España y en
                    Estados Unidos, acompañada por un Consejo Asesor de referentes
                    internacionales y operada por un equipo enfocado en sus proyectos
                    en incubación y consolidados.
                </p>

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
                                Apoyo a proyectos
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
