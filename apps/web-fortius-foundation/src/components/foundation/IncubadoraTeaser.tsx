import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import { PROJECTS } from "@/content/projects";

const STAGE_LABEL: Record<string, string> = {
    incubacion: "Incubadora",
    exito: "Caso de éxito",
};

export function IncubadoraTeaser() {
    return (
        <section
            aria-labelledby="proyectos-title"
            className="relative border-t border-[var(--border-subtle)] py-24 md:py-32"
        >
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                <div className="flex items-end justify-between gap-6 mb-12">
                    <div className="space-y-4">
                        <Bracketed variant="kicker">Proyectos</Bracketed>
                        <h2
                            id="proyectos-title"
                            className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.05] tracking-tight text-[var(--text-primary)] max-w-2xl"
                        >
                            Desde nuestro nacimiento en 2023, la Fundación Fortius ha
                            tenido un{" "}
                            <span
                                className="italic"
                                style={{ color: "var(--color-accent-300)" }}
                            >
                                impacto significativo
                            </span>
                            .
                        </h2>
                    </div>
                    <Link
                        href="/incubadora"
                        className="hidden md:inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                        Ver incubadora
                        <ArrowUpRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)]">
                    {PROJECTS.map((p) => (
                        <Link
                            key={p.slug}
                            href={p.href}
                            className="group bg-[var(--surface-primary)] p-6 flex flex-col gap-5 min-h-[240px] hover:bg-[var(--surface-secondary)] transition-colors"
                        >
                            <span className="inline-flex items-center gap-1 text-[0.6rem] font-medium uppercase tracking-[0.22em]">
                                <span style={{ color: "var(--color-accent-400)" }}>
                                    [
                                </span>
                                <span
                                    className="px-1"
                                    style={{
                                        color:
                                            p.stage === "exito"
                                                ? "var(--color-accent-300)"
                                                : "var(--text-secondary)",
                                    }}
                                >
                                    {STAGE_LABEL[p.stage]}
                                </span>
                                <span style={{ color: "var(--color-accent-400)" }}>
                                    ]
                                </span>
                            </span>

                            <div className="flex-1 space-y-3">
                                <h3 className="font-display text-2xl font-light leading-tight text-[var(--text-primary)] group-hover:text-[var(--color-accent-300)] transition-colors">
                                    {p.name}
                                </h3>
                                <p className="text-[0.78rem] text-[var(--text-tertiary)] uppercase tracking-[0.15em]">
                                    {p.tagline}
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] group-hover:text-[var(--color-accent-300)] transition-colors">
                                Ver proyecto
                                <ArrowUpRight size={12} />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
