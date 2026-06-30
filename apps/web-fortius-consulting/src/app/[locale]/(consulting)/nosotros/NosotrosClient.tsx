"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
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
    DEPARTMENT_ORDER,
    EXPERTS,
    TEAM,
    getTeamByDepartment,
    getDepartmentLabel,
    type TeamMember,
    type ExternalExpert,
} from "@/content/team";
import { ArrowUpRight } from "lucide-react";

const VERTICAL_LABEL: Record<"civil" | "intelligence", { es: string; en: string }> = {
    civil: { es: "Sociedad Civil", en: "Civil Society" },
    intelligence: { es: "Inteligencia", en: "Intelligence" },
};

function memberToDialog(m: TeamMember, locale: string): PersonDialogData {
    const isEn = locale === "en";
    return {
        name: m.name,
        role: (isEn && m.role_en) ? m.role_en : m.role,
        country: m.country,
        area: m.area,
        department: getDepartmentLabel(m.department, locale),
        bio: (isEn && m.bio_en) ? m.bio_en : m.bio,
        linkedin: m.linkedin,
        twitter: m.twitter,
        photo: m.photo,
    };
}

function expertToDialog(e: ExternalExpert, locale: string): PersonDialogData {
    const isEn = locale === "en";
    return {
        name: e.name,
        role: (isEn && e.role_en) ? e.role_en : e.role,
        country: e.country,
        bio: (isEn && e.bio_en) ? e.bio_en : e.bio,
        linkedin: e.linkedin,
        photo: e.photo,
        verticalLabel: VERTICAL_LABEL[e.vertical][isEn ? "en" : "es"],
    };
}

export function NosotrosClient() {
    const t = useTranslations("nosotros");
    const locale = useLocale();
    const isEn = locale === "en";
    const [active, setActive] = useState<PersonDialogData | null>(null);
    const founder = TEAM.find((m) => m.department === "direccion");

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-36">
                <Bracketed variant="tag">{t("tag")}</Bracketed>
                <h1 className="mt-6 font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)] max-w-3xl">
                    {t("h1")}{" "}
                    <span className="italic text-[var(--color-accent-400)]">
                        {t("h1italic")}
                    </span>
                </h1>
                <p className="mt-8 text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                    {t("sub")}
                </p>

                <HistoryTimeline />

                {/* Filosofía + Fundador */}
                {founder && (
                    <article className="mt-24 border-t border-[var(--border-subtle)] pt-12">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
                            <div className="md:col-span-6 space-y-6">
                                <Bracketed variant="kicker">{t("philosophy-kicker")}</Bracketed>
                                <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-light leading-[1.18] tracking-tight text-[var(--text-primary)]">
                                    {t("philosophy-h2pre")}{" "}
                                    <span className="italic text-[var(--color-accent-400)]">
                                        {t("philosophy-h2italic")}
                                    </span>
                                </h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    {t("philosophy-p1")}
                                </p>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    {t("philosophy-p2pre")}{" "}
                                    <span className="text-[var(--text-primary)]">
                                        {t("philosophy-p2strong")}
                                    </span>
                                </p>
                            </div>

                            <div className="md:col-span-6 space-y-6">
                                <Bracketed variant="kicker">{t("founder-kicker")}</Bracketed>
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
                                            {(isEn && founder.role_en) ? founder.role_en : founder.role}
                                        </p>
                                    </div>
                                </Link>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    {t("founder-bio1")}
                                </p>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    {t("founder-bio2")}
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
                                        {t("founder-cta")}
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
                                    {isEn ? "Department" : "Departamento"} · {getDepartmentLabel(dept, locale)}
                                </Bracketed>
                                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)]">
                                    {members.map((m) => (
                                        <PersonCard
                                            key={m.slug}
                                            name={m.name}
                                            role={(isEn && m.role_en) ? m.role_en : m.role}
                                            country={m.country}
                                            area={m.area}
                                            photo={m.photo}
                                            variant="full"
                                            onOpen={() => setActive(memberToDialog(m, locale))}
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
                            <Bracketed variant="kicker">{t("experts-kicker")}</Bracketed>
                            <span className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                                {t("experts-hint")}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)]">
                            {EXPERTS.map((e) => (
                                <PersonCard
                                    key={e.slug}
                                    name={e.name}
                                    role={(isEn && e.role_en) ? e.role_en : e.role}
                                    country={e.country}
                                    area={VERTICAL_LABEL[e.vertical][isEn ? "en" : "es"]}
                                    photo={e.photo}
                                    variant="full"
                                    onOpen={() => setActive(expertToDialog(e, locale))}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Nuestro trabajo */}
                <section className="mt-24 border-t border-[var(--border-subtle)] pt-16">
                    <div className="mb-10 md:mb-12 space-y-5">
                        <Bracketed variant="kicker">{t("work-kicker")}</Bracketed>
                        <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.08] tracking-tight text-[var(--text-primary)]">
                            {t("work-h2pre")}{" "}
                            <span className="italic text-[var(--color-accent-400)]">
                                {t("work-h2italic")}
                            </span>
                        </h2>
                    </div>
                    <WorldMap />
                </section>

                <IdeasMarquee
                    kicker={t("allies-kicker")}
                    title={t("allies-title")}
                    description={t("allies-desc")}
                    ariaLabel={t("allies-kicker")}
                />
            </section>

            <PersonDialog person={active} onClose={() => setActive(null)} />
        </main>
    );
}
