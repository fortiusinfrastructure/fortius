'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const changeLocale = (nextLocale: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <div className="relative group flex items-center gap-1">
            <Globe className="w-4 h-4 text-brand-gold/70 group-hover:text-brand-gold transition-colors" />
            <select
                defaultValue={locale}
                disabled={isPending}
                onChange={(e) => changeLocale(e.target.value)}
                className="bg-transparent text-sm text-brand-gold/80 hover:text-brand-gold transition-colors cursor-pointer outline-none appearance-none font-sans"
            >
                <option value="es" className="bg-brand-dark text-brand-text">ES</option>
                <option value="en" className="bg-brand-dark text-brand-text">EN</option>
                <option value="pt" className="bg-brand-dark text-brand-text">PT</option>
            </select>
        </div>
    );
}
