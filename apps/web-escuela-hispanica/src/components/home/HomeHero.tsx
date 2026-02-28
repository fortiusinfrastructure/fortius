import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const HomeHero: React.FC = () => {
    const t = useTranslations('Home.Hero');

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background with library shelves */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000')"
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#050a14]/70 via-[#050a14]/60 to-[#050a14] z-10" />
            </div>

            <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-0">
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-10 leading-[1.1] tracking-tight animate-fade-in shadow-black drop-shadow-2xl">
                    <span className="block text-xl md:text-2xl font-cinzel mb-6 tracking-[0.3em] text-white/90 font-light uppercase border-b border-[#c5a059]/30 pb-4 mx-auto w-fit">
                        {t('subtitle')}
                    </span>
                    {t('title')}
                    <br />
                    <span className="italic text-[#c5a059] font-serif">{t('highlight')}</span>
                </h1>

                <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in mt-14">
                    <Link
                        href="/proyectos"
                        className="border border-[#c5a059] text-[#c5a059] px-10 py-4 font-cinzel text-xs tracking-[0.2em] hover:bg-[#c5a059] hover:text-[#050a14] transition-all duration-500 uppercase"
                    >
                        {t('buttons.projects')}
                    </Link>
                    <Link
                        href="/publicaciones"
                        className="bg-[#c5a059] text-[#050a14] px-10 py-4 font-cinzel text-xs tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] uppercase"
                    >
                        {t('buttons.explore')}
                    </Link>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20">
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#c5a059] to-transparent" />
            </div>
        </section>
    );
};

export default HomeHero;
