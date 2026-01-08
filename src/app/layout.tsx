import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/ui/animated-background";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bagus Hidayat | Full-Stack Developer",
  description: "Full-Stack Developer specializing in React, Next.js, and modern web technologies. Building beautiful, performant, and user-friendly web experiences.",
  keywords: ["full-stack developer", "frontend developer", "react", "next.js", "typescript", "portfolio", "web developer"],
  openGraph: {
    title: "Bagus Hidayat | Full-Stack Developer",
    description: "Full-Stack Developer specializing in React, Next.js, and modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans`}>
        <AnimatedBackground />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
