import type { Metadata } from 'next';
import { Navbar, Footer } from '@/components/sections';
import ResourcesContent from '@/components/resources/ResourcesContent';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('Recursos.Meta');
    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function RecursosPage() {
    const t = await getTranslations('Recursos');

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
                        <p className="text-white/60 font-light max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
                            {t('Hero.description')}
                        </p>
                    </div>
                </section>

                {/* Content */}
                <ResourcesContent />
            </main>
            <Footer />
        </>
    );
}
