import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bagus-hidayat.my.id'),
  alternates: {
    canonical: '/',
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans relative`}>
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
              "url": "https://www.bagus-hidayat.my.id",
              "image": "https://www.bagus-hidayat.my.id/avatars/profile.png",
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
