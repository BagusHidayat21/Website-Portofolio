import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bagus-hidayat.my.id'),
  title: {
    default: "Bagus Hidayat | Full-Stack Web Developer",
    template: "Bagus Hidayat | %s"
  },
  description: "Portfolio of Bagus Hidayat, an Undergraduate Student at Universitas Negeri Malang specializing in Data Engineering, Machine Learning, and Robust Full-Stack Development.",
  keywords: [
    "Bagus Hidayat",
    "Full Stack Web Developer",
    "Data Engineer",
    "Machine Learning Engineer",
    "Universitas Negeri Malang",
    "Next.js",
    "React Native",
    "Laravel",
    "Software Engineering"
  ],
  authors: [{ name: "Bagus Hidayat", url: "https://www.linkedin.com/in/bagushidayat-id/" }],
  creator: "Bagus Hidayat",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bagus-hidayat.my.id",
    title: "Bagus Hidayat | Full-Stack Web Developer",
    description: "Building intelligent digital ecosystems with Next.js and Machine Learning. Undergraduate at Universitas Negeri Malang.",
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
    description: "Building intelligent digital ecosystems with Next.js and Machine Learning. Undergraduate at Universitas Negeri Malang.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
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
              "@type": "Person",
              "name": "Bagus Hidayat",
              "url": "https://bagus-hidayat.my.id",
              "image": "https://bagus-hidayat.my.id/avatars/profile.png",
              "description": "Full-Stack Web Developer specializing in Data Engineering, Machine Learning, and modern web technologies.",
              "jobTitle": "Full-Stack Web Developer",
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Universitas Negeri Malang"
              },
              "knowsAbout": [
                "Next.js",
                "React",
                "Laravel",
                "Machine Learning",
                "Data Engineering",
                "TypeScript",
                "PostgreSQL"
              ],
              "sameAs": [
                "https://github.com/BagusHidayat21",
                "https://www.linkedin.com/in/bagushidayat-id/"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
