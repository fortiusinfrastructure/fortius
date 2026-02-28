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
            <p className="max-w-[150px]">{t('address.line1')}<br />{t('address.line2')}</p>
            <a href="mailto:info@escuelahispanica.org" className="hover:text-white transition-colors underline decoration-[#c5a059] block mt-4">
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
            <a href="https://linkedin.com/company/escuelahispanica" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/40 hover:text-[#c5a059] cursor-pointer transition-colors fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://x.com/escuelahispanica" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/40 hover:text-[#c5a059] cursor-pointer transition-colors fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
