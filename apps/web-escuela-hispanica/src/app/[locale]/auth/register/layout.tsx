import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Auth.Meta' });
    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.escuelahispanica.org'),
        title: t('registerTitle'),
    };
}

export default function AuthRegisterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
