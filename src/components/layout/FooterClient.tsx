// Footer with Malang local time, contact action, sitemap and social links.
'use client';

import Link from 'next/link';
import { ArrowUp, ArrowUpRight, Check, Copy, FileText, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { getLenis } from '@/components/providers/SmoothScroll';
import { Profile } from '@/data/static-db';

interface FooterClientProps {
    profile: Profile;
}

const navLinks = [
    { href: '/', label: 'Home', index: '01' },
    { href: '/projects', label: 'Projects', index: '02' },
    { href: '/about', label: 'About', index: '03' },
];

const techChips = ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Laravel', 'Python'];
const marqueeItems = ['Bagus Hidayat', 'Full stack engineering', 'Data and machine learning', 'Industrial mentoring', 'Malang, Indonesia'];

export function FooterClient({ profile }: FooterClientProps) {
    const currentYear = new Date().getFullYear();
    const [copied, setCopied] = useState(false);
    const clockRef = useRef<HTMLSpanElement>(null);
    const footerRef = useRef<HTMLElement>(null);

    // The marquee strip only runs while the footer is on screen; an offscreen infinite animation still costs a commit per frame.
    useEffect(() => {
        const el = footerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            el.toggleAttribute('data-inview', entry.isIntersecting);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Local Malang time, written straight to the DOM (no re-render) and only ticking while the footer is on screen.
    useEffect(() => {
        const el = clockRef.current;
        if (!el) return;
        let formatter: Intl.DateTimeFormat;
        try {
            formatter = new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Asia/Jakarta',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            });
        } catch {
            return;
        }
        let timer = 0;
        const tick = () => {
            el.textContent = formatter.format(new Date());
        };
        const observer = new IntersectionObserver(([entry]) => {
            window.clearInterval(timer);
            if (entry.isIntersecting) {
                tick();
                timer = window.setInterval(tick, 1000);
            }
        });
        observer.observe(el);
        return () => {
            observer.disconnect();
            window.clearInterval(timer);
        };
    }, []);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        } catch {
            setCopied(false);
        }
    };

    const status = profile.isAvailableForWork
        ? 'Available for new work'
        : `At ${profile.currentCompany ?? 'work'}, open to collaborations`;

    const scrollToTop = () => {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const github = profile.socials.find((s) => s.platform.toLowerCase() === 'github')?.url;
    const linkedin = profile.socials.find((s) => s.platform.toLowerCase() === 'linkedin')?.url;
    const instagram = profile.socials.find((s) => s.platform.toLowerCase() === 'instagram')?.url;

    return (
        <footer ref={footerRef} className="relative z-10 w-full border-t border-ink-line bg-ink-bg-2 text-ink-fg">
            {/* Ambient top light */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-accent/[0.04] to-transparent"
            />

            <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 md:pt-24 lg:px-10">
                {/* Status and Clock Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-line pb-8 font-mono text-xs text-ink-muted">
                    <div className="flex items-center gap-2.5">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping [animation-iteration-count:3] rounded-full bg-ink-accent opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-ink-accent" />
                        </span>
                        <span className="uppercase tracking-[0.14em] text-ink-fg">{status}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span>MALANG, ID · WIB (UTC+7)</span>
                        <span
                            ref={clockRef}
                            className="min-w-[5.5rem] rounded-md border border-ink-line bg-ink-fg/[0.04] px-2.5 py-1 text-center text-ink-fg tabular-nums empty:hidden"
                        />
                    </div>
                </div>

                {/* Main Call to Action Headline */}
                <div className="mt-12 md:mt-16">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
                        Contact
                    </p>
                    <div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                        <h2 className="max-w-3xl font-wide text-[clamp(1.75rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em]">
                            Start a <span className="text-ink-accent-ink">conversation.</span>
                        </h2>

                        <div className="flex max-w-full flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={handleCopyEmail}
                                className="group flex h-12 sm:h-14 max-w-[calc(100%-4.25rem)] items-center gap-2.5 sm:gap-3 rounded-full border border-ink-line bg-ink-fg/[0.04] px-4 sm:px-6 text-xs sm:text-sm font-medium text-ink-fg transition-all duration-300 hover:border-ink-accent-ink hover:bg-ink-fg hover:text-ink-bg"
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-4 w-4 shrink-0 text-ink-accent-ink" />
                                        <span className="truncate">Email copied</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-4 w-4 shrink-0 text-ink-muted transition-colors group-hover:text-ink-bg" />
                                        <span className="truncate">{profile.email}</span>
                                    </>
                                )}
                            </button>

                            <a
                                href={`mailto:${profile.email}`}
                                aria-label="Send email"
                                className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-ink-accent text-ink-on-accent transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:rotate-45"
                            >
                                <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Primary Multi-Column Content Grid */}
                <div className="mt-16 grid grid-cols-1 gap-12 border-t border-ink-line pt-14 md:mt-20 md:grid-cols-12 md:gap-8">
                    {/* Brand and Description (5 cols) */}
                    <div className="space-y-4 md:col-span-5">
                        <div className="font-wide text-2xl font-extrabold uppercase tracking-tight text-ink-fg">
                            {profile.name}<span className="text-ink-accent-ink">.</span>
                        </div>
                        <p className="max-w-md text-sm leading-relaxed text-ink-muted">
                            {profile.bio}
                        </p>
                        {profile.currentCompany && (
                            <p className="text-xs font-mono text-ink-muted">
                                Currently working at <span className="text-ink-fg">{profile.currentCompany}</span>.
                            </p>
                        )}
                        <div className="pt-2 flex flex-wrap gap-1.5">
                            {techChips.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full border border-ink-line bg-ink-fg/[0.03] px-3 py-1 font-mono text-[11px] text-ink-muted"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links (3 cols) */}
                    <div className="space-y-4 md:col-span-3 md:col-start-7">
                        <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
                            Pages
                        </p>
                        <ul className="space-y-0.5">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex min-h-11 items-center gap-3 text-sm font-medium text-ink-muted transition-colors hover:text-ink-fg"
                                    >
                                        <span className="font-mono text-xs text-ink-muted transition-colors group-hover:text-ink-accent-ink">
                                            {link.index}
                                        </span>
                                        <span>{link.label}</span>
                                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                                    </Link>
                                </li>
                            ))}
                            {profile.resumeUrl && (
                                <li>
                                    <a
                                        href={profile.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex min-h-11 items-center gap-3 text-sm font-medium text-ink-muted transition-colors hover:text-ink-fg"
                                    >
                                        <span className="font-mono text-xs text-ink-muted transition-colors group-hover:text-ink-accent-ink">
                                            04
                                        </span>
                                        <span>Resume</span>
                                        <FileText className="h-3.5 w-3.5 text-ink-muted/60 transition-colors group-hover:text-ink-fg" />
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Connect and Socials (3 cols) */}
                    <div className="space-y-4 md:col-span-3">
                        <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
                            Elsewhere
                        </p>
                        <ul className="space-y-0.5">
                            {github && (
                                <li>
                                    <a
                                        href={github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex min-h-11 items-center gap-2.5 text-sm text-ink-muted transition-colors hover:text-ink-fg"
                                    >
                                        <Github className="h-4 w-4" />
                                        <span>GitHub</span>
                                        <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </a>
                                </li>
                            )}
                            {linkedin && (
                                <li>
                                    <a
                                        href={linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex min-h-11 items-center gap-2.5 text-sm text-ink-muted transition-colors hover:text-ink-fg"
                                    >
                                        <Linkedin className="h-4 w-4" />
                                        <span>LinkedIn</span>
                                        <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </a>
                                </li>
                            )}
                            {instagram && (
                                <li>
                                    <a
                                        href={instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex min-h-11 items-center gap-2.5 text-sm text-ink-muted transition-colors hover:text-ink-fg"
                                    >
                                        <Instagram className="h-4 w-4" />
                                        <span>Instagram</span>
                                        <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </a>
                                </li>
                            )}
                            <li>
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="group inline-flex min-h-11 items-center gap-2.5 text-sm text-ink-muted transition-colors hover:text-ink-fg"
                                >
                                    <Mail className="h-4 w-4" />
                                    <span>Email</span>
                                    <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Subdued editorial marquee strip */}
                <div className="mt-16 overflow-hidden border-t border-ink-line py-5" aria-hidden="true">
                    <div className="flex animate-marquee-css items-center marquee-offscreen-paused gap-8 whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] text-ink-muted select-none motion-reduce:animate-none">
                        {[0, 1].map((copy) =>
                            marqueeItems.map((item) => (
                                <Fragment key={`${copy}-${item}`}>
                                    <span>{item}</span>
                                    <span className="text-ink-accent-ink">/</span>
                                </Fragment>
                            ))
                        )}
                    </div>
                </div>

                {/* Bottom Legal / Copyright Strip */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-ink-line pt-8 text-xs text-ink-muted sm:flex-row">
                    <p>
                        © {currentYear} {profile.name}, Malang, Indonesia.
                    </p>

                    <p className="hidden md:block">
                        Built with Next.js, Tailwind CSS and GSAP.
                    </p>

                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="group flex min-h-11 items-center gap-1.5 transition-colors hover:text-ink-fg"
                        aria-label="Scroll back to top"
                    >
                        <span>Back to top</span>
                        <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
