import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ieam.es';
const DEFAULT_SOCIAL_IMAGE = new URL('/opengraph-image.jpg', BASE_URL).toString();

const localeToOG: Record<string, string> = {
  es: 'es_ES',
  en: 'en_US',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'es' | 'en')) {
    return { title: 'IEAM' };
  }

  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    const t = messages.Metadata;

    return {
      metadataBase: new URL(BASE_URL),
      title: {
        default: t.title,
        template: `%s | IEAM`,
      },
      description: t.description,
      keywords: [
        'IEAM',
        'think tank',
        'migraciones',
        'Mediterráneo',
        'Sahel',
        'África',
        'Europa',
        'seguridad',
        'diálogo mediterráneo',
      ],
      authors: [{ name: 'IEAM' }],
      alternates: {
        canonical: `${BASE_URL}/${locale}`,
        languages: {
          es: `${BASE_URL}/es`,
          en: `${BASE_URL}/en`,
          'x-default': BASE_URL,
        },
      },
      openGraph: {
        type: 'website',
        locale: localeToOG[locale] ?? 'es_ES',
        siteName: 'IEAM',
        title: t.title,
        description: t.ogDescription,
        images: [{ url: DEFAULT_SOCIAL_IMAGE, alt: t.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: t.title,
        description: t.twitterDescription,
        images: [DEFAULT_SOCIAL_IMAGE],
      },
      icons: {
        icon: '/favicon-new.png',
        shortcut: '/favicon-new.png',
        apple: '/favicon-new.png',
      },
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    return { title: 'IEAM' };
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'es' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-paper text-ink">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
