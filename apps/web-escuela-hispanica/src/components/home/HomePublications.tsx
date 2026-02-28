import React from 'react';
import { Link } from '@/i18n/routing';
import { getLatestArticles } from '@/lib/mock-data';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedValue } from '@/lib/i18n/localize';

const HomePublications: React.FC = () => {
    const articles = getLatestArticles(4);
    const t = useTranslations('Home.Publications');
    const locale = useLocale();

    return (
        <section className="py-32 px-4 bg-[#050a14] relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <p className="text-[#c5a059] font-cinzel text-xs tracking-[0.2em] mb-4 uppercase">{t('tag')}</p>
                    <h2 className="text-white font-serif text-4xl md:text-5xl mb-8">{t('title')}</h2>
                    <div className="w-[1px] h-12 bg-[#c5a059] mx-auto opacity-50" />
                </div>

                {/* 4 Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {articles.map(article => (
                        <Link key={article.id} href={`/publicaciones/${article.slug}`}>
                            <div className="group h-full flex flex-col cursor-pointer">
                                {/* Book-like Vertical Card */}
                                <div className="relative aspect-[3/4] overflow-hidden mb-6 border border-white/5 bg-[#0a111e]">
                                    <img
                                        src={article.image}
                                        alt={getLocalizedValue(article.title, locale)}
                                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                    />

                                </div>

                                <div className="flex flex-col flex-grow px-2">
                                    <h3 className="text-white font-serif text-lg leading-snug mb-3 group-hover:text-[#c5a059] transition-colors line-clamp-2">
                                        {getLocalizedValue(article.title, locale)}
                                    </h3>

                                    <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-3">
                                        {getLocalizedValue(article.excerpt, locale)}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                                        <span className="text-[#c5a059]/70 text-[10px] font-cinzel tracking-widest">{article.date}</span>
                                        <span className="text-white/40 text-[10px] font-cinzel tracking-widest group-hover:text-[#c5a059] transition-colors uppercase">
                                            {t('readMore')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Link
                        href="/publicaciones"
                        className="inline-block border border-white/20 text-white px-10 py-4 font-cinzel text-[10px] tracking-[0.25em] hover:border-[#c5a059] hover:text-[#c5a059] transition-all uppercase"
                    >
                        {t('viewAll')}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomePublications;
