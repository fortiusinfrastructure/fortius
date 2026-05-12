"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness, FileText, GraduationCap, Landmark, Linkedin, Loader2, Send } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import { PersonPortrait } from "@/components/consulting-v2/PersonPortrait";
import type { TeamMember } from "@/content/team";
import { submitContact } from "@/lib/actions/contact";

const ease = [0.22, 0.61, 0.36, 1] as const;
const ACADEMIC = [
  "Graduado en ADE y en Derecho por la Universidad de Navarra.",
  "Graduado en Ciencias Políticas y de la Administración por la UNED.",
  "Máster en Teoría Política y Jurídica por University College London (UCL).",
  "Doctorando en Ciencia Política en St. Mary’s University de Londres.",
];
const EXECUTIVE = [
  "Founder & CEO de Fortius, firma de consultoría estratégica activa en Europa, América y África.",
  "Director ejecutivo de la Fundación Civismo (2018–2021).",
  "Director internacional de la Fundación Disenso (2021–2023).",
];
const INSTITUTIONS = [
  "Presidente de Fundación Fortius y Principios.",
  "Impulsor del Instituto Español de Análisis Migratorio y de Escuela Hispánica.",
  "Profesor de teoría política en la Universidad de Navarra.",
  "Visiting Fellow del Danube Institute y de la Universidad Ludovika.",
];

interface FeaturedPublication {
  slug: string;
  href: string;
  title: string;
  type: string;
  date: string;
}

export function JuanClient({ member, publications }: { member: TeamMember; publications: FeaturedPublication[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

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
    } catch {
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
            <PersonPortrait name={member.name} photo={member.photo} size="lg" fit="contain" className="!w-[18rem] !h-[22rem] mx-auto lg:mx-0 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.1 }} className="lg:col-span-8 space-y-6">
            <Bracketed variant="kicker">Founder & CEO</Bracketed>
            <div>
              <h1 className="font-display text-[clamp(2.4rem,4vw,3.8rem)] font-light leading-tight text-[var(--text-primary)]">{member.name}</h1>
              <p className="mt-2 text-[0.8rem] uppercase tracking-[0.15em] text-[var(--color-accent-400)]">Página personal</p>
            </div>
            <div className="space-y-4 text-[1rem] leading-relaxed text-[var(--text-secondary)] max-w-4xl">
              <p>{member.bio}</p>
              <p>Su trabajo se sitúa en la intersección entre estrategia institucional, centros de pensamiento, inteligencia política y construcción de iniciativas cívicas con vocación internacional.</p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-default)] text-[0.78rem] uppercase tracking-[0.15em] text-[var(--text-primary)] hover:border-[var(--color-accent-500)] transition-colors">
                  <Linkedin size={14} /> LinkedIn
                </a>
              )}
              <Link href="/contacto" className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent-500)] text-white text-[0.78rem] uppercase tracking-[0.15em] hover:bg-[var(--color-accent-400)] transition-colors">
                Contactar <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-20 space-y-16">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <InfoPanel kicker="Formación" icon={GraduationCap} items={ACADEMIC} />
          <InfoPanel kicker="Trayectoria ejecutiva" icon={BriefcaseBusiness} items={EXECUTIVE} />
          <InfoPanel kicker="Instituciones y docencia" icon={Landmark} items={INSTITUTIONS} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-10">
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
              <Bracketed variant="tag">Publicaciones destacadas</Bracketed>
              <div className="mt-8 space-y-4">
                {publications.map((pub) => (
                  <Link key={pub.slug} href={pub.href} className="group flex items-start gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] p-5 hover:border-[var(--color-accent-500)] transition-colors">
                    <div className="p-2 bg-[var(--color-neutral-800)] border border-[var(--border-subtle)] shrink-0">
                      <FileText size={18} className="text-[var(--color-accent-400)]" />
                    </div>
                    <div>
                      <h3 className="font-display text-[1.15rem] text-[var(--text-primary)] group-hover:text-[var(--color-accent-400)] transition-colors">{pub.title}</h3>
                      <p className="mt-1 text-[0.75rem] uppercase tracking-wider text-[var(--text-secondary)]">{pub.type} · {pub.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.04 }} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] p-6 md:p-8">
              <Bracketed variant="tag">Áreas de trabajo</Bracketed>
              <div className="mt-6 space-y-4 text-[var(--text-secondary)] leading-relaxed">
                <p>Fortius nace de una comprensión práctica del ecosistema de think tanks, fundaciones, plataformas de influencia y entornos geopolíticos complejos.</p>
                <p>Juan Ángel Soto acompaña a organizaciones y liderazgos que necesitan criterio estratégico, arquitectura institucional y una lectura más fina del terreno político y cultural.</p>
                <p>Su trabajo combina dirección, diseño institucional, interlocución pública, desarrollo de proyectos y construcción de redes en España, Europa y el espacio transatlántico.</p>
              </div>
            </motion.section>
          </div>

          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.08 }} className="lg:col-span-5">
            <Bracketed variant="tag">Solicitar consulta</Bracketed>
            <form onSubmit={handleContact} className="mt-8 p-6 md:p-8 border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] space-y-5">
              <p className="text-[0.9rem] text-[var(--text-secondary)]">Solicita una conversación para consultoría estratégica, conferencias, docencia o colaboración institucional.</p>
              <div className="space-y-4">
                <input type="text" name="name" required placeholder="Nombre completo" className="w-full bg-transparent border-b border-[var(--border-subtle)] py-3 px-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent-400)] transition-colors text-[0.9rem]" />
                <input type="email" name="email" required placeholder="Email corporativo" className="w-full bg-transparent border-b border-[var(--border-subtle)] py-3 px-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent-400)] transition-colors text-[0.9rem]" />
                <input type="text" name="subject" required placeholder="Asunto" className="w-full bg-transparent border-b border-[var(--border-subtle)] py-3 px-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent-400)] transition-colors text-[0.9rem]" />
                <textarea name="message" required placeholder="Mensaje" rows={5} className="w-full bg-transparent border border-[var(--border-subtle)] p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent-400)] transition-colors text-[0.9rem] resize-none" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-400)] transition-colors text-[0.8rem] uppercase tracking-widest disabled:opacity-50">
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <><Send size={16} /> Enviar mensaje</>}
              </button>
              {submitMessage && <p className="text-[0.8rem] text-center text-[#10b981] pt-2 border-t border-[var(--border-subtle)]">{submitMessage}</p>}
            </form>
          </motion.section>
        </div>
      </section>
    </main>
  );
}

function InfoPanel({ kicker, icon: Icon, items }: { kicker: string; icon: typeof GraduationCap; items: string[] }) {
  return (
    <article className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--color-neutral-900)] p-6 md:p-7">
      <div className="flex items-center gap-3 text-[var(--color-accent-400)]"><Icon size={18} /><Bracketed variant="tag">{kicker}</Bracketed></div>
      <ul className="mt-5 space-y-3">
        {items.map((item) => <li key={item} className="flex gap-3 text-[0.94rem] leading-relaxed text-[var(--text-secondary)]"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent-500)] shrink-0" /><span>{item}</span></li>)}
      </ul>
    </article>
  );
}