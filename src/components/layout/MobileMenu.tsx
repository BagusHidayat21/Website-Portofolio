'use client';

import { ArrowUpRight, FileText, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
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

/** Full-screen menu: stays mounted so it can animate out, inert while closed, traps focus while open. */
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
                'fixed inset-0 flex flex-col justify-between overflow-y-auto bg-ink-bg px-6 pb-10 pt-28 outline-none motion-reduce:transition-none md:hidden',
                open
                    ? 'pointer-events-auto visible [clip-path:inset(0_0_0_0)] [transition:clip-path_0.65s_var(--ease-expo),visibility_0s]'
                    : 'invisible [clip-path:inset(0_0_100%_0)] [transition:clip-path_0.5s_var(--ease-expo),visibility_0s_0.5s]'
            )}
        >
            <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="absolute right-6 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-ink-line transition-colors hover:border-ink-accent-ink hover:text-ink-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink"
            >
                <X className="h-5 w-5" />
            </button>

            <ul className="space-y-4">
                {site.nav.map((link, i) => {
                    const active = isActive(link.href);
                    return (
                        <li key={link.href} className="overflow-hidden">
                            <div
                                className={cn(
                                    'transition-[transform,opacity] duration-700 ease-expo motion-reduce:transition-none',
                                    open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                                )}
                                style={{ transitionDelay: open ? `${200 + i * 80}ms` : '0ms' }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={onClose}
                                    aria-current={active ? 'page' : undefined}
                                    className="group flex items-baseline justify-between border-b border-ink-line/50 pb-4 font-wide text-[clamp(2.5rem,11vw,4.5rem)] uppercase tracking-tight"
                                >
                                    <span className="flex items-baseline gap-4">
                                        <span className="font-mono text-xs font-semibold text-ink-muted">{link.index}</span>
                                        <span className={cn('transition-colors duration-200', active ? 'text-ink-accent-ink' : 'group-hover:text-ink-accent-ink')}>{link.label}</span>
                                    </span>
                                    {active ? <span aria-hidden="true" className="h-3 w-3 rounded-full bg-ink-accent-ink" /> : null}
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </ul>

            <div className="mt-8 space-y-6 border-t border-ink-line pt-6">
                <div className="grid grid-cols-2 gap-3">
                    <a
                        href={site.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 items-center justify-center gap-2 rounded-full border border-ink-line text-xs font-semibold uppercase tracking-wider transition-colors hover:border-ink-fg active:scale-[0.98]"
                    >
                        <FileText className="h-4 w-4" />
                        Resume
                    </a>
                    <a
                        href={`mailto:${site.email}`}
                        className="flex h-12 items-center justify-center gap-2 rounded-full bg-ink-accent text-xs font-semibold uppercase tracking-wider text-ink-on-accent transition-transform active:scale-[0.98]"
                    >
                        Hire Me
                        <ArrowUpRight className="h-4 w-4" />
                    </a>
                </div>

                <div className="flex items-center justify-between text-xs text-ink-muted">
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
