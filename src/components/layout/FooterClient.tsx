'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { Profile } from '@/data/static-db';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';

interface FooterClientProps {
    profile: Profile;
}

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
];

export function FooterClient({ profile }: FooterClientProps) {
    const root = useRef<HTMLElement>(null);
    const currentYear = new Date().getFullYear();
    const lastName = profile.name.split(' ').slice(-1)[0] ?? profile.name;

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                const main = document.querySelector('main');
                if (!main || !root.current) return;
                // The footer is sticky behind <main>; drive the reveal from main's bottom edge.
                const reveal = {
                    trigger: main,
                    start: 'bottom bottom',
                    end: () => `+=${root.current?.offsetHeight ?? window.innerHeight}`,
                    scrub: true,
                };
                gsap.fromTo('.ft-mark', { yPercent: 60 }, { yPercent: 0, ease: 'none', scrollTrigger: reveal });
                gsap.fromTo('.ft-top', { yPercent: -30, autoAlpha: 0.2 }, { yPercent: 0, autoAlpha: 1, ease: 'none', scrollTrigger: reveal });
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <footer
            ref={root}
            className="sticky bottom-0 z-0 flex min-h-[85dvh] flex-col justify-between overflow-hidden bg-ink-bg-2 text-ink-fg"
        >
            <div className="ft-top mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 pb-10 pt-24 sm:px-6 md:grid-cols-12 md:pt-32 lg:px-10">
                <div className="md:col-span-7">
                    <p className="text-sm text-ink-muted">Got a project in mind?</p>
                    <a
                        href={`mailto:${profile.email}`}
                        className="group mt-4 inline-flex max-w-full items-center gap-4 font-wide text-[clamp(1.5rem,3.6vw,3.25rem)] font-extrabold uppercase leading-none tracking-[-0.035em]"
                    >
                        <span className="truncate">Hire Me</span>
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink-accent text-ink-on-accent transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-45 md:h-16 md:w-16">
                            <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.75} aria-hidden="true" />
                        </span>
                    </a>
                </div>

                <nav aria-label="Footer" className="grid grid-cols-2 gap-8 text-sm md:col-span-5">
                    <ul className="space-y-3">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="text-ink-muted transition-colors hover:text-ink-fg">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className="space-y-3">
                        {profile.socials.map((social) => (
                            <li key={social.platform}>
                                <a
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-ink-muted transition-colors hover:text-ink-fg"
                                >
                                    {social.platform}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-ink-muted transition-colors hover:text-ink-fg">
                                Resume
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            <div>
                <div
                    aria-hidden="true"
                    className="ft-mark text-outline select-none whitespace-nowrap px-2 text-center font-wide text-[22vw] font-extrabold uppercase leading-[0.78] tracking-[-0.05em] text-ink-fg/25"
                >
                    {lastName}
                </div>
                <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 border-t border-ink-line px-4 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:px-6 lg:px-10">
                    <p>
                        © {currentYear} {profile.name}
                    </p>
                    <p>{profile.tagline}</p>
                </div>
            </div>
        </footer>
    );
}
