import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const HomeManifesto: React.FC = () => {
    const t = useTranslations('Home.Manifesto');

    return (
        <section className="py-32 px-4 bg-[#050a14] text-center relative overflow-hidden flex flex-col items-center justify-center">
            {/* Top Vertical Line */}
            <div className="w-[1px] h-20 bg-[#c5a059] mb-12" />

            {/* Title */}
            <h2 className="text-[#c5a059] font-cinzel text-xl md:text-2xl tracking-[0.25em] mb-16 uppercase leading-relaxed">
                {t.rich('title', {
                    br: () => <br />
                })}
            </h2>

            {/* Gold Border Rectangle */}
            <div className="max-w-3xl mx-auto border border-[#c5a059]/40 px-8 md:px-16 py-12 relative">
                <p className="text-white/80 font-serif text-base md:text-lg leading-relaxed text-center">
                    <span className="float-left font-cinzel text-[#c5a059] text-6xl md:text-7xl leading-[0.8] mr-4 mt-1">
                        {t('paragraphDropCap')}
                    </span>
                    {t('paragraph')}
                </p>
            </div>

            <div className="mt-16">
                <Link
                    href="/nosotros"
                    className="text-[10px] font-cinzel tracking-[0.25em] text-[#c5a059] border-b border-[#c5a059]/50 pb-2 hover:text-white hover:border-white transition-all uppercase"
                >
                    {t('button')}
                </Link>
            </div>

            {/* Bottom Vertical Line */}
            <div className="w-[1px] h-20 bg-[#c5a059] mt-16" />
        </section>
    );
};

export default HomeManifesto;
