import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A2540] text-white pt-16 pb-8">
      <div className="page-shell">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Explore & Navigation */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-6 text-[#006994]">{t('footer.sections.explore')}</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-slate-300 hover:text-white transition-colors">{t('navigation.home')}</Link></li>
              <li><Link href="/nosotros" className="text-slate-300 hover:text-white transition-colors">{t('navigation.about')}</Link></li>
              <li><Link href="/eventos" className="text-slate-300 hover:text-white transition-colors">{t('navigation.events')}</Link></li>
              <li><Link href="/investigacion" className="text-slate-300 hover:text-white transition-colors">{t('navigation.research')}</Link></li>
              <li>
                <a href="https://mediterraneandialogue.org/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                  {t('navigation.dialogue')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2–4: Contact & Social */}
          <div className="md:col-span-1 lg:col-start-3 lg:col-span-2">
            <div className="mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ieam-logo-new.png" alt="IEAM Logo" className="h-32 w-auto mb-6 brightness-0 invert opacity-90" />
              <p className="text-slate-300 text-sm leading-relaxed mb-6">{t('footer.contact_info')}</p>
            </div>

            <div className="flex space-x-4 mb-6">
              <a href="https://x.com/ieamigratorio" target="_blank" rel="noopener noreferrer" aria-label="X" className="bg-[#1e4976] p-2 rounded-full hover:bg-[#006994] transition-colors group">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current text-white group-hover:text-white">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/ieamigratorio" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-[#1e4976] p-2 rounded-full hover:bg-[#006994] transition-colors group">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current text-white group-hover:text-white">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/ieamigratorio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-[#1e4976] p-2 rounded-full hover:bg-[#006994] transition-colors group">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current text-white group-hover:text-white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 1.8a4.363 4.363 0 1 1 0 8.726 4.363 4.363 0 0 1 0-8.726zm6.406-1.138a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>

            <div className="pt-6 border-t border-[#1e4976]">
              <h4 className="text-sm font-bold mb-2">{t('footer.sections.contact')}</h4>
              <p className="text-sm text-slate-400 mb-2">
                <Link href="/contacto" className="hover:text-white transition-colors">{t('navigation.contact')}</Link>
              </p>
              <p className="text-sm text-slate-400 mb-2">
                <a href="mailto:info@ieam.es" className="hover:text-white transition-colors">info@ieam.es</a>
              </p>
              <p className="text-sm text-slate-400">{t('footer.location')}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1e4976] pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; {year} IEAM. {t('footer.rights')}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">{t('footer.legal.privacy')}</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">{t('footer.legal.cookies')}</Link>
            <Link href="/legal" className="hover:text-white transition-colors">{t('footer.legal.legal_notice')}</Link>
            <a href="mailto:info@ieam.es" className="hover:text-white transition-colors">{t('navigation.contact')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
