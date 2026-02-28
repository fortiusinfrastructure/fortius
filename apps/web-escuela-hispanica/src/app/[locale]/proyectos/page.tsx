import type { Metadata } from 'next';
import { Navbar, Footer } from '@/components/sections';
import { projects } from '@/lib/mock-data';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { getLocalizedValue } from '@/lib/i18n/localize';
import { getTranslations } from 'next-intl/server';

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const t = await getTranslations('Proyectos.Meta');
    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function ProyectosPage({ params }: Props) {
    const { locale } = await params;
    const activeProject = projects.find(p => p.id === '1776');
    const otherProjects = projects.filter(p => p.id !== '1776');
    const t = await getTranslations('Proyectos');

    return (
        <div className="flex flex-col min-h-screen bg-[#050a14]">
            <Navbar />

            <main className="flex-grow pt-20">

                {/* Hero Section */}
                <section className="relative py-32 md:py-48 px-4 text-center border-b border-white/5 overflow-hidden">
                    <div
                        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
                        style={{ backgroundImage: "url('/images/proyectos/hero-bg.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-[#050a14]/90 z-0" />

                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <span className="gold-text font-cinzel text-xs tracking-[0.3em] mb-4 block uppercase font-bold">
                            {t('Hero.tag')}
                        </span>
                        <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 tracking-tight">
                            {t('Hero.title')}
                        </h1>
                        <div className="w-24 h-[1px] bg-[#c5a059] mx-auto mb-8" />

                        <p className="text-white/60 font-light max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
                            {t('Hero.description')}
                        </p>
                    </div>
                </section>

                {/* Active Project Section */}
                <section className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-16 px-2">
                        <div className="w-[2px] h-8 bg-[#c5a059]" />
                        <h2 className="text-white font-serif text-2xl tracking-wide uppercase">
                            {t('ActiveProject.tag')}
                        </h2>
                    </div>

                    {activeProject && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#0a111e]/40 border border-white/5 overflow-hidden group hover:border-[#c5a059]/20 transition-all duration-500">
                            {/* Left: Image */}
                            <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                                <img
                                    src={activeProject.image}
                                    alt={getLocalizedValue(activeProject.title, locale)}
                                    className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute top-6 left-6 bg-[#c5a059] px-4 py-1.5 text-[#050a14] font-cinzel text-[10px] tracking-widest font-bold">
                                    {t('ActiveProject.status')}
                                </div>
                            </div>

                            {/* Right: Content */}
                            <div className="p-10 md:p-20 flex flex-col justify-center">
                                <span className="text-[#c5a059] font-cinzel text-[10px] tracking-[0.3em] mb-4 uppercase">
                                    {t('ActiveProject.label')}
                                </span>
                                <h3 className="text-white font-serif text-4xl md:text-5xl mb-6 tracking-tight group-hover:text-[#c5a059] transition-colors">
                                    {getLocalizedValue(activeProject.title, locale)}
                                </h3>

                                <p className="text-white/90 font-serif italic text-lg mb-8 leading-relaxed">
                                    {getLocalizedValue(activeProject.subtitle, locale)}
                                </p>

                                <div className="w-12 h-[1px] bg-[#c5a059] mb-8 opacity-40" />

                                <p className="text-white/60 font-serif text-base leading-relaxed mb-12 max-w-lg font-light">
                                    {getLocalizedValue(activeProject.description, locale)}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-6">
                                    <Link
                                        href={`/proyectos/${activeProject.slug}`}
                                        className="bg-[#c5a059] text-[#050a14] px-8 py-3.5 font-cinzel text-[10px] tracking-[0.2em] font-bold hover:bg-white transition-all text-center"
                                    >
                                        {t('ActiveProject.viewProject')}
                                    </Link>
                                    <Link
                                        href="/publicaciones"
                                        className="inline-flex items-center justify-center gap-3 border border-white/20 text-white px-8 py-3.5 font-cinzel text-[10px] tracking-[0.2em] hover:border-[#c5a059] hover:text-[#c5a059] transition-all"
                                    >
                                        {t('ActiveProject.explorePublications')}
                                        <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* Projects Archive Section */}
                <section className="py-32 px-4 bg-[#050a14] border-t border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-[#c5a059]/40 to-transparent" />

                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-serif text-3xl text-white mb-8 tracking-wide uppercase">
                            {t('Archive.title')}
                        </h2>
                        <p className="text-white/40 font-serif text-base leading-relaxed max-w-2xl mx-auto font-light">
                            {t('Archive.description')}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
                            {otherProjects.map(project => (
                                <Link key={project.id} href={`/proyectos/${project.slug}`} className="group block text-left">
                                    <div className="aspect-video overflow-hidden border border-white/5 mb-6 relative bg-[#0a111e]">
                                        <img
                                            src={project.image}
                                            alt={getLocalizedValue(project.title, locale)}
                                            className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-[#050a14]/60 group-hover:bg-transparent transition-all duration-700" />
                                        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 text-white/60 font-cinzel text-[9px] tracking-widest">
                                            {project.status.toUpperCase()}
                                        </div>
                                    </div>
                                    <h4 className="text-white font-serif text-xl mb-3 group-hover:text-[#c5a059] transition-colors">{getLocalizedValue(project.title, locale)}</h4>
                                    <p className="text-white/40 font-serif text-sm line-clamp-2 leading-relaxed">
                                        {getLocalizedValue(project.description, locale)}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="mt-40 flex justify-center">
                        <div className="w-[1px] h-32 bg-gradient-to-b from-[#c5a059]/40 to-transparent" />
                    </div>
                </section>

            </main>

            <Footer />
        </div >
    );
}
