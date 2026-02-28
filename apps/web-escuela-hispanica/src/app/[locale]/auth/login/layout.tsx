import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('Auth.Meta');
    return {
        title: t('loginTitle'),
    };
}

export default function AuthLoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
