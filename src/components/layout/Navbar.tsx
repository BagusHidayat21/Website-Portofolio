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
import { ArrowUpRight, FileText, Github, Linkedin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { getLenis } from '@/components/providers/SmoothScroll';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
];

const socialLinks = [
    { icon: Github, href: 'https://github.com/BagusHidayat21', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/bagushidayat-id/', label: 'LinkedIn' },
];

const CONTACT_HREF = 'mailto:bagus.hidayat.id@gmail.com';
const RESUME_HREF = '/resume.pdf';
const SCROLL_THRESHOLD = 24;
const HIDE_AFTER = 320;

const indicatorSpring = { type: 'spring', stiffness: 380, damping: 30 } as const;
const entranceSpring = { type: 'spring', stiffness: 100, damping: 20 } as const;
const ease = [0.32, 0.72, 0, 1] as const;

const overlayVariants: Variants = {
    closed: { clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.6, ease } },
    open: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.75, ease } },
};

const overlayListVariants: Variants = {
    closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
};

const overlayItemVariants: Variants = {
    closed: { y: '110%', transition: { duration: 0.4, ease } },
    open: { y: '0%', transition: { duration: 0.9, ease } },
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

    // Close the menu on any route change (link tap, back/forward).
    if (prevPathname !== pathname) {
        setPrevPathname(pathname);
        setIsOpen(false);
        setHidden(false);
    }

    // Only flip state when a threshold or direction actually changes.
    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        const nextScrolled = latest > SCROLL_THRESHOLD;
        const nextHidden = latest > HIDE_AFTER && latest > previous;
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

        const desktop = window.matchMedia('(min-width: 768px)');
        const onBreakpoint = (e: MediaQueryListEvent) => {
            if (e.matches) setIsOpen(false);
        };

        const frame = requestAnimationFrame(() => panelRef.current?.focus());
        window.addEventListener('keydown', onKeyDown);
        desktop.addEventListener('change', onBreakpoint);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('keydown', onKeyDown);
            desktop.removeEventListener('change', onBreakpoint);
            document.body.style.overflow = previousOverflow;
            lenis?.start();
        };
    }, [isOpen]);

    const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));
    const pillHidden = hidden && !isOpen && !reduceMotion;

    return (
        <header className="pointer-events-none fixed inset-x-0 top-3 z-[100] flex justify-center px-4 md:top-4">
            {/* Full-screen mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="mobile-menu"
                        id="mobile-menu"
                        ref={panelRef}
                        tabIndex={-1}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Site menu"
                        data-lenis-prevent
                        variants={reduceMotion ? undefined : overlayVariants}
                        initial={reduceMotion ? { opacity: 0 } : 'closed'}
                        animate={reduceMotion ? { opacity: 1 } : 'open'}
                        exit={reduceMotion ? { opacity: 0 } : 'closed'}
                        className="pointer-events-auto fixed inset-0 flex flex-col justify-between overflow-y-auto bg-ink-bg px-5 pb-8 pt-28 text-ink-fg outline-none md:hidden"
                    >
                        <motion.ul variants={overlayListVariants} initial="closed" animate="open" exit="closed">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <li key={link.href} className="overflow-hidden">
                                        <motion.div variants={reduceMotion ? undefined : overlayItemVariants}>
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                aria-current={active ? 'page' : undefined}
                                                className="group flex items-center justify-between py-2 font-wide text-[clamp(3rem,15vw,5.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em]"
                                            >
                                                <span className={cn(active ? 'text-ink-fg' : 'text-outline text-ink-fg/70')}>
                                                    {link.label}
                                                </span>
                                                {active && (
                                                    <span className="h-3 w-3 rounded-full bg-ink-accent" aria-hidden="true" />
                                                )}
                                            </Link>
                                        </motion.div>
                                    </li>
                                );
                            })}
                        </motion.ul>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.6, ease } }}
                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                            className="mt-10 border-t border-ink-line pt-6"
                        >
                            <div className="grid grid-cols-2 gap-2">
                                <a
                                    href={RESUME_HREF}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-ink-line text-sm font-medium active:scale-[0.98]"
                                >
                                    <FileText className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                                    Resume
                                </a>
                                <a
                                    href={CONTACT_HREF}
                                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink-accent text-sm font-semibold text-ink-on-accent active:scale-[0.98]"
                                >
                                    Hire Me
                                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                                </a>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                {socialLinks.map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-ink-muted transition-colors hover:text-ink-fg"
                                    >
                                        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="pointer-events-auto relative w-full max-w-[56rem]"
                initial={reduceMotion ? false : { y: -24, opacity: 0 }}
                animate={{ y: pillHidden ? -110 : scrolled && !reduceMotion ? -4 : 0, opacity: 1 }}
                transition={entranceSpring}
            >
                <nav
                    aria-label="Primary"
                    className="glass-pill relative flex h-14 items-center justify-between gap-2 overflow-hidden rounded-full px-2"
                >
                    {/* Scrolled tint. Opacity-only so the pill never reflows. */}
                    <span
                        aria-hidden="true"
                        className={cn(
                            'pointer-events-none absolute inset-0 rounded-full bg-ink-bg/60 transition-opacity duration-300',
                            scrolled ? 'opacity-100' : 'opacity-0'
                        )}
                    />
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-ink-fg/25 to-transparent"
                    />
                    {/* Page scroll progress */}
                    <motion.span
                        aria-hidden="true"
                        style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-ink-accent"
                    />

                    <Link
                        href="/"
                        aria-label="Bagus Hidayat, home"
                        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-accent font-wide text-[0.625rem] font-extrabold tracking-[0.02em] text-ink-on-accent transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:rotate-[-8deg] hover:scale-105 active:scale-95"
                    >
                        HID
                    </Link>

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
                                            'relative flex h-10 items-center rounded-full px-4 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent',
                                            active ? 'text-ink-fg' : 'text-ink-muted hover:text-ink-fg'
                                        )}
                                    >
                                        {hovered === link.href && !active && (
                                            <motion.span
                                                layoutId="nav-hover"
                                                aria-hidden="true"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={indicatorSpring}
                                                className="absolute inset-0 rounded-full bg-ink-fg/[0.05]"
                                            />
                                        )}
                                        {active && (
                                            <motion.span
                                                layoutId="nav-active"
                                                aria-hidden="true"
                                                transition={indicatorSpring}
                                                className="absolute inset-0 rounded-full bg-ink-fg/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                                            />
                                        )}
                                        <span className="relative">{link.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="relative hidden items-center gap-1.5 md:flex">
                        <ThemeToggle />
                        <a
                            href={RESUME_HREF}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-ink-muted transition-colors duration-200 hover:text-ink-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent"
                        >
                            <FileText className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                            Resume
                        </a>
                        <MagneticButton href={CONTACT_HREF} size="sm" icon={ArrowUpRight} iconDirection="diagonal">
                            Hire Me
                        </MagneticButton>
                    </div>

                    <div className="relative flex items-center gap-1 md:hidden">
                        <ThemeToggle />
                        <button
                            ref={toggleRef}
                            type="button"
                            onClick={() => setIsOpen((open) => !open)}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            className="relative flex h-11 w-11 items-center justify-center rounded-full text-ink-fg transition-colors hover:bg-ink-fg/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent"
                        >
                            <span className="relative block h-4 w-[18px]" aria-hidden="true">
                                <motion.span
                                    className="absolute left-0 top-[4px] block h-[1.5px] w-full rounded-full bg-current"
                                    animate={isOpen ? { y: 3.25, rotate: 45 } : { y: 0, rotate: 0 }}
                                    transition={indicatorSpring}
                                />
                                <motion.span
                                    className="absolute left-0 top-[10.5px] block h-[1.5px] w-full rounded-full bg-current"
                                    animate={isOpen ? { y: -3.25, rotate: -45 } : { y: 0, rotate: 0 }}
                                    transition={indicatorSpring}
                                />
                            </span>
                        </button>
                    </div>
                </nav>
            </motion.div>
        </header>
    );
}
