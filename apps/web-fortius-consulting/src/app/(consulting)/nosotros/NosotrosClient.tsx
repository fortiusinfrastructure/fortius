"use client";

import { useState } from "react";
import Link from "next/link";
import { Bracketed } from "@/components/system/Bracketed";
import { LinkedInBrandIcon } from "@/components/system/LinkedInBrandIcon";
import { PersonCard } from "@/components/consulting-v2/PersonCard";
import { PersonPortrait } from "@/components/consulting-v2/PersonPortrait";
import {
    PersonDialog,
    type PersonDialogData,
} from "@/components/consulting-v2/PersonDialog";
import { HistoryTimeline } from "@/components/consulting-v2/HistoryTimeline";
import { IdeasMarquee } from "@/components/consulting-v2/IdeasMarquee";
import { WorldMap } from "@/components/consulting-v2/WorldMap";
import {
    DEPARTMENT_LABEL,
    DEPARTMENT_ORDER,
    EXPERTS,
    TEAM,
    getTeamByDepartment,
    type TeamMember,
    type ExternalExpert,
} from "@/content/team";
import { ArrowUpRight } from "lucide-react";

const VERTICAL_LABEL: Record<"civil" | "intelligence", string> = {
    civil: "Sociedad Civil",
    intelligence: "Inteligencia",
};

function memberToDialog(m: TeamMember): PersonDialogData {
    return {
        name: m.name,
        role: m.role,
        country: m.country,
        area: m.area,
        department: DEPARTMENT_LABEL[m.department],
        bio: m.bio,
        linkedin: m.linkedin,
        twitter: m.twitter,
        photo: m.photo,
    };
}

function expertToDialog(e: ExternalExpert): PersonDialogData {
    return {
        name: e.name,
        role: e.role,
        country: e.country,
        bio: e.bio,
        linkedin: e.linkedin,
        photo: e.photo,
        verticalLabel: VERTICAL_LABEL[e.vertical],
    };
}

export function NosotrosClient() {
    const [active, setActive] = useState<PersonDialogData | null>(null);
    const founder = TEAM.find((m) => m.department === "direccion");

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-36">
                <Bracketed variant="tag">Nosotros</Bracketed>
                <h1 className="mt-6 font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)] max-w-3xl">
                    Un equipo con{" "}
                    <span className="italic text-[var(--color-accent-400)]">
                        principios y criterio.
                    </span>
                </h1>
                <p className="mt-8 text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                    Estrategas, analistas y especialistas en asuntos públicos,
                    inteligencia política, tecnología y derecho. Unidos por un mismo
                    estándar: rigor, discreción y compromiso con los valores que
                    defendemos.
                </p>

                <HistoryTimeline />

                {/* Filosofía + Fundador */}
                {founder && (
                    <article className="mt-24 border-t border-[var(--border-subtle)] pt-12">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
                            <div className="md:col-span-6 space-y-6">
                                <Bracketed variant="kicker">Filosofía</Bracketed>
                                <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-light leading-[1.18] tracking-tight text-[var(--text-primary)]">
                                    Las ideas solo transforman la realidad cuando
                                    encuentran personas e instituciones capaces de
                                    defenderlas con{" "}
                                    <span className="italic text-[var(--color-accent-400)]">
                                        inteligencia, disciplina y visión estratégica.
                                    </span>
                                </h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    Fortius nace para ayudar a esas personas e
                                    instituciones a convertir convicciones en
                                    estructura, influencia e impacto.
                                </p>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    Porque servir a una causa noble requiere algo más
                                    que convicción.{" "}
                                    <span className="text-[var(--text-primary)]">
                                        Exige excelencia.
                                    </span>
                                </p>
                            </div>

                            <div className="md:col-span-6 space-y-6">
                                <Bracketed variant="kicker">Fundador</Bracketed>
                                <Link
                                    href="/juan-A-soto"
                                    className="group flex items-start gap-6 text-left"
                                    aria-label={`Ver página personal de ${founder.name}`}
                                >
                                    <PersonPortrait
                                        name={founder.name}
                                        photo={founder.photo}
                                        size="lg"
                                        className="group-hover:border-[var(--color-accent-500)] transition-colors shrink-0"
                                    />
                                    <div className="space-y-2 pt-2">
                                        <h3 className="font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-light leading-tight text-[var(--text-primary)] group-hover:text-[var(--color-accent-400)] transition-colors">
                                            {founder.name}
                                        </h3>
                                        <p className="text-[0.8rem] uppercase tracking-[0.15em] text-[var(--color-accent-400)]">
                                            {founder.role}
                                        </p>
                                    </div>
                                </Link>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    Juan Ángel Soto Gómez es fundador y CEO de Fortius. Su trayectoria combina dirección de think tanks, emprendimiento cívico, docencia y consultoría estratégica en entornos institucionales complejos.
                                </p>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    En su página personal encontrarás una visión más completa de su recorrido académico, ejecutivo e institucional.
                                </p>
                                <div className="pt-2 flex flex-wrap items-center gap-3">
                                    {founder.linkedin && (
                                        <a
                                            href={founder.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex h-10 w-10 items-center justify-center border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--color-accent-500)] transition-colors"
                                            aria-label="LinkedIn de Juan Ángel Soto Gómez"
                                        >
                                            <LinkedInBrandIcon size={16} />
                                        </a>
                                    )}
                                    <Link
                                        href="/juan-A-soto"
                                        className="group inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.15em] px-4 py-2 bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-400)] transition-colors"
                                    >
                                        Conoce más
                                        <ArrowUpRight
                                            size={14}
                                            className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </article>
                )}

                {/* Departamentos */}
                <div className="mt-24 space-y-20">
                    {DEPARTMENT_ORDER.filter((d) => d !== "direccion").map((dept) => {
                        const members = getTeamByDepartment(dept);
                        if (members.length === 0) return null;
                        return (
                            <section key={dept}>
                                <Bracketed variant="kicker">
                                    Departamento · {DEPARTMENT_LABEL[dept]}
                                </Bracketed>
                                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)]">
                                    {members.map((m) => (
                                        <PersonCard
                                            key={m.slug}
                                            name={m.name}
                                            role={m.role}
                                            country={m.country}
                                            area={m.area}
                                            photo={m.photo}
                                            variant="full"
                                            onOpen={() => setActive(memberToDialog(m))}
                                        />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* Expertos vinculados */}
                {EXPERTS.length > 0 && (
                    <section className="mt-24 border-t border-[var(--border-subtle)] pt-16">
                        <div className="flex items-end justify-between mb-6">
                            <Bracketed variant="kicker">Expertos vinculados</Bracketed>
                            <span className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                                + bio al pulsar
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)]">
                            {EXPERTS.map((e) => (
                                <PersonCard
                                    key={e.slug}
                                    name={e.name}
                                    role={e.role}
                                    country={e.country}
                                    area={VERTICAL_LABEL[e.vertical]}
                                    photo={e.photo}
                                    variant="full"
                                    onOpen={() => setActive(expertToDialog(e))}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Nuestro trabajo */}
                <section className="mt-24 border-t border-[var(--border-subtle)] pt-16">
                    <div className="mb-10 md:mb-12 space-y-5">
                        <Bracketed variant="kicker">Nuestro trabajo</Bracketed>
                        <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.08] tracking-tight text-[var(--text-primary)]">
                            Operando en los entornos sociales, políticos e institucionales{" "}
                            <span className="italic text-[var(--color-accent-400)]">
                                más complejos.
                            </span>
                        </h2>
                    </div>
                    <WorldMap />
                </section>

                <IdeasMarquee
                    kicker="Aliados"
                    title="Instituciones, redes y organizaciones con las que Fortius ha trabajado o colaborado."
                    description="Esta red de aliados resume parte del ecosistema institucional y profesional en el que trabajamos."
                    ariaLabel="Aliados de Fortius"
                />
            </section>

            <PersonDialog person={active} onClose={() => setActive(null)} />
        </main>
    );
}
