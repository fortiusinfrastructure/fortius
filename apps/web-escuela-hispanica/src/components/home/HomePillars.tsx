import React from 'react';
import { useTranslations } from 'next-intl';

const HomePillars: React.FC = () => {
    const t = useTranslations('Home.Pillars');

    const pillars = [
        {
            id: 1,
            number: 'I',
            titleKey: 'pillar1Title' as const,
            descKey: 'pillar1Desc' as const,
            // Classical manuscript / library / scholastic codex
            image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800',
        },
        {
            id: 2,
            number: 'II',
            titleKey: 'pillar2Title' as const,
            descKey: 'pillar2Desc' as const,
            // Antique world map / Atlantic cartography
            image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800',
        },
        {
            id: 3,
            number: 'III',
            titleKey: 'pillar3Title' as const,
            descKey: 'pillar3Desc' as const,
            // Historical parliament / civic assembly / old hall
            image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=800',
        }
    ];

    return (
        <section className="py-24 px-4 bg-[#050a14]">
            <div className="max-w-6xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-[#c5a059] font-cinzel text-xl md:text-2xl tracking-[0.3em] uppercase">{t('sectionTitle')}</h2>
                    <div className="w-16 h-[1px] bg-[#c5a059] mx-auto mt-6 opacity-50" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {pillars.map(pillar => (
                        <div key={pillar.id} className="group flex flex-col text-center">
                            {/* Roman Numeral */}
                            <span className="font-cinzel text-4xl md:text-5xl text-[#c5a059] mb-6 tracking-widest">
                                {pillar.number}
                            </span>

                            {/* Image in Rectangle with Border */}
                            <div className="relative aspect-[4/3] overflow-hidden border border-[#c5a059]/30 mb-8 mx-4">
                                <img
                                    src={pillar.image}
                                    alt={t(pillar.titleKey)}
                                    className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="text-white font-cinzel text-sm md:text-base mb-4 leading-relaxed tracking-[0.15em] uppercase px-4">
                                {t(pillar.titleKey)}
                            </h3>

                            {/* Description */}
                            <p className="text-white/55 font-light text-[0.8rem] leading-[1.75] px-4 text-left">
                                {t(pillar.descKey)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomePillars;
