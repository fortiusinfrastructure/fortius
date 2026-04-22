'use client';

import { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  privacy: boolean;
};

const INITIAL: FormData = { name: '', email: '', subject: '', message: '', privacy: false };

export default function ContactPage() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<{
    isSubmitting: boolean;
    message: string | null;
    type: 'success' | 'error' | null;
  }>({ isSubmitting: false, message: null, type: null });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.privacy) return;
    setStatus({ isSubmitting: true, message: null, type: null });

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const formDataToSend = new FormData(e.currentTarget);
      formDataToSend.append('access_key', '6dcc0b8d-f96e-4134-929d-0a7e3aa03e23');
      formDataToSend.append('subject', `Nuevo mensaje Web IEAM: ${formData.subject}`);
      formDataToSend.append('from_name', formData.name);
      formDataToSend.append('botcheck', '');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await response.json();

      if (data.success) {
        setStatus({ isSubmitting: false, message: t('form.success'), type: 'success' });
        setFormData(INITIAL);
      } else {
        throw new Error(data.message || 'Error sending message');
      }
    } catch (error: unknown) {
      const isAbort = error instanceof DOMException && error.name === 'AbortError';
      const msg = isAbort
        ? 'El envío ha tardado demasiado. Por favor, verifica tu conexión a internet.'
        : 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo o escribe directamente a info@ieam.es';
      setStatus({ isSubmitting: false, message: msg, type: 'error' });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const input =
    'w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#D4212A] focus:ring-1 focus:ring-[#D4212A] outline-none transition-colors rounded-sm disabled:opacity-50';
  const labelCls = 'text-sm font-bold text-slate-700 uppercase tracking-wider';

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <div className="relative bg-[#0A2540] text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074&auto=format&fit=crop" alt="" className="w-full h-full object-cover opacity-20" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540] via-[#0A2540]/90 to-transparent"></div>
        </div>
        <div className="relative z-10 page-shell">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="border-l-4 border-[#D4212A] pl-6">
                <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight text-[#f8f5f0]">{t('hero.title')}</h1>
                <p className="text-xl text-slate-300 leading-relaxed max-w-lg">{t('hero.description')}</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-sm">
              <p className="text-lg font-serif italic text-white leading-relaxed">{t('hero.quote')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="page-shell py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Info */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#0A2540] mb-6">{t('info.title')}</h2>
              <p className="text-slate-600 leading-relaxed mb-8">{t('info.description')}</p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#D4212A] flex-shrink-0 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-[#0A2540] text-sm uppercase tracking-wider mb-1">Email</h3>
                    <a href="mailto:info@ieam.es" className="text-slate-600 hover:text-[#D4212A] transition-colors">info@ieam.es</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#D4212A] flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-[#0A2540] text-sm uppercase tracking-wider mb-1">{t('info.headquarters')}</h3>
                    <p className="text-slate-600">{t('info.location')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-sm p-8 lg:p-10 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-serif font-bold text-[#0A2540] mb-8">{t('form.title')}</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {status.message && (
                  <div className={`p-4 rounded-sm ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {status.message}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className={labelCls}>{t('form.name')}</label>
                    <input type="text" id="name" name="name" required disabled={status.isSubmitting} value={formData.name} onChange={handleChange} className={input} placeholder={t('form.name_placeholder')} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className={labelCls}>Email</label>
                    <input type="email" id="email" name="email" required disabled={status.isSubmitting} value={formData.email} onChange={handleChange} className={input} placeholder={t('form.email_placeholder')} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className={labelCls}>{t('form.subject')}</label>
                  <div className="relative">
                    <select id="subject" name="subject" required disabled={status.isSubmitting} value={formData.subject} onChange={handleChange} className={`${input} appearance-none`}>
                      <option value="" disabled>{t('form.subject_placeholder')}</option>
                      <option value="general">{t('form.subject_general')}</option>
                      <option value="prensa">{t('form.subject_press')}</option>
                      <option value="entrevistas">{t('form.subject_interview')}</option>
                      <option value="colaboraciones">{t('form.subject_collaboration')}</option>
                      <option value="otro">{t('form.subject_other')}</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className={labelCls}>{t('form.message')}</label>
                  <textarea id="message" name="message" required rows={6} disabled={status.isSubmitting} value={formData.message} onChange={handleChange} className={`${input} resize-y`} placeholder={t('form.message_placeholder')} />
                </div>

                <div className="flex items-start pt-2">
                  <input type="checkbox" id="privacy" name="privacy" required disabled={status.isSubmitting} checked={formData.privacy} onChange={handleChange} className="mt-1 w-4 h-4 text-[#D4212A] border-slate-300 rounded focus:ring-[#D4212A]" />
                  <label htmlFor="privacy" className="ml-3 text-sm text-slate-600">
                    {t('form.privacy_text')} <Link href="/privacy" className="text-[#D4212A] hover:underline font-medium">{t('form.privacy_link')}</Link> {t('form.privacy_consent')}
                  </label>
                </div>

                <button type="submit" disabled={status.isSubmitting || !formData.privacy} className="w-full sm:w-auto px-8 py-4 bg-[#0A2540] hover:bg-[#0A3D62] disabled:bg-slate-400 text-white font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center rounded-sm group">
                  {status.isSubmitting ? 'Enviando...' : t('form.submit')}
                  {!status.isSubmitting && <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
