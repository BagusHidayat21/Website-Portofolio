'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, FileText, Github, Linkedin, Menu, X } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { getLenis } from '@/components/providers/SmoothScroll';
import { cn } from '@/lib/utils';

// Primary navigation destinations across the portfolio.
const navLinks = [
    { href: '/', label: 'Home', index: '01' },
    { href: '/projects', label: 'Projects', index: '02' },
    { href: '/about', label: 'About', index: '03' },
];

const socialLinks = [
    { icon: Github, href: 'https://github.com/BagusHidayat21', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/bagushidayat-id/', label: 'LinkedIn' },
];

const CONTACT_HREF = 'mailto:bagus.hidayat.id@gmail.com';
const RESUME_HREF = '/resume.pdf';
const SCROLL_THRESHOLD = 20;
const HIDE_AFTER = 360;
const EASE = 'ease-[cubic-bezier(0.32,0.72,0,1)]';

export function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [prevPathname, setPrevPathname] = useState(pathname);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLSpanElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const indicatorRef = useRef<HTMLSpanElement>(null);

    if (prevPathname !== pathname) {
        setPrevPathname(pathname);
        setIsOpen(false);
        setHidden(false);
    }

    // One passive listener drives the bar (direct style write) and the scrolled/hidden flags (state only on change).
    useEffect(() => {
        let last = window.scrollY;
        let frame = 0;
        const update = () => {
            frame = 0;
            const y = window.scrollY;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
            const nextScrolled = y > SCROLL_THRESHOLD;
            const nextHidden = y > HIDE_AFTER && y > last;
            setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
            setHidden((prev) => (prev === nextHidden ? prev : nextHidden));
            last = y;
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(frame);
        };
    }, []);

    // Slide the active pill to the current link; transform only, width is set without animating.
    useLayoutEffect(() => {
        const list = listRef.current;
        const indicator = indicatorRef.current;
        if (!list || !indicator) return;
        const place = () => {
            const active = list.querySelector<HTMLElement>('a[aria-current="page"]');
            if (!active) {
                indicator.style.opacity = '0';
                return;
            }
            indicator.style.opacity = '1';
            indicator.style.width = `${active.offsetWidth}px`;
            indicator.style.transform = `translateX(${active.offsetLeft}px)`;
        };
        place();
        // Web fonts change link widths after first paint.
        document.fonts?.ready.then(place).catch(() => undefined);
        window.addEventListener('resize', place);
        return () => window.removeEventListener('resize', place);
    }, [pathname]);

    useEffect(() => {
        if (!isOpen) return;

        const lenis = getLenis();
        lenis?.stop();
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
                toggleRef.current?.focus();
                return;
            }
            // Keep Tab focus inside the open dialog.
            if (e.key !== 'Tab' || !panelRef.current) return;
            const focusable = panelRef.current.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const active = document.activeElement;
            if (e.shiftKey && (active === first || active === panelRef.current)) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && active === last) {
                e.preventDefault();
                first.focus();
            }
        };

        const desktopQuery = window.matchMedia('(min-width: 768px)');
        const onBreakpoint = (e: MediaQueryListEvent) => {
            if (e.matches) setIsOpen(false);
        };

        const frame = requestAnimationFrame(() => panelRef.current?.focus());
        window.addEventListener('keydown', onKeyDown);
        desktopQuery.addEventListener('change', onBreakpoint);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('keydown', onKeyDown);
            desktopQuery.removeEventListener('change', onBreakpoint);
            document.body.style.overflow = previousOverflow;
            lenis?.start();
        };
    }, [isOpen]);

    const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));
    const isHidden = hidden && !isOpen;

    return (
        <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-3 py-3 md:px-6 md:py-4">
            {/* Full-screen accessible mobile navigation; stays mounted so it can animate out, inert while closed. */}
            <div
                id="mobile-nav"
                ref={panelRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                aria-hidden={!isOpen}
                inert={!isOpen}
                data-lenis-prevent
                className={cn(
                    'fixed inset-0 flex flex-col justify-between overflow-y-auto bg-ink-bg px-6 pb-10 pt-28 text-ink-fg outline-none motion-reduce:transition-none md:hidden',
                    isOpen
                        ? `pointer-events-auto visible [clip-path:inset(0_0_0_0)] [transition:clip-path_0.65s_cubic-bezier(0.32,0.72,0,1),visibility_0s]`
                        : `invisible [clip-path:inset(0_0_100%_0)] [transition:clip-path_0.5s_cubic-bezier(0.32,0.72,0,1),visibility_0s_0.5s]`
                )}
            >
                <div className="absolute right-6 top-5">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-ink-fg transition-colors hover:border-ink-accent-ink hover:text-ink-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <ul className="space-y-4">
                    {navLinks.map((link, i) => {
                        const active = isActive(link.href);
                        return (
                            <li key={link.href} className="overflow-hidden">
                                <div
                                    className={cn(
                                        `transition-[transform,opacity] duration-700 ${EASE} motion-reduce:transition-none`,
                                        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                                    )}
                                    style={{ transitionDelay: isOpen ? `${200 + i * 80}ms` : '0ms' }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        aria-current={active ? 'page' : undefined}
                                        className="group flex items-baseline justify-between border-b border-ink-line/50 pb-4 font-wide text-[clamp(2.5rem,11vw,4.5rem)] font-extrabold uppercase tracking-tight transition-colors"
                                    >
                                        <span className="flex items-baseline gap-4">
                                            <span className="font-mono text-xs font-semibold text-ink-muted">{link.index}</span>
                                            <span
                                                className={cn(
                                                    'transition-colors duration-200',
                                                    active ? 'text-ink-accent-ink' : 'text-ink-fg group-hover:text-ink-accent-ink'
                                                )}
                                            >
                                                {link.label}
                                            </span>
                                        </span>
                                        {active && <span className="h-3 w-3 rounded-full bg-ink-accent-ink" aria-hidden="true" />}
                                    </Link>
                                </div>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-8 space-y-6 border-t border-ink-line pt-6">
                    <div className="grid grid-cols-2 gap-3">
                        <a
                            href={RESUME_HREF}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-12 items-center justify-center gap-2 rounded-full border border-ink-line text-xs font-semibold uppercase tracking-wider text-ink-fg transition-colors hover:border-ink-fg active:scale-[0.98]"
                        >
                            <FileText className="h-4 w-4" />
                            Resume
                        </a>
                        <a
                            href={CONTACT_HREF}
                            className="flex h-12 items-center justify-center gap-2 rounded-full bg-ink-accent text-xs font-semibold uppercase tracking-wider text-ink-on-accent transition-transform active:scale-[0.98]"
                        >
                            Hire Me
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>

                    <div className="flex items-center justify-between text-xs text-ink-muted">
                        <div className="flex gap-4">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex min-h-11 items-center gap-1.5 transition-colors hover:text-ink-fg"
                                >
                                    <Icon className="h-4 w-4" />
                                    {label}
                                </a>
                            ))}
                        </div>
                        <span className="label">Malang, ID</span>
                    </div>
                </div>
            </div>

            {/* Header bar: slides away on scroll down, back on scroll up. */}
            <div
                className={cn(
                    `pointer-events-auto relative w-full max-w-6xl transition-transform duration-500 ${EASE} motion-reduce:transition-none`,
                    isHidden ? '-translate-y-[120%]' : 'translate-y-0'
                )}
            >
                <nav
                    aria-label="Primary"
                    className={cn(
                        'relative flex h-14 items-center justify-between gap-3 overflow-hidden rounded-full border px-3 transition-[background-color,border-color,box-shadow] duration-300 md:h-16 md:px-4',
                        scrolled
                            ? 'border-ink-line bg-ink-bg/85 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
                            : 'border-ink-line/60 bg-ink-bg/60'
                    )}
                >
                    {/* Scroll progress */}
                    <span
                        ref={barRef}
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-ink-accent"
                    />

                    {/* Brand mark */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            aria-label="Bagus Hidayat, home"
                            className="group flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink"
                        >
                            <span
                                aria-hidden="true"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-accent font-wide text-xs font-extrabold tracking-wider text-ink-on-accent transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105"
                            >
                                HID
                            </span>
                            <span className="hidden flex-col sm:flex">
                                <span className="font-wide text-xs font-extrabold uppercase tracking-tight text-ink-fg">Bagus Hidayat</span>
                                <span className="font-mono text-[0.625rem] text-ink-muted">Software Engineer</span>
                            </span>
                        </Link>
                    </div>

                    {/* Navigation with a sliding active pill */}
                    <ul ref={listRef} className="relative hidden items-center gap-1 md:flex">
                        <span
                            ref={indicatorRef}
                            aria-hidden="true"
                            className={`pointer-events-none absolute left-0 top-0 h-10 rounded-full bg-ink-fg/[0.08] opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[transform,opacity] duration-500 ${EASE} motion-reduce:transition-none`}
                        />
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        aria-current={active ? 'page' : undefined}
                                        className={cn(
                                            'relative flex h-10 items-center gap-1.5 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink',
                                            active ? 'text-ink-fg' : 'text-ink-muted hover:bg-ink-fg/[0.05] hover:text-ink-fg'
                                        )}
                                    >
                                        <span className="font-mono text-[0.65rem] text-ink-muted">{link.index}</span>
                                        <span className="relative z-10">{link.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Right Action Tools */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />

                        <a
                            href={RESUME_HREF}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Download Resume PDF"
                            className="hidden items-center gap-1.5 rounded-full border border-ink-line px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-muted transition-colors duration-200 hover:border-ink-fg hover:text-ink-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink lg:inline-flex"
                        >
                            <FileText className="h-3.5 w-3.5" />
                            Resume
                        </a>

                        <div className="hidden sm:block">
                            <MagneticButton
                                href={CONTACT_HREF}
                                size="sm"
                                icon={ArrowUpRight}
                                iconDirection="diagonal"
                            >
                                Hire Me
                            </MagneticButton>
                        </div>

                        {/* Mobile Menu Toggle Button */}
                        <button
                            ref={toggleRef}
                            type="button"
                            onClick={() => setIsOpen((prev) => !prev)}
                            aria-expanded={isOpen}
                            aria-controls="mobile-nav"
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-ink-fg transition-colors hover:border-ink-accent-ink hover:text-ink-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink md:hidden"
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
