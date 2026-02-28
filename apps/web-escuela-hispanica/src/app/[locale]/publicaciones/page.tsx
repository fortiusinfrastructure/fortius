import type { Metadata } from 'next';
import { Navbar, Footer } from '@/components/sections';
import { articles, getFeaturedArticles } from '@/lib/mock-data';
import { Link } from '@/i18n/routing';
import { getLocalizedValue } from '@/lib/i18n/localize';
import { Calendar, User, BookOpen } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const t = await getTranslations('Publicaciones.Archive');

    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
    };
}

export default async function PublicacionesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const featuredArticle = getFeaturedArticles()[0];
    const listArticles = articles.filter(a => a.id !== featuredArticle?.id);

    const t = await getTranslations('Publicaciones.Archive');

    return (
        <>
            <Navbar />
            <main className="flex-grow bg-[#050a14] min-h-screen pt-20 animate-fade-in text-white">
                {/* Hero */}
                <section className="relative py-32 md:py-48 px-4 text-center border-b border-white/5 overflow-hidden">
                    <div
                        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000')" }}
                    />
                    <div className="absolute inset-0 bg-[#050a14]/90 z-0" />
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <p className="gold-text font-cinzel tracking-[0.3em] text-xs mb-4 uppercase">{t('subtitle')}</p>
                        <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 tracking-tight">{t('title')}</h1>
                        <div className="w-24 h-[1px] bg-[#c5a059] mx-auto mb-8" />
                        <p className="text-white/60 font-light max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
                            {t('description')}
                        </p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 py-12">
                    {/* Featured Article */}
                    {featuredArticle && (
                        <div className="mb-20">
                            <Link href={`/publicaciones/${featuredArticle.slug}`}>
                                <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#c5a059]/20 bg-[#0a111e] overflow-hidden cursor-pointer hover:border-[#c5a059]/50 transition-all duration-500">
                                    <div className="h-64 lg:h-auto overflow-hidden">
                                        <img
                                            src={featuredArticle.image}
                                            alt={getLocalizedValue(featuredArticle.title, locale)}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                                        <div className="flex items-center gap-4 mb-4 text-[#c5a059] text-xs font-cinzel tracking-wider">
                                            <span className="bg-[#c5a059]/10 px-3 py-1 border border-[#c5a059]/20">{t('featured')}</span>
                                            <span>{getLocalizedValue(featuredArticle.category, locale).toUpperCase()}</span>
                                        </div>
                                        <h3 className="text-2xl lg:text-3xl font-serif text-white mb-6 group-hover:text-[#c5a059] transition-colors">
                                            {getLocalizedValue(featuredArticle.title, locale)}
                                        </h3>
                                        <p className="text-white/70 mb-8 font-light leading-relaxed">
                                            {getLocalizedValue(featuredArticle.excerpt, locale)}
                                        </p>
                                        <div className="flex items-center gap-6 text-xs text-white/40 font-cinzel tracking-wide mt-auto">
                                            <div className="flex items-center gap-2">
                                                <User className="w-3 h-3" /> {featuredArticle.author}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3 h-3" /> {featuredArticle.date}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Article Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listArticles.map(article => (
                            <Link key={article.id} href={`/publicaciones/${article.slug}`}>
                                <div className="group flex flex-col bg-[#0a111e]/40 border border-white/5 hover:border-[#c5a059]/40 transition-all duration-300 cursor-pointer h-full">
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={article.image}
                                            alt={getLocalizedValue(article.title, locale)}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                        />
                                        <div className="absolute top-4 left-4 bg-[#050a14]/80 backdrop-blur px-3 py-1 text-[10px] font-cinzel text-[#c5a059] border border-[#c5a059]/20">
                                            {getLocalizedValue(article.category, locale)}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-3 text-[10px] text-white/40 mb-3 font-cinzel">
                                            <span>{article.date}</span>
                                            <span className="w-1 h-1 bg-[#c5a059] rounded-full" />
                                            <span>{article.author}</span>
                                        </div>
                                        <h3 className="font-serif text-xl text-white/90 mb-4 leading-tight group-hover:text-[#c5a059] transition-colors">
                                            {getLocalizedValue(article.title, locale)}
                                        </h3>
                                        <p className="text-sm text-white/50 leading-relaxed mb-6 font-light line-clamp-3">
                                            {getLocalizedValue(article.excerpt, locale)}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                                            <span className="text-[10px] font-cinzel text-[#c5a059] tracking-widest group-hover:underline decoration-[#c5a059] underline-offset-4">
                                                {t('readArticle')}
                                            </span>
                                            <BookOpen className="w-4 h-4 text-white/20 group-hover:text-[#c5a059]" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
