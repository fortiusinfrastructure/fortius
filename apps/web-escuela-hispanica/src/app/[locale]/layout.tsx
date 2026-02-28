import type { Metadata } from 'next';
import { Playfair_Display, Cinzel, Lato } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.escuelahispanica.org';

const localeToOG: Record<string, string> = {
  es: 'es_ES',
  en: 'en_US',
  pt: 'pt_BR',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const t = messages.Metadata;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t.title,
      template: `%s | ${t.title}`,
    },
    description: t.description,
    keywords: ['Escuela Hispánica', 'Escuela de Salamanca', 'pensamiento hispánico', 'filosofía española', 'derecho natural', 'Francisco de Vitoria', 'Francisco Suárez'],
    authors: [{ name: 'Escuela Hispánica' }],
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'es': `${BASE_URL}/es`,
        'en': `${BASE_URL}/en`,
        'pt': `${BASE_URL}/pt`,
        'x-default': `${BASE_URL}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: localeToOG[locale] || 'es_ES',
      siteName: t.title,
      title: t.title,
      description: t.ogDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.twitterDescription,
    },
  };
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${playfair.variable} ${cinzel.variable} ${lato.variable}`}>
      <body className="font-sans min-h-screen flex flex-col bg-brand-dark text-brand-text">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
