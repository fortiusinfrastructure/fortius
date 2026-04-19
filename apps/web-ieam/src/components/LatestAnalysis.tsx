import { ArrowRight } from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Card } from '@/components/ui/UnifiedCard';
import { articles } from '@/lib/mock-data/articles';
import { parseEventDate, pickLocalized, type Locale } from '@/lib/utils/content';

export default async function LatestAnalysis() {
  const t = await getTranslations('analysis');
  const locale = (await getLocale()) as Locale;

  const sorted = [...articles].sort(
    (a, b) => parseEventDate(b.publishDate).getTime() - parseEventDate(a.publishDate).getTime(),
  );

  const featured =
    sorted.find((a) => a.type === 'Informe' || a.type === 'Policy Brief') || sorted[0];
  const nextReport = sorted.find(
    (a) => (a.type === 'Informe' || a.type === 'Policy Brief') && a.slug !== featured.slug,
  );
  const infographics = sorted.filter((a) => a.type === 'Infografía').slice(0, 2);

  const secondary = [nextReport, ...infographics].filter(Boolean) as typeof sorted;

  return (
    <section className="section-shell bg-white border-b hairline">
      <div className="page-shell">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-10 pb-6 border-b hairline">
          <h2 className="text-4xl font-serif font-bold text-[var(--color-text-primary)]">
            {t('section_title')}
          </h2>
          <Link
            href="/investigacion"
            className="hidden sm:flex items-center text-sm font-bold text-[var(--color-accent-red)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            {t('view_archive')}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {featured && (
            <div className="lg:col-span-12">
              {(() => {
                const c = pickLocalized(featured, locale);
                return (
                  <Card
                    variant="featured"
                    locale={locale}
                    title={c.title}
                    summary={c.subtitle}
                    image={c.heroImage}
                    badge={featured.type}
                    metadata={{
                      date: featured.publishDate,
                      readTime: featured.readTime,
                      author: featured.author.name,
                    }}
                    ctaLink={`/analisis/${featured.slug}`}
                  />
                );
              })()}
            </div>
          )}

          {secondary.map((item) => {
            const c = pickLocalized(item, locale);
            return (
              <div key={item.slug} className="lg:col-span-4 md:col-span-6">
                <Card
                  variant="standard"
                  locale={locale}
                  title={c.title}
                  image={c.heroImage}
                  summary={c.subtitle}
                  badge={item.type}
                  metadata={{
                    date: item.publishDate,
                    readTime: item.readTime,
                    author: item.author.name,
                  }}
                  ctaLink={`/analisis/${item.slug}`}
                  className="h-full"
                />
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/investigacion"
            className="inline-flex items-center text-sm font-bold text-[var(--color-mediterranean)]"
          >
            {t('view_archive')}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
