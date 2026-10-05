'use client';

import { ArrowUpRight, Check, Copy, Github, Linkedin } from 'lucide-react';
import { useRef, useState, type PointerEvent } from 'react';
import { gsap, useGSAP, applyParallax, MOTION_OK } from '@/lib/gsap';

interface ContactProps {
    email: string;
    socialLinks: {
        github?: string;
        linkedin?: string;
    };
}

export function ContactClient({ email, socialLinks }: ContactProps) {
    const root = useRef<HTMLElement>(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                const range = { trigger: root.current, start: 'top bottom', end: 'center center', scrub: 1 };
                gsap.fromTo('.ct-left', { xPercent: -45 }, { xPercent: 0, ease: 'none', scrollTrigger: range });
                gsap.fromTo('.ct-right', { xPercent: 45 }, { xPercent: 0, ease: 'none', scrollTrigger: range });
                gsap.fromTo(
                    '.ct-orb-wrap',
                    { scale: 0.4, rotate: -90 },
                    {
                        scale: 1,
                        rotate: 0,
                        ease: 'none',
                        scrollTrigger: { trigger: '.ct-orb-wrap', start: 'top bottom', end: 'center 55%', scrub: 1 },
                    }
                );
                applyParallax(root.current);
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    const onOrbMove = (e: PointerEvent<HTMLAnchorElement>) => {
        if (e.pointerType !== 'mouse') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
        const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
        gsap.to(el, { x, y, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
    };

    const onOrbLeave = (e: PointerEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
    };

    const socials = [
        { label: 'GitHub', href: socialLinks.github, icon: Github },
        { label: 'LinkedIn', href: socialLinks.linkedin, icon: Linkedin },
    ].filter((s): s is { label: string; href: string; icon: typeof Github } => Boolean(s.href));

    return (
        <section ref={root} id="contact" className="relative overflow-hidden bg-ink-bg py-32 text-ink-fg md:py-48">
            <h2 className="font-wide text-[clamp(2.5rem,8vw,7rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em]">
                <span className="ct-left block whitespace-nowrap px-4 sm:px-6 lg:px-10">Let&apos;s build</span>
                <span className="ct-right text-outline block whitespace-nowrap px-4 text-right sm:px-6 lg:px-10">
                    something<span className="text-ink-accent [-webkit-text-stroke:0]">.</span>
                </span>
            </h2>

            <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 md:mt-28 lg:grid-cols-12 lg:px-10">
                <div className="lg:col-span-6" data-speed="0.8">
                    <p className="max-w-[44ch] text-lg leading-relaxed text-ink-muted md:text-xl">
                        Working full-time at PT Universal Big Data, and still open to collaborations, technical work and
                        data-driven projects.
                    </p>

                    <div className="mt-10 flex flex-col gap-3">
                        <a
                            href={`mailto:${email}`}
                            className="group inline-flex w-max max-w-full items-center gap-3 font-display text-[clamp(1.25rem,2.6vw,2.25rem)] font-medium tracking-[-0.03em]"
                        >
                            <span className="relative truncate">
                                {email}
                                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-ink-accent transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100" />
                            </span>
                        </a>
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="inline-flex h-11 w-max items-center gap-2 rounded-full border border-ink-line px-4 text-sm font-medium text-ink-muted transition-colors hover:border-ink-fg/30 hover:text-ink-fg"
                        >
                            {copied ? (
                                <Check className="h-4 w-4 text-ink-accent-ink" strokeWidth={1.75} aria-hidden="true" />
                            ) : (
                                <Copy className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                            )}
                            <span aria-live="polite">{copied ? 'Copied to clipboard' : 'Copy address'}</span>
                        </button>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        {socials.map(({ label, href, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex h-12 items-center gap-3 rounded-full border border-ink-line pl-5 pr-2 text-sm font-medium transition-colors hover:bg-ink-fg hover:text-ink-bg"
                            >
                                <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                                {label}
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-fg/[0.08] transition-transform duration-500 group-hover:rotate-45">
                                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="ct-orb-wrap flex justify-center lg:col-span-6 lg:justify-end">
                    <a
                        href={`mailto:${email}`}
                        onPointerMove={onOrbMove}
                        onPointerLeave={onOrbLeave}
                        className="group relative flex aspect-square w-[min(78vw,24rem)] flex-col items-center justify-center gap-3 rounded-full bg-ink-accent text-ink-on-accent shadow-[0_40px_120px_-40px_rgba(200,255,61,0.55)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink-accent/40"
                    >
                        <span className="font-wide text-[clamp(1.75rem,3.4vw,3rem)] font-extrabold uppercase leading-none tracking-[-0.03em]">
                            Hire Me
                        </span>
                        <ArrowUpRight
                            className="h-9 w-9 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-45"
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
}
