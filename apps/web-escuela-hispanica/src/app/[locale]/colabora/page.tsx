'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Navbar, Footer } from '@/components/sections';
import { membershipPlans } from '@/lib/mock-data';
import { Heart, Medal, Crown, Check, X, ShieldCheck, Loader2, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getLocalizedValue } from '@/lib/i18n/localize';
import { createBrowserClient } from '@fortius/database/src/client/browser';

const tierIcons = {
    amigo: Heart,
    academico: Medal,
    mecenas: Crown,
};

// ─── Amigo Modal ───────────────────────────────────────────
function AmigoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const t = useTranslations('Colabora.Modal.amigo');
    const [amount, setAmount] = useState('');
    const [mode, setMode] = useState<'payment' | 'subscription'>('payment');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        const cents = Math.round(parseFloat(amount) * 100);
        if (isNaN(cents) || cents < 100) {
            setError(t('errorMin'));
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/checkout/amigo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: cents, mode }),
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                setError(data.error || t('errorPayment'));
            }
        } catch {
            setError(t('errorConnection'));
        } finally {
            setLoading(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4" onClick={onClose}>
            <div className="bg-[#0a111e] border border-white/10 p-10 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-serif text-2xl text-white mb-2">{t('title')}</h3>
                <p className="font-serif text-xs text-white/40 mb-8 italic">{t('subtitle')}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-cinzel text-[9px] tracking-[0.2em] text-white/50 uppercase mb-2">
                            {t('amountLabel')}
                        </label>
                        <input
                            type="number"
                            min="1"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="10.00"
                            className="w-full bg-transparent border border-white/10 px-4 py-3 text-white font-serif focus:border-[#c5a059] focus:outline-none transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-cinzel text-[9px] tracking-[0.2em] text-white/50 uppercase mb-3">
                            {t('modeLabel')}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { value: 'payment' as const, label: t('modeOnce') },
                                { value: 'subscription' as const, label: t('modeMonthly') },
                            ].map(opt => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setMode(opt.value)}
                                    className={`py-3 font-cinzel text-[9px] tracking-[0.15em] transition-all ${mode === opt.value
                                        ? 'border-[#c5a059] bg-[#c5a059]/10 text-[#c5a059] border'
                                        : 'border border-white/10 text-white/40 hover:border-white/20'
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-xs font-serif">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[#c5a059] text-[#050a14] font-cinzel text-[10px] tracking-[0.2em] font-bold hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        {loading ? t('submitting') : t('submit')}
                    </button>
                </form>

                <button
                    onClick={onClose}
                    className="mt-6 w-full text-center font-cinzel text-[9px] tracking-[0.15em] text-white/30 hover:text-white/60 transition-colors"
                >
                    {t('cancel')}
                </button>
            </div>
        </div>
    );
}

// ─── Académico Modal ───────────────────────────────────────
function AcademicoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const t = useTranslations('Colabora.Modal.academico');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [motivation, setMotivation] = useState('');
    const [cv, setCv] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Pre-fill user data if logged in
    useEffect(() => {
        if (isOpen) {
            const supabase = createBrowserClient();
            supabase.auth.getUser().then(({ data: { user } }) => {
                if (user) {
                    setName(user.user_metadata?.full_name || '');
                    setEmail(user.email || '');
                }
            });
        }
    }, [isOpen]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('motivation', motivation);
            if (cv) formData.append('cv', cv);

            const res = await fetch('/api/postulacion/academico', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSuccess(true);
            } else {
                setError(data.error || t('errorSubmit'));
            }
        } catch {
            setError(t('errorConnection'));
        } finally {
            setLoading(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4" onClick={onClose}>
            <div className="bg-[#0a111e] border border-white/10 p-10 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                {success ? (
                    <div className="text-center py-8">
                        <Check className="w-12 h-12 text-[#c5a059] mx-auto mb-6" />
                        <h3 className="font-serif text-2xl text-white mb-3">{t('successTitle')}</h3>
                        <p className="font-serif text-sm text-white/50 leading-relaxed">
                            {t('successMessage')}
                        </p>
                        <button
                            onClick={onClose}
                            className="mt-8 px-8 py-3 border border-white/20 font-cinzel text-[9px] tracking-[0.2em] text-white hover:border-[#c5a059] hover:text-[#c5a059] transition-all"
                        >
                            {t('close')}
                        </button>
                    </div>
                ) : (
                    <>
                        <h3 className="font-serif text-2xl text-white mb-2">{t('title')}</h3>
                        <p className="font-serif text-xs text-white/40 mb-8 italic">
                            {t('subtitle')}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block font-cinzel text-[9px] tracking-[0.2em] text-white/50 uppercase mb-2">
                                        {t('nameLabel')}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={t('namePlaceholder')}
                                        className="w-full bg-transparent border border-white/10 px-4 py-3 text-white font-serif text-sm focus:border-[#c5a059] focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block font-cinzel text-[9px] tracking-[0.2em] text-white/50 uppercase mb-2">
                                        {t('emailLabel')}
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t('emailPlaceholder')}
                                        className="w-full bg-transparent border border-white/10 px-4 py-3 text-white font-serif text-sm focus:border-[#c5a059] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-cinzel text-[9px] tracking-[0.2em] text-white/50 uppercase mb-2">
                                    {t('motivationLabel')}
                                </label>
                                <textarea
                                    value={motivation}
                                    onChange={(e) => setMotivation(e.target.value)}
                                    rows={4}
                                    required
                                    placeholder={t('motivationPlaceholder')}
                                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-white font-serif text-sm focus:border-[#c5a059] focus:outline-none transition-colors resize-none"
                                />
                            </div>

                            <div>
                                <label className="block font-cinzel text-[9px] tracking-[0.2em] text-white/50 uppercase mb-2">
                                    {t('cvLabel')}
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setCv(e.target.files?.[0] || null)}
                                    className="w-full text-white/50 text-xs file:mr-4 file:py-2 file:px-4 file:border file:border-white/10 file:bg-transparent file:text-white/60 file:font-cinzel file:text-[9px] file:tracking-[0.15em] file:cursor-pointer hover:file:border-[#c5a059]"
                                />
                            </div>

                            {error && <p className="text-red-400 text-xs font-serif">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-[#c5a059] text-[#050a14] font-cinzel text-[10px] tracking-[0.2em] font-bold hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                {loading ? t('submitting') : t('submit')}
                            </button>
                        </form>

                        <button
                            onClick={onClose}
                            className="mt-6 w-full text-center font-cinzel text-[9px] tracking-[0.15em] text-white/30 hover:text-white/60 transition-colors"
                        >
                            {t('cancel')}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

// ─── Main Page ─────────────────────────────────────────────
export default function ColaboraPage() {
    const t = useTranslations('Colabora');
    const params = useParams();
    const locale = (params?.locale as string) || 'es';
    const router = useRouter();
    const [amigoOpen, setAmigoOpen] = useState(false);
    const [academicoOpen, setAcademicoOpen] = useState(false);
    const [mecenasLoading, setMecenasLoading] = useState(false);

    const comparisonData = [
        { key: 'newsletters', amigo: true, academico: true, mecenas: true },
        { key: 'eventDiscount', amigo: t('Comparison.discountAmigo'), academico: t('Comparison.discountAcademico'), mecenas: t('Comparison.discountMecenas') },
        { key: 'privateLibrary', amigo: false, academico: true, mecenas: true },
        { key: 'certificate', amigo: false, academico: true, mecenas: true },
        { key: 'votingRight', amigo: false, academico: true, mecenas: true },
        { key: 'publication', amigo: false, academico: t('Comparison.pubWithReview'), mecenas: t('Comparison.pubWithReview') },
        { key: 'dinners', amigo: false, academico: false, mecenas: true },
        { key: 'mention', amigo: t('Comparison.mentionAmigo'), academico: t('Comparison.mentionAcademico'), mecenas: t('Comparison.mentionMecenas') },
    ];

    const faqs = [
        { q: t('FAQ.q1'), a: t('FAQ.a1') },
        { q: t('FAQ.q2'), a: t('FAQ.a2') },
        { q: t('FAQ.q3'), a: t('FAQ.a3') },
        { q: t('FAQ.q4'), a: t('FAQ.a4') },
    ];

    async function handleMecenas() {
        setMecenasLoading(true);
        try {
            const res = await fetch('/api/checkout/mecenas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else if (res.status === 401) {
                router.push('/auth/login?redirect=/colabora');
            } else {
                alert(data.error || 'Error');
            }
        } catch {
            alert('Error de conexión');
        } finally {
            setMecenasLoading(false);
        }
    }

    function handleTierClick(tierId: string) {
        switch (tierId) {
            case 'amigo': setAmigoOpen(true); break;
            case 'academico': setAcademicoOpen(true); break;
            case 'mecenas': handleMecenas(); break;
        }
    }

    function getTierBtn(id: string) {
        if (id === 'amigo') return t('Tiers.btnAmigo');
        if (id === 'academico') return t('Tiers.btnAcademico');
        if (id === 'mecenas') return mecenasLoading ? t('Tiers.btnRedirecting') : t('Tiers.btnMecenas');
        return '';
    }

    function getTierDesc(id: string) {
        if (id === 'amigo') return t('Tiers.descAmigo');
        if (id === 'academico') return t('Tiers.descAcademico');
        return t('Tiers.descMecenas');
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#050a14] text-white">
            <Navbar />

            <main className="flex-grow pt-20">
                {/* Hero */}
                <section className="relative py-32 md:py-48 px-4 text-center border-b border-white/5 overflow-hidden">
                    <div
                        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
                        style={{ backgroundImage: "url('/images/colabora-hero-bg.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-[#050a14]/90 z-0" />

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <p className="gold-text font-cinzel tracking-[0.3em] text-xs mb-4 uppercase">{t('Hero.label')}</p>
                        <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 tracking-tight">{t('Hero.title')}</h1>
                        <div className="w-24 h-[1px] bg-[#c5a059] mx-auto mb-8" />
                        <p className="text-white/60 font-light max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
                            {t('Hero.description')}
                        </p>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {membershipPlans.map((plan) => {
                            const Icon = tierIcons[plan.type];
                            return (
                                <div
                                    key={plan.id}
                                    className={`relative flex flex-col p-10 md:p-12 border transition-all duration-500 group ${plan.highlighted
                                        ? 'border-[#c5a059] bg-[#0a111e]/60 shadow-[0_0_50px_-12px_rgba(197,160,89,0.15)]'
                                        : 'border-white/5 bg-[#0a111e]/40 hover:border-[#c5a059]/20'
                                        }`}
                                >
                                    {plan.highlighted && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c5a059] text-[#050a14] px-6 py-1 font-cinzel text-[9px] tracking-[0.2em] font-bold">
                                            {t('Tiers.researchersLabel')}
                                        </div>
                                    )}

                                    <div className="mb-10 text-left">
                                        <div className="mb-6 text-[#c5a059]">
                                            <Icon className="w-8 h-8 stroke-1" />
                                        </div>
                                        <h3 className="font-cinzel text-xl tracking-[0.1em] mb-1">{plan.name}</h3>
                                        <p className="text-white/40 font-cinzel text-[10px] tracking-[0.2em] mb-8">{plan.subtitle}</p>

                                        <div className="flex items-baseline gap-2 mb-8">
                                            {plan.id === 'amigo' ? (
                                                <span className="text-4xl md:text-5xl font-serif text-white">{t('Tiers.freeContribution')}</span>
                                            ) : (
                                                <>
                                                    <span className="text-5xl font-serif text-white">{plan.price}€</span>
                                                    <span className="text-white/30 font-serif text-sm italic">/{plan.interval === 'monthly' ? t('Tiers.perMonth') : t('Tiers.perYear')}</span>
                                                </>
                                            )}
                                        </div>

                                        <p className="text-white/60 font-serif text-xs leading-relaxed mb-10 h-10 italic">
                                            {getTierDesc(plan.id)}
                                        </p>
                                    </div>

                                    <ul className="space-y-4 mb-12 flex-grow">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-4 text-xs font-serif text-white/80 leading-relaxed">
                                                <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                                                <span>{getLocalizedValue(feature, locale)}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => handleTierClick(plan.id)}
                                        disabled={plan.id === 'mecenas' && mecenasLoading}
                                        className={`w-full py-4 font-cinzel text-[10px] tracking-[0.2em] font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 ${plan.highlighted
                                            ? 'bg-[#c5a059] text-[#050a14] hover:bg-white'
                                            : 'border border-white/20 text-white hover:border-[#c5a059] hover:text-[#c5a059]'
                                            }`}
                                    >
                                        {plan.id === 'mecenas' && mecenasLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {getTierBtn(plan.id)}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Comparison Table */}
                <section className="py-24 md:py-32 px-4 bg-[#050a14] border-t border-white/5 relative overflow-hidden">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="font-serif text-3xl text-white tracking-widest uppercase">{t('Comparison.title')}</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="py-6 font-cinzel text-[10px] tracking-[0.2em] text-white/40 uppercase">{t('Comparison.benefit')}</th>
                                        <th className="py-6 font-cinzel text-[10px] tracking-[0.2em] text-[#c5a059] uppercase text-center">Amigo</th>
                                        <th className="py-6 font-cinzel text-[10px] tracking-[0.2em] text-[#c5a059] uppercase text-center">Académico</th>
                                        <th className="py-6 font-cinzel text-[10px] tracking-[0.2em] text-[#c5a059] uppercase text-center">Mecenas</th>
                                    </tr>
                                </thead>
                                <tbody className="font-serif">
                                    {comparisonData.map((row, idx) => (
                                        <tr key={idx} className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                                            <td className="py-6 text-sm text-white/70">{t(`Comparison.benefits.${row.key}`)}</td>
                                            <td className="py-6 text-center text-sm">
                                                {typeof row.amigo === 'boolean'
                                                    ? (row.amigo ? <Check className="w-4 h-4 text-[#c5a059] mx-auto opacity-60" /> : <X className="w-4 h-4 text-white/10 mx-auto" />)
                                                    : <span className="text-white/50 text-xs">{row.amigo}</span>}
                                            </td>
                                            <td className="py-6 text-center text-sm text-white/80">
                                                {typeof row.academico === 'boolean'
                                                    ? (row.academico ? <Check className="w-4 h-4 text-[#c5a059] mx-auto" /> : <X className="w-4 h-4 text-white/10 mx-auto" />)
                                                    : <span className="text-white/80 text-xs italic">{row.academico}</span>}
                                            </td>
                                            <td className="py-6 text-center text-sm text-white">
                                                {typeof row.mecenas === 'boolean'
                                                    ? (row.mecenas ? <Check className="w-4 h-4 text-[#c5a059] mx-auto" /> : <X className="w-4 h-4 text-white/10 mx-auto" />)
                                                    : <span className="text-[#c5a059] text-xs font-bold">{row.mecenas}</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-32 px-4 border-t border-white/5 overflow-hidden">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-24">
                            <h2 className="font-serif text-3xl text-white tracking-widest uppercase">{t('FAQ.title')}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="space-y-4">
                                    <h4 className="font-serif text-xl text-white/90">{faq.q}</h4>
                                    <p className="font-serif text-sm leading-relaxed text-white/40 font-light">
                                        {faq.a}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-40 border-t border-white/5 pt-12 flex flex-col items-center gap-6">
                            <div className="flex items-center gap-3 text-white/30 text-[9px] font-cinzel tracking-[0.2em] uppercase">
                                <ShieldCheck className="w-4 h-4" />
                                <span>{t('Security')}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Modals */}
            <AmigoModal isOpen={amigoOpen} onClose={() => setAmigoOpen(false)} />
            <AcademicoModal isOpen={academicoOpen} onClose={() => setAcademicoOpen(false)} />
        </div>
    );
}
