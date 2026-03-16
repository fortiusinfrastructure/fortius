import type { Metadata } from 'next';
import { Navbar, Footer } from '@/components/sections';
import { getProjectBySlug } from '@/lib/mock-data';
import { getLocalizedValue } from '@/lib/i18n/localize';
import { getTranslations } from 'next-intl/server';
import { METADATA_BASE } from '@/lib/seo/metadata';

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Proyectos.Instituto' });
    return {
        metadataBase: METADATA_BASE,
        title: t('title'),
        description: t('description'),
    };
}

export default async function InstitutoPensamientoIbericoPage({ params }: Props) {
    const { locale } = await params;
    const project = getProjectBySlug('instituto-pensamiento-iberico');
    const t = await getTranslations({ locale, namespace: 'Proyectos.Instituto' });

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#050a14]">
            <Navbar />

            <main className="flex-grow pt-20">
                {/* Hero Section */}
                <section className="relative py-32 md:py-48 px-4 text-center border-b border-white/5 overflow-hidden">
                    <div
                        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
                        style={{ backgroundImage: "url('/images/proyectos/hero-bg.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-[#050a14]/90 z-0" />
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <span className="gold-text font-cinzel text-xs tracking-[0.3em] mb-4 block uppercase font-bold">
                            {t('tag')}
                        </span>
                        <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 tracking-tight">
                            {getLocalizedValue(project.title, locale)}
                        </h1>
                        <div className="w-24 h-[1px] bg-[#c5a059] mx-auto mb-8" />
                        <p className="text-white/60 font-light max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
                            {getLocalizedValue(project.description, locale)}
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-24 px-4 max-w-4xl mx-auto">
                    <div className="prose prose-invert max-w-none">
                        <div className="text-white/60 font-serif text-sm leading-[1.9] tracking-wide whitespace-pre-line">
                            {t('content')}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
