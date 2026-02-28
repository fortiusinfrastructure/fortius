import React from 'react';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const HomeProject: React.FC = () => {
    const t = useTranslations('Home.Project');

    return (
        <section className="py-24 md:py-32 px-4 bg-[#050a14]">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                {/* Image Left with animated border */}
                <div className="relative group">
                    {/* Animated outer border - moves on hover */}
                    <div className="absolute -top-3 -left-3 w-full h-full border border-[#c5a059]/50 z-0 transition-all duration-500 ease-out group-hover:-top-5 group-hover:-left-5" />

                    {/* Image container */}
                    <div className="relative z-10 aspect-[4/3] overflow-hidden bg-[#0a111e]">
                        <img
                            src="/images/proyecto-1776.jpg"
                            alt={t('imageAlt')}
                            className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
                        />
                    </div>
                </div>

                {/* Text Right */}
                <div className="text-left">
                    <p className="text-[#c5a059] font-cinzel text-[10px] tracking-[0.3em] mb-6 uppercase">
                        {t('tag')}
                    </p>

                    <h2 className="text-white font-serif text-4xl md:text-5xl mb-6 leading-tight">
                        {t('title')} <span className="text-[#c5a059] italic">1776</span>
                    </h2>

                    <div className="w-16 h-[1px] bg-[#c5a059] mb-8" />

                    <p className="text-white/70 font-light text-base leading-relaxed mb-10">
                        {t('paragraph')}
                    </p>

                    <Link
                        href="/proyectos/1776"
                        className="inline-flex items-center gap-3 text-white font-cinzel text-xs tracking-[0.2em] hover:text-[#c5a059] transition-colors uppercase group/link"
                    >
                        {t('button')}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeProject;
