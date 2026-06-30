import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { headers } from "next/headers";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-config";
import { routing } from "@/i18n/routing";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      {
        url: "/branding/fortius-consulting-lockup-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/branding/fortius-consulting-lockup-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/branding/fortius-consulting-lockup-light.png",
        type: "image/png",
      },
    ],
    shortcut: "/branding/fortius-consulting-lockup-light.png",
    apple: "/branding/fortius-consulting-lockup-light.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get("x-next-intl-locale") ?? routing.defaultLocale;
  return (
    <html
      lang={locale}
      data-brand="consulting"
      className={`${cormorant.variable} ${sourceSans.variable}`}
    >
      <head>
        {/* Clientify Tracking Begins */}
        <script defer src="https://analyticsplusdev.clientify.net/analytics_plus/pixel/BwIhbw1vPNNRu9iR"></script>
        {/* Clientify Tracking Ends */}
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
