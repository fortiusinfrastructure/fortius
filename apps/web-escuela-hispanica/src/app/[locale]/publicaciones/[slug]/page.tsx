import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar, Footer } from '@/components/sections';
import { articles, getArticleBySlug } from '@/lib/mock-data';
import { Calendar, User, ArrowLeft, Share2, Bookmark, Clock, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getLocalizedValue } from '@/lib/i18n/localize';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { getTeamMemberByName } from '@/lib/mock-data/team';
import { getTranslations } from 'next-intl/server';

interface Props {
    params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const article = getArticleBySlug(slug);
    const t = await getTranslations('Publicaciones.Article');
    if (!article) return { title: t('notFound') };

    const title = getLocalizedValue(article.title, locale);
    const excerpt = getLocalizedValue(article.excerpt, locale);

    return {
        title: `${title} | Escuela Hispánica`,
        description: excerpt,
        openGraph: {
            title: title,
            description: excerpt,
            images: [article.image],
        },
    };
}

export async function generateStaticParams() {
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export default async function ArticlePage({ params }: Props) {
    const { slug, locale } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    const t = await getTranslations('Publicaciones.Article');

    // Related articles (same category, excluding current)
    const relatedArticles = articles
        .filter((a) => {
            const catA = typeof a.category === 'string' ? a.category : a.category.es;
            const catArt = typeof article.category === 'string' ? article.category : article.category.es;
            return catA === catArt && a.slug !== article.slug;
        })
        .slice(0, 3);

    // Determine author role and info
    const teamMember = getTeamMemberByName(article.author);
    const authorRole = teamMember ? getLocalizedValue(teamMember.role, locale) : t('guestAuthor');
    const authorImage = teamMember ? teamMember.image : '/images/authors/default-avatar.svg';

    const authorBio = teamMember
        ? t('authorBioMember', { role: getLocalizedValue(teamMember.role, locale).toLowerCase() })
        : t('authorBioGuest');

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <ScrollProgress />

            <main className="flex-grow bg-[#050a14] pt-20 text-white selection:bg-[#c5a059]/30">

                {/* Article Hero */}
                <section className="relative py-32 md:py-48 px-4 overflow-hidden">
                    <div
                        className="absolute inset-0 z-0 opacity-15 bg-cover bg-center bg-fixed transition-transform duration-[10s] scale-110"
                        style={{ backgroundImage: `url(${article.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050a14]/60 via-[#050a14]/90 to-[#050a14] z-0" />

                    <div className="relative z-10 max-w-5xl mx-auto text-center">
                        <nav className="flex items-center justify-center gap-2 text-white/40 mb-12 font-cinzel text-[10px] tracking-[0.2em]">
                            <Link href="/" className="hover:text-[#c5a059] transition-colors">{t('home')}</Link>
                            <ChevronRight className="w-3 h-3 text-white/20" />
                            <Link href="/publicaciones" className="hover:text-[#c5a059] transition-colors">{t('archive')}</Link>
                            <ChevronRight className="w-3 h-3 text-[#c5a059]/40" />
                            <span className="text-[#c5a059]">{getLocalizedValue(article.category, locale).toUpperCase()}</span>
                        </nav>

                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-12 leading-[1.05] tracking-tight animate-fade-in px-4">
                            {getLocalizedValue(article.title, locale)}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-y-6 gap-x-12 text-white/40 font-cinzel text-xs tracking-[0.25em]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c5a059]/20 p-0.5">
                                    <img
                                        src={authorImage}
                                        alt={article.author}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <span className="text-white/80 uppercase">{article.author}</span>
                            </div>
                            <div className="w-[1px] h-4 bg-white/10 hidden md:block" />
                            <div className="flex items-center gap-3">
                                <span className="text-[#c5a059] font-cinzel text-[10px] tracking-widest">{authorRole.toUpperCase()}</span>
                            </div>
                            <div className="w-[1px] h-4 bg-white/10 hidden md:block" />
                            <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4 text-[#c5a059]/60" />
                                <span>{article.date}</span>
                            </div>
                            <div className="w-[1px] h-4 bg-white/10 hidden md:block" />
                            <div className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-[#c5a059]/60" />
                                <span className="text-[#c5a059] font-cinzel text-[10px] tracking-widest">{t('readingTime')}</span>
                            </div>
                        </div>
                        <div className="mt-16 flex justify-center">
                            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent" />
                        </div>
                    </div>
                </section>

                {/* Article Content Wrapper */}
                <section className="relative pt-20 pb-40 px-4">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_minmax(auto,800px)_1fr] gap-0">

                        {/* Left Sidebar (Desktop Only) */}
                        <aside className="hidden lg:block relative">
                            <div className="sticky top-40 flex flex-col gap-8 items-end pr-16 text-white/20">
                                <p className="font-cinzel text-[9px] tracking-[0.4em] rotate-180 [writing-mode:vertical-lr] mb-4 uppercase">{t('share')}</p>
                                <button className="hover:text-[#c5a059] transition-all hover:scale-110"><Share2 className="w-5 h-5" /></button>
                                <button className="hover:text-[#c5a059] transition-all hover:scale-110"><Bookmark className="w-5 h-5" /></button>
                                <div className="w-[1px] h-20 bg-[#c5a059]/20" />
                            </div>
                        </aside>

                        {/* Main Content Area */}
                        <article className="relative">
                            <div
                                className="article-content px-6 md:px-0"
                                dangerouslySetInnerHTML={{ __html: getLocalizedValue(article.content, locale) }}
                            />

                            {/* Author Editorial Card */}
                            <footer className="mt-40 border-t border-white/5 pt-20">
                                <div className="p-10 md:p-16 bg-[#0a111e] border border-white/5 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/5 blur-[100px] rounded-full -mr-32 -mt-32 transition-colors group-hover:bg-[#c5a059]/10" />
                                    <div className="relative z-10 flex flex-col md:flex-row items-start gap-10">
                                        <div className="relative group/avatar">
                                            <div className="w-24 h-24 rounded-full overflow-hidden border border-[#c5a059]/20 transition-transform duration-500 group-hover/avatar:scale-105">
                                                <img
                                                    src={authorImage}
                                                    alt={article.author}
                                                    className="w-full h-full object-cover grayscale group-hover/avatar:grayscale-0 transition-all duration-700"
                                                />
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 bg-[#c5a059] text-[#050a14] p-1.5 rounded-full shadow-lg">
                                                <User className="w-3 h-3" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[#c5a059] font-cinzel text-[10px] tracking-[0.4em] mb-3">{authorRole.toUpperCase()}</p>
                                            <h4 className="text-3xl font-serif text-white mb-6 tracking-tight">{article.author}</h4>
                                            <p className="text-white/50 text-base font-serif italic mb-8 max-w-xl leading-relaxed">
                                                {authorBio}
                                            </p>
                                            <div className="flex gap-4">
                                                <button className="text-[10px] font-cinzel tracking-widest text-[#c5a059] hover:text-white transition-all py-2 border-b border-[#c5a059]/30 hover:border-white uppercase">{t('viewMoreAuthor')}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </footer>
                        </article>

                        {/* Right Sidebar (Desktop Only) */}
                        <aside className="hidden lg:block relative" />
                    </div>
                </section>

                {/* Related Articles Section */}
                {relatedArticles.length > 0 && (
                    <section className="py-40 px-4 bg-black/40 border-t border-white/5">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                                <div className="max-w-2xl">
                                    <p className="text-[#c5a059] font-cinzel text-[10px] tracking-[0.5em] mb-6 uppercase">{t('expandHorizons')}</p>
                                    <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">{t('relatedPosts')}</h3>
                                </div>
                                <Link
                                    href="/publicaciones"
                                    className="group inline-flex items-center gap-3 text-white/40 hover:text-[#c5a059] font-cinzel text-[11px] tracking-widest transition-all pb-2 border-b border-white/10 hover:border-[#c5a059]"
                                >
                                    {t('exploreArchive')}
                                    <ArrowLeft className="w-3 h-3 rotate-180 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                                {relatedArticles.map((rel) => (
                                    <Link key={rel.id} href={`/publicaciones/${rel.slug}`} className="group block">
                                        <div className="aspect-[16/10] overflow-hidden mb-8 relative border border-white/5 bg-[#0a111e]">
                                            <img
                                                src={rel.image}
                                                alt={getLocalizedValue(rel.title, locale)}
                                                className="w-full h-full object-cover grayscale transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                            />
                                            <div className="absolute inset-0 bg-[#050a14]/60 group-hover:bg-transparent transition-colors duration-700" />
                                        </div>
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-[#c5a059] font-cinzel text-[9px] tracking-widest uppercase">{getLocalizedValue(rel.category, locale)}</span>
                                            <div className="h-[1px] flex-grow bg-white/5" />
                                        </div>
                                        <h4 className="font-serif text-2xl text-white/90 group-hover:text-[#c5a059] transition-colors leading-[1.3] tracking-tight">
                                            {getLocalizedValue(rel.title, locale)}
                                        </h4>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

            </main>
            <Footer />
        </div>
    );
}
