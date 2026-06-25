import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { Calendar, MapPin, Clock, Download } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsletterCTA from '@/components/NewsletterCTA';
import EventRegistrationForm from '@/components/events/EventRegistrationForm';
import EventGallery from '@/components/events/EventGallery';
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

      <section className="hero-dark relative bg-[var(--color-navy-900)] text-[var(--color-cream)] section-shell overflow-hidden">
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

            {event.attachments && event.attachments.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {event.attachments.map((att) => (
                  <a
                    key={att.url}
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-red)] text-white font-bold uppercase tracking-[0.18em] text-xs hover:bg-[#b01b22] transition-colors"
                  >
                    <Download className="w-4 h-4 flex-shrink-0" />
                    {isEn && att.label_en ? att.label_en : att.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="page-shell grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            {l.content ? (
              <div
                dangerouslySetInnerHTML={{ __html: l.content }}
                className="
                  prose prose-slate max-w-none
                  text-slate-700 text-lg leading-[1.85]
                  [&_p]:mb-5 [&_p]:text-slate-700
                  [&_h3]:text-2xl [&_h3]:font-serif [&_h3]:font-bold [&_h3]:text-[var(--color-text-primary)] [&_h3]:mt-10 [&_h3]:mb-4
                  [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-[var(--color-text-primary)] [&_h4]:mt-8 [&_h4]:mb-3
                  [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mb-5
                  [&_li]:text-slate-700 [&_li]:leading-relaxed
                  [&_b]:font-semibold [&_b]:text-[var(--color-text-primary)]
                  [&_img]:rounded-sm [&_img]:shadow-md [&_img]:my-8
                  [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--color-accent-red)] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-600
                "
              />
            ) : (
              l.summary.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-slate-700 text-lg leading-[1.85] mb-5">{paragraph}</p>
              ))
            )}

            {/* Agenda */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="border-t hairline pt-6 space-y-3">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-text-primary)]">
                  {isEn
                    ? (event.agendaTitle_en || event.agendaTitle || 'Agenda')
                    : (event.agendaTitle || 'Agenda')}
                </h2>
                <ul className="space-y-3">
                  {event.agenda.map((item, idx) => {
                    const hasDate = item.time && item.time.includes(' - ');
                    const datePart = hasDate ? item.time?.split(' - ')[0] : null;
                    const timePart = hasDate ? item.time?.split(' - ')[1] : item.time;

                    return (
                      <li key={idx} className={`block text-slate-700 ${datePart ? 'mt-6 first:mt-0' : ''}`}>
                        {datePart && (
                          <div className="text-sm font-bold uppercase tracking-wider text-[var(--color-accent-red)] mb-2 border-b border-[var(--color-text-primary)]/10 pb-1">
                            {datePart}
                          </div>
                        )}
                        <div className="flex gap-4">
                          {timePart && <span className="min-w-[85px] text-sm font-bold text-[var(--color-text-primary)]">{timePart}</span>}
                          <div>
                            <div className="font-semibold">{isEn && item.title_en ? item.title_en : item.title}</div>
                            {(isEn && item.speaker_en ? item.speaker_en : item.speaker) && (
                              <div className="text-sm text-slate-500 mt-1">
                                {isEn && item.speaker_en ? item.speaker_en : item.speaker}
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Photo gallery */}
            {event.gallery && event.gallery.length > 0 && (
              <div className="border-t hairline pt-8">
                <h2 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] mb-5">
                  {isEn ? 'Photo Gallery' : 'Galería de fotos'}
                </h2>
                <EventGallery gallery={event.gallery} title={l.title} isEn={isEn} />
              </div>
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
