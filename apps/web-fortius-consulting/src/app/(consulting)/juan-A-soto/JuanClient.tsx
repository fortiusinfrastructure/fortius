"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bracketed } from "@/components/system/Bracketed";
import { PersonPortrait } from "@/components/consulting-v2/PersonPortrait";
import { FileText, Video, Send, Loader2, Plus } from "lucide-react";
import type { TeamMember } from "@/content/team";
import { submitContact } from "@/lib/actions/contact";

const ease = [0.22, 0.61, 0.36, 1] as const;

const JUAN_TIMELINE = [
    { year: "2016", title: "Grado Derecho y ADE", location: "UNAV" },
    { year: "2017", title: "Grado Ciencia Política", location: "UNED" },
    { year: "2028", title: "Master Teoría Política", location: "UCL" },
    { year: "2026", title: "PHD", location: "ST. MARY'S UNIVERSITY" },
];

export function JuanClient({ member }: { member: TeamMember }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    const [showAllPublications, setShowAllPublications] = useState(false);
    const [showAllInterventions, setShowAllInterventions] = useState(false);

    const publications = [
        { id: 1, title: "El futuro de las alianzas atlánticas", type: "Informe", date: "2024" },
        { id: 2, title: "Análisis: Impacto regulatorio UE", type: "Prensa", date: "2023" },
        { id: 3, title: "La nueva configuración de los Think Tanks", type: "Paper", date: "2023" },
    ];

    const interventions = [
        { id: 1, title: "Conferencia Anual de Seguridad", type: "Ponencia", location: "Londres" },
        { id: 2, title: "Mesa Redonda: Sociedad Civil", type: "Panel", location: "Madrid" },
        { id: 3, title: "Foro de Pensamiento Político", type: "Ponencia", location: "Washington DC" },
    ];

    async function handleContact(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage("");
        const formData = new FormData(e.currentTarget);
        formData.append("expertSlug", "juan-angel-soto");

        try {
            const res = await submitContact(formData);
            setSubmitMessage(res.message);
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            setSubmitMessage("Error al enviar el mensaje.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="pt-[var(--nav-height)] pb-24 md:pb-36 bg-[var(--color-neutral-1000,#0a111e)] min-h-screen">
            <header className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-16 border-b border-[var(--border-subtle)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease }} className="lg:col-span-4">
                        <PersonPortrait name={member.name} photo={member.photo} size="lg" className="w-full max-w-sm mx-auto lg:mx-0 border border-[var(--border-subtle)]" />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.1 }} className="lg:col-span-8 space-y-6">
                        <Bracketed variant="kicker">Founder & CEO</Bracketed>
                        <div>
                            <h1 className="font-display text-[clamp(2.4rem,4vw,3.6rem)] font-light leading-tight text-[var(--text-primary)]">{member.name}</h1>
                            <p className="mt-2 text-[0.8rem] uppercase tracking-[0.15em] text-[var(--color-accent-400)]">Sitio Personal</p>
                        </div>
                        <div className="prose prose-invert prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed max-w-none pt-4">
                            <p className="text-[1.05rem] md:text-[1.1rem] leading-relaxed">{member.bio}</p>
                            <p>Con una extensa trayectoria en entornos complejos, su trabajo se ha enfocado en la intersección entre políticas públicas, toma de decisiones estratégicas y la construcción de alianzas institucionales. Ha asesorado a líderes del sector privado y fundaciones de ámbito internacional.</p>
                        </div>
                    </motion.div>
                </div>
            </header>

            <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    <div className="space-y-16">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                            <Bracketed variant="tag">Publicaciones Destacadas</Bracketed>
                            <div className="mt-8 space-y-4">
                                {(showAllPublications ? publications : publications.slice(0, 3)).map(pub => (
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
                                {publications.length > 3 && (
                                    <button onClick={() => setShowAllPublications(!showAllPublications)} className="w-full mt-4 flex items-center justify-center gap-2 py-3 border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--color-accent-400)] transition-colors text-[0.8rem] uppercase tracking-widest">
                                        <Plus size={16} className={showAllPublications ? "rotate-45 transition-transform" : "transition-transform"} />
                                        {showAllPublications ? "Ver menos" : "Ver más"}
                                    </button>
                                )}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                            <Bracketed variant="tag">Intervenciones Públicas</Bracketed>
                            <div className="mt-8 space-y-4">
                                {(showAllInterventions ? interventions : interventions.slice(0, 3)).map(int => (
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
                                {interventions.length > 3 && (
                                    <button onClick={() => setShowAllInterventions(!showAllInterventions)} className="w-full mt-4 flex items-center justify-center gap-2 py-3 border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--color-accent-400)] transition-colors text-[0.8rem] uppercase tracking-widest">
                                        <Plus size={16} className={showAllInterventions ? "rotate-45 transition-transform" : "transition-transform"} />
                                        {showAllInterventions ? "Ver menos" : "Ver más"}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    <div className="space-y-16">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
                            <Bracketed variant="tag">Solicitar Consulta</Bracketed>
                            <form onSubmit={handleContact} className="mt-8 p-6 md:p-8 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] space-y-5">
                                <p className="text-[0.9rem] text-[var(--text-secondary)] mb-6">
                                    Contacta directamente para solicitar una asesoría, participación en eventos o acceso a informes de inteligencia.
                                </p>

                                <div className="space-y-4">
                                    <input type="text" name="name" required placeholder="Nombre completo" className="w-full bg-transparent border-b border-[var(--border-subtle)] py-3 px-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent-400)] transition-colors text-[0.9rem]" />
                                    <input type="email" name="email" required placeholder="Email corporativo" className="w-full bg-transparent border-b border-[var(--border-subtle)] py-3 px-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent-400)] transition-colors text-[0.9rem]" />
                                    <select name="subject" required defaultValue="" className="w-full bg-transparent border-b border-[var(--border-subtle)] py-3 px-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent-400)] transition-colors text-[0.9rem] appearance-none">
                                        <option value="" disabled hidden>Asunto</option>
                                        <option value="Asesoramiento" className="bg-[var(--color-neutral-900)]">Asesoramiento</option>
                                        <option value="Conferencias" className="bg-[var(--color-neutral-900)]">Conferencias</option>
                                        <option value="Entrevistas" className="bg-[var(--color-neutral-900)]">Entrevistas</option>
                                    </select>
                                    <textarea name="message" required placeholder="Mensaje" rows={4} className="w-full bg-transparent border border-[var(--border-subtle)] p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent-400)] transition-colors text-[0.9rem] resize-none mt-2" />
                                </div>

                                <button type="submit" disabled={isSubmitting} className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-400)] transition-colors text-[0.8rem] uppercase tracking-widest disabled:opacity-50">
                                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <><Send size={16} /> Enviar Mensaje</>}
                                </button>

                                {submitMessage && (
                                    <p className="text-[0.8rem] text-center text-[#10b981] mt-4 pt-2 border-t border-[var(--border-subtle)]">
                                        {submitMessage}
                                    </p>
                                )}
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}

