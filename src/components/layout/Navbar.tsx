'use client';

import { ArrowUpRight, FileText, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef, useState } from 'react';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { site } from '@/config/site';
import { useHeaderScroll } from '@/hooks/useHeaderScroll';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [prevPathname, setPrevPathname] = useState(pathname);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const pillRef = useRef<HTMLSpanElement>(null);
    const { scrolled, hidden, progressRef } = useHeaderScroll();

    if (prevPathname !== pathname) {
        setPrevPathname(pathname);
        setMenuOpen(false);
    }

    const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

    const closeMenu = () => {
        setMenuOpen(false);
        toggleRef.current?.focus();
    };

    // Slide the active pill under the current link (transform only; width snaps without animating).
    useLayoutEffect(() => {
        const list = listRef.current;
        const pill = pillRef.current;
        if (!list || !pill) return;
        const place = () => {
            const active = list.querySelector<HTMLElement>('a[aria-current="page"]');
            pill.style.opacity = active ? '1' : '0';
            if (!active) return;
            pill.style.width = `${active.offsetWidth}px`;
            pill.style.transform = `translateX(${active.offsetLeft}px)`;
        };
        place();
        document.fonts.ready.then(place).catch(() => undefined);
        window.addEventListener('resize', place);
        return () => window.removeEventListener('resize', place);
    }, [pathname]);

    return (
        <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-3 py-3 md:px-6 md:py-4">
            <MobileMenu open={menuOpen} onClose={closeMenu} isActive={isActive} />

            <div
                className={cn(
                    'pointer-events-auto relative w-full max-w-6xl transition-transform duration-500 ease-expo motion-reduce:transition-none',
                    hidden && !menuOpen ? '-translate-y-[120%]' : 'translate-y-0'
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
                    <span ref={progressRef} aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-ink-accent" />

                    <Link
                        href="/"
                        aria-label="Bagus Hidayat, home"
                        className="group flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink"
                    >
                        <span
                            aria-hidden="true"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-accent font-wide text-xs tracking-wider text-ink-on-accent transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105"
                        >
                            HID
                        </span>
                        <span className="hidden flex-col sm:flex">
                            <span className="font-wide text-xs uppercase tracking-tight">Bagus Hidayat</span>
                            <span className="font-mono text-[0.625rem] text-ink-muted">Software Engineer</span>
                        </span>
                    </Link>

                    <ul ref={listRef} className="relative hidden items-center gap-1 md:flex">
                        <span
                            ref={pillRef}
                            aria-hidden="true"
                            className="pointer-events-none absolute left-0 top-0 h-10 rounded-full bg-ink-fg/[0.08] opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[transform,opacity] duration-500 ease-expo motion-reduce:transition-none"
                        />
                        {site.nav.map((link) => {
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
                                        <span className="relative">{link.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <a
                            href={site.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Download Resume PDF"
                            className="hidden items-center gap-1.5 rounded-full border border-ink-line px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-muted transition-colors duration-200 hover:border-ink-fg hover:text-ink-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink lg:inline-flex"
                        >
                            <FileText className="h-3.5 w-3.5" />
                            Resume
                        </a>
                        <div className="hidden sm:block">
                            <MagneticButton href={`mailto:${site.email}`} size="sm" icon={<ArrowUpRight />}>
                                Hire Me
                            </MagneticButton>
                        </div>
                        <button
                            ref={toggleRef}
                            type="button"
                            onClick={() => setMenuOpen((open) => !open)}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-nav"
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-line transition-colors hover:border-ink-accent-ink hover:text-ink-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink md:hidden"
                        >
                            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
