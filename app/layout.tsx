import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Study Hub',
    description: 'Organize your study notes',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="min-h-screen font-sans">
                <Providers>
                    <Navbar />
                    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
