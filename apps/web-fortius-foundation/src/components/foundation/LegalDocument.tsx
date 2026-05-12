import { Bracketed } from "@/components/system/Bracketed";
import type { LegalDocumentContent } from "@/content/legal";

interface LegalDocumentProps {
  content: LegalDocumentContent;
}

export function LegalDocument({ content }: LegalDocumentProps) {
  return (
    <main id="main-content" className="pt-[var(--nav-height)]">
      <section className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-24 md:py-32">
        <Bracketed variant="tag">{content.kicker}</Bracketed>
        <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-light leading-[1.03] tracking-tight text-[var(--text-primary)]">
          {content.title}
        </h1>
        <p className="mt-8 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
          {content.intro}
        </p>

        <div className="mt-16 grid gap-10">
          {content.sections.map((section) => (
            <section key={section.title} className="border-t border-[var(--border-subtle)] pt-8">
              <h2 className="font-display text-[1.8rem] font-light text-[var(--text-primary)]">
                {section.title}
              </h2>
              <div className="mt-5 space-y-4">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-3xl text-[0.98rem] leading-relaxed text-[var(--text-secondary)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}