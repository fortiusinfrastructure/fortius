"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { NewsletterCTA } from "@/components/foundation/NewsletterCTA";
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
    FOUNDATION_TIMELINE_COPY_EN,
    STRATEGIC_PARTNERS,
} from "@/content/site";
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

function teamToDialog(m: TeamMember, sectionLabel: string): PersonDialogData {
    return {
        name: m.name,
        role: m.role,
        area: TEAM_AREA_LABEL[m.area],
        bio: m.bio,
        email: m.email,
        linkedin: m.linkedin,
        photo: m.photo,
        sectionLabel,
    };
}

function advisoryToDialog(m: AdvisoryMember, roleLabel: string): PersonDialogData {
    return {
        name: m.name,
        role: roleLabel,
        bio: m.bio,
        linkedin: m.linkedin,
        photo: m.photo,
        sectionLabel: roleLabel,
    };
}

export function NosotrosClient() {
    const [active, setActive] = useState<PersonDialogData | null>(null);
    const t = useTranslations("nosotros");
    const locale = useLocale();
    const isEn = locale === "en";
    const timelineCopy = isEn ? FOUNDATION_TIMELINE_COPY_EN : FOUNDATION_TIMELINE_COPY;

    return (
        <>
            <main id="main-content" className="pt-[var(--nav-height)]">
                <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-36">
                    <Bracketed variant="tag">{t("tag")}</Bracketed>
                    <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.6rem,5.8vw,5.1rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
                        {t("h1")}
                    </h1>

                    <div className="mt-12 grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.48fr)]">
                        <div className="bg-[var(--surface-primary)] p-8 md:p-10">
                            <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                                {t("intro-label")}
                            </p>
                            <p className="mt-5 max-w-3xl font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-[1.12] text-[var(--text-primary)]">
                                {t("intro-title")}
                            </p>
                            <div className="mt-6 max-w-3xl space-y-4">
                                <p className="leading-relaxed text-[var(--text-secondary)]">
                                    {t("intro-p1")}
                                </p>
                                <p className="leading-relaxed text-[var(--text-secondary)]">
                                    {t("intro-p2")}
                                </p>
                            </div>
                        </div>

                        <div className="bg-[var(--surface-brand)] p-8 md:p-10">
                            <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--color-accent-200)]">
                                {t("enfoque-label")}
                            </p>
                            <p className="mt-5 font-display text-[clamp(1.5rem,2.8vw,2.2rem)] font-light leading-[1.12] text-[var(--text-primary)]">
                                {t("enfoque-title")}
                            </p>
                            <p className="mt-5 leading-relaxed text-[var(--text-secondary)]">
                                {t("enfoque-p")}
                            </p>
                        </div>
                    </div>

                    <div className="mt-20 border-y border-[var(--border-subtle)]">
                        {ABOUT_SECTIONS.map((section, index) => (
                            <section
                                key={section.kicker}
                                className="grid gap-8 border-b border-[var(--border-subtle)] py-12 last:border-b-0 lg:grid-cols-12 lg:gap-10"
                            >
                                <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                                    <Bracketed variant="kicker">
                                        {isEn ? section.kicker_en : section.kicker}
                                    </Bracketed>
                                    <h2 className="mt-5 font-display text-[clamp(1.7rem,3.2vw,2.6rem)] font-light leading-[1.1] tracking-tight text-[var(--text-primary)]">
                                        {isEn ? section.title_en : section.title}
                                    </h2>
                                </div>
                                <div className={`space-y-4 lg:col-span-7 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                                    {(isEn ? section.body_en : section.body).map((paragraph) => (
                                        <p
                                            key={paragraph}
                                            className="max-w-3xl leading-relaxed text-[var(--text-secondary)]"
                                        >
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    <section className="mt-20 border-t border-[var(--border-subtle)] pt-16">
                        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.65fr)] lg:items-start">
                            <div>
                                <Bracketed variant="kicker">{t("recorrido-kicker")}</Bracketed>
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
                                                {isEn ? item.label_en : item.label} ({item.place})
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-10 max-w-3xl space-y-4">
                                    {timelineCopy.map((paragraph) => (
                                        <p
                                            key={paragraph}
                                            className="leading-relaxed text-[var(--text-secondary)]"
                                        >
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="border border-[var(--border-subtle)] bg-[var(--surface-brand)] p-8">
                                <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--color-accent-200)]">
                                    {t("recorrido-box-label")}
                                </p>
                                <p className="mt-5 font-display text-[clamp(1.5rem,2.8vw,2.1rem)] font-light leading-[1.15] text-[var(--text-primary)]">
                                    {t("recorrido-box-title")}
                                </p>
                                <p className="mt-5 leading-relaxed text-[var(--text-secondary)]">
                                    {t("recorrido-box-p")}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mt-24 border-t border-[var(--border-subtle)] pt-16">
                        <Bracketed variant="kicker">{t("personas-kicker")}</Bracketed>
                        <h2 className="mt-6 max-w-4xl font-display text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-[1.06] tracking-tight text-[var(--text-primary)]">
                            {t("personas-h2")}
                        </h2>
                        <div className="mt-8 max-w-3xl space-y-4">
                            <p className="leading-relaxed text-[var(--text-secondary)]">
                                {t("personas-p1")}
                            </p>
                            <p className="leading-relaxed text-[var(--text-secondary)]">
                                {t("personas-p2")}
                            </p>
                        </div>
                    </section>

                    <section className="mt-24 space-y-14">
                        <Bracketed variant="kicker">{t("patronato-kicker")}</Bracketed>

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
                                            {chapter === "espana" ? t("chapter-espana") : t("chapter-usa")}
                                        </span>
                                        <span className="text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                                            · {BOARD_CHAPTER_LABEL[chapter]}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] sm:grid-cols-2 lg:grid-cols-3">
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

                    <section className="mt-24 border-t border-[var(--border-subtle)] pt-16">
                        <Bracketed variant="kicker">{t("consejo-kicker")}</Bracketed>
                        <div className="mt-8 grid grid-cols-1 gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] sm:grid-cols-2 lg:grid-cols-3">
                            {CONSEJO_ASESOR.map((m) => (
                                <PersonCard
                                    key={m.slug}
                                    name={m.name}
                                    role={t("consejo-role")}
                                    photo={m.photo}
                                    variant="full"
                                    onOpen={() => setActive(advisoryToDialog(m, t("consejo-role")))}
                                />
                            ))}
                        </div>
                    </section>

                    <section className="mt-24 border-t border-[var(--border-subtle)] pt-16">
                        <Bracketed variant="kicker">{t("team-kicker")}</Bracketed>
                        <div className="mt-8 grid grid-cols-1 gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] sm:grid-cols-2">
                            {TEAM.map((m) => (
                                <PersonCard
                                    key={m.slug}
                                    name={m.name}
                                    role={m.role}
                                    area={TEAM_AREA_LABEL[m.area]}
                                    photo={m.photo}
                                    variant="full"
                                    onOpen={() => setActive(teamToDialog(m, t("team-section-label")))}
                                />
                            ))}
                        </div>
                    </section>

                    <section className="mt-24 border-t border-[var(--border-subtle)] pt-16">
                        <Bracketed variant="kicker">
                            {isEn ? "Ecosystem initiatives" : "Iniciativas del ecosistema"}
                        </Bracketed>
                        <p className="mt-4 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
                            {isEn
                                ? "Independent initiatives developed and incubated within the Fortius ecosystem."
                                : "Iniciativas independientes desarrolladas e incubadas dentro del ecosistema Fortius."}
                        </p>
                        <div className="mt-8 grid grid-cols-2 gap-px border border-[var(--border-default)] bg-[var(--border-default)] sm:grid-cols-2 max-w-lg">
                            {[
                                { logoSrc: "/logos/together-green-letters.png", alt: "Together EU", href: "#" },
                                { logoSrc: "/logos/trustbridge-green.png", alt: "TrustBridge Global", href: "#" },
                            ].map((item) => (
                                <div
                                    key={item.alt}
                                    className="relative overflow-hidden flex min-h-[110px] items-center justify-center bg-[var(--surface-brand)] p-6 group"
                                >
                                    <div
                                        className="absolute inset-0 opacity-40"
                                        style={{
                                            background:
                                                "radial-gradient(ellipse at top right, rgba(134,239,172,0.12) 0%, transparent 48%)",
                                        }}
                                    />
                                    <div className="relative h-10 w-[160px]">
                                        <Image src={item.logoSrc} alt={item.alt} fill className="object-contain" sizes="160px" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-24 border-t border-[var(--border-subtle)] pt-16">
                        <Bracketed variant="kicker">{t("socios-kicker")}</Bracketed>
                        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                            {STRATEGIC_PARTNERS.map((partner) => (
                                <a
                                    key={partner.name}
                                    href={partner.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-8 transition-colors hover:bg-[var(--surface-secondary)]"
                                >
                                    <div className="relative overflow-hidden flex min-h-[110px] items-center justify-center border border-[var(--border-subtle)] bg-[var(--surface-brand)] p-6">
                                        <div
                                            className="absolute inset-0 opacity-50"
                                            style={{
                                                background:
                                                    "radial-gradient(ellipse at top right, rgba(134,239,172,0.12) 0%, transparent 48%), linear-gradient(135deg, rgba(11,31,22,0.18) 0%, rgba(11,31,22,0) 65%)",
                                            }}
                                        />
                                        <div className="absolute -right-5 top-1/2 -translate-y-1/2 text-[5rem] font-display italic leading-none text-[var(--color-accent-300)]/10">
                                            ]
                                        </div>
                                        <div className="relative flex items-center gap-2">
                                            <span className="text-xl font-light text-[var(--color-accent-300)]">[</span>
                                            <span className="font-display text-xl md:text-2xl font-light text-white text-center">
                                                {partner.name}
                                            </span>
                                            <span className="text-xl font-light text-[var(--color-accent-300)]">]</span>
                                        </div>
                                    </div>
                                    <h3 className="mt-8 font-display text-[1.8rem] font-light text-[var(--text-primary)] transition-colors group-hover:text-[var(--color-accent-300)]">
                                        {partner.name}
                                    </h3>
                                    <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                                        {isEn ? partner.copy_en : partner.copy}
                                    </p>
                                    <span className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text-primary)]">
                                        {t("socios-visit")}
                                        <ArrowUpRight size={14} />
                                    </span>
                                </a>
                            ))}
                        </div>
                    </section>
                </section>

                <NewsletterCTA />
            </main>

            <PersonDialog person={active} onClose={() => setActive(null)} />
        </>
    );
}
