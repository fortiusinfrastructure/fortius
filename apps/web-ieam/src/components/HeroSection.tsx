import { ArrowRight } from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { articles } from '@/lib/mock-data/articles';
import { pickLocalized, type Locale } from '@/lib/utils/content';

export default async function HeroSection() {
  const t = await getTranslations('hero');
  const locale = (await getLocale()) as Locale;

  const featured =
    articles.find((a) => a.type === 'Informe' || a.type === 'Policy Brief') || articles[0];
  const content = featured ? pickLocalized(featured, locale) : null;

  return (
    <section className="relative min-h-screen flex items-center bg-white border-b hairline">
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#F7F9FC] via-white to-white pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative page-shell w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-center py-8 lg:py-12">
          {/* Text column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="eyebrow text-[var(--color-text-primary)]">
              <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500 ml-2">
                {t('eyebrow')}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight tracking-[-0.02em]">
              {t('title_start')}{' '}
              <span className="italic text-[var(--color-accent-red)]">{t('title_highlight')}</span>{' '}
              {t('title_end')}
            </h1>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
              {t('subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/investigacion"
                className="inline-flex items-center justify-center px-7 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white bg-[var(--color-navy-900)] hover:bg-[var(--color-mediterranean)] transition-colors shadow-sm rounded-none"
              >
                {t('cta_explore')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/eventos"
                className="inline-flex items-center justify-center px-7 py-3 text-[11px] font-bold uppercase tracking-[0.18em] border border-slate-300 text-[var(--color-text-primary)] bg-white hover:bg-slate-50 transition-colors"
              >
                {t('cta_events')}
              </Link>
            </div>
          </div>

          {/* Featured article image */}
          <div className="lg:col-span-7 relative mt-8 lg:mt-0">
            {featured && content && (
              <div className="relative rounded-sm overflow-hidden border hairline group w-full aspect-video">
                <Link
                  href={`/analisis/${featured.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={content.title}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={content.heroImage}
                  alt={content.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white text-sm font-bold uppercase tracking-[0.2em] drop-shadow-md group-hover:opacity-0 group-hover:scale-110 transition-all duration-700 ease-out">
                    {t('featured.read_now')}
                  </span>
                </div>
              </div>
            )}
            <div className="absolute -z-10 top-12 -right-12 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
}
