'use client';

import { useState, useTransition } from 'react';
import { Menu, X, Globe, Search } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';

type NavItem = {
  key: 'home' | 'about' | 'events' | 'research' | 'contact' | 'dialogue';
  path: string;
  external?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/nosotros' },
  { key: 'events', path: '/eventos' },
  { key: 'research', path: '/investigacion' },
  { key: 'contact', path: '/contacto' },
  { key: 'dialogue', path: 'https://mediterraneandialogue.org/', external: true },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const toggleLanguage = () => {
    const next = locale === 'es' ? 'en' : 'es';
    startTransition(() => router.replace(pathname, { locale: next }));
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b hairline">
      <div className="page-shell">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ieam-logo-new.png" alt="IEAM Logo" className="h-10 w-auto object-contain" />
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <a
                  key={item.key}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-1 pt-1 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-200 text-slate-500 hover:text-[var(--color-text-primary)]"
                >
                  {t(item.key)}
                </a>
              ) : (
                <Link
                  key={item.key}
                  href={item.path}
                  className={`inline-flex items-center px-1 pt-1 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-[var(--color-text-primary)] border-b-2 border-[var(--color-text-primary)]'
                      : 'text-slate-500 hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ),
            )}
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex lg:items-center lg:space-x-5">
            <button
              type="button"
              aria-label="Buscar"
              className="text-slate-400 hover:text-[var(--color-text-primary)] transition-colors cursor-not-allowed"
              title="Búsqueda en desarrollo"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={toggleLanguage}
              disabled={isPending}
              className="flex items-center text-slate-600 hover:text-[var(--color-text-primary)] transition-colors"
            >
              <Globe className="w-4 h-4 mr-1" />
              <span className="text-[11px] font-bold tracking-[0.18em]">{locale.toUpperCase()}</span>
            </button>
            <Link
              href="/colabora"
              className="inline-flex items-center px-6 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white bg-[var(--color-navy-900)] hover:bg-[var(--color-mediterranean)] transition-colors shadow-sm rounded-none"
            >
              {t('collaborate')}
            </Link>
          </div>

          {/* Mobile trigger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              aria-label="Buscar"
              className="p-2 mr-2 text-slate-400 hover:text-slate-700 cursor-not-allowed"
              title="Búsqueda en desarrollo"
            >
              <Search className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t hairline">
          <div className="pt-2 pb-3 space-y-1">
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <a
                  key={item.key}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block pl-4 pr-4 py-2 border-l-4 text-sm font-medium border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800"
                >
                  {t(item.key)}
                </a>
              ) : (
                <Link
                  key={item.key}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block pl-4 pr-4 py-2 border-l-4 text-sm font-medium ${
                    isActive(item.path)
                      ? 'bg-slate-50 border-[var(--color-text-primary)] text-[var(--color-text-primary)]'
                      : 'border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ),
            )}
            <div className="pt-4 pb-4 border-t hairline">
              <div className="flex items-center px-4 space-x-4">
                <button
                  type="button"
                  onClick={() => { toggleLanguage(); setIsOpen(false); }}
                  disabled={isPending}
                  className="flex items-center text-slate-600"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  {locale.toUpperCase()}
                </button>
                <Link
                  href="/colabora"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2 text-sm font-bold tracking-[0.18em] text-white bg-[var(--color-navy-900)] hover:bg-[var(--color-mediterranean)]"
                >
                  {t('collaborate')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
