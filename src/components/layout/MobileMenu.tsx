'use client';

import { ArrowUpRight, FileText, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, type CSSProperties } from 'react';
import { socialIcons } from '@/components/shared/SocialIcon';
import { site } from '@/config/site';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { lockScroll } from '@/lib/scroll';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
    isActive: (href: string) => boolean;
}

const delay = (open: boolean, ms: number) => ({ transitionDelay: open ? `${ms}ms` : '0ms' }) as CSSProperties;

export function MobileMenu({ open, onClose, isActive }: MobileMenuProps) {
    const panel = useRef<HTMLDivElement>(null);
    useFocusTrap(panel, open, onClose);

    useEffect(() => {
        if (!open) return;
        const release = lockScroll();
        const desktop = window.matchMedia('(min-width: 768px)');
        const onBreakpoint = (e: MediaQueryListEvent) => e.matches && onClose();
        desktop.addEventListener('change', onBreakpoint);
        return () => {
            release();
            desktop.removeEventListener('change', onBreakpoint);
        };
    }, [open, onClose]);

    const activeIndex = site.nav.find((link) => isActive(link.href))?.index ?? '00';
    const enter = open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0';

    return (
        <div
            id="mobile-nav"
            ref={panel}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            aria-hidden={!open}
            inert={!open}
            data-lenis-prevent
            className={cn(
                'fixed inset-0 isolate flex flex-col overflow-y-auto overflow-x-hidden bg-ink-bg px-6 pb-8 pt-24 outline-none motion-reduce:transition-none md:hidden',
                open
                    ? 'pointer-events-auto visible [clip-path:circle(150%_at_calc(100%_-_2.875rem)_2.5rem)] [transition:clip-path_0.8s_var(--ease-expo),visibility_0s]'
                    : 'invisible [clip-path:circle(0%_at_calc(100%_-_2.875rem)_2.5rem)] [transition:clip-path_0.55s_var(--ease-expo),visibility_0s_0.55s]'
            )}
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--ink-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--ink-line)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_75%)]" />
                <div
                    className={cn(
                        'absolute -right-24 -top-24 h-80 w-80 rounded-full bg-ink-accent/25 blur-3xl transition-[transform,opacity] duration-1000 ease-expo motion-reduce:transition-none',
                        open ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                    )}
                />
                <span
                    style={delay(open, 350)}
                    className={cn(
                        'text-outline absolute -bottom-6 -right-4 select-none font-wide text-[11rem] leading-none opacity-[0.12] transition-[transform,opacity] duration-1000 ease-expo motion-reduce:transition-none',
                        open ? 'translate-x-0' : 'translate-x-1/3 !opacity-0'
                    )}
                >
                    {activeIndex}
                </span>
            </div>

            <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="absolute right-6 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-ink-line transition-colors hover:border-ink-accent-ink hover:text-ink-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink"
            >
                <X className="h-5 w-5" />
            </button>

            <div style={delay(open, 150)} className={cn('label mb-4 flex items-center justify-between text-ink-muted transition-[transform,opacity] duration-500 ease-expo', enter)}>
                <span>Navigation</span>
                <span className="font-mono">({String(site.nav.length).padStart(2, '0')})</span>
            </div>

            <nav aria-label="Mobile" className="flex flex-1 items-center justify-center py-10">
                <ul className="flex flex-col items-center gap-3 text-center">
                    {site.nav.map((link, i) => {
                        const active = isActive(link.href);
                        return (
                            <li key={link.href} className="overflow-hidden px-2 pb-1">
                                <div
                                    className={cn(
                                        'transition-[transform,opacity] duration-700 ease-expo motion-reduce:transition-none',
                                        open ? 'translate-y-0 rotate-0 opacity-100' : 'translate-y-full rotate-[5deg] opacity-0'
                                    )}
                                    style={delay(open, 220 + i * 90)}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={onClose}
                                        aria-current={active ? 'page' : undefined}
                                        className="group flex flex-col items-center gap-2 rounded-2xl px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink"
                                    >
                                        <span className={cn('font-mono text-[0.65rem] font-semibold tracking-[0.3em]', active ? 'text-ink-accent-ink' : 'text-ink-muted')}>
                                            {link.index}
                                            {active ? ' / HERE' : ''}
                                        </span>
                                        <span className="relative block overflow-hidden font-wide text-[clamp(2rem,9.5vw,3.75rem)] uppercase leading-[1.1] tracking-tight">
                                            <span
                                                className={cn(
                                                    'block transition-transform duration-500 ease-expo group-hover:-translate-y-full group-active:-translate-y-full motion-reduce:transition-none',
                                                    active && 'text-ink-accent-ink'
                                                )}
                                            >
                                                {link.label}
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0 block translate-y-full text-ink-accent-ink transition-transform duration-500 ease-expo group-hover:translate-y-0 group-active:translate-y-0 motion-reduce:transition-none"
                                            >
                                                {link.label}
                                            </span>
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className={cn(
                                                'h-[3px] w-full origin-center rounded-full bg-ink-accent transition-transform duration-500 ease-expo motion-reduce:transition-none',
                                                active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50 group-active:scale-x-50'
                                            )}
                                        />
                                    </Link>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="space-y-5 border-t border-ink-line pt-6">
                <a
                    href={`mailto:${site.email}`}
                    style={delay(open, 520)}
                    className={cn('block text-center font-mono text-sm text-ink-muted underline-offset-4 transition-[transform,opacity,color] duration-500 ease-expo hover:text-ink-fg hover:underline', enter)}
                >
                    {site.email}
                </a>

                <div style={delay(open, 580)} className={cn('grid grid-cols-2 gap-3 transition-[transform,opacity] duration-500 ease-expo', enter)}>
                    <a
                        href={site.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-pill flex h-12 items-center justify-center gap-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-[border-color,transform] hover:border-ink-fg active:scale-[0.97]"
                    >
                        <FileText className="h-4 w-4" />
                        Resume
                    </a>
                    <a
                        href={`mailto:${site.email}`}
                        className="group flex h-12 items-center justify-center gap-2 rounded-full bg-ink-accent text-xs font-semibold uppercase tracking-wider text-ink-on-accent shadow-[0_12px_30px_-12px_var(--ink-accent)] transition-transform active:scale-[0.97]"
                    >
                        Hire Me
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                    </a>
                </div>

                <div style={delay(open, 640)} className={cn('flex items-center justify-between text-xs text-ink-muted transition-[transform,opacity] duration-500 ease-expo', enter)}>
                    <div className="flex gap-4">
                        {site.socials
                            .filter((s) => s.platform !== 'Instagram')
                            .map(({ platform, url }) => {
                                const Icon = socialIcons[platform];
                                return (
                                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-1.5 transition-colors hover:text-ink-fg">
                                        <Icon className="h-4 w-4" />
                                        {platform}
                                    </a>
                                );
                            })}
                    </div>
                    <span className="label">Malang, ID</span>
                </div>
            </div>
        </div>
    );
}
