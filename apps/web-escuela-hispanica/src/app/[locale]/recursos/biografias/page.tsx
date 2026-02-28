import type { Metadata } from 'next';
import { Navbar, Footer } from '@/components/sections';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('Biografias.Meta');
    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function BiografiasPage() {
    const t = await getTranslations('Biografias');

    return (
        <>
            <Navbar />
            <main className="flex-grow bg-[#050a14] min-h-screen pt-32 pb-24 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="font-serif text-4xl text-white mb-6">{t('title')}</h1>
                    <div className="w-24 h-[1px] bg-[#c5a059] mx-auto mb-8" />
                    <p className="text-white/60 font-light mb-16">
                        {t('placeholder')}
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
}
