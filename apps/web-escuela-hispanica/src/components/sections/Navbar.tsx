'use client';

import React, { useEffect, useState } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { createBrowserClient } from '@fortius/database/src/client/browser';
import { signOut } from '@/lib/auth/actions';
import type { User } from '@supabase/supabase-js';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Navigation');

  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createBrowserClient();

    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/nosotros' },
    { name: t('publications'), href: '/publicaciones' },
    { name: t('activities'), href: '/actividades' },
    { name: t('projects'), href: '/proyectos' },
    { name: t('collaborate'), href: '/colabora' },
    { name: t('contact'), href: '/contacto' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname !== '/') return false;
    return pathname.startsWith(href);
  };

  async function handleSignOut() {
    setMenuOpen(false);
    await signOut();
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050a14]/90 backdrop-blur-md border-b border-white/10 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-1 flex flex-col items-center gap-2 relative">
        {/* Top-right controls: Language Switcher + Auth */}
        <div className="absolute right-4 top-4 flex items-center gap-4">
          <LanguageSwitcher />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 text-white/60 hover:text-[#c5a059] transition-colors"
                aria-label="User menu"
              >
                <UserIcon className="w-4 h-4" />
                <span className="hidden md:inline font-cinzel text-[9px] tracking-[0.1em] uppercase">
                  {user.user_metadata?.full_name?.split(' ')[0] || 'Mi cuenta'}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-8 mt-2 w-48 bg-[#0a111e] border border-white/10 shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-white/5">
                    <p className="font-serif text-xs text-white/80 truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left font-cinzel text-[9px] tracking-[0.1em] text-white/50 hover:text-red-400 hover:bg-white/5 transition-colors uppercase"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-2 text-white/50 hover:text-[#c5a059] transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden md:inline font-cinzel text-[9px] tracking-[0.1em] uppercase">
                Acceder
              </span>
            </Link>
          )}
        </div>

        <Link href="/" className="text-center cursor-pointer transition-opacity hover:opacity-80">
          <img
            src="/recursos/logo.svg"
            alt="Escuela Hispánica Logo"
            className="h-24 md:h-32 w-auto"
          />
        </Link>

        <nav className="hidden xl:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[10px] font-cinzel tracking-[0.15em] transition-all duration-300 ${isActive(link.href)
                ? 'gold-text border-b border-[#c5a059] pb-1'
                : 'text-white/70 hover:text-white'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <div className="xl:hidden">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[9px] font-cinzel tracking-wider text-white/70 hover:text-[#c5a059]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
