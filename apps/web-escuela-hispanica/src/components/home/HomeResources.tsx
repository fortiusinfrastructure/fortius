import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const HomeResources: React.FC = () => {
    const t = useTranslations('Home.Resources');

    return (
        <section className="py-32 px-4 bg-[#050a14] text-center relative overflow-hidden flex flex-col items-center justify-center">
            {/* Top Vertical Line */}
            <div className="w-[1px] h-20 bg-[#c5a059] mb-12" />

            {/* Tag */}
            <p className="text-[#c5a059] font-cinzel text-xs tracking-[0.2em] mb-4 uppercase">
                {t('tag')}
            </p>

            {/* Title */}
            <h2 className="text-white font-serif text-4xl md:text-5xl mb-16 leading-tight">
                {t('title')}
            </h2>

            {/* Gold Border Content Box */}
            <div className="max-w-3xl mx-auto border border-[#c5a059]/40 px-8 md:px-16 py-12 relative">
                <p className="text-white/80 font-serif text-base md:text-lg leading-relaxed text-center mb-12">
                    {t('description')}
                </p>

                {/* Two CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                    <Link
                        href="/recursos"
                        className="inline-block border border-white/20 text-white px-10 py-4 font-cinzel text-[10px] tracking-[0.25em] hover:border-[#c5a059] hover:text-[#c5a059] transition-all uppercase w-full sm:w-auto text-center"
                    >
                        {t('exploreButton')}
                    </Link>

                    <Link
                        href="/recursos/biografias"
                        className="inline-flex flex-col items-center border border-[#c5a059]/50 text-[#c5a059] px-10 py-4 font-cinzel text-[10px] tracking-[0.25em] hover:bg-[#c5a059]/10 hover:border-[#c5a059] transition-all uppercase w-full sm:w-auto text-center"
                    >
                        <span>{t('biographiesButton')}</span>
                        <span className="text-white/40 text-[8px] tracking-[0.15em] mt-1.5 normal-case font-sans">
                            {t('biographiesSubtitle')}
                        </span>
                    </Link>
                </div>
            </div>

            {/* Bottom Vertical Line */}
            <div className="w-[1px] h-20 bg-[#c5a059] mt-12" />
        </section>
    );
};

export default HomeResources;
