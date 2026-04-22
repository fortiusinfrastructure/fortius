import { getTranslations } from 'next-intl/server';
import { Globe, MapPin, Scale, Briefcase, Users, MessageCircle, Handshake, Shield, BarChart3, type LucideIcon } from 'lucide-react';

const pillars: { id: string; icon: LucideIcon }[] = [
  { id: 'mobility', icon: Globe },
  { id: 'routes', icon: MapPin },
  { id: 'governance', icon: Scale },
  { id: 'economy', icon: Briefcase },
  { id: 'diaspora', icon: Users },
  { id: 'narratives', icon: MessageCircle },
  { id: 'diplomacy', icon: Handshake },
  { id: 'protection', icon: Shield },
  { id: 'data', icon: BarChart3 },
];

export default async function ResearchPillars() {
  const t = await getTranslations('research.pillars');

  return (
    <section className="section-shell bg-white">
      <div className="page-shell">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-[var(--color-navy-900)] mb-4">
            {t('title')}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const isBlue = index % 2 === 0;
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className={`p-8 rounded-sm text-white transition-transform hover:-translate-y-1 duration-300 flex flex-col justify-start h-full ${
                  isBlue ? 'bg-[var(--color-navy-900)]' : 'bg-[var(--color-accent-red)]'
                }`}
              >
                <div className="mb-4">
                  <Icon className="w-8 h-8 opacity-100" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold font-serif mb-3 leading-tight text-white">
                  {t(`items.${pillar.id}.title`)}
                </h3>
                <p className="text-sm leading-relaxed opacity-100 text-white font-medium">
                  {t(`items.${pillar.id}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
