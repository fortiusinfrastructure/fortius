import type { Metadata } from 'next';
import NosotrosClient from './NosotrosClient';
import { getTranslations } from 'next-intl/server';
import { METADATA_BASE } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Nosotros.Meta' });
    return {
        metadataBase: METADATA_BASE,
        title: t('title'),
        description: t('description'),
    };
}

export default function NosotrosPage() {
    return <NosotrosClient />;
}
