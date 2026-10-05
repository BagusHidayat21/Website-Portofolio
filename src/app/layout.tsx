import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

// Archivo, the single instance the site uses (width 125, weight 800), self-hosted as a 14 KB latin subset
// instead of the 88 KB variable font with every width and weight.
const archivo = localFont({
  src: "./fonts/archivo-expanded-800.woff2",
  weight: "800",
  style: "normal",
  variable: "--font-archivo",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  // Only small labels use mono; not preloading keeps it off the LCP path.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bagus-hidayat.my.id'),
  title: {
    default: "Bagus Hidayat | Full-Stack Web Developer",
    template: "Bagus Hidayat | %s"
  },
  description: "Portfolio of Bagus Hidayat, Software Engineer & Graduate of Universitas Negeri Malang working full-time at PT Universal Big Data, specializing in Full-Stack Development, Data Engineering, and Machine Learning.",
  keywords: [
    "Bagus Hidayat",
    "Full Stack Web Developer",
    "Software Engineer",
    "PT Universal Big Data",
    "Data Engineer",
    "Machine Learning Engineer",
    "Universitas Negeri Malang",
    "Next.js",
    "React",
    "Laravel",
    "Software Engineering"
  ],
  authors: [{ name: "Bagus Hidayat", url: "https://www.linkedin.com/in/bagushidayat-id/" }],
  creator: "Bagus Hidayat",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bagus-hidayat.my.id",
    title: "Bagus Hidayat | Full-Stack Web Developer",
    description: "Software Engineer & Graduate of Universitas Negeri Malang working full-time at PT Universal Big Data.",
    siteName: "Bagus Hidayat Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bagus Hidayat Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bagus Hidayat | Full-Stack Web Developer",
    description: "Software Engineer & Graduate of Universitas Negeri Malang working full-time at PT Universal Big Data.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/icon.png',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f1ec" },
    { media: "(prefers-color-scheme: dark)", color: "#08080a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} ${archivo.variable} font-sans relative`}>
        {/* Decide on the first-visit splash before first paint (no flash, no hydration wait). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!sessionStorage.getItem('splashShown')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.setAttribute('data-splash','')}catch(e){}",
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink-on-accent"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://www.bagus-hidayat.my.id/#website",
                  "url": "https://www.bagus-hidayat.my.id",
                  "name": "Bagus Hidayat",
                  "inLanguage": "en",
                  "publisher": { "@id": "https://www.bagus-hidayat.my.id/#person" },
                },
                {
                  "@type": "Person",
                  "@id": "https://www.bagus-hidayat.my.id/#person",
                  "name": "Bagus Hidayat",
                  "url": "https://www.bagus-hidayat.my.id",
                  "image": "https://www.bagus-hidayat.my.id/avatars/profile.webp",
                  "description": "Full-Stack Web Developer specializing in Data Engineering, Machine Learning, and modern web technologies.",
                  "jobTitle": "Full-Stack Web Developer",
                  "worksFor": { "@type": "Organization", "name": "PT Universal Big Data" },
                  "address": { "@type": "PostalAddress", "addressLocality": "Malang", "addressCountry": "ID" },
                  "alumniOf": { "@type": "CollegeOrUniversity", "name": "Universitas Negeri Malang" },
                  "knowsAbout": ["Next.js", "React", "Laravel", "Machine Learning", "Data Engineering", "TypeScript", "PostgreSQL"],
                  "sameAs": [
                    "https://github.com/BagusHidayat21",
                    "https://www.linkedin.com/in/bagushidayat-id/",
                    "https://www.instagram.com/hid.bgs/"
                  ]
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
