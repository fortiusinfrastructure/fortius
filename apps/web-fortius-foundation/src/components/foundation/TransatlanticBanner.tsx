import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";

interface Props {
  locale: string;
}

const STATS = [
  { value: "3", label: { es: "cohortes", en: "cohorts" } },
  { value: "3", label: { es: "países", en: "countries" } },
  { value: "11", label: { es: "instituciones visitadas", en: "institutions visited" } },
] as const;

export function TransatlanticBanner({ locale }: Props) {
  const isEn = locale === "en";

  return (
    <section className="border-t border-[var(--border-subtle)] py-20 md:py-28">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <Bracketed variant="kicker">
          {isEn ? "Programmes" : "Programas"}
        </Bracketed>

        <div className="mt-8 grid grid-cols-1 gap-0 lg:grid-cols-12">
          {/* ─── Content panel ─── */}
          <div className="flex flex-col justify-between bg-[var(--surface-brand)] p-10 lg:col-span-7 lg:p-14">
            <div>
              <Image
                src="/logos/transatlantic-fellowship-green.png"
                alt="Transatlantic Fellowship"
                width={220}
                height={48}
                className="object-contain max-h-12 w-auto"
              />
              <h2 className="mt-8 max-w-lg font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-light leading-[1.08] tracking-tight text-[var(--text-primary)]">
                {isEn
                  ? "Building the next generation of transatlantic leaders."
                  : "Formando a la próxima generación de líderes transatlánticos."}
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-[var(--text-secondary)]">
                {isEn
                  ? "We cultivate leaders who understand both shores of the Atlantic from the inside — through research fellowships, institutional visits, parliamentary traineeships and leadership seminars."
                  : "Cultivamos líderes que conocen ambas orillas del Atlántico desde dentro, a través de fellowships de investigación, visitas institucionales, prácticas parlamentarias y seminarios de liderazgo."}
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-8 border-t border-[var(--border-default)] pt-8">
              {STATS.map((s) => (
                <div key={s.value + s.label.es}>
                  <p className="font-display text-[2.2rem] font-light leading-none text-[var(--color-accent-300)]">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                    {isEn ? s.label.en : s.label.es}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/programas/transatlantic-fellowship"
              className="mt-10 inline-flex w-fit items-center gap-2 border border-[var(--color-accent-500)] px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] transition-colors hover:bg-[var(--color-accent-500)]/10"
            >
              {isEn ? "Explore the programme" : "Explorar el programa"}
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* ─── Photo panel (lg only) ─── */}
          <div className="relative hidden lg:col-span-5 lg:block">
            <Image
              src="/programas/transatlantic-fellowship/brussels-06.png"
              alt={isEn ? "Transatlantic Fellowship — Brussels visit" : "Transatlantic Fellowship — visita a Bruselas"}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 0px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface-brand)] via-transparent to-transparent" />
            <div className="absolute bottom-6 right-6 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-white/50">
              Brussels & Bruges · June 2026
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
