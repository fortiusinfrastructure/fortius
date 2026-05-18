import type { Metadata } from "next";
import { DonationInterestForm } from "@/components/foundation/DonationInterestForm";
import { Bracketed } from "@/components/system/Bracketed";

export const metadata: Metadata = {
  title: "Donaciones — Fundación Fortius",
  description:
    "Información fiscal y formulario de interés para apoyar a Fundación Fortius y sus proyectos desde España o Estados Unidos.",
};

const SPAIN_BENEFITS = [
  "Los importes indicados en esta página no incluyen IVA por tratarse de donaciones económicas de carácter social.",
  "Si eres persona física: las donaciones de hasta 250 € tienen una desgravación del 80% en el IRPF. A partir de 250 €, la deducción es del 40%, que se incrementa al 45% desde el tercer año en caso de donaciones periódicas a la misma entidad.",
  "Si eres persona jurídica: la deducción en cuota del Impuesto sobre Sociedades es del 40%, ampliable al 50% cuando se realizan donaciones a la misma entidad por el mismo importe o superior durante al menos tres años consecutivos.",
] as const;

const US_BENEFITS = [
  "Si eres persona física: a partir del ejercicio fiscal 2026, puedes deducir hasta 1.000 $ en donaciones en efectivo a organizaciones benéficas reconocidas (2.000 $ para declaraciones conjuntas), incluso si optas por la deducción estándar.",
  "Si detallas tus deducciones (itemize), la deducción aplica sobre las donaciones que superen el 0,5% de tu renta bruta ajustada. Para contribuyentes en el tramo más alto (37%), el valor de la deducción está limitado al 35% del importe donado.",
  "Si eres persona jurídica: a partir de 2026, las empresas pueden deducir las donaciones que superen el 1% de su renta imponible, con un límite máximo del 10% anual. Las cantidades no deducidas pueden trasladarse a los cinco ejercicios siguientes.",
] as const;

export default function DonacionesPage() {
  return (
    <main id="main-content" className="pt-[var(--nav-height)]">
      <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-32">
        <Bracketed variant="tag">Donaciones</Bracketed>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
          Ayúdanos a fortalecer causas nobles con criterio, estructura y visión de largo plazo.
        </h1>
        <p className="mt-8 max-w-3xl leading-relaxed text-[var(--text-secondary)]">
          Fundación Fortius España es una fundación inscrita en el Registro Nacional de Fundaciones. Fortius Foundation United States es una organización sin ánimo de lucro reconocida bajo la sección 501(c)(3) del código fiscal federal de los Estados Unidos. Las donaciones realizadas a ambas entidades pueden ser deducibles fiscalmente en sus respectivos países.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
          <div className="space-y-8">
            <section className="border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-8">
              <Bracketed variant="kicker">Ventajas fiscales en España</Bracketed>
              <div className="mt-6 space-y-4">
                {SPAIN_BENEFITS.map((item) => (
                  <p key={item} className="leading-relaxed text-[var(--text-secondary)]">
                    {item}
                  </p>
                ))}
              </div>
            </section>

            <section className="border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-8">
              <Bracketed variant="kicker">Ventajas fiscales en Estados Unidos</Bracketed>
              <div className="mt-6 space-y-4">
                {US_BENEFITS.map((item) => (
                  <p key={item} className="leading-relaxed text-[var(--text-secondary)]">
                    {item}
                  </p>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="border border-[var(--border-subtle)] bg-[var(--surface-brand)] px-8 py-8">
              <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-accent-200)]">
                Formulario de donación
              </p>
              <h2 className="mt-4 font-display text-[2rem] font-light leading-[1.08] text-white">
                Elige si quieres apoyar un proyecto concreto o el trabajo general de Fortius.
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--color-accent-100)]">
                También puedes indicar si quieres donar desde España o desde Estados Unidos. El equipo te responderá con el siguiente paso.
              </p>
            </section>

            <DonationInterestForm />
          </div>
        </div>
      </section>
    </main>
  );
}