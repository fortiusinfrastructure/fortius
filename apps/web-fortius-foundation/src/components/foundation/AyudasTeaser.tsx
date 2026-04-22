import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";

const AYUDAS = [
    {
        key: "incubadora",
        title: "Incubadora",
        description:
            "Ayudamos a poner en marcha tu idea de proyecto u organización.",
        href: "/ayudas#incubadora",
        tone: "soft",
    },
    {
        key: "aceleradora",
        title: "Aceleradora",
        description:
            "Ayudamos a tu organización a dar el salto cualitativo y cuantitativo que necesita.",
        href: "/ayudas#aceleradora",
        tone: "medium",
    },
    {
        key: "a-medida",
        title: "A medida",
        description:
            "Diseño que necesitas y te decimos cómo podemos ayudarte.",
        href: "/ayudas#a-medida",
        tone: "bright",
    },
] as const;

const TONE_BG: Record<string, string> = {
    soft: "color-mix(in srgb, var(--color-accent-500) 55%, black)",
    medium: "color-mix(in srgb, var(--color-accent-500) 75%, black)",
    bright: "var(--color-accent-400)",
};

export function AyudasTeaser() {
    return (
        <section
            aria-labelledby="ayudas-title"
            className="relative border-t border-[var(--border-subtle)] py-24 md:py-32"
        >
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                <div className="mb-10 space-y-4">
                    <Bracketed variant="kicker">Ayudas</Bracketed>
                    <h2
                        id="ayudas-title"
                        className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.1] tracking-tight text-[var(--text-primary)] max-w-2xl"
                    >
                        Ayudamos en procesos de incubación o aceleración a través de
                        ayudas económicas o de{" "}
                        <span
                            className="italic"
                            style={{ color: "var(--color-accent-300)" }}
                        >
                            asesoramiento y formación.
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {AYUDAS.map((a) => (
                        <Link
                            key={a.key}
                            href={a.href}
                            className="group p-8 flex flex-col justify-between min-h-[220px] text-white hover:brightness-110 transition-[filter]"
                            style={{
                                backgroundColor: TONE_BG[a.tone] ?? TONE_BG.medium,
                            }}
                        >
                            <h3 className="font-display text-2xl font-medium uppercase tracking-[0.1em]">
                                {a.title}
                            </h3>
                            <p className="text-[0.88rem] leading-relaxed text-white/85 mt-6">
                                {a.description}
                            </p>
                            <span className="mt-8 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em]">
                                [ + info ]
                                <ArrowUpRight
                                    size={14}
                                    className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                                />
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-20 py-16 border-t border-b border-[var(--border-subtle)] text-center space-y-6">
                    <h3 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-light leading-tight tracking-tight text-[var(--text-primary)] max-w-3xl mx-auto">
                        ¿Tú también tienes un proyecto que necesita{" "}
                        <span
                            className="italic"
                            style={{ color: "var(--color-accent-300)" }}
                        >
                            incubación o aceleración
                        </span>{" "}
                        de algún tipo?
                    </h3>
                    <p className="text-[0.85rem] text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
                        Te invitamos a responder a este cuestionario y contarnos sobre
                        tu organización y tu proyecto. Haremos lo posible por ayudarte.
                    </p>
                    <Link
                        href="/incubadora/proponer"
                        className="inline-flex items-center gap-2 px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] border text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors"
                        style={{ borderColor: "var(--color-accent-400)" }}
                    >
                        [ Proponer proyecto ]
                    </Link>
                </div>
            </div>
        </section>
    );
}
