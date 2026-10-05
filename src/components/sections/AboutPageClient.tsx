'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowUpRight,
    Database,
    FileText,
    Github,
    GraduationCap,
    HeartHandshake,
    Instagram,
    Linkedin,
    Shield,
    Target,
    Zap,
    type LucideIcon,
} from 'lucide-react';
import { useRef } from 'react';
import { ExperienceClient } from '@/components/sections/ExperienceClient';
import { KineticHero } from '@/components/sections/KineticHero';
import { ScrollWords } from '@/components/sections/ScrollWords';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { type AboutContent, type Education, type Experience, type Profile } from '@/data/static-db';
import { useReveal } from '@/hooks/useReveal';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import { applyParallax, MOTION_OK } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface AboutPageClientProps {
    profile: Profile;
    aboutContent: AboutContent;
    experience: Experience[];
    education: Education[];
    marqueeItems: string[];
}

// Philosophy icons come from data; only icons that match each principle are mapped.
const PRINCIPLE_ICONS: Record<string, LucideIcon> = { Database, GraduationCap, HeartHandshake, Target, Shield };
const SOCIAL_ICONS: Record<string, LucideIcon> = { GitHub: Github, LinkedIn: Linkedin, Instagram };
const STACK_MOTION = '(min-width: 768px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)';

export function AboutPageClient({ profile, aboutContent, experience, education, marqueeItems }: AboutPageClientProps) {
    const root = useRef<HTMLDivElement>(null);
    const educationRef = useRef<HTMLElement>(null);
    useReveal(root, '.ab-story > *, .pp-rise');
    useReveal(educationRef, '.ed-card');

    const experienceItems = experience
        .filter((e) => e.isVisible)
        .sort((a, b) => a.order - b.order)
        .map(({ id, title, company, year, description, skills, category, url }) => ({
            id,
            title,
            company,
            year,
            description,
            skills,
            category: category ?? 'Work',
            url,
        }));

    const educationItems = education.filter((e) => e.isVisible).sort((a, b) => a.order - b.order);
    const story = aboutContent.storyContent.split('\n\n');
    const principles = aboutContent.philosophy;
    const currentRole = experienceItems.find((e) => e.category === 'Work')?.title;
    // Closing lines of the story become the scroll-lit statement, as on the home manifesto.
    const statement = story[story.length - 1].split(/(?<=\.)\s/).slice(-2).join(' ');

    useLazyGSAP(
        ({ gsap }) => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                // Portrait: frame opens up while the photo drifts the other way.
                gsap.fromTo(
                    '.ab-photo',
                    { yPercent: -12, scale: 1.2 },
                    {
                        yPercent: 12,
                        scale: 1.2,
                        ease: 'none',
                        scrollTrigger: { trigger: '.ab-frame', start: 'top bottom', end: 'bottom top', scrub: true },
                    }
                );
                gsap.fromTo(
                    '.ab-frame',
                    { clipPath: 'inset(18% 12% 18% 12% round 2rem)' },
                    {
                        clipPath: 'inset(0% 0% 0% 0% round 2rem)',
                        ease: 'none',
                        scrollTrigger: { trigger: '.ab-frame', start: 'top 95%', end: 'top 35%', scrub: true },
                    }
                );

                // Principles heading settles on the container edge; cards rise in once.
                gsap.fromTo(
                    '.pp-heading',
                    { xPercent: 8 },
                    {
                        xPercent: 0,
                        ease: 'none',
                        scrollTrigger: { trigger: '.pp-section', start: 'top bottom', end: 'top 30%', scrub: true },
                    }
                );
                applyParallax(gsap, root.current);
            });

            mm.add(STACK_MOTION, () => {
                // Each card recedes under the next with an opaque shade, so stacked cards never show through.
                const cards = gsap.utils.toArray<HTMLElement>('.pp-card');
                cards.forEach((card, i) => {
                    const next = cards[i + 1];
                    if (!next) return;
                    const range = { trigger: next, start: 'top bottom', end: 'top 25%', scrub: true };
                    gsap.to(card.querySelector('.pp-inner'), { scale: 0.94, ease: 'none', scrollTrigger: range });
                    gsap.fromTo(card.querySelector('.pp-shade'), { opacity: 0 }, { opacity: 0.55, ease: 'none', scrollTrigger: range });
                });
            });

            return () => mm.revert();
        },
        root, { target: '.ab-story' }
    );

    return (
        <>
            <div ref={root}>
            <KineticHero
                lines={[aboutContent.heroTitle, aboutContent.heroSubtitle]}
                srTitle={`About ${profile.name}`}
                pill={profile.currentCompany ? `Currently at ${profile.currentCompany}` : 'About'}
                pillLive={profile.isAvailableForWork}
                meta={profile.location}
                kicker={currentRole}
                intro={aboutContent.heroDescription}
                density={0.6}
                actions={
                    <>
                        <MagneticButton href={profile.resumeUrl} external size="lg" icon={FileText}>
                            Download Resume
                        </MagneticButton>
                        <MagneticButton
                            href={`mailto:${profile.email}`}
                            size="lg"
                            variant="secondary"
                            icon={ArrowUpRight}
                            iconDirection="diagonal"
                        >
                            Say Hello
                        </MagneticButton>
                    </>
                }
            />

            {marqueeItems.length > 0 && <TechMarquee items={marqueeItems} />}

            <section aria-labelledby="story-heading" className="relative overflow-hidden pt-14 text-ink-fg sm:pt-20 md:pt-28">
                <div className="page-x">
                    <div className="label mb-6 flex items-center gap-2 text-ink-muted">
                        <span className="h-1.5 w-1.5 rounded-full bg-ink-accent-ink" aria-hidden="true" />
                        <span>In short</span>
                    </div>
                    <ScrollWords text={statement} highlight={['make', 'sense']} />
                </div>

                <div className="page-x mt-16 grid grid-cols-1 gap-16 pb-32 sm:mt-20 md:mt-28 md:pb-48 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-5" data-speed="-0.4">
                        <div className="shell">
                            <div className="ab-frame relative aspect-[4/5] overflow-hidden shell-core bg-ink-bg-2">
                                <Image
                                    src={profile.avatarUrl}
                                    alt={`Portrait of ${profile.name}`}
                                    fill
                                    sizes="(min-width: 1024px) 40vw, 100vw"
                                    className="ab-photo object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <p className="label absolute inset-x-6 bottom-6 text-white/85">
                                    {profile.location}
                                    {profile.currentCompany ? `, ${profile.currentCompany}` : ''}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="ab-story flex flex-col justify-end lg:col-span-6 lg:col-start-7">
                        <h2
                            id="story-heading"
                            className="font-wide text-[clamp(1.75rem,3.6vw,3.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em]"
                        >
                            {aboutContent.storyTitle}
                            <span className="text-ink-accent-ink">.</span>
                        </h2>
                        <div className="mt-8 space-y-6">
                            {story.map((paragraph, i) => (
                                <p key={i} className="max-w-[58ch] text-lg leading-relaxed text-ink-muted">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <ul className="mt-10 flex flex-wrap gap-2">
                            {aboutContent.tags.map((tag) => (
                                <li key={tag} className="chip text-ink-fg/80">
                                    {tag}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-12 flex flex-wrap items-center gap-3">
                            {profile.socials.map((social) => {
                                const Icon = SOCIAL_ICONS[social.platform];
                                return (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.platform}
                                        className="flex h-14 w-14 items-center justify-center rounded-full border border-ink-line text-ink-fg transition-colors hover:bg-ink-fg hover:text-ink-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink"
                                    >
                                        {Icon ? <Icon className="h-5 w-5" strokeWidth={1.75} /> : social.platform}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </section>

            {/* Sticky cards need an ancestor without overflow clipping, so this sits outside the hero section. */}
            <section aria-labelledby="principles-heading" className="pp-section relative pb-20 text-ink-fg sm:pb-32 md:pb-48">
                <div className="page-x overflow-hidden">
                    <p className="label text-ink-muted">How I work</p>
                    <h2
                        id="principles-heading"
                        className="pp-heading mt-4 font-wide text-[clamp(2.25rem,6.5vw,5.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em]"
                    >
                        Principles<span className="text-ink-accent-ink">.</span>
                    </h2>
                </div>

                <ol className="mx-auto mt-12 w-full max-w-6xl px-4 sm:px-6 md:mt-20 lg:px-10">
                    {principles.map((item, i) => {
                        const current = i === 0;
                        const Icon = PRINCIPLE_ICONS[item.icon] ?? Zap;
                        return (
                            <li
                                key={item.title}
                                className="pp-card mb-6 last:mb-0 [@media(min-width:768px)_and_(min-height:700px)]:sticky [@media(min-width:768px)_and_(min-height:700px)]:mb-[10vh]"
                                style={{ top: `calc(6rem + ${i * 1}rem)` }}
                            >
                                <article className="pp-inner shell relative origin-top">
                                    <div
                                        className={cn(
                                            'shell-core grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-12 md:gap-10 md:p-10',
                                            current ? 'bg-ink-accent text-ink-on-accent' : 'bg-ink-bg-2 text-ink-fg'
                                        )}
                                    >
                                        <div className="flex flex-col gap-6 md:col-span-5">
                                            <div className="flex items-center justify-between gap-4">
                                                <p className="pp-rise label">
                                                    {String(i + 1).padStart(2, '0')} / {String(principles.length).padStart(2, '0')}
                                                </p>
                                                <span
                                                    className={cn(
                                                        'pp-rise flex h-12 w-12 items-center justify-center rounded-full',
                                                        current ? 'bg-black/10' : 'bg-ink-fg/[0.06]'
                                                    )}
                                                    aria-hidden="true"
                                                >
                                                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                                                </span>
                                            </div>
                                            <h3 className="pp-rise font-wide text-[clamp(1.5rem,3vw,2.75rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em] [overflow-wrap:anywhere]">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div className="flex min-w-0 flex-col gap-6 md:col-span-7">
                                            <p
                                                className={cn(
                                                    'pp-rise max-w-[56ch] text-lg leading-relaxed',
                                                    current ? 'text-black/75' : 'text-ink-muted'
                                                )}
                                            >
                                                {item.description}
                                            </p>
                                            {item.proof.length > 0 && (
                                                <div className="pp-rise">
                                                    <p className={cn('label', current ? 'text-black/60' : 'text-ink-muted')}>In practice</p>
                                                    <ul
                                                        className={cn(
                                                            'mt-3 border-t',
                                                            current ? 'border-black/15' : 'border-ink-line'
                                                        )}
                                                    >
                                                        {item.proof.map((proof) => {
                                                            const rowClass = cn(
                                                                'flex min-h-12 items-center justify-between gap-4 border-b py-3 text-[0.9375rem] font-medium',
                                                                current ? 'border-black/15' : 'border-ink-line'
                                                            );
                                                            const external = proof.href?.startsWith('http');
                                                            const content = (
                                                                <>
                                                                    <span>{proof.label}</span>
                                                                    {proof.href && (
                                                                        <ArrowUpRight
                                                                            className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                                                            strokeWidth={1.75}
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                </>
                                                            );
                                                            return (
                                                                <li key={proof.label}>
                                                                    {!proof.href ? (
                                                                        <span className={rowClass}>{content}</span>
                                                                    ) : external ? (
                                                                        <a
                                                                            href={proof.href}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className={cn(rowClass, 'group')}
                                                                        >
                                                                            {content}
                                                                        </a>
                                                                    ) : (
                                                                        <Link href={proof.href} className={cn(rowClass, 'group')}>
                                                                            {content}
                                                                        </Link>
                                                                    )}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        aria-hidden="true"
                                        className="pp-shade pointer-events-none absolute inset-0 rounded-[2.25rem] bg-ink-bg opacity-0"
                                    />
                                </article>
                            </li>
                        );
                    })}
                </ol>
            </section>
            </div>

            {experienceItems.length > 0 && <ExperienceClient items={experienceItems} />}

            {educationItems.length > 0 && (
                <section ref={educationRef} aria-labelledby="education-heading" className="ed-section relative pb-32 pt-8 text-ink-fg md:pb-48">
                    <div className="page-x">
                        <p className="label text-ink-muted">Where I studied</p>
                        <h2
                            id="education-heading"
                            className="mt-4 font-wide text-[clamp(2.25rem,6.5vw,5.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em]"
                        >
                            Education<span className="text-ink-accent-ink">.</span>
                        </h2>
                        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-24 md:grid-cols-2">
                            {educationItems.map((edu, i) => (
                                <article
                                    key={edu.id}
                                    className="ed-card shell"
                                >
                                    <div
                                        className={cn(
                                            'shell-core flex h-full min-h-[22rem] flex-col justify-between gap-10 p-6 sm:p-8 md:p-10',
                                            i === 0
                                                ? 'bg-ink-accent text-ink-on-accent'
                                                : 'bg-ink-bg-2'
                                        )}
                                    >
                                        <p className="label">{edu.year}</p>
                                        <div>
                                            <h3 className="font-wide text-[clamp(1.5rem,2.6vw,2.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em]">
                                                {edu.institution}
                                            </h3>
                                            <p className={cn('mt-4 font-medium', i === 0 ? 'text-black/70' : 'text-ink-muted')}>
                                                {edu.degree}, {edu.field}
                                            </p>
                                            <p
                                                className={cn(
                                                    'mt-4 max-w-[52ch] leading-relaxed',
                                                    i === 0 ? 'text-black/80' : 'text-ink-fg/75'
                                                )}
                                            >
                                                {edu.description}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
