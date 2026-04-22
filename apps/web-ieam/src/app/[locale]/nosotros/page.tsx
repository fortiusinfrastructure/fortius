import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowRight, Target, Users, MapPin, CheckCircle, PieChart, Coins, LucideIcon } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsletterCTA from '@/components/NewsletterCTA';
import TeamGrid from '@/components/about/TeamGrid';
import { Link } from '@/i18n/routing';
import { coreTeam, researchFellows } from '@/lib/mock-data';
import { pickLocalized, type Locale } from '@/lib/utils/content';

const principles: { icon: LucideIcon; key: string }[] = [
  { icon: MapPin, key: 'national_interest' },
  { icon: Target, key: 'evidence' },
  { icon: CheckCircle, key: 'coresponsibility' },
  { icon: Users, key: 'dignity' },
  { icon: PieChart, key: 'public_utility' },
  { icon: Coins, key: 'integrity' },
];

export default async function NosotrosPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('about');
  const tPrinciples = await getTranslations('about.principles.items');

  const localizedCore = coreTeam.map((m) => pickLocalized(m, locale));
  const localizedFellows = researchFellows.map((m) => pickLocalized(m, locale));

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <div className="relative bg-[#0A2540] text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
            alt="Team collaboration"
            className="w-full h-full object-cover opacity-20"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540] via-[#0A2540]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 page-shell">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="border-l-4 border-[#D4212A] pl-6">
                <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight text-[#f8f5f0]">
                  {t('hero.title')}
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                  {t('hero.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-20 bg-white section-shell">
        <div className="page-shell">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#0A2540] mb-6 border-b-2 border-[#D4212A] pb-2 inline-block">
                {t('mission.title')}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">{t('mission.description')}</p>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#0A2540] mb-6 border-b-2 border-[#D4212A] pb-2 inline-block">
                {t('vision.title')}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">{t('vision.description')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Principles Section */}
      <div className="py-20 bg-slate-50">
        <div className="page-shell">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0A2540] mb-4">
                {t('principles.title')}
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t('principles.subtitle')}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {principles.map(({ icon: Icon, key }) => (
                <div key={key} className="flex items-start p-6 bg-white border border-slate-100 rounded-sm hover:shadow-sm transition-shadow">
                  <div className="flex-shrink-0 mr-5">
                    <Icon className="w-8 h-8 text-[#0A2540] stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0A2540] mb-2">{tPrinciples(`${key}.title`)}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{tPrinciples(`${key}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="page-shell">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0A2540]">{t('team.title')}</h2>
          </div>

          <TeamGrid coreTeam={localizedCore} fellows={localizedFellows} bioLabel={t('team.bio_button')} />
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-[#0A2540] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#006994] rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4212A] rounded-full blur-3xl opacity-10 translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">{t('cta.title')}</h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">{t('cta.description')}</p>
          <Link href="/contacto" className="inline-flex items-center px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-wider hover:bg-white hover:text-[#0A2540] transition-all duration-300 rounded-sm">
            {t('cta.button')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Partners Section */}
      <div className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="page-shell">
          <div className="text-center mb-12">
            <h3 className="text-sm font-bold text-slate-400 mb-6">{t('partners.label')}</h3>
            <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto">{t('partners.description')}</p>
          </div>

          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {(['unav', 'uir', 'foessa'] as const).map((slug) => (
              <div key={slug} className="bg-white p-8 rounded-sm border border-slate-200 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
                <div className="w-32 flex-shrink-0 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/colaboration/${slug}.png`} alt={t(`partners.${slug}.name`)} className="w-full h-auto object-contain" loading="lazy" decoding="async" />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-[#0A2540] mb-2">{t(`partners.${slug}.name`)}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{t(`partners.${slug}.text`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NewsletterCTA />
      <Footer />
    </div>
  );
}
