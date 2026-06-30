"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Bracketed } from "@/components/system/Bracketed";
import { PersonPortrait } from "@/components/consulting-v2/PersonPortrait";
import { FileText, Video, Send, Loader2, BookOpen } from "lucide-react";
import type { TeamMember, ExternalExpert } from "@/content/team";
import { submitContact } from "@/lib/actions/contact";

const ease = [0.22, 0.61, 0.36, 1] as const;

const JUAN_TIMELINE = [
    { year: "2016", title: "Grado Derecho y ADE", location: "UNAV" },
    { year: "2017", title: "Grado Ciencia Política", location: "UNED" },
    { year: "2028", title: "Master Teoría Política", location: "UCL" },
    { year: "2026", title: "PHD", location: "ST. MARY'S UNIVERSITY" },
];

export function ExpertClient({ member }: { member: TeamMember | ExternalExpert }) {
    const t = useTranslations("expert");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    const isTeamMember = "department" in member;

    const publications = [
        { id: 1, title: "El futuro de las alianzas atlánticas", type: "Informe", date: "2024" },
        { id: 2, title: "Análisis: Impacto regulatorio UE", type: "Prensa", date: "2023" }
    ];

    const interventions = [
        { id: 1, title: "Conferencia Anual de Seguridad", type: "Ponencia", location: "Londres" },
        { id: 2, title: "Mesa Redonda: Sociedad Civil", type: "Panel", location: "Madrid" }
    ];

    async function handleContact(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage("");
        const formData = new FormData(e.currentTarget);
        formData.append("expertSlug", member.slug);

        try {
            const res = await submitContact(formData);
            setSubmitMessage(res.message);
            (e.target as HTMLFormElement).reset();
        } catch {
            setSubmitMessage(t("error-send"));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="pt-[var(--nav-height)] pb-24 md:pb-36 bg-[var(--color-neutral-1000,#0a111e)] min-h-screen">
            {/* Cabecera / Perfil */}
            <header className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-16 border-b border-[var(--border-subtle)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease }}
                        className="lg:col-span-4"
                    >
                        <PersonPortrait name={member.name} photo={"photo" in member ? member.photo : undefined} size="lg" className="w-full max-w-sm mx-auto lg:mx-0 border border-[var(--border-subtle)]" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease, delay: 0.1 }}
                        className="lg:col-span-8 space-y-6"
                    >
                        <Bracketed variant="kicker">{isTeamMember ? t("team-kicker") : t("expert-kicker")}</Bracketed>
                        <div>
                            <h1 className="font-display text-[clamp(2.4rem,4vw,3.6rem)] font-light leading-tight text-[var(--text-primary)]">
                                {member.name}
                            </h1>
                            <p className="mt-2 text-[0.8rem] uppercase tracking-[0.15em] text-[var(--color-accent-400)]">
                                {member.role}
                            </p>
                        </div>
                        <div className="prose prose-invert prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed max-w-none pt-4">
                            <p className="text-[1.05rem] md:text-[1.1rem] leading-relaxed">
                                {member.bio}
                            </p>
                            <p>{t("bio-extra")}</p>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Academic timeline (Juan Ángel Soto only) */}
            {member.slug === "juan-angel-soto" && (
                <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-20 border-b border-[var(--border-subtle)]">
                    <div className="mb-12">
                        <Bracketed variant="kicker">{t("academic-kicker")}</Bracketed>
                    </div>

                    <div className="relative">
                        <div className="overflow-x-auto scrollbar-thin -mx-[var(--container-px)] px-[var(--container-px)] pb-8" style={{ scrollSnapType: "x mandatory" }}>
                            <div className="flex gap-0 min-w-max">
                                {JUAN_TIMELINE.map((item, i) => (
                                    <div key={item.year} className="w-[16rem] md:w-[20rem] shrink-0 flex flex-col" style={{ scrollSnapAlign: "start" }}>
                                        <div className="min-h-[10rem] flex flex-col justify-end pb-6 px-4 md:px-6">
                                            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                                                <h3 className="font-display text-[1.1rem] font-light leading-snug text-[var(--text-primary)] mb-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-[0.75rem] text-[var(--color-accent-400)] leading-relaxed uppercase tracking-wider">
                                                    {item.location}
                                                </p>
                                            </motion.div>
                                        </div>

                                        <div className="relative h-6 w-full flex items-center justify-center group">
                                            <div className={`absolute h-px bg-[var(--color-accent-500)] opacity-35 ${
                                                i === 0 ? "left-1/2 right-0" : i === JUAN_TIMELINE.length - 1 ? "left-0 right-1/2" : "left-0 right-0"
                                            }`} />
                                            <div className="w-3 h-3 rounded-full bg-[var(--color-neutral-1000,#0a111e)] border-[1px] border-[var(--color-accent-500)] ring-[6px] ring-[var(--color-neutral-1000,#0a111e)] transition-transform duration-500 ease-out group-hover:scale-150 z-10" />
                                        </div>

                                        <div className="h-16 flex items-center justify-center pt-2">
                                            <span className="font-display text-[clamp(1.4rem,2vw,1.8rem)] font-light leading-none text-[var(--text-primary)]">
                                                {item.year}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Highlights */}
            <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    <div className="space-y-16">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                            <Bracketed variant="tag">{t("publications-tag")}</Bracketed>
                            <div className="mt-8 space-y-4">
                                {publications.map(pub => (
                                    <div key={pub.id} className="p-4 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] flex items-start gap-4">
                                        <div className="p-2 bg-[var(--color-neutral-800)] border border-[var(--border-subtle)] shrink-0">
                                            <FileText size={18} className="text-[var(--color-accent-400)]" />
                                        </div>
                                        <div>
                                            <h4 className="font-display text-[1.1rem] text-[var(--text-primary)] mb-1">{pub.title}</h4>
                                            <p className="text-[0.75rem] uppercase tracking-wider text-[var(--text-secondary)]">{pub.type} · {pub.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                            <Bracketed variant="tag">{t("interventions-tag")}</Bracketed>
                            <div className="mt-8 space-y-4">
                                {interventions.map(int => (
                                    <div key={int.id} className="p-4 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] flex items-start gap-4">
                                        <div className="p-2 bg-[var(--color-neutral-800)] border border-[var(--border-subtle)] shrink-0">
                                            <Video size={18} className="text-[#10b981]" />
                                        </div>
                                        <div>
                                            <h4 className="font-display text-[1.1rem] text-[var(--text-primary)] mb-1">{int.title}</h4>
                                            <p className="text-[0.75rem] uppercase tracking-wider text-[var(--text-secondary)]">{int.type} · {int.location}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="space-y-16">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                            <Bracketed variant="tag">{t("request-tag")}</Bracketed>
                            <form onSubmit={handleContact} className="mt-8 p-6 md:p-8 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] space-y-5">
                                <p className="text-[0.9rem] text-[var(--text-secondary)] mb-6">
                                    {t("contact-desc")}
                                </p>

                                <div className="space-y-4">
                                    <input type="text" name="name" required placeholder={t("name-placeholder")} className="w-full bg-transparent border-b border-[var(--border-subtle)] py-3 px-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent-400)] transition-colors text-[0.9rem]" />
                                    <input type="email" name="email" required placeholder={t("email-placeholder")} className="w-full bg-transparent border-b border-[var(--border-subtle)] py-3 px-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent-400)] transition-colors text-[0.9rem]" />
                                    <input type="text" name="subject" required placeholder={t("subject-placeholder")} className="w-full bg-transparent border-b border-[var(--border-subtle)] py-3 px-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent-400)] transition-colors text-[0.9rem]" />
                                    <textarea name="message" required placeholder={t("message-placeholder")} rows={4} className="w-full bg-transparent border border-[var(--border-subtle)] p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent-400)] transition-colors text-[0.9rem] resize-none mt-2" />
                                </div>

                                <button type="submit" disabled={isSubmitting} className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-400)] transition-colors text-[0.8rem] uppercase tracking-widest disabled:opacity-50">
                                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <><Send size={16} /> {t("submit")}</>}
                                </button>

                                {submitMessage && (
                                    <p className="text-[0.8rem] text-center text-[#10b981] mt-4 pt-2 border-t border-[var(--border-subtle)]">
                                        {submitMessage}
                                    </p>
                                )}
                            </form>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                            <Bracketed variant="tag">{t("archive-tag")}</Bracketed>
                            <div className="mt-8 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] p-6">
                                <div className="flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer transition-colors group">
                                    <div className="p-3 bg-[var(--color-neutral-800)] border border-[var(--border-subtle)] group-hover:border-[var(--color-accent-500)] transition-colors">
                                        <BookOpen size={20} className="text-[var(--text-secondary)] group-hover:text-[var(--color-accent-400)] transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-display text-[1.1rem]">{t("archive-title")}</h4>
                                        <p className="text-[0.8rem] mt-1 text-[var(--text-tertiary)]">{t("archive-desc")}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
