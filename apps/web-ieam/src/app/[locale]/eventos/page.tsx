import { getLocale, getTranslations } from 'next-intl/server';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsletterCTA from '@/components/NewsletterCTA';
import { Link } from '@/i18n/routing';
import { events as eventsData, type EventItem } from '@/lib/mock-data';
import { parseEventDate, pickLocalized, type Locale } from '@/lib/utils/content';

const EXTERNAL_SLUGS = new Set(['cumbre-szeged-2025', 'jornada-canarias-sahel', 'conferencia-budapest-2026']);
const MED_DIALOGUE_SLUGS = new Set(['dialogo-mediterraneo-rabat', 'foro-bruselas-2024']);

export default async function EventsPage() {
  const locale = (await getLocale()) as Locale;
  const isEn = locale === 'en';
  const t = await getTranslations('events');

  const now = new Date();
  const upcoming: EventItem[] = eventsData
    .filter((e) => parseEventDate(e.date) >= now)
    .sort((a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime());
  const past: EventItem[] = eventsData
    .filter((e) => parseEventDate(e.date) < now)
    .sort((a, b) => parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime());

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <div className="relative bg-[#0A2540] text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" alt="" className="w-full h-full object-cover opacity-20" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540] via-[#0A2540]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 page-shell">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="border-l-4 border-[#D4212A] pl-6">
                <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight text-[#f8f5f0]">{t('hero')}</h1>
                <p className="text-xl text-slate-300 leading-relaxed max-w-lg">{t('hero_description')}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-sm">
              <p className="text-lg font-serif italic text-white leading-relaxed">{t('hero_quote')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="page-shell section-shell">
        {/* Upcoming Events */}
        <div className="mb-20">
          <h2 className="text-2xl font-serif font-bold text-[#0A2540] mb-6">{t('upcoming.title')}</h2>

          {upcoming.length > 0 ? (
            <div className="space-y-12">
              {upcoming.map((ev) => {
                const l = pickLocalized(ev, locale);
                return (
                  <div key={ev.slug} className="group relative bg-white rounded-2xl border border-slate-200 p-8 lg:p-12 shadow-sm hover:shadow-md transition-shadow">
                    <div className="inline-block bg-[var(--color-navy-900)] text-white text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
                      {isEn ? 'Upcoming' : 'Próximo'}
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12">
                      <div className="lg:col-span-7 space-y-6">
                        <h3 className="text-3xl lg:text-4xl font-serif font-bold text-[#0A2540] leading-tight">{l.title}</h3>

                        <div className="flex flex-wrap items-center gap-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                          <span className="flex items-center text-[#D4212A]"><Calendar className="w-5 h-5 mr-2" />{ev.date}</span>
                          <span className="flex items-center"><MapPin className="w-5 h-5 mr-2" />{l.location}</span>
                        </div>

                        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">{l.summary}</p>

                        <div className="pt-4">
                          <Link href={`/eventos/${ev.slug}`} className="inline-flex items-center justify-center px-8 py-3 bg-[var(--color-accent-gold)] text-[var(--color-navy-900)] font-bold rounded-sm hover:bg-[#E5B650] transition-colors">
                            {isEn ? 'Stay Informed' : 'Más información'}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </div>
                      </div>

                      <div className="lg:col-span-5 hidden lg:block relative">
                        <div className="relative w-full pt-[56.25%] bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl overflow-hidden border border-slate-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={l.heroImage} alt={l.title} className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-sm p-8 text-center">
              <p className="text-slate-600 text-lg">{t('upcoming.description')}</p>
            </div>
          )}
        </div>

        {/* Past Events */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-[#0A2540] mb-8">{t('past.title')}</h2>

          <div className="grid gap-8">
            {past.map((ev) => {
              const l = pickLocalized(ev, locale);
              const categoryLabel = EXTERNAL_SLUGS.has(ev.slug)
                ? (isEn ? 'External Event' : 'Evento Externo')
                : MED_DIALOGUE_SLUGS.has(ev.slug)
                  ? (isEn ? 'Mediterranean Dialogue Event' : 'Evento Diálogo Mediterráneo')
                  : l.category;
              return (
                <Link key={ev.slug} href={`/eventos/${ev.slug}`} className="group bg-white border border-slate-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow grid md:grid-cols-12">
                  <div className="md:col-span-4 lg:col-span-3 relative overflow-hidden">
                    <div className="relative w-full pt-[56.25%]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={l.heroImage} alt={l.title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy" decoding="async" />
                    </div>
                  </div>
                  <div className="md:col-span-8 lg:col-span-9 p-8 flex flex-col justify-center h-full">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      <span className="flex items-center text-[#D4212A]"><Calendar className="w-4 h-4 mr-1" />{ev.date}</span>
                      <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{l.location}</span>
                      <span className="bg-slate-100 px-2 py-1 rounded-full border border-slate-200">{categoryLabel}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-[#0A2540] mb-3 group-hover:text-[#006994] transition-colors line-clamp-2">{l.title}</h3>
                    <p className="text-slate-600 leading-relaxed line-clamp-2">{l.summary}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <NewsletterCTA />
      <Footer />
    </div>
  );
}
