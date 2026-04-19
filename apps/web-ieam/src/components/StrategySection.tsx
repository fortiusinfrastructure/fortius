import { MessageSquare, Search, Megaphone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const VISUAL = [
  { icon: MessageSquare, toneBg: '#E9F2FF', toneText: '#0A3D62' },
  { icon: Search, toneBg: '#FFF4E5', toneText: '#A55400' },
  { icon: Megaphone, toneBg: '#EAF7F1', toneText: '#1B6B43' },
] as const;

export default async function StrategySection() {
  const t = await getTranslations('strategy');

  return (
    <section className="section-shell bg-[var(--color-paper-warm)] border-b hairline">
      <div className="page-shell">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-serif font-bold text-[var(--color-text-primary)] mb-4">
            {t('title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {VISUAL.map((v, index) => {
            const Icon = v.icon;
            const tags = t.raw(`items.${index}.tags`) as string[];
            return (
              <div
                key={index}
                className="bg-white p-8 border hairline transition-all group hover:-translate-y-1"
              >
                <div className="h-1 w-14 mb-6 rounded-full bg-[var(--color-text-primary)]/10 group-hover:bg-[var(--color-text-primary)]/30 transition-colors" />

                <div
                  className="w-12 h-12 rounded-none flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: v.toneBg }}
                >
                  <Icon className="w-6 h-6" style={{ color: v.toneText }} />
                </div>

                <h3 className="text-xl font-serif font-bold text-[var(--color-text-primary)] mb-2">
                  {t(`items.${index}.title`)}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-1 rounded-full border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-slate-600 leading-relaxed text-sm">
                  {t(`items.${index}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
