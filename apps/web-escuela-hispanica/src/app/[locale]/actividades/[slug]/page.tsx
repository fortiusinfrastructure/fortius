import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar, Footer } from '@/components/sections';
import { activities, getActivityBySlug } from '@/lib/mock-data';
import { Calendar, MapPin, Building2, Phone, Mail, Globe, ArrowLeft, ChevronRight, Share2, ImageIcon } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getLocalizedValue } from '@/lib/i18n/localize';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { EventRegistrationForm } from '@/components/forms/EventRegistrationForm';
import { getTranslations } from 'next-intl/server';

interface Props {
    params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const activity = getActivityBySlug(slug);
    const t = await getTranslations('ActividadesSlug.Meta');
    if (!activity) return { title: t('notFound') };

    const title = getLocalizedValue(activity.title, locale);
    const excerpt = getLocalizedValue(activity.excerpt, locale);

    return {
        title: `${title} | Escuela Hispánica`,
        description: excerpt,
        openGraph: {
            title: title,
            description: excerpt,
            images: [activity.image],
        },
    };
}

export async function generateStaticParams() {
    return activities.map((activity) => ({
        slug: activity.slug,
    }));
}

export default async function ActivityPage({ params }: Props) {
    const { slug, locale } = await params;
    const activity = getActivityBySlug(slug);
    const t = await getTranslations('ActividadesSlug');

    if (!activity) {
        notFound();
    }

    const relatedActivities = activities
        .filter((a) => a.slug !== activity.slug)
        .slice(0, 3);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <ScrollProgress />

            <main className="flex-grow bg-[#050a14] pt-20 text-white selection:bg-[#c5a059]/30">

                {/* Hero */}
                <section className="relative py-32 md:py-48 px-4 overflow-hidden">
                    <div
                        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center bg-fixed transition-transform duration-[10s] scale-110"
                        style={{ backgroundImage: `url(${activity.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050a14]/60 via-[#050a14]/90 to-[#050a14] z-0" />

                    <div className="relative z-10 max-w-5xl mx-auto text-center">
                        <nav className="flex items-center justify-center gap-2 text-white/40 mb-12 font-cinzel text-[10px] tracking-[0.2em]">
                            <Link href="/" className="hover:text-[#c5a059] transition-colors">{t('Breadcrumb.home')}</Link>
                            <ChevronRight className="w-3 h-3 text-white/20" />
                            <Link href="/actividades" className="hover:text-[#c5a059] transition-colors">{t('Breadcrumb.activities')}</Link>
                            <ChevronRight className="w-3 h-3 text-[#c5a059]/40" />
                            <span className="text-[#c5a059]">{getLocalizedValue(activity.type, locale)?.toUpperCase() || 'EVENTO'}</span>
                        </nav>

                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-12 leading-[1.05] tracking-tight animate-fade-in px-4">
                            {getLocalizedValue(activity.title, locale)}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-y-6 gap-x-10 text-white/40 font-cinzel text-xs tracking-[0.25em]">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4 text-[#c5a059]/60" />
                                <span>
                                    {activity.date}
                                    {activity.endDate && ` — ${activity.endDate}`}
                                </span>
                            </div>
                            {activity.location && (
                                <>
                                    <div className="w-[1px] h-4 bg-white/10 hidden md:block" />
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-4 h-4 text-[#c5a059]/60" />
                                        <span>{getLocalizedValue(activity.location, locale)}</span>
                                    </div>
                                </>
                            )}
                            {activity.type && (
                                <>
                                    <div className="w-[1px] h-4 bg-white/10 hidden md:block" />
                                    <div className="flex items-center gap-3">
                                        <span className="text-[#c5a059] font-cinzel text-[10px] tracking-widest">{getLocalizedValue(activity.type, locale)?.toUpperCase() || 'EVENTO'}</span>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="mt-16 flex justify-center">
                            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent" />
                        </div>
                    </div>
                </section>

                {/* Content + Sidebar */}
                <section className="relative pt-12 pb-40 px-4">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_minmax(auto,800px)_280px] gap-0 lg:gap-12">

                        {/* Left Sidebar */}
                        <aside className="hidden lg:block relative">
                            <div className="sticky top-40 flex flex-col gap-8 items-end pr-8 text-white/20">
                                <p className="font-cinzel text-[9px] tracking-[0.4em] rotate-180 [writing-mode:vertical-lr] mb-4 uppercase">{t('Share')}</p>
                                <button className="hover:text-[#c5a059] transition-all hover:scale-110"><Share2 className="w-5 h-5" /></button>
                                <div className="w-[1px] h-20 bg-[#c5a059]/20" />
                            </div>
                        </aside>

                        {/* Main Content */}
                        <article className="relative">
                            <div
                                className="article-content px-6 md:px-0"
                                dangerouslySetInnerHTML={{ __html: getLocalizedValue(activity.content, locale) }}
                            />

                            {activity.gallery && activity.gallery.length > 0 && (
                                <div className="mt-24 mb-16">
                                    <div className="flex items-center gap-4 mb-12">
                                        <ImageIcon className="w-5 h-5 text-[#c5a059]/60" />
                                        <p className="text-[#c5a059] font-cinzel text-[10px] tracking-[0.4em] uppercase">{t('Gallery')}</p>
                                        <div className="h-[1px] flex-grow bg-white/5" />
                                    </div>
                                    <div className="space-y-12">
                                        {activity.gallery.map((img, i) => (
                                            <figure key={i} className="group">
                                                <div className="relative overflow-hidden border border-white/5 shadow-2xl shadow-black/30 transition-all duration-500 group-hover:border-[#c5a059]/20">
                                                    <img
                                                        src={img.src}
                                                        alt={getLocalizedValue(img.caption, locale)}
                                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                                    />
                                                </div>
                                                <figcaption className="mt-4 text-white/40 text-sm font-serif italic text-center leading-relaxed">
                                                    {getLocalizedValue(img.caption, locale)}
                                                </figcaption>
                                            </figure>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </article>

                        {/* Right Sidebar — Event Details Card */}
                        <aside className="hidden lg:block relative">
                            <div className="sticky top-40">
                                <div className="bg-[#0a111e] border border-white/5 p-8 space-y-8">
                                    <h3 className="font-cinzel text-[10px] tracking-[0.4em] text-[#c5a059] uppercase mb-6">{t('Details.title')}</h3>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <Calendar className="w-4 h-4 text-[#c5a059]/60 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-white/30 font-cinzel text-[9px] tracking-widest uppercase mb-1">{t('Details.date')}</p>
                                                <p className="text-white/80 text-sm font-light">
                                                    {activity.date}
                                                    {activity.endDate && (
                                                        <>
                                                            <br />
                                                            <span className="text-white/40">—</span> {activity.endDate}
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        {activity.location && (
                                            <div className="flex items-start gap-4">
                                                <MapPin className="w-4 h-4 text-[#c5a059]/60 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-white/30 font-cinzel text-[9px] tracking-widest uppercase mb-1">{t('Details.location')}</p>
                                                    <p className="text-white/80 text-sm font-light">{getLocalizedValue(activity.location, locale)}</p>
                                                </div>
                                            </div>
                                        )}

                                        {activity.organizer && (
                                            <div className="flex items-start gap-4">
                                                <Building2 className="w-4 h-4 text-[#c5a059]/60 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-white/30 font-cinzel text-[9px] tracking-widest uppercase mb-1">{t('Details.organizer')}</p>
                                                    <p className="text-white/80 text-sm font-light">{getLocalizedValue(activity.organizer, locale)}</p>
                                                </div>
                                            </div>
                                        )}

                                        {activity.phone && (
                                            <div className="flex items-start gap-4">
                                                <Phone className="w-4 h-4 text-[#c5a059]/60 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-white/30 font-cinzel text-[9px] tracking-widest uppercase mb-1">{t('Details.phone')}</p>
                                                    <p className="text-white/80 text-sm font-light">{activity.phone}</p>
                                                </div>
                                            </div>
                                        )}

                                        {activity.email && (
                                            <div className="flex items-start gap-4">
                                                <Mail className="w-4 h-4 text-[#c5a059]/60 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-white/30 font-cinzel text-[9px] tracking-widest uppercase mb-1">{t('Details.email')}</p>
                                                    <a href={`mailto:${activity.email}`} className="text-white/80 text-sm font-light hover:text-[#c5a059] transition-colors">{activity.email}</a>
                                                </div>
                                            </div>
                                        )}

                                        {activity.web && (
                                            <div className="flex items-start gap-4">
                                                <Globe className="w-4 h-4 text-[#c5a059]/60 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-white/30 font-cinzel text-[9px] tracking-widest uppercase mb-1">{t('Details.web')}</p>
                                                    <a
                                                        href={activity.web}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#c5a059]/80 text-sm font-light hover:text-[#c5a059] transition-colors break-all"
                                                    >
                                                        {new URL(activity.web).hostname}
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="w-full h-[1px] bg-white/5" />

                                    <Link
                                        href="/actividades"
                                        className="flex items-center gap-3 text-white/40 hover:text-[#c5a059] font-cinzel text-[10px] tracking-widest transition-all group"
                                    >
                                        <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                                        {t('Details.allActivities')}
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* Mobile Event Details */}
                <section className="lg:hidden px-4 -mt-24 mb-24">
                    <div className="max-w-2xl mx-auto bg-[#0a111e] border border-white/5 p-8">
                        <h3 className="font-cinzel text-[10px] tracking-[0.4em] text-[#c5a059] uppercase mb-6">{t('Details.title')}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <Calendar className="w-4 h-4 text-[#c5a059]/60 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-white/30 font-cinzel text-[9px] tracking-widest uppercase mb-1">{t('Details.date')}</p>
                                    <p className="text-white/80 text-sm font-light">
                                        {activity.date}{activity.endDate && ` — ${activity.endDate}`}
                                    </p>
                                </div>
                            </div>
                            {activity.location && (
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-4 h-4 text-[#c5a059]/60 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-white/30 font-cinzel text-[9px] tracking-widest uppercase mb-1">{t('Details.location')}</p>
                                        <p className="text-white/80 text-sm font-light">{getLocalizedValue(activity.location, locale)}</p>
                                    </div>
                                </div>
                            )}
                            {activity.organizer && (
                                <div className="flex items-start gap-4">
                                    <Building2 className="w-4 h-4 text-[#c5a059]/60 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-white/30 font-cinzel text-[9px] tracking-widest uppercase mb-1">{t('Details.organizer')}</p>
                                        <p className="text-white/80 text-sm font-light">{getLocalizedValue(activity.organizer, locale)}</p>
                                    </div>
                                </div>
                            )}
                            {activity.phone && (
                                <div className="flex items-start gap-4">
                                    <Phone className="w-4 h-4 text-[#c5a059]/60 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-white/30 font-cinzel text-[9px] tracking-widest uppercase mb-1">{t('Details.phone')}</p>
                                        <p className="text-white/80 text-sm font-light">{activity.phone}</p>
                                    </div>
                                </div>
                            )}
                            {activity.email && (
                                <div className="flex items-start gap-4">
                                    <Mail className="w-4 h-4 text-[#c5a059]/60 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-white/30 font-cinzel text-[9px] tracking-widest uppercase mb-1">{t('Details.email')}</p>
                                        <a href={`mailto:${activity.email}`} className="text-white/80 text-sm font-light hover:text-[#c5a059] transition-colors truncate block max-w-[150px] sm:max-w-none">{activity.email}</a>
                                    </div>
                                </div>
                            )}
                            {activity.web && (
                                <div className="flex items-start gap-4">
                                    <Globe className="w-4 h-4 text-[#c5a059]/60 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-white/30 font-cinzel text-[9px] tracking-widest uppercase mb-1">{t('Details.web')}</p>
                                        <a href={activity.web} target="_blank" rel="noopener noreferrer" className="text-[#c5a059]/80 text-sm font-light hover:text-[#c5a059] transition-colors">
                                            {new URL(activity.web).hostname}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Event Registration Section */}
                {activity.isUpcoming && (
                    <section className="py-24 px-4 bg-[#0a111e] border-t border-white/5">
                        <div className="max-w-4xl mx-auto">
                            <EventRegistrationForm eventName={getLocalizedValue(activity.title, locale)} eventId={activity.id.toString()} />
                        </div>
                    </section>
                )}

                {/* Related Activities */}
                {relatedActivities.length > 0 && (
                    <section className="py-40 px-4 bg-black/40 border-t border-white/5">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                                <div className="max-w-2xl">
                                    <p className="text-[#c5a059] font-cinzel text-[10px] tracking-[0.5em] mb-6 uppercase">{t('Related.label')}</p>
                                    <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">{t('Related.title')}</h3>
                                </div>
                                <Link
                                    href="/actividades"
                                    className="group inline-flex items-center gap-3 text-white/40 hover:text-[#c5a059] font-cinzel text-[11px] tracking-widest transition-all pb-2 border-b border-white/10 hover:border-[#c5a059]"
                                >
                                    {t('Related.viewAll')}
                                    <ArrowLeft className="w-3 h-3 rotate-180 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                                {relatedActivities.map((rel) => (
                                    <Link key={rel.id} href={`/actividades/${rel.slug}`} className="group block">
                                        <div className="aspect-[16/10] overflow-hidden mb-8 relative border border-white/5 bg-[#0a111e]">
                                            <img
                                                src={rel.image}
                                                alt={getLocalizedValue(rel.title, locale)}
                                                className="w-full h-full object-cover grayscale transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                            />
                                            <div className="absolute inset-0 bg-[#050a14]/60 group-hover:bg-transparent transition-colors duration-700" />
                                            <div className="absolute top-4 left-4 bg-[#050a14]/80 px-3 py-1 font-cinzel text-[10px] text-[#c5a059] border border-[#c5a059]/20">
                                                {getLocalizedValue(rel.type, locale) || 'EVENTO'}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-[#c5a059] font-cinzel text-[9px] tracking-widest uppercase">{rel.date}</span>
                                            <div className="h-[1px] flex-grow bg-white/5" />
                                        </div>
                                        <h4 className="font-serif text-2xl text-white/90 group-hover:text-[#c5a059] transition-colors leading-[1.3] tracking-tight">
                                            {getLocalizedValue(rel.title, locale)}
                                        </h4>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

            </main>
            <Footer />
        </div>
    );
}
