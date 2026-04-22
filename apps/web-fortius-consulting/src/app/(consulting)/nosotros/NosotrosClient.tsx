"use client";

import { useState } from "react";
import { Bracketed } from "@/components/system/Bracketed";
import { PersonCard } from "@/components/consulting-v2/PersonCard";
import { PersonPortrait } from "@/components/consulting-v2/PersonPortrait";
import {
    PersonDialog,
    type PersonDialogData,
} from "@/components/consulting-v2/PersonDialog";
import {
    DEPARTMENT_LABEL,
    DEPARTMENT_ORDER,
    EXPERTS,
    TEAM,
    getTeamByDepartment,
    type TeamMember,
    type ExternalExpert,
} from "@/content/team";
import { Mail, Linkedin } from "lucide-react";

const VERTICAL_LABEL: Record<"civil" | "intelligence", string> = {
    civil: "Sociedad Civil",
    intelligence: "Inteligencia",
};

function memberToDialog(m: TeamMember): PersonDialogData {
    return {
        name: m.name,
        role: m.role,
        area: m.area,
        department: DEPARTMENT_LABEL[m.department],
        bio: m.bio,
        email: m.email,
        linkedin: m.linkedin,
        twitter: m.twitter,
        photo: m.photo,
    };
}

function expertToDialog(e: ExternalExpert): PersonDialogData {
    return {
        name: e.name,
        role: e.role,
        bio: e.bio,
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

                {/* Founder destacado */}
                {founder && (
                    <article className="mt-20 border-t border-[var(--border-subtle)] pt-12">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                            <button
                                type="button"
                                onClick={() => setActive(memberToDialog(founder))}
                                className="group md:col-span-4 flex flex-col items-start gap-6 text-left"
                            >
                                <PersonPortrait
                                    name={founder.name}
                                    photo={founder.photo}
                                    size="lg"
                                    className="group-hover:border-[var(--color-accent-500)] transition-colors"
                                />
                                <span className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)] group-hover:text-[var(--color-accent-400)] transition-colors">
                                    + bio completa
                                </span>
                            </button>
                            <div className="md:col-span-8 space-y-5">
                                <Bracketed variant="kicker">Fundador</Bracketed>
                                <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light leading-tight text-[var(--text-primary)]">
                                    {founder.name}
                                </h2>
                                <p className="text-[0.9rem] uppercase tracking-[0.15em] text-[var(--color-accent-400)]">
                                    {founder.role}
                                </p>
                                <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                                    {founder.bio}
                                </p>
                                <div className="pt-2 flex flex-wrap gap-3">
                                    {founder.email && (
                                        <a
                                            href={`mailto:${founder.email}`}
                                            className="inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.15em] px-3 py-2 border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--color-accent-500)] transition-colors"
                                        >
                                            <Mail size={14} />
                                            Email
                                        </a>
                                    )}
                                    {founder.linkedin && (
                                        <a
                                            href={founder.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.15em] px-3 py-2 border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--color-accent-500)] transition-colors"
                                        >
                                            <Linkedin size={14} />
                                            LinkedIn
                                        </a>
                                    )}
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
                                area={VERTICAL_LABEL[e.vertical]}
                                variant="full"
                                onOpen={() => setActive(expertToDialog(e))}
                            />
                        ))}
                    </div>
                </section>
            </section>

            <PersonDialog person={active} onClose={() => setActive(null)} />
        </main>
    );
}
