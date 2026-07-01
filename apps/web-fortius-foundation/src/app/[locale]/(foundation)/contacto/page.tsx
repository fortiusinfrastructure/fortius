import type { Metadata } from "next";
import { Mail, MapPin, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/foundation/ContactForm";
import { Bracketed } from "@/components/system/Bracketed";
import { FOUNDATION_CONTACT } from "@/content/site";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contacto" });
  return {
    title: t("meta-title"),
    description: t("meta-desc"),
  };
}

export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contacto" });
  const isEn = locale === "en";

  return (
    <main id="main-content" className="pt-[var(--nav-height)]">
      <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-36">
        <Bracketed variant="tag">{t("tag")}</Bracketed>
        <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
          {t("h1")}
        </h1>
        <p className="mt-8 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
          {t("p")}
        </p>

        <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="col-span-1 lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <Bracketed variant="kicker">
                {isEn ? "General channel" : "Canal general"}
              </Bracketed>
              <p className="mt-4 flex items-start gap-3 font-display text-xl text-[var(--text-primary)]">
                <Mail
                  size={18}
                  className="mt-1.5 shrink-0 text-[var(--color-accent-500)]"
                  aria-hidden
                />
                {FOUNDATION_CONTACT.email}
              </p>
              <p className="pl-7 text-[0.85rem] leading-relaxed text-[var(--text-secondary)]">
                {isEn
                  ? "If you are unsure who to contact, this is the right channel. We route each message to the appropriate area."
                  : "Si no sabes a quién dirigirte, este es el canal correcto. Derivamos cada mensaje al área adecuada."}
              </p>
            </div>

            <div className="space-y-2">
              <Bracketed variant="kicker">
                {isEn ? "Offices" : "Oficinas"}
              </Bracketed>
              <p className="mt-4 flex items-start gap-3 font-display text-xl text-[var(--text-primary)]">
                <MapPin
                  size={18}
                  className="mt-1.5 shrink-0 text-[var(--color-accent-500)]"
                  aria-hidden
                />
                Madrid · Washington D.C.
              </p>
              <p className="pl-7 text-[0.85rem] leading-relaxed text-[var(--text-secondary)]">
                {isEn
                  ? "Presence in Europe and the Americas. We work with projects in Spain, Europe, the United States and North Africa."
                  : "Presencia en Europa y América. Atendemos proyectos en España, Europa, Estados Unidos y Norte de África."}
              </p>
            </div>

            <div className="space-y-2 border-t border-[var(--border-subtle)] pt-8">
              <Bracketed variant="kicker">
                {isEn ? "Commitment" : "Compromiso"}
              </Bracketed>
              <p className="mt-4 flex items-start gap-3 text-[0.85rem] leading-relaxed text-[var(--text-secondary)]">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-[var(--color-accent-500)]"
                  aria-hidden
                />
                {isEn
                  ? "All conversations with the Foundation are confidential by default. We respond within 48 hours."
                  : "Todas las conversaciones con la Fundación son confidenciales por defecto. Respondemos en un plazo de 48 horas."}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
