import type { Metadata } from 'next';
import NosotrosClient from './NosotrosClient';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('Nosotros.Meta');
    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function NosotrosPage() {
    return <NosotrosClient />;
}
