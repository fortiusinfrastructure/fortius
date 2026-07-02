import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DonationInterestForm } from "@/components/foundation/DonationInterestForm";
import { DonacionesCheckoutForm } from "@/components/foundation/DonacionesCheckoutForm";
import { Bracketed } from "@/components/system/Bracketed";

interface Props {
  params: Promise<{ locale: string }>;
}

const SPAIN_BENEFITS = [
  "Los importes indicados en esta página no incluyen IVA por tratarse de donaciones económicas de carácter social.",
  "Si eres persona física: Las donaciones de hasta 250 € tienen una desgravación del 80% en el IRPF — es decir, por una donación de 250 €, recuperarás 200 € en tu próxima declaración de la renta. A partir de 250 €, la deducción es del 40%, que se incrementa al 45% desde el tercer año en caso de donaciones periódicas a la misma entidad.",
  "Si eres persona jurídica: La deducción en cuota del Impuesto sobre Sociedades es del 40%, ampliable al 50% cuando se realizan donaciones a la misma entidad por el mismo importe o superior durante al menos tres años consecutivos.",
] as const;

const US_BENEFITS = [
  "Si eres persona física: A partir del ejercicio fiscal 2026, puedes deducir hasta 1.000 $ en donaciones en efectivo a organizaciones benéficas reconocidas (2.000 $ para declaraciones conjuntas de matrimonio), incluso si optas por la deducción estándar. Si detalles tus deducciones (itemize), la deducción aplica sobre las donaciones que superen el 0,5% de tu renta bruta ajustada. Para contribuyentes en el tramo impositivo más alto (37%), el valor de la deducción está limitado al 35% del importe donado.",
  "Si eres persona jurídica: A partir de 2026, las empresas pueden deducir las donaciones que superen el 1% de su renta imponible, con un límite máximo del 10% de la renta imponible anual. Las cantidades no deducidas en un ejercicio pueden trasladarse a los cinco ejercicios siguientes.",
] as const;

const SPAIN_BENEFITS_EN = [
  "Amounts shown on this page do not include VAT as these are social-purpose monetary donations.",
  "If you are an individual: Donations up to €250 qualify for an 80% income tax (IRPF) deduction — meaning a €250 donation yields €200 back on your tax return. Above €250, the deduction is 40%, rising to 45% from the third year for recurring donations to the same entity.",
  "If you are a legal entity: The Corporate Income Tax (Impuesto sobre Sociedades) deduction is 40%, extendable to 50% when donations of equal or greater amounts are made to the same entity for at least three consecutive years.",
] as const;

const US_BENEFITS_EN = [
  "If you are an individual: From fiscal year 2026, you can deduct up to $1,000 in cash donations to recognised charities ($2,000 for married filing jointly) even when taking the standard deduction. If you itemise deductions, the deduction applies to donations exceeding 0.5% of your adjusted gross income. For taxpayers in the highest bracket (37%), the deduction value is capped at 35% of the donated amount.",
  "If you are a legal entity: From 2026, corporations may deduct donations exceeding 1% of taxable income, up to a maximum of 10% of annual taxable income. Unused deductions in one year may be carried forward for up to five years.",
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donaciones" });
  return {
    title: t("meta-title"),
    description: t("meta-desc"),
  };
}

export default async function DonacionesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donaciones" });
  const isEn = locale === "en";
  const spainBenefits = isEn ? SPAIN_BENEFITS_EN : SPAIN_BENEFITS;
  const usBenefits = isEn ? US_BENEFITS_EN : US_BENEFITS;

  return (
    <main id="main-content" className="pt-[var(--nav-height)]">
      <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-32">
        <Bracketed variant="tag">{t("tag")}</Bracketed>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
          {t("h1")}
        </h1>
        <p className="mt-8 max-w-3xl leading-relaxed text-[var(--text-secondary)]">
          {isEn
            ? "Fortius Foundation Spain is a foundation registered in the Spanish National Foundations Registry. Fortius Foundation United States is a non-profit organisation recognised under Section 501(c)(3) of the US Federal Tax Code. Donations to both entities may be tax-deductible in their respective countries."
            : "Fundación Fortius España es una fundación inscrita en el Registro Nacional de Fundaciones. Fortius Foundation United States es una organización sin ánimo de lucro reconocida bajo la sección 501(c)(3) del código fiscal federal de los Estados Unidos. Las donaciones realizadas a ambas entidades pueden ser deducibles fiscalmente en sus respectivos países."}
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
          <div className="space-y-8">
            <section className="border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-8">
              <Bracketed variant="kicker">
                {isEn ? "Tax benefits in Spain" : "Ventajas fiscales en España"}
              </Bracketed>
              <div className="mt-6 space-y-4">
                {spainBenefits.map((item) => (
                  <p key={item} className="leading-relaxed text-[var(--text-secondary)]">
                    {item}
                  </p>
                ))}
              </div>
            </section>

            <section className="border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-8">
              <Bracketed variant="kicker">
                {isEn ? "Tax benefits in the United States" : "Ventajas fiscales en Estados Unidos"}
              </Bracketed>
              <div className="mt-6 space-y-4">
                {usBenefits.map((item) => (
                  <p key={item} className="leading-relaxed text-[var(--text-secondary)]">
                    {item}
                  </p>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            {/* ─── Stripe checkout form (primary) ─── */}
            <section className="border border-[var(--border-subtle)] bg-[var(--surface-brand)] px-8 py-8">
              <DonacionesCheckoutForm locale={locale} />
            </section>

            {/* ─── Interest form for corporate / coordinated donations ─── */}
            <div>
              <p className="mb-4 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                {isEn
                  ? "Large or corporate donation? Contact us."
                  : "¿Donación grande o empresarial? Escríbenos."}
              </p>
              <DonationInterestForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
