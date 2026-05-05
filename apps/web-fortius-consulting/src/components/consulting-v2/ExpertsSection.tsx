"use client";

import { useState } from "react";
import { Bracketed } from "@/components/system/Bracketed";
import { PersonCard } from "./PersonCard";
import { PersonDialog, type PersonDialogData } from "./PersonDialog";
import { getExpertsByVertical } from "@/content/team";
import type { VerticalDef } from "@/content/home-v2";

interface ExpertsSectionProps {
    vertical: VerticalDef;
}

export function ExpertsSection({ vertical: v }: ExpertsSectionProps) {
    const experts = getExpertsByVertical(v.id);
    const [activePerson, setActivePerson] = useState<PersonDialogData | null>(null);

    if (experts.length === 0) return null;

    return (
        <section
            aria-labelledby={`experts-${v.id}-title`}
            className="relative border-t border-[var(--border-subtle)] py-24 md:py-32"
        >
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                <div className="flex items-end justify-between mb-8">
                    <div className="space-y-2">
                        <Bracketed variant="kicker">Expertos vinculados · {v.label}</Bracketed>
                        <h2
                            id={`experts-${v.id}-title`}
                            className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-light leading-tight tracking-tight text-[var(--text-primary)]"
                        >
                            Voces externas que enriquecen nuestra red.
                        </h2>
                    </div>
                    <span className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)] shrink-0">
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

            <PersonDialog
                person={activePerson}
                onClose={() => setActivePerson(null)}
            />
        </section>
    );
}
