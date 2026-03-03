import type { Metadata } from 'next';
import { Navbar, Footer } from '@/components/sections';
import { getTranslations } from 'next-intl/server';
import { BiographyTimeline } from '@/components/features/biographies/BiographyTimeline';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const p = await params;
    const t = await getTranslations({ locale: p.locale, namespace: 'Biografias.Meta' });
    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function BiografiasPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const p = await params;
    const t = await getTranslations({ locale: p.locale, namespace: 'Biografias' });

    return (
        <div className="flex flex-col min-h-screen bg-[#050a14]">
            <Navbar />
            <main className="flex-grow pt-32 pb-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-24 max-w-4xl mx-auto">
                        <span className="font-cinzel text-[10px] tracking-[0.4em] text-[#c5a059] mb-4 block uppercase">
                            Legado Intelectual
                        </span>
                        <h1 className="font-serif text-5xl md:text-7xl text-white mb-12">
                            {t('title')}
                        </h1>
                        <div className="w-24 h-[1px] bg-[#c5a059] mx-auto mb-12" />
                        
                        <div className="space-y-6 text-white/60 font-serif text-lg md:text-xl leading-relaxed font-light text-left">
                            <p>{t('intro.p1')}</p>
                            <p>{t('intro.p2')}</p>
                            <p>{t('intro.p3')}</p>
                            <p>{t('intro.p4')}</p>
                        </div>
                    </div>

                    <BiographyTimeline />
                </div>
            </main>
            <Footer />
        </div>
    );
}
