import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";

export const metadata: Metadata = {
    title: "Contacto — Fortius Consulting",
    description:
        "Cuéntanos el reto. Te respondemos con una primera lectura estratégica en 48 horas.",
};

const CHANNELS = [
    {
        label: "Asuntos públicos y sociedad civil",
        email: "civil@fortiusconsulting.com",
    },
    {
        label: "Inteligencia política y geopolítica",
        email: "intelligence@fortiusconsulting.com",
    },
    {
        label: "Prensa y comunicación",
        email: "prensa@fortiusconsulting.com",
    },
];

export default function ContactoPage() {
    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-36">
                <Bracketed variant="tag">Contacto</Bracketed>
                <h1 className="mt-6 font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)] max-w-3xl">
                    Cuéntanos el reto.{" "}
                    <span className="italic text-[var(--color-accent-400)]">
                        Te escuchamos con criterio.
                    </span>
                </h1>
                <p className="mt-8 text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                    Respondemos en menos de 48 horas con una primera lectura
                    estratégica y la persona del equipo más adecuada para el caso.
                </p>

                <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="col-span-1 lg:col-span-7 space-y-px bg-[var(--border-subtle)] border border-[var(--border-subtle)]">
                        {CHANNELS.map((c) => (
                            <a
                                key={c.email}
                                href={`mailto:${c.email}`}
                                className="group flex items-center justify-between gap-6 bg-[var(--surface-primary)] p-6 hover:bg-[var(--surface-secondary)] transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <Mail
                                        size={18}
                                        className="text-[var(--color-accent-500)] shrink-0 mt-0.5"
                                        aria-hidden
                                    />
                                    <div className="space-y-1">
                                        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                                            {c.label}
                                        </p>
                                        <p className="font-display text-lg text-[var(--text-primary)]">
                                            {c.email}
                                        </p>
                                    </div>
                                </div>
                                <ArrowUpRight
                                    size={18}
                                    className="text-[var(--text-secondary)] group-hover:text-[var(--color-accent-400)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                                />
                            </a>
                        ))}
                    </div>

                    <aside className="col-span-1 lg:col-span-5 space-y-8">
                        <div className="space-y-2">
                            <Bracketed variant="kicker">Oficina</Bracketed>
                            <p className="font-display text-xl text-[var(--text-primary)] flex items-start gap-3 mt-4">
                                <MapPin
                                    size={18}
                                    className="text-[var(--color-accent-500)] shrink-0 mt-1.5"
                                    aria-hidden
                                />
                                Madrid · Europa
                            </p>
                            <p className="text-[0.85rem] text-[var(--text-secondary)] pl-7 leading-relaxed">
                                Atendemos a clientes en Europa, Latinoamérica y Norte
                                de África.
                            </p>
                        </div>

                        <div className="pt-8 border-t border-[var(--border-subtle)]">
                            <Bracketed variant="kicker">Compromiso</Bracketed>
                            <p className="mt-4 text-[0.85rem] text-[var(--text-secondary)] leading-relaxed">
                                Todas las conversaciones con Fortius son
                                confidenciales por defecto. Firmamos NDA antes de
                                cualquier briefing detallado.
                            </p>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
