import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Card } from '@/components/ui/UnifiedCard';
import { events as eventsData } from '@/lib/mock-data/events';
import { parseEventDate, pickLocalized, type Locale } from '@/lib/utils/content';

export default async function HomeEvents() {
  const t = await getTranslations('home_events');
  const locale = (await getLocale()) as Locale;
  const isEn = locale === 'en';

  const now = new Date();
  const upcoming = eventsData
    .filter((e) => parseEventDate(e.date) >= now)
    .sort((a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime());
  const past = eventsData
    .filter((e) => parseEventDate(e.date) < now)
    .sort((a, b) => parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime())
    .slice(0, 3);

  const upcomingEvent = upcoming[0] || null;
  const upcomingLocalized = upcomingEvent ? pickLocalized(upcomingEvent, locale) : null;

  return (
    <section className="section-shell bg-[var(--color-paper-warm)] border-b hairline relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/60 via-[#F4F6F9] to-white opacity-70 pointer-events-none"
        aria-hidden="true"
      />
      <div className="page-shell relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <h2 className="text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-4 sm:mb-0">
            {t('section_title')}
          </h2>
          <Link
            href="/eventos"
            className="inline-flex items-center px-6 py-3 border border-[var(--color-text-primary)] text-sm font-bold text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-white transition-colors self-start"
          >
            {t('view_agenda')}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Upcoming Event - Featured */}
        {upcomingEvent && upcomingLocalized && (
          <div className="mb-10">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-gold)] mb-4">
              {isEn ? 'Upcoming Event' : 'Próximo Evento'}
            </div>
            <Link
              href={`/eventos/${upcomingEvent.slug}`}
              className="group block bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 bg-[var(--color-accent-gold)] text-[var(--color-text-primary)] text-xs font-bold uppercase tracking-wider rounded-sm mb-4 w-fit">
                    {upcomingLocalized.category}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-accent-red)] transition-colors">
                    {upcomingLocalized.title}
                  </h3>
                  <p className="text-slate-600 mb-6 line-clamp-2">{upcomingLocalized.subtitle}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-6">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[var(--color-accent-red)]" />
                      {upcomingEvent.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[var(--color-accent-red)]" />
                      {upcomingLocalized.location}
                    </span>
                  </div>
                  <span className="inline-flex items-center text-sm font-bold text-[var(--color-accent-red)] group-hover:underline">
                    {isEn ? 'Learn more' : 'Más información'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
                <div className="relative aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={upcomingLocalized.heroImage}
                    alt={upcomingLocalized.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Past Events */}
        {past.length > 0 && (
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
              {isEn ? 'Recent Events' : 'Eventos Recientes'}
            </div>
            <div className="bg-white border hairline rounded-sm overflow-hidden">
              {past.map((event, index) => {
                const c = pickLocalized(event, locale);
                return (
                  <Card
                    key={event.slug}
                    variant="compact"
                    locale={locale}
                    title={c.title}
                    badge={c.category}
                    metadata={{
                      date: event.date,
                      location: c.location,
                      format: event.format,
                    }}
                    ctaLink={`/eventos/${event.slug}`}
                    className={index === past.length - 1 ? 'border-b-0' : ''}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
