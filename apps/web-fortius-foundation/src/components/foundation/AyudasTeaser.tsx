import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";

const AYUDAS = [
    {
        key: "donantes",
        title: "Para donantes",
        description:
            "Estructuramos donaciones con criterio, evaluación y seguimiento real.",
        href: "/ayudas#donantes",
        tone: "soft",
    },
    {
        key: "beneficiarios",
        title: "Para beneficiarios",
        description:
            "Aportamos financiación, acompañamiento estratégico y fortalecimiento institucional.",
        href: "/ayudas#beneficiarios",
        tone: "medium",
    },
    {
        key: "incubadora",
        title: "Incubadora Fortius",
        description:
            "Convertimos intuiciones valiosas en proyectos mejor definidos y sostenibles.",
        href: "/incubadora",
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
            className="max-w-3xl font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.1] tracking-tight text-[var(--text-primary)]"
          >
            Ayudamos tanto a quienes quieren dar mejor como a quienes necesitan
            más estructura para crecer.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {AYUDAS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="group flex min-h-[220px] flex-col justify-between p-8 text-white transition-[filter] hover:brightness-110"
              style={{
                backgroundColor: TONE_BG[item.tone] ?? TONE_BG.medium,
              }}
            >
              <h3 className="font-display text-2xl font-medium uppercase tracking-[0.1em]">
                {item.title}
              </h3>
              <p className="mt-6 text-[0.88rem] leading-relaxed text-white/85">
                {item.description}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em]">
                [ + info ]
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-20 space-y-6 border-y border-[var(--border-subtle)] py-16 text-center">
          <h3 className="mx-auto max-w-3xl font-display text-[clamp(1.5rem,3vw,2.2rem)] font-light leading-tight tracking-tight text-[var(--text-primary)]">
            Si tienes una causa seria y necesitas acompañamiento,
            <span
              className="italic"
              style={{ color: "var(--color-accent-300)" }}
            >
              {" "}hablemos.
            </span>
          </h3>
          <p className="mx-auto max-w-xl text-[0.85rem] leading-relaxed text-[var(--text-secondary)]">
            Explicamos cómo evaluamos proyectos, cómo estructuramos ayudas y qué
            tipo de acompañamiento aportamos en cada caso.
          </p>
          <Link
            href="/ayudas"
            className="inline-flex items-center gap-2 border px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
            style={{ borderColor: "var(--color-accent-400)" }}
          >
            [ Conocer cómo trabajamos ]
          </Link>
        </div>
      </div>
    </section>
  );
}
