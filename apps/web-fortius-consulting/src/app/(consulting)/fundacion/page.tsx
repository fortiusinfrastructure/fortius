import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";

export const metadata: Metadata = {
    title: "Fortius Fundación — Brazo sin ánimo de lucro",
    description:
        "Formación de líderes con valores, investigación aplicada y programas de becas. Los mismos principios, otro vehículo de impacto.",
};

const PILLARS = [
    {
        title: "Educación cívica",
        description:
            "Programas para reforzar el conocimiento del marco institucional y los valores de las sociedades libres.",
    },
    {
        title: "Formación de líderes",
        description:
            "Fellowships y cursos intensivos para preparar a la próxima generación de decisores con criterio.",
    },
    {
        title: "Investigación aplicada",
        description:
            "Estudios independientes que aportan evidencia al debate público sobre las cuestiones que importan.",
    },
    {
        title: "Becas y programas",
        description:
            "Apoyamos trayectorias con talento que, por recursos, no podrían acceder a nuestros programas insignia.",
    },
];

export default function FundacionPage() {
    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <section
                className="relative border-b border-[var(--border-subtle)] py-24 md:py-40 overflow-hidden"
                style={{
                    background:
                        "radial-gradient(ellipse at 20% 10%, rgba(58,156,110,0.06) 0%, transparent 55%), radial-gradient(ellipse at 85% 90%, rgba(58,156,110,0.10) 0%, transparent 60%)",
                }}
            >
                <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                    <div
                        className="inline-flex items-center gap-1 text-[0.7rem] font-medium uppercase tracking-[0.25em]"
                        style={{ color: "var(--color-foundation-400)" }}
                    >
                        <span style={{ color: "var(--color-foundation-500)" }}>[</span>
                        <span className="px-1.5">Fundación</span>
                        <span style={{ color: "var(--color-foundation-500)" }}>]</span>
                    </div>
                    <h1 className="mt-6 font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)] max-w-4xl">
                        Los mismos principios,{" "}
                        <span
                            className="italic"
                            style={{ color: "var(--color-foundation-400)" }}
                        >
                            otro vehículo de impacto.
                        </span>
                    </h1>
                    <p className="mt-8 text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                        Fortius Fundación es el brazo sin ánimo de lucro del ecosistema.
                        Donde la consultoría acompaña, la fundación{" "}
                        <span className="text-[var(--text-primary)]">
                            forma, financia e investiga
                        </span>{" "}
                        para que las sociedades fuertes no dependan solo de quienes
                        pueden pagarlo.
                    </p>

                    <a
                        href="https://fortiusfoundation.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 mt-12 px-6 py-3 border text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-colors"
                        style={{
                            borderColor: "var(--color-foundation-500)",
                            color: "var(--color-foundation-300)",
                            backgroundColor: "rgba(58,156,110,0.08)",
                        }}
                    >
                        Visitar fortiusfoundation.org
                        <ArrowUpRight
                            size={16}
                            className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                        />
                    </a>
                </div>
            </section>

            <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-32">
                <Bracketed variant="kicker">Pilares de la Fundación</Bracketed>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)]">
                    {PILLARS.map((p) => (
                        <div
                            key={p.title}
                            className="bg-[var(--surface-primary)] p-8 space-y-3"
                        >
                            <h3
                                className="font-display text-xl font-light"
                                style={{ color: "var(--color-foundation-300)" }}
                            >
                                {p.title}
                            </h3>
                            <p className="text-[0.9rem] text-[var(--text-secondary)] leading-relaxed">
                                {p.description}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="mt-16 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                    Próximamente · sitio dedicado de la Fundación
                </p>
            </section>
        </main>
    );
}
