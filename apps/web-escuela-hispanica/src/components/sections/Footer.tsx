import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');

  return (
    <footer id="contact" className="bg-[#03060c] py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:grid md:grid-cols-4 gap-12 items-start">
          <div className="space-y-4">
            <h2 className="font-cinzel text-xl tracking-[0.2em] font-light">
              ESCUELA <br /> HISPÁNICA
            </h2>
          </div>

          <div className="text-white/50 text-xs space-y-2">
            <a href="mailto:info@escuelahispanica.org" className="hover:text-white transition-colors block mt-4">
              info@escuelahispanica.org
            </a>
          </div>

          <div className="flex flex-wrap gap-4 text-[10px] tracking-widest font-cinzel text-white/70 uppercase w-full md:justify-end">
            <Link href="/aviso-legal" className="hover:text-[#c5a059] transition-colors">{t('links.legal')}</Link>
            <Link href="/politica-cookies" className="hover:text-[#c5a059] transition-colors">{t('links.cookies')}</Link>
            <Link href="/politica-privacidad" className="hover:text-[#c5a059] transition-colors">{t('links.privacy')}</Link>
            <Link href="/colabora" className="hover:text-[#c5a059] transition-colors">
              {tNav('collaborate')}
            </Link>
            <Link href="/contacto" className="hover:text-[#c5a059] transition-colors">
              {tNav('contact')}
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-white/30 tracking-[0.1em]">
            {t('copyright')}
          </p>

          <div className="flex gap-6">
            <a href="https://www.linkedin.com/company/escuelahispanica" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/40 hover:text-[#c5a059] cursor-pointer transition-colors fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://x.com/HispanicaE" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/40 hover:text-[#c5a059] cursor-pointer transition-colors fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@escuelahispanica" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/40 hover:text-[#c5a059] cursor-pointer transition-colors fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/escuela_hispanica/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/40 hover:text-[#c5a059] cursor-pointer transition-colors fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
