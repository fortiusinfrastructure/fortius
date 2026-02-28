import type { Metadata } from 'next';
import { Navbar, Footer, ContactForm } from '@/components/sections';
import { Mail, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('Contacto.Meta');
    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function ContactoPage() {
    const t = await getTranslations('Contacto');

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-[#050a14] pt-20 animate-fade-in text-white">
                {/* Hero */}
                <section className="relative py-32 md:py-48 px-4 text-center border-b border-white/5 overflow-hidden">
                    <div
                        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&q=80&w=2000')" }}
                    />
                    <div className="absolute inset-0 bg-[#050a14]/90 z-0" />
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <p className="gold-text font-cinzel tracking-[0.3em] text-xs mb-4 uppercase">{t('Hero.label')}</p>
                        <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 tracking-tight">{t('Hero.title')}</h1>
                        <div className="w-24 h-[1px] bg-[#c5a059] mx-auto mb-8" />
                        <p className="text-white/60 font-light max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
                            {t('Hero.description')}
                        </p>
                    </div>
                </section>

                <section className="py-24 px-4">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="font-cinzel text-xl tracking-wider mb-8 gold-text">{t('Info.title')}</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <Mail className="w-5 h-5 text-[#c5a059] mt-1" />
                                        <div>
                                            <p className="font-cinzel text-[9px] tracking-[0.2em] text-white/40 uppercase mb-1">{t('Info.emailLabel')}</p>
                                            <a href="mailto:info@escuelahispanica.org" className="text-white/80 text-sm hover:text-[#c5a059] transition-colors font-serif">
                                                info@escuelahispanica.org
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <MapPin className="w-5 h-5 text-[#c5a059] mt-1" />
                                        <div>
                                            <p className="font-cinzel text-[9px] tracking-[0.2em] text-white/40 uppercase mb-1">{t('Info.addressLabel')}</p>
                                            <p className="text-white/80 text-sm font-serif leading-relaxed">Calle Zurbano 71, Oficina 9<br />28010, Madrid, España</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="relative">
                            <ContactForm />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
