import React from 'react';
import { Link } from '@/i18n/routing';
import { getLatestActivities } from '@/lib/mock-data';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedValue } from '@/lib/i18n/localize';

const HomeActivities: React.FC = () => {
    const activities = getLatestActivities(3);
    const t = useTranslations('Home.Activities');
    const locale = useLocale();

    return (
        <section className="py-24 px-4 bg-[#050a14]">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16 px-2">
                    <div>
                        <p className="text-[#c5a059] font-cinzel text-xs tracking-[0.2em] mb-3 uppercase">{t('tag')}</p>
                        <h2 className="text-white font-serif text-4xl md:text-5xl">{t('title')}</h2>
                    </div>
                    <Link href="/actividades" className="hidden md:flex text-white/50 text-[10px] font-cinzel tracking-[0.2em] hover:text-[#c5a059] transition-colors border-b border-white/10 pb-1 hover:border-[#c5a059] uppercase">
                        {t('viewAll')}
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {activities.map(activity => (
                        <Link key={activity.id} href={`/actividades/${activity.slug}`}>
                            <div className="group h-full flex flex-col cursor-pointer">
                                {/* Image Container with "Sticker" Date */}
                                <div className="relative aspect-video overflow-hidden mb-6 border border-white/5 group-hover:border-[#c5a059]/30 transition-all">
                                    <div className="absolute top-6 left-6 z-20 bg-[#c5a059] text-[#050a14] w-14 h-14 flex flex-col items-center justify-center shadow-lg font-cinzel shadow-black/30">
                                        <span className="text-xl font-bold leading-none">{activity.date.split(' ')[0]}</span>
                                        <span className="text-[9px] uppercase tracking-wide leading-none mt-1">{activity.date.split(' ')[1]?.substring(0, 3)}</span>
                                    </div>
                                    <img
                                        src={activity.image}
                                        alt={getLocalizedValue(activity.title, locale)}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/80 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-grow px-2">
                                    <span className="text-[#c5a059] text-[9px] uppercase tracking-[0.2em] mb-3 font-cinzel">{getLocalizedValue(activity.type, locale) || t('defaultType')}</span>
                                    <h3 className="text-white font-serif text-2xl leading-tight mb-4 group-hover:text-[#c5a059] transition-colors">
                                        {getLocalizedValue(activity.title, locale)}
                                    </h3>
                                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-white/40 text-[10px] font-cinzel tracking-widest uppercase">
                                        <span>{getLocalizedValue(activity.location, locale) || t('defaultLocation')}</span>
                                        <span className="group-hover:text-[#c5a059] transition-colors">{t('readMore')}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/actividades" className="text-white/50 text-xs font-cinzel tracking-[0.2em] hover:text-[#c5a059] border-b border-white/10 pb-1 uppercase">
                        {t('viewAll')}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeActivities;
