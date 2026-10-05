'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    motion,
    AnimatePresence,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    type Variants,
} from 'framer-motion';
import { ArrowUpRight, FileText, Github, Linkedin, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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

const springConfig = { type: 'spring', stiffness: 380, damping: 30 } as const;
const easeCurve = [0.32, 0.72, 0, 1] as const;

const overlayVariants: Variants = {
    closed: { clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.5, ease: easeCurve } },
    open: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.65, ease: easeCurve } },
};

const overlayListVariants: Variants = {
    closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const overlayItemVariants: Variants = {
    closed: { y: '100%', opacity: 0, transition: { duration: 0.35, ease: easeCurve } },
    open: { y: '0%', opacity: 1, transition: { duration: 0.7, ease: easeCurve } },
};

export function Navbar() {
    const pathname = usePathname();
    const reduceMotion = useReducedMotion();
    const { scrollY, scrollYProgress } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hovered, setHovered] = useState<string | null>(null);
    const [prevPathname, setPrevPathname] = useState(pathname);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    if (prevPathname !== pathname) {
        setPrevPathname(pathname);
        setIsOpen(false);
        setHidden(false);
    }

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        const nextScrolled = latest > SCROLL_THRESHOLD;
        const nextHidden = latest > HIDE_AFTER && latest > previous && !isOpen;
        setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
        setHidden((prev) => (prev === nextHidden ? prev : nextHidden));
    });

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
            }
        };

        const desktopQuery = window.matchMedia('(min-width: 1024px)');
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
    const isHidden = hidden && !isOpen && !reduceMotion;

    return (
        <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-3 py-3 md:px-6 md:py-4">
            {/* Full-screen accessible mobile navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="mobile-nav"
                        id="mobile-nav"
                        ref={panelRef}
                        tabIndex={-1}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Site Navigation"
                        data-lenis-prevent
                        variants={reduceMotion ? undefined : overlayVariants}
                        initial={reduceMotion ? { opacity: 0 } : 'closed'}
                        animate={reduceMotion ? { opacity: 1 } : 'open'}
                        exit={reduceMotion ? { opacity: 0 } : 'closed'}
                        className="pointer-events-auto fixed inset-0 flex flex-col justify-between overflow-y-auto bg-ink-bg px-6 pb-10 pt-28 text-ink-fg outline-none lg:hidden"
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

                        <motion.ul
                            variants={overlayListVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="space-y-4"
                        >
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <li key={link.href} className="overflow-hidden">
                                        <motion.div variants={reduceMotion ? undefined : overlayItemVariants}>
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                aria-current={active ? 'page' : undefined}
                                                className="group flex items-baseline justify-between border-b border-ink-line/50 pb-4 font-wide text-[clamp(2.5rem,11vw,4.5rem)] font-extrabold uppercase tracking-tight transition-colors"
                                            >
                                                <div className="flex items-baseline gap-4">
                                                    <span className="font-mono text-xs font-semibold text-ink-muted">
                                                        {link.index}
                                                    </span>
                                                    <span className={cn(
                                                        'transition-colors duration-200',
                                                        active ? 'text-ink-accent-ink' : 'text-ink-fg group-hover:text-ink-accent-ink'
                                                    )}>
                                                        {link.label}
                                                    </span>
                                                </div>
                                                {active && (
                                                    <span className="h-3 w-3 rounded-full bg-ink-accent" aria-hidden="true" />
                                                )}
                                            </Link>
                                        </motion.div>
                                    </li>
                                );
                            })}
                        </motion.ul>

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
                                            className="flex items-center gap-1.5 transition-colors hover:text-ink-fg"
                                        >
                                            <Icon className="h-4 w-4" />
                                            {label}
                                        </a>
                                    ))}
                                </div>
                                <span className="font-mono text-[0.7rem]">MALANG, ID</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop and Tablet Architectural Header */}
            <motion.div
                className="pointer-events-auto relative w-full max-w-6xl"
                initial={reduceMotion ? false : { y: -24, opacity: 0 }}
                animate={{ y: isHidden ? -100 : 0, opacity: 1 }}
                transition={springConfig}
            >
                <nav
                    aria-label="Primary"
                    className={cn(
                        'relative flex h-14 items-center justify-between gap-3 overflow-hidden rounded-full border px-3 transition-all duration-300 md:h-16 md:px-4',
                        scrolled
                            ? 'border-ink-line bg-ink-bg/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
                            : 'border-ink-line/60 bg-ink-bg/50 backdrop-blur-md'
                    )}
                >
                    {/* Real-time scroll indicator bar */}
                    <motion.span
                        aria-hidden="true"
                        style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-ink-accent"
                    />

                    {/* Brand Mark */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            aria-label="Bagus Hidayat Homepage"
                            className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink rounded-full"
                        >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-accent font-wide text-xs font-extrabold tracking-wider text-ink-on-accent transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-6deg]">
                                HID
                            </span>
                            <div className="hidden flex-col sm:flex">
                                <span className="font-wide text-xs font-extrabold uppercase tracking-tight text-ink-fg">
                                    Bagus Hidayat
                                </span>
                                <span className="font-mono text-[0.625rem] text-ink-muted">
                                    Software Engineer
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation Items with Spring Hover & Active States */}
                    <ul
                        className="relative hidden items-center gap-1 md:flex"
                        onMouseLeave={() => setHovered(null)}
                    >
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        aria-current={active ? 'page' : undefined}
                                        onMouseEnter={() => setHovered(link.href)}
                                        onFocus={() => setHovered(link.href)}
                                        onBlur={() => setHovered(null)}
                                        className={cn(
                                            'relative flex h-10 items-center gap-1.5 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink',
                                            active ? 'text-ink-fg' : 'text-ink-muted hover:text-ink-fg'
                                        )}
                                    >
                                        <span className="font-mono text-[0.65rem] text-ink-muted/80">
                                            {link.index}
                                        </span>
                                        <span className="relative z-10">{link.label}</span>

                                        {hovered === link.href && !active && (
                                            <motion.span
                                                layoutId="nav-hover"
                                                aria-hidden="true"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={springConfig}
                                                className="absolute inset-0 rounded-full bg-ink-fg/[0.05]"
                                            />
                                        )}

                                        {active && (
                                            <motion.span
                                                layoutId="nav-active"
                                                aria-hidden="true"
                                                transition={springConfig}
                                                className="absolute inset-0 rounded-full bg-ink-fg/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                                            />
                                        )}
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
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-line text-ink-fg transition-colors hover:border-ink-accent-ink hover:text-ink-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink md:hidden"
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </nav>
            </motion.div>
        </header>
    );
}
