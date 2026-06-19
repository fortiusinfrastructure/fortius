import { type Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Bracketed } from "@/components/system/Bracketed";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Transatlantic Fellowship — Incubadora — Fundación Fortius",
  description: "Programa de formación y conexión entre futuros líderes europeos y americanos.",
};

export default function TransatlanticFellowshipPage() {
  return (
    <main className="flex-1 pb-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <Bracketed variant="kicker">NUEVA INCUBACIÓN</Bracketed>
              <h1 className="mt-4 font-display text-4xl font-light leading-[1.1] tracking-tight text-[var(--text-primary)] md:text-5xl lg:text-6xl">
                Transatlantic Fellowship
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-[var(--text-secondary)] md:text-xl">
                Transatlantic Fellowship es un programa de formación y conexión entre futuros líderes europeos y americanos, enfocado en el intercambio de ideas y el fortalecimiento de la sociedad civil a ambos lados del Atlántico.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Green Background for Foundation */}
        <div className="pointer-events-none absolute top-0 -z-10 h-full w-full overflow-hidden">
          <div className="absolute inset-0 bg-green-950/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]"></div>
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-24 border-t border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="grid gap-16 lg:grid-cols-12">
            
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--text-primary)]">
                  Sobre el programa
                </h2>
                <div className="mt-6 flex flex-col gap-4">
                  <div className="border-l-2 border-green-600 pl-4">
                    <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Fase</p>
                    <p className="mt-1 font-medium text-[var(--text-primary)]">Incubación Activa</p>
                  </div>
                  <div className="border-l-2 border-green-600 pl-4">
                    <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Ámbito</p>
                    <p className="mt-1 font-medium text-[var(--text-primary)]">Liderazgo y Sociedad</p>
                  </div>
                </div>
                
                <a
                  href="/contacto"
                  className="mt-10 inline-flex items-center gap-2 border border-green-600 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] transition-colors hover:bg-green-600/10"
                >
                  Solicitar información
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            <div className="prose prose-invert prose-lg lg:col-span-8">
              <p className="text-[var(--text-secondary)]">
                A través de seminarios inmersivos, encuentros y proyectos compartidos, buscamos construir una red sólida de jóvenes profesionales comprometidos con los valores de la libertad y el humanismo. 
              </p>
              
              <h3 className="text-2xl font-light text-[var(--text-primary)] mt-12 mb-6">Uniendo ambas orillas</h3>
              <p className="text-[var(--text-secondary)]">
                Los participantes colaboran en propuestas tangibles, estableciendo vínculos que superan fronteras y promueven una visión constructiva para Occidente. Este fellowship está diseñado para líderes emergentes que desean profundizar en el marco institucional y político que une a Europa y América.
              </p>

              <div className="my-12 overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-8">
                <h4 className="text-lg font-medium text-[var(--text-primary)] mb-4">¿Por qué este fellowship?</h4>
                <ul className="space-y-3 text-[var(--text-secondary)]">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Conexión directa con instituciones clave a ambos lados del Atlántico.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Formación intensiva en políticas públicas, relaciones internacionales y humanismo.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Red alumni activa y en continuo crecimiento.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
