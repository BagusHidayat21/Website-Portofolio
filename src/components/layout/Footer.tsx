import { ArrowUpRight, FileText, Mail } from 'lucide-react';
import Link from 'next/link';
import { socialIcons } from '@/components/shared/SocialIcon';
import { site } from '@/config/site';
import { getProfile } from '@/lib/content';
import { CopyEmailPill, ScrollTopButton } from './footer/FooterActions';
import { InView } from './footer/InView';
import { LocalClock } from './footer/LocalClock';

const TECH = ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Laravel', 'Python'];
const STRIP = ['Bagus Hidayat', 'Full stack engineering', 'Data and machine learning', 'Industrial mentoring', 'Malang, Indonesia'];

const linkRow = 'group inline-flex min-h-11 items-center gap-2.5 text-sm text-ink-muted transition-colors hover:text-ink-fg';
const arrow = 'h-3 w-3 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5';

export function Footer() {
    const profile = getProfile();
    const status = profile.isAvailableForWork ? 'Available for new work' : `At ${profile.currentCompany}, open to collaborations`;

    return (
        <footer className="relative z-10 w-full border-t border-ink-line bg-ink-bg-2">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-ink-accent/[0.04] to-transparent" />

            <div className="page-x relative pb-12 pt-16 md:pt-24">
                <div className="label flex flex-wrap items-center justify-between gap-4 border-b border-ink-line pb-8 text-ink-muted">
                    <div className="flex items-center gap-2.5">
                        <span aria-hidden="true" className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-ink-accent opacity-75 animate-ping [animation-iteration-count:3]" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-ink-accent" />
                        </span>
                        <span className="text-ink-fg">{status}</span>
                    </div>
                    <div className="flex items-center gap-4 normal-case tracking-normal">
                        <span>MALANG, ID · WIB (UTC+7)</span>
                        <LocalClock />
                    </div>
                </div>

                <div className="mt-12 md:mt-16">
                    <p className="label text-ink-muted">Contact</p>
                    <div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                        <h2 className="max-w-3xl font-wide text-[clamp(1.75rem,5.5vw,5rem)] uppercase leading-[0.88] tracking-[-0.04em]">
                            Start a <span className="text-ink-accent-ink">conversation.</span>
                        </h2>
                        <div className="flex max-w-full flex-wrap items-center gap-3">
                            <CopyEmailPill email={profile.email} />
                            <a
                                href={`mailto:${profile.email}`}
                                aria-label="Send email"
                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink-accent text-ink-on-accent transition-transform duration-500 ease-expo hover:rotate-45 sm:h-14 sm:w-14"
                            >
                                <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-12 border-t border-ink-line pt-14 md:mt-20 md:grid-cols-12 md:gap-8">
                    <div className="space-y-4 md:col-span-5">
                        <p className="font-wide text-2xl uppercase tracking-tight">
                            {profile.name}
                            <span className="text-ink-accent-ink">.</span>
                        </p>
                        <p className="max-w-md text-sm leading-relaxed text-ink-muted">{profile.bio}</p>
                        <p className="font-mono text-xs text-ink-muted">
                            Currently working at <span className="text-ink-fg">{profile.currentCompany}</span>.
                        </p>
                        <ul className="flex flex-wrap gap-1.5 pt-2">
                            {TECH.map((tech) => (
                                <li key={tech} className="rounded-full border border-ink-line bg-ink-fg/[0.03] px-3 py-1 font-mono text-[11px] text-ink-muted">
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-8 md:col-span-6 md:col-start-7">
                        <nav aria-label="Footer" className="space-y-4">
                            <p className="label text-ink-muted">Pages</p>
                            <ul className="space-y-0.5">
                                {site.nav.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={`${linkRow} gap-3 font-medium`}>
                                            <span className="font-mono text-xs transition-colors group-hover:text-ink-accent-ink">{link.index}</span>
                                            {link.label}
                                            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className={`${linkRow} gap-3 font-medium`}>
                                        <span className="font-mono text-xs transition-colors group-hover:text-ink-accent-ink">04</span>
                                        Resume
                                        <FileText className="h-3.5 w-3.5 transition-colors group-hover:text-ink-fg" />
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        <div className="space-y-4">
                            <p className="label text-ink-muted">Elsewhere</p>
                            <ul className="space-y-0.5">
                                {site.socials.map(({ platform, url }) => {
                                    const Icon = socialIcons[platform];
                                    return (
                                        <li key={platform}>
                                            <a href={url} target="_blank" rel="noopener noreferrer" className={linkRow}>
                                                <Icon className="h-4 w-4" />
                                                {platform}
                                                <ArrowUpRight className={arrow} />
                                            </a>
                                        </li>
                                    );
                                })}
                                <li>
                                    <a href={`mailto:${profile.email}`} className={linkRow}>
                                        <Mail className="h-4 w-4" />
                                        Email
                                        <ArrowUpRight className={arrow} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <InView className="mt-16 overflow-hidden border-t border-ink-line py-5">
                    <div aria-hidden="true" className="label marquee-strip select-none items-center gap-8 whitespace-nowrap text-ink-muted motion-reduce:animate-none">
                        {[...STRIP, ...STRIP].map((item, i) => (
                            <span key={`${item}-${i}`} className="flex items-center gap-8">
                                {item}
                                <span className="text-ink-accent-ink">/</span>
                            </span>
                        ))}
                    </div>
                </InView>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-ink-line pt-8 text-xs text-ink-muted sm:flex-row">
                    <p>
                        © {new Date().getFullYear()} {profile.name}, Malang, Indonesia.
                    </p>
                    <p className="hidden md:block">Built with Next.js, Tailwind CSS and GSAP.</p>
                    <ScrollTopButton />
                </div>
            </div>
        </footer>
    );
}
