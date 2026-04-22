import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { Calendar, MapPin, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsletterCTA from '@/components/NewsletterCTA';
import EventRegistrationForm from '@/components/events/EventRegistrationForm';
import { getEventBySlug, type EventItem } from '@/lib/mock-data';
import type { Locale } from '@/lib/utils/content';

type Params = { locale: string; slug: string };

export default async function EventDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const isEn = locale === 'en';

  const event = getEventBySlug(slug);
  if (!event) notFound();

  const l = {
    title: (isEn && event.title_en) || event.title,
    subtitle: (isEn && event.subtitle_en) || event.subtitle,
    summary: (isEn && event.summary_en) || event.summary,
    location: (isEn && event.location_en) || event.location,
    format: (isEn && event.format_en) || event.format,
    category: (isEn && event.category_en) || event.category,
    content: (isEn && event.content_en) || event.content,
    heroImage: (isEn && event.heroImage_en) || event.heroImage,
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="relative bg-[var(--color-navy-900)] text-[var(--color-cream)] section-shell overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={l.heroImage} alt={l.title} className="w-full h-full object-cover opacity-40" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540] via-[#0A2540]/80 to-transparent"></div>
        </div>
        <div className="relative z-10 page-shell">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F2D4D6] mb-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--color-accent-red)] rounded-full" />
                {isEn ? 'In-person' : 'Presencial'}
              </span>
              <span className="text-[var(--color-cream)]/80">{l.location}</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold leading-tight mb-4 text-[var(--color-cream)]">{l.title}</h1>
            <p className="text-xl leading-relaxed mb-6 text-[var(--color-cream)]/90">{l.subtitle}</p>
            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.12em] text-[var(--color-cream)]/80">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {event.date}</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {l.location}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {l.format}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="page-shell grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            {l.content ? (
              <div dangerouslySetInnerHTML={{ __html: l.content }} className="text-slate-700 text-lg leading-relaxed [&_p]:mb-4" />
            ) : (
              l.summary.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-slate-700 text-lg leading-relaxed mb-4">{paragraph}</p>
              ))
            )}

            {event.slug === 'lanzamiento-oficial-ieam' && <EventRegistrationForm />}
          </div>

          <div className="lg:col-span-5 space-y-6">
            {event.highlightImage && (
              <div className="overflow-hidden border hairline">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={event.highlightImage} alt={l.title} className="w-full h-64 object-cover" loading="lazy" decoding="async" />
              </div>
            )}

            {event.speakers && event.speakers.length > 0 && event.slug !== 'dialogo-mediterraneo-rabat' && (
              <SpeakersPanel event={event} isEn={isEn} />
            )}
          </div>
        </div>
      </section>

      <NewsletterCTA />
      <Footer />
    </div>
  );
}

function SpeakersPanel({ event, isEn }: { event: EventItem; isEn: boolean }) {
  const speakers = event.speakers;
  const hasGroups = speakers.some((s) => s.group);

  return (
    <div className="border hairline p-6 bg-[var(--color-paper-warm)]">
      <h3 className="text-lg font-serif font-bold text-[var(--color-text-primary)] mb-4">
        {isEn ? 'Speakers' : 'Ponentes'}
      </h3>

      {hasGroups ? (() => {
        const groups: Record<string, typeof speakers> = {};
        const order: string[] = [];
        speakers.forEach((sp) => {
          const name = isEn ? sp.group_en || sp.group || 'General' : sp.group || 'General';
          if (!groups[name]) { groups[name] = []; order.push(name); }
          groups[name].push(sp);
        });
        return (
          <div className="space-y-6">
            {order.map((g) => (
              <div key={g}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]/70 mb-3 border-b border-[var(--color-navy-900)]/10 pb-1">{g}</h4>
                <ul className="space-y-3">
                  {groups[g].map((sp) => (
                    <li key={sp.name} className="text-slate-700">
                      <div className="font-semibold leading-tight">{sp.name}</div>
                      {sp.role && <div className="text-sm text-slate-500 mt-0.5">{isEn && sp.role_en ? sp.role_en : sp.role}</div>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      })() : (
        <ul className="space-y-3">
          {speakers.map((sp) => (
            <li key={sp.name} className="text-slate-700">
              <div className="font-semibold leading-tight">{sp.name}</div>
              {sp.role && <div className="text-sm text-slate-500 mt-0.5">{isEn && sp.role_en ? sp.role_en : sp.role}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
