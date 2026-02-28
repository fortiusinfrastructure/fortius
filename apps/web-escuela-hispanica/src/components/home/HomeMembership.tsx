import React from 'react';
import { Link } from '@/i18n/routing';
import { Heart, Award, Crown } from 'lucide-react';
import { useTranslations } from 'next-intl';

const HomeMembership: React.FC = () => {
    const t = useTranslations('Home.Membership');

    return (
        <section className="py-32 px-4 bg-[#050a14] relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <p className="text-[#c5a059] font-cinzel text-xs tracking-[0.3em] mb-6 uppercase">{t('tag')}</p>
                <h2 className="text-white font-serif text-3xl md:text-4xl mb-8 leading-tight uppercase tracking-wide">
                    {t.rich('title', {
                        br: () => <br />
                    })}
                </h2>
                <p className="text-white/60 font-light text-sm max-w-2xl mx-auto leading-relaxed">
                    {t('description')}
                </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Amigo */}
                <div className="border border-[#c5a059]/30 p-10 text-center hover:border-[#c5a059] transition-all group flex flex-col">
                    <div className="mb-6 text-[#c5a059]/60 group-hover:text-[#c5a059] transition-colors flex justify-center">
                        <Heart strokeWidth={1} className="w-8 h-8" />
                    </div>
                    <h3 className="font-cinzel text-base text-white mb-6 tracking-[0.2em] uppercase">{t('tiers.amigo.title')}</h3>
                    <div className="w-8 h-[1px] bg-[#c5a059]/30 mx-auto mb-6" />
                    <p className="text-white/50 text-xs leading-relaxed flex-grow">
                        {t('tiers.amigo.desc')}
                    </p>
                </div>

                {/* Miembro - Highlighted */}
                <div className="border border-[#c5a059] p-10 text-center group flex flex-col relative bg-[#111111]">
                    <div className="mb-6 text-[#c5a059] flex justify-center">
                        <Award strokeWidth={1} className="w-8 h-8" />
                    </div>
                    <h3 className="font-cinzel text-base text-white mb-6 tracking-[0.2em] uppercase">{t('tiers.miembro.title')}</h3>
                    <div className="w-8 h-[1px] bg-[#c5a059] mx-auto mb-6" />
                    <p className="text-white/60 text-xs leading-relaxed flex-grow">
                        {t('tiers.miembro.desc')}
                    </p>
                </div>

                {/* Mecenas */}
                <div className="border border-[#c5a059]/30 p-10 text-center hover:border-[#c5a059] transition-all group flex flex-col">
                    <div className="mb-6 text-[#c5a059]/60 group-hover:text-[#c5a059] transition-colors flex justify-center">
                        <Crown strokeWidth={1} className="w-8 h-8" />
                    </div>
                    <h3 className="font-cinzel text-base text-white mb-6 tracking-[0.2em] uppercase">{t('tiers.mecenas.title')}</h3>
                    <div className="w-8 h-[1px] bg-[#c5a059]/30 mx-auto mb-6" />
                    <p className="text-white/50 text-xs leading-relaxed flex-grow">
                        {t('tiers.mecenas.desc')}
                    </p>
                </div>
            </div>

            <div className="mt-16 text-center">
                <Link
                    href="/colabora"
                    className="inline-block bg-[#c5a059] text-[#050a14] px-12 py-4 font-cinzel text-xs tracking-[0.2em] hover:bg-white transition-all uppercase"
                >
                    {t('button')}
                </Link>
            </div>
        </section>
    );
};

export default HomeMembership;
