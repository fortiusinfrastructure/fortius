import '../globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata = { title: 'IEAM Admin' };

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es" className={inter.variable} suppressHydrationWarning>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
