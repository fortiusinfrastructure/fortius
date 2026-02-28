import type { Metadata } from 'next';
import { Navbar, Footer } from '@/components/sections';
import { getFeaturedActivities, getPastActivities, getUpcomingActivities } from '@/lib/mock-data';
import { Link } from '@/i18n/routing';
import { getLocalizedValue } from '@/lib/i18n/localize';
import { getTranslations } from 'next-intl/server';

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const t = await getTranslations('Actividades.Meta');
    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function ActividadesPage({ params }: Props) {
    const { locale } = await params;
    const featuredActivities = getFeaturedActivities();
    const pastActivities = getPastActivities();
    const upcomingActivities = getUpcomingActivities();
    const t = await getTranslations('Actividades');

    return (
        <>
            <Navbar />
            <main className="flex-grow bg-[#050a14] min-h-screen pt-20 animate-fade-in text-white">
                {/* Hero */}
                <section className="relative py-32 md:py-48 px-4 text-center border-b border-white/5 overflow-hidden">
                    <div
                        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=2000')" }}
                    />
                    <div className="absolute inset-0 bg-[#050a14]/90 z-0" />
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <p className="gold-text font-cinzel tracking-[0.3em] text-xs mb-4 uppercase">{t('Hero.label')}</p>
                        <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 tracking-tight">{t('Hero.title')}</h1>
                        <div className="w-24 h-[1px] bg-[#c5a059] mx-auto mb-8" />
                        <p className="text-white/60 font-light max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
                            {t('Hero.description')}
                        </p>
                    </div>
                </section>

                {/* Upcoming Activities — Full-width immersive cards */}
                {upcomingActivities.length > 0 && (
                    <section className="border-b border-white/5">
                        {upcomingActivities.map(activity => {
                            const dateParts = activity.date.match(/^(\d+)\s*[-–—]\s*(\d+)\s+(\w+)\s+(\d{4})$/);
                            const singleDate = activity.date.match(/^(\d+)\s+(\w+)\s+(\d{4})$/);
                            let dayDisplay = '';
                            let monthDisplay = '';
                            let yearDisplay = '';
                            if (dateParts) {
                                dayDisplay = `${dateParts[1]}–${dateParts[2]}`;
                                monthDisplay = dateParts[3];
                                yearDisplay = dateParts[4];
                            } else if (singleDate) {
                                dayDisplay = singleDate[1];
                                monthDisplay = singleDate[2];
                                yearDisplay = singleDate[3];
                            }

                            return (
                                <div key={activity.id} className="group relative">
                                    <div className="relative w-full min-h-[70vh] md:min-h-[80vh] overflow-hidden">
                                        <img
                                            src={activity.image}
                                            alt={getLocalizedValue(activity.title, locale)}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-40"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-[#050a14]/80 to-[#050a14]/30" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#050a14]/90 via-transparent to-transparent" />

                                        <div className="relative z-10 flex flex-col justify-end h-full min-h-[70vh] md:min-h-[80vh] px-6 md:px-16 lg:px-24 pb-16 md:pb-24">
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="w-8 h-[1px] bg-[#c5a059]" />
                                                <span className="font-cinzel text-[10px] md:text-xs tracking-[0.4em] text-[#c5a059] uppercase">
                                                    {t('Upcoming.label')}
                                                </span>
                                                <div className="w-8 h-[1px] bg-[#c5a059]" />
                                            </div>

                                            <div className="flex flex-col lg:flex-row items-start lg:items-end gap-8 lg:gap-16">
                                                {/* Calendar Badge */}
                                                <div className="flex-shrink-0">
                                                    <div className="border border-[#c5a059]/40 bg-[#050a14]/80 backdrop-blur-sm px-6 py-5 md:px-8 md:py-6 text-center">
                                                        <span className="block font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none">
                                                            {dayDisplay}
                                                        </span>
                                                        <span className="block font-cinzel text-sm md:text-base tracking-[0.3em] text-[#c5a059] uppercase mt-2">
                                                            {monthDisplay}
                                                        </span>
                                                        <span className="block font-cinzel text-xs tracking-[0.2em] text-white/40 mt-1">
                                                            {yearDisplay}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Event details */}
                                                <div className="flex-grow max-w-3xl">
                                                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-[1.15] tracking-tight">
                                                        {getLocalizedValue(activity.title, locale)}
                                                    </h2>

                                                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6">
                                                        {activity.location && (
                                                            <span className="text-white/50 font-cinzel text-[10px] md:text-xs tracking-widest uppercase">
                                                                📍 {getLocalizedValue(activity.location, locale)}
                                                            </span>
                                                        )}
                                                        {activity.organizer && (
                                                            <>
                                                                <div className="w-[1px] h-3 bg-white/10 hidden sm:block" />
                                                                <span className="text-white/50 font-cinzel text-[10px] md:text-xs tracking-widest uppercase">
                                                                    {getLocalizedValue(activity.organizer, locale)}
                                                                </span>
                                                            </>
                                                        )}
                                                        {activity.type && (
                                                            <>
                                                                <div className="w-[1px] h-3 bg-white/10 hidden sm:block" />
                                                                <span className="text-[#c5a059]/70 font-cinzel text-[10px] md:text-xs tracking-widest uppercase">
                                                                    {getLocalizedValue(activity.type, locale)}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>

                                                    <p className="text-white/50 font-light leading-relaxed text-sm md:text-base mb-8 max-w-2xl">
                                                        {getLocalizedValue(activity.excerpt, locale)}
                                                    </p>

                                                    <Link
                                                        href={`/actividades/${activity.slug}`}
                                                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#c5a059] text-[#050a14] font-cinzel text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-[#d4b475] transition-all duration-300 shadow-[0_0_40px_rgba(197,160,89,0.15)]"
                                                    >
                                                        {t('Upcoming.viewDetails')}
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                )}

                {/* Featured Activities */}
                <section className="py-24 px-4 bg-[#0a111e]">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-12">
                            <h2 className="font-serif text-3xl text-white mb-2 uppercase">{t('Featured.title')}</h2>
                            <p className="text-white/60 font-light text-sm">{t('Featured.subtitle')}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            {featuredActivities.map(activity => (
                                <div key={activity.id} className="group bg-[#050a14] border border-white/5 hover:border-[#c5a059]/30 transition-all duration-300 flex flex-col h-full">
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={activity.image}
                                            alt={getLocalizedValue(activity.title, locale)}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                        />
                                        <div className="absolute top-4 left-4 bg-[#c5a059] text-[#050a14] px-4 py-2 font-cinzel font-bold text-center leading-none shadow-lg z-10">
                                            <span className="block text-2xl">{activity.date.split(' ')[0]}</span>
                                            <span className="block text-[10px] tracking-wide uppercase">{activity.date.split(' ')[1]}</span>
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-[#c5a059] transition-colors leading-tight">
                                            {getLocalizedValue(activity.title, locale)}
                                        </h3>
                                        <p className="text-white/60 font-light leading-relaxed mb-8 flex-grow">
                                            {getLocalizedValue(activity.excerpt, locale)}
                                        </p>
                                        <Link
                                            href={`/actividades/${activity.slug}`}
                                            className="self-start px-6 py-3 border border-white/10 bg-white/5 text-xs font-cinzel tracking-widest text-white hover:bg-[#c5a059] hover:text-[#050a14] hover:border-[#c5a059] transition-all"
                                        >
                                            {t('Actions.moreInfo')}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Past Activities */}
                <section className="py-24 px-4 bg-[#050a14] border-t border-white/5">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-16">
                            <h2 className="font-serif text-3xl text-white mb-2 uppercase">{t('Past.title')}</h2>
                            <p className="text-white/60 font-light text-sm">{t('Past.subtitle')}</p>
                        </div>
                        <div className="space-y-12">
                            {pastActivities.map(activity => (
                                <div key={activity.id} className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-b border-white/5 pb-12 last:border-0">
                                    <div className="md:col-span-4 lg:col-span-3">
                                        <div className="relative aspect-video overflow-hidden border border-white/5 group-hover:border-[#c5a059]/30 transition-all">
                                            <img
                                                src={activity.image}
                                                alt={getLocalizedValue(activity.title, locale)}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-center items-start">
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                                            <span className="text-[#c5a059] font-cinzel text-[10px] tracking-widest uppercase">
                                                {activity.date}
                                            </span>
                                            {(activity.location || activity.organizer) && (
                                                <>
                                                    <div className="w-[1px] h-3 bg-white/10 hidden sm:block" />
                                                    <span className="text-white/40 font-cinzel text-[10px] tracking-widest uppercase">
                                                        {getLocalizedValue(activity.location, locale)} {activity.organizer ? `— ${getLocalizedValue(activity.organizer, locale)}` : ''}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-[#c5a059] transition-colors leading-tight">
                                            {getLocalizedValue(activity.title, locale)}
                                        </h3>
                                        <p className="text-white/60 font-light leading-relaxed mb-6 line-clamp-3 md:line-clamp-2 lg:line-clamp-3 max-w-3xl">
                                            {getLocalizedValue(activity.excerpt, locale)}
                                        </p>
                                        <Link
                                            href={`/actividades/${activity.slug}`}
                                            className="text-xs font-cinzel tracking-widest text-[#c5a059] border-b border-[#c5a059]/30 pb-1 hover:border-[#c5a059] transition-all"
                                        >
                                            {t('Actions.moreInfo')}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
