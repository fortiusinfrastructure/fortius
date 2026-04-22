import { getLocale, getTranslations } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsletterCTA from '@/components/NewsletterCTA';
import ResearchPillars from '@/components/research/ResearchPillars';
import ResearchTabs, { type ResearchCardData, type ResearchCategoryId } from '@/components/research/ResearchTabs';
import { articles, type Article } from '@/lib/mock-data';
import type { Locale } from '@/lib/utils/content';

function classify(type: Article['type']): ResearchCategoryId | null {
  switch (type) {
    case 'Informe':
    case 'Policy Brief':
    case 'Análisis':
      return 'reports';
    case 'Infografía':
      return 'infographics';
    case 'Entrevista':
    case 'Nota de prensa':
      return 'press';
    default:
      return null;
  }
}

function toCardData(article: Article, locale: Locale): ResearchCardData | null {
  const category = classify(article.type);
  if (!category) return null;
  const isEn = locale === 'en';
  return {
    slug: article.slug,
    title: (isEn && article.title_en) || article.title,
    subtitle: (isEn && article.subtitle_en) || article.subtitle,
    image: (isEn && article.heroImage_en) || article.heroImage,
    type: (isEn && article.type_en) || article.type,
    publishDate: article.publishDate,
    authorName: (isEn && article.author.name_en) || article.author.name,
    category,
  };
}

export default async function ResearchPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('research');

  const cards = articles
    .map((a) => toCardData(a, locale))
    .filter((c): c is ResearchCardData => c !== null);

  const categories: { id: ResearchCategoryId; label: string }[] = [
    { id: 'reports', label: t('categories.reports') },
    { id: 'infographics', label: t('categories.infographics') },
    { id: 'press', label: t('categories.press') },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <div className="relative bg-[#0A2540] text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop"
            alt="Research background"
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
                <p className="text-xl text-slate-300 leading-relaxed max-w-lg">{t('hero.subtitle')}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-sm">
              <p className="text-lg font-serif italic text-white leading-relaxed">{t('hero.quote')}</p>
            </div>
          </div>
        </div>
      </div>

      <ResearchPillars />

      <div className="page-shell section-shell">
        <ResearchTabs
          articles={cards}
          categories={categories}
          noResults={t('no_results')}
          locale={locale}
        />
      </div>

      <NewsletterCTA />
      <Footer />
    </div>
  );
}
