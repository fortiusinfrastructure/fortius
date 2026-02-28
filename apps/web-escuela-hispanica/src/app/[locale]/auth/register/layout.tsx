import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('Auth.Meta');
    return {
        title: t('registerTitle'),
    };
}

export default function AuthRegisterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
