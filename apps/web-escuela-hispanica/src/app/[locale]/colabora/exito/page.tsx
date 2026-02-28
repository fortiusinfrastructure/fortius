import { Link } from '@/i18n/routing';
import { Navbar, Footer } from '@/components/sections';
import { Heart, Medal, Crown, Check } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('Colabora.Success.Meta');
    return {
        title: t('title'),
        description: t('description'),
    };
}

const tierIcons = {
    amigo: Heart,
    academico: Medal,
    mecenas: Crown,
};

export default async function ExitoPage({
    searchParams,
}: {
    searchParams: Promise<{ tier?: string }>;
}) {
    const { tier: tierParam } = await searchParams;
    const tier = (tierParam as keyof typeof tierIcons) || 'amigo';
    const validTier = tierIcons[tier] ? tier : 'amigo';
    const Icon = tierIcons[validTier];

    const t = await getTranslations('Colabora.Success');

    return (
        <div className="flex flex-col min-h-screen bg-[#050a14] text-white">
            <Navbar />

            <main className="flex-grow pt-20 flex items-center justify-center px-4">
                <div className="max-w-lg text-center py-20">
                    {/* Success indicator */}
                    <div className="w-20 h-20 mx-auto mb-8 rounded-full border-2 border-[#c5a059]/40 flex items-center justify-center bg-[#c5a059]/5">
                        <Check className="w-10 h-10 text-[#c5a059]" />
                    </div>

                    {/* Tier icon */}
                    <div className="mb-6 text-[#c5a059]">
                        <Icon className="w-8 h-8 mx-auto stroke-1" />
                    </div>

                    <h1 className="font-serif text-4xl text-white mb-3">{t(`${validTier}.title`)}</h1>
                    <p className="font-cinzel text-[10px] tracking-[0.2em] text-[#c5a059] uppercase mb-8">
                        {t(`${validTier}.subtitle`)}
                    </p>

                    <p className="font-serif text-sm text-white/50 leading-relaxed mb-12 max-w-md mx-auto">
                        {t(`${validTier}.message`)}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="px-8 py-4 bg-[#c5a059] text-[#050a14] font-cinzel text-[10px] tracking-[0.2em] font-bold hover:bg-white transition-all duration-300"
                        >
                            {t('backHome')}
                        </Link>
                        <Link
                            href="/publicaciones"
                            className="px-8 py-4 border border-white/20 text-white font-cinzel text-[10px] tracking-[0.2em] hover:border-[#c5a059] hover:text-[#c5a059] transition-all duration-300"
                        >
                            {t('exploreContent')}
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
