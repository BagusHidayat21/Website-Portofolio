import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Backdrop } from "@/components/layout/Backdrop";

export const metadata: Metadata = {
    title: "Page not found",
    robots: { index: false, follow: true },
};

export default function NotFound() {
    return (
        <>
            <Backdrop />
            <Navbar />
            <main id="main" className="relative z-10 flex min-h-[100svh] flex-col justify-center pb-16 pt-32 text-ink-fg">
                <div className="page-x">
                    <p className="label text-ink-muted">Error 404</p>
                    <h1 className="mt-6 font-wide text-[clamp(3rem,13vw,13rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.04em]">
                        <span className="block">Page</span>
                        <span className="text-outline block text-right">
                            not found<span className="text-ink-accent-ink [-webkit-text-stroke:0]">.</span>
                        </span>
                    </h1>
                    <div className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-end md:justify-between">
                        <p className="max-w-[44ch] text-lg leading-relaxed text-ink-muted">
                            The link may be old or mistyped. The work is still here, though.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/"
                                className="group inline-flex h-14 items-center gap-3 rounded-full border border-ink-line px-6 text-base font-medium transition-colors hover:border-ink-fg/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink"
                            >
                                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.75} aria-hidden="true" />
                                Back home
                            </Link>
                            <Link
                                href="/projects"
                                className="group inline-flex h-14 items-center gap-3 rounded-full bg-ink-accent px-6 text-base font-medium text-ink-on-accent transition-[filter] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink focus-visible:ring-offset-2 focus-visible:ring-offset-ink-bg"
                            >
                                View Work
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
