import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Calendar, Clock, User } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsletterCTA from '@/components/NewsletterCTA';
import { Card } from '@/components/ui/UnifiedCard';
import { articles, getArticleBySlug } from '@/lib/mock-data';
import type { Locale } from '@/lib/utils/content';

type Params = { locale: string; slug: string };

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const isEn = locale === 'en';
  const t = await getTranslations('article');

  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const loc = {
    title: (isEn && article.title_en) || article.title,
    subtitle: (isEn && article.subtitle_en) || article.subtitle,
    content: (isEn && article.content_en) || article.content,
    category: (isEn && article.category_en) || article.category,
    type: (isEn && article.type_en) || article.type,
    heroImage: (isEn && article.heroImage_en) || article.heroImage,
    mainImage: (isEn && article.mainImage_en) || article.mainImage,
    mainImageCaption: (isEn && article.mainImageCaption_en) || article.mainImageCaption,
    pullQuote: (isEn && article.pullQuote_en) || article.pullQuote,
  };

  const authorsList = article.authors ?? [article.author];
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative bg-[#0A2540] text-white section-shell overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={loc.heroImage} alt="" className="w-full h-full object-cover opacity-30" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540] via-[#0A2540]/85 to-transparent"></div>
        </div>
        <div className="relative z-10 page-shell">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F2D4D6] mb-4">
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--color-accent-red)] rounded-full" />
                {loc.type}
              </span>
              <span className="text-white/70">{loc.category}</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight mb-6 text-white">
              {loc.title}
            </h1>
            <p className="text-xl text-slate-200 leading-relaxed max-w-3xl mb-6">{loc.subtitle}</p>
            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.12em] text-slate-300">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {article.publishDate}</span>
              <span className="flex items-center gap-2"><User className="w-4 h-4" /> {(isEn && article.author.name_en) || article.author.name}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readTime} {t('read_time_suffix')}</span>
            </div>
            {article.materials && article.materials.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {article.materials.map((mat) => (
                  <a
                    key={mat.url}
                    href={mat.url}
                    className="inline-flex items-center px-6 py-3 bg-[var(--color-accent-red)] text-white font-bold uppercase tracking-[0.18em] rounded-none hover:bg-[#b01b22] transition-colors"
                    download
                  >
                    {(isEn && mat.label_en) || mat.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main image */}
      <section className="section-shell">
        <div className="page-shell">
          <div className="relative overflow-hidden rounded-sm border hairline">
            <div className="relative pt-[56.25%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={loc.mainImage} alt="" className="absolute top-0 left-0 w-full h-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent px-6 py-4 text-white text-sm text-center">
              {loc.mainImageCaption}
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="section-shell">
        <div className="page-shell">
          <div className="mx-auto reading-width space-y-8 text-slate-700 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: loc.content }} className="space-y-6 [&_p]:mb-6" />
            {loc.pullQuote && (
              <div className="border-l-4 border-[var(--color-accent-red)] bg-[var(--color-paper-warm)] px-6 py-4 text-lg font-serif italic text-[var(--color-text-primary)] my-8">
                “{loc.pullQuote}”
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Author(s) */}
      <section className="section-shell bg-[var(--color-paper-warm)] border-y hairline">
        <div className="page-shell">
          <div className="max-w-3xl mx-auto">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500 font-bold mb-4 text-center sm:text-left">
              {authorsList.length > 1 ? t('authors') : t('author')}
            </div>
            <div className={`flex flex-col sm:flex-row gap-8 ${authorsList.length > 1 ? 'justify-center flex-wrap' : 'items-center'}`}>
              {authorsList.map((auth, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-4 items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={auth.image} alt={auth.name} className="w-20 h-20 rounded-full object-cover border hairline" loading="lazy" decoding="async" />
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg font-serif font-bold text-[var(--color-text-primary)] mb-1">
                      {(isEn && auth.name_en) || auth.name}
                    </h3>
                    <p className="text-slate-600 text-sm">{(isEn && auth.role_en) || auth.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-shell">
          <div className="page-shell">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="eyebrow mb-2">{t('related_label')}</span>
                <h2 className="text-3xl font-serif font-bold text-[var(--color-text-primary)]">{t('keep_exploring')}</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {related.map((rel) => (
                <Card
                  key={rel.slug}
                  variant="standard"
                  title={(isEn && rel.title_en) || rel.title}
                  summary={(isEn && rel.subtitle_en) || rel.subtitle}
                  image={(isEn && rel.heroImage_en) || rel.heroImage}
                  badge={(isEn && rel.type_en) || rel.type}
                  metadata={{ date: rel.publishDate, author: rel.author.name }}
                  ctaLink={`/analisis/${rel.slug}`}
                  ctaText={t('read_more')}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterCTA />
      <Footer />
    </div>
  );
}
