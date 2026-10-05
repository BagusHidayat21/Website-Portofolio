import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { site } from '@/config/site';
import { personJsonLd } from '@/lib/seo';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });

// Only small labels use mono; skipping the preload keeps it off the LCP path.
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap', preload: false });

// The one Archivo instance the site uses (width 125, weight 800): a 14 KB subset instead of the 88 KB variable font.
const archivo = localFont({ src: './fonts/archivo-expanded-800.woff2', weight: '800', variable: '--font-archivo', display: 'swap' });

// Decides on the first-visit splash before first paint, so it never flashes or waits for hydration.
const splashScript =
    "try{if(!sessionStorage.getItem('splashShown')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.setAttribute('data-splash','')}catch(e){}";

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: { default: site.title, template: `${site.name} | %s` },
    description: site.description,
    keywords: [
        'Bagus Hidayat',
        'Full Stack Web Developer',
        'Software Engineer',
        'PT Universal Big Data',
        'Data Engineer',
        'Machine Learning Engineer',
        'Universitas Negeri Malang',
        'Next.js',
        'React',
        'Laravel',
    ],
    authors: [{ name: site.name, url: 'https://www.linkedin.com/in/bagushidayat-id/' }],
    creator: site.name,
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: site.url,
        siteName: `${site.name} Portfolio`,
        title: site.title,
        description: 'Software Engineer & Graduate of Universitas Negeri Malang working full-time at PT Universal Big Data.',
        images: [site.ogImage],
    },
    twitter: {
        card: 'summary_large_image',
        title: site.title,
        description: 'Software Engineer & Graduate of Universitas Negeri Malang working full-time at PT Universal Big Data.',
        images: [site.ogImage.url],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    icons: { icon: '/icon.png', shortcut: '/icon.png', apple: '/apple-icon.png' },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#f2f1ec' },
        { media: '(prefers-color-scheme: dark)', color: '#08080a' },
    ],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
            <body className={`${geist.variable} ${geistMono.variable} ${archivo.variable} font-sans`}>
                <script dangerouslySetInnerHTML={{ __html: splashScript }} />
                <a
                    href="#main"
                    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink-on-accent"
                >
                    Skip to content
                </a>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }} />
            </body>
        </html>
    );
}
