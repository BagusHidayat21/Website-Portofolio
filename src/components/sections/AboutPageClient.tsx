'use client';

import Image from 'next/image';
import { BrainCircuit, Database, Github, Linkedin, Instagram, Shield, Target, Zap, FileText, type LucideIcon } from 'lucide-react';
import { useRef } from 'react';
import { ExperienceClient } from '@/components/sections/ExperienceClient';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { type AboutContent, type Education, type Experience, type Profile } from '@/data/static-db';
import { gsap, useGSAP, applyParallax, MOTION_OK } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface AboutPageClientProps {
    profile: Profile;
    aboutContent: AboutContent;
    experience: Experience[];
    education: Education[];
}

// Philosophy icons come from data; only icons that match each principle are mapped.
const PRINCIPLE_ICONS: Record<string, LucideIcon> = { Database, BrainCircuit, Zap, Target, Shield };
const SOCIAL_ICONS: Record<string, LucideIcon> = { GitHub: Github, LinkedIn: Linkedin, Instagram };

export function AboutPageClient({ profile, aboutContent, experience, education }: AboutPageClientProps) {
    const root = useRef<HTMLDivElement>(null);

    const experienceItems = experience
        .filter((e) => e.isVisible)
        .sort((a, b) => a.order - b.order)
        .map(({ id, title, company, year, description, skills, category }) => ({
            id,
            title,
            company,
            year,
            description,
            skills,
            category: category ?? 'Work',
        }));

    const educationItems = education.filter((e) => e.isVisible).sort((a, b) => a.order - b.order);
    const story = aboutContent.storyContent.split('\n\n');
    const principles = aboutContent.philosophy;

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                gsap.from('.ab-line', { yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: 0.1 });
                gsap.from('.ab-fade', { y: 24, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.08, delay: 0.45 });

                gsap.to('.ab-h-1', {
                    xPercent: -12,
                    ease: 'none',
                    scrollTrigger: { trigger: '.ab-head', start: 'top top', end: 'bottom top', scrub: true },
                });
                gsap.to('.ab-h-2', {
                    xPercent: 10,
                    ease: 'none',
                    scrollTrigger: { trigger: '.ab-head', start: 'top top', end: 'bottom top', scrub: true },
                });

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

                gsap.from('.ab-story > *', {
                    y: 40,
                    autoAlpha: 0,
                    stagger: 0.12,
                    duration: 1,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: '.ab-story', start: 'top 80%' },
                });

                // Principles heading drifts, then each card shrinks as the next slides over it.
                gsap.fromTo(
                    '.pp-heading',
                    { xPercent: 12 },
                    {
                        xPercent: -18,
                        ease: 'none',
                        scrollTrigger: { trigger: '.pp-section', start: 'top bottom', end: 'top top', scrub: true },
                    }
                );
                const cards = gsap.utils.toArray<HTMLElement>('.pp-card');
                cards.forEach((card, i) => {
                    const next = cards[i + 1];
                    if (next) {
                        gsap.to(card.querySelector('.pp-inner'), {
                            scale: 0.92,
                            autoAlpha: 0.35,
                            rotate: i % 2 === 0 ? -1.5 : 1.5,
                            ease: 'none',
                            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
                        });
                    }
                    gsap.from(card.querySelectorAll('.pp-rise'), {
                        yPercent: 60,
                        autoAlpha: 0,
                        stagger: 0.08,
                        duration: 1,
                        ease: 'expo.out',
                        scrollTrigger: { trigger: card, start: 'top 80%' },
                    });
                });

                gsap.from('.ed-card', {
                    yPercent: 14,
                    autoAlpha: 0,
                    stagger: 0.15,
                    duration: 1.1,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: '.ed-section', start: 'top 75%' },
                });

                applyParallax(root.current);
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <>
            <div ref={root}>
            <section className="relative overflow-hidden text-ink-fg">
                <div className="ab-head overflow-hidden pt-28 sm:pt-36 md:pt-44">
                    <h1 className="font-wide text-[clamp(2.25rem,7.5vw,6rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em]">
                        <span className="sr-only">About {profile.name}</span>
                        <span aria-hidden="true" className="ab-h-1 block whitespace-nowrap px-4 sm:px-6 lg:px-10">
                            <span className="ab-line block overflow-hidden pb-[0.06em]">{aboutContent.heroTitle}</span>
                        </span>
                        <span
                            aria-hidden="true"
                            className="ab-h-2 text-outline block whitespace-nowrap px-4 text-right sm:px-6 lg:px-10"
                        >
                            <span className="ab-line block overflow-hidden pb-[0.06em]">
                                {aboutContent.heroSubtitle.replace('.', '')}
                                <span className="text-ink-accent-ink [-webkit-text-stroke:0]">.</span>
                            </span>
                        </span>
                    </h1>
                </div>

                <div className="mx-auto mt-10 max-w-7xl px-4 sm:mt-16 sm:px-6 md:mt-24 lg:px-10">
                    <p className="ab-fade max-w-[52ch] text-balance text-base leading-relaxed text-ink-muted sm:text-lg md:text-xl">
                        {aboutContent.heroDescription}
                    </p>
                </div>

                <div className="mx-auto mt-24 grid max-w-7xl grid-cols-1 gap-16 px-4 pb-32 sm:px-6 md:mt-36 md:pb-48 lg:grid-cols-12 lg:gap-10 lg:px-10">
                    <div className="lg:col-span-5" data-speed="-1">
                        <div className="rounded-[2.25rem] bg-ink-fg/[0.04] p-2 ring-1 ring-ink-line">
                            <div className="ab-frame relative aspect-[4/5] overflow-hidden rounded-[calc(2.25rem-0.5rem)] bg-ink-bg-2">
                                <Image
                                    src={profile.avatarUrl}
                                    alt={`Portrait of ${profile.name}`}
                                    fill
                                    priority
                                    sizes="(min-width: 1024px) 40vw, 100vw"
                                    className="ab-photo object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <p className="absolute inset-x-6 bottom-6 font-mono text-sm text-white/85">
                                    {profile.location}
                                    {profile.currentCompany ? `, ${profile.currentCompany}` : ''}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="ab-story flex flex-col justify-end lg:col-span-6 lg:col-start-7">
                        <h2 className="font-wide text-[clamp(1.75rem,3.6vw,3.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em]">
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
                                <li
                                    key={tag}
                                    className="rounded-full border border-ink-line px-4 py-2 text-sm font-medium text-ink-fg/80"
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-12 flex flex-wrap items-center gap-3">
                            <MagneticButton href={profile.resumeUrl} external size="lg" icon={FileText}>
                                Download resume
                            </MagneticButton>
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
            <section className="pp-section relative pb-20 text-ink-fg sm:pb-32 md:pb-48">
                    <div className="overflow-hidden">
                        <h2 className="pp-heading mb-12 whitespace-nowrap px-4 font-wide text-[clamp(2.25rem,6.5vw,5.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] sm:px-6 md:mb-20 lg:px-10">
                            Principles<span className="text-ink-accent-ink">.</span>
                        </h2>
                    </div>

                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
                        {principles.map((item, i) => {
                            const current = i === 0;
                            const Icon = PRINCIPLE_ICONS[item.icon] ?? Zap;
                            return (
                                <div
                                    key={item.title}
                                    className="pp-card sticky mb-[18vh] last:mb-0"
                                    style={{ top: `calc(5.5rem + ${i * 1.1}rem)` }}
                                >
                                    <article className="pp-inner origin-top rounded-[2.25rem] bg-ink-fg/[0.04] p-2 ring-1 ring-ink-line will-change-transform">
                                        <div
                                            className={cn(
                                                'grid min-h-[44vh] grid-cols-1 gap-8 rounded-[calc(2.25rem-0.5rem)] p-7 md:min-h-[360px] md:grid-cols-12 md:p-12',
                                                current
                                                    ? 'bg-ink-accent text-ink-on-accent'
                                                    : 'bg-ink-bg-2 text-ink-fg shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                                            )}
                                        >
                                            <div className="flex items-start justify-between gap-6 md:col-span-3 md:flex-col">
                                                <p className="pp-rise font-mono text-sm">{String(i + 1).padStart(2, '0')}</p>
                                                <span
                                                    className={cn(
                                                        'pp-rise flex h-14 w-14 items-center justify-center rounded-full',
                                                        current ? 'bg-black/10' : 'bg-ink-fg/[0.06]'
                                                    )}
                                                    aria-hidden="true"
                                                >
                                                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                                                </span>
                                            </div>
                                            <div className="flex flex-col justify-between gap-8 md:col-span-9">
                                                <h3 className="pp-rise font-wide text-[clamp(1.75rem,3.6vw,3.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em]">
                                                    {item.title}
                                                </h3>
                                                <p
                                                    className={cn(
                                                        'pp-rise max-w-[56ch] text-lg leading-relaxed',
                                                        current ? 'text-black/75' : 'text-ink-muted'
                                                    )}
                                                >
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>

            {experienceItems.length > 0 && <ExperienceClient items={experienceItems} />}

            {educationItems.length > 0 && (
                <section className="ed-section relative pb-32 pt-8 text-ink-fg md:pb-48">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
                        <h2 className="font-wide text-[clamp(2.5rem,6vw,5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em]">
                            Education<span className="text-ink-accent-ink">.</span>
                        </h2>
                        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-24 md:grid-cols-2">
                            {educationItems.map((edu, i) => (
                                <article
                                    key={edu.id}
                                    className="ed-card rounded-[2.25rem] bg-ink-fg/[0.04] p-2 ring-1 ring-ink-line"
                                >
                                    <div
                                        className={cn(
                                            'flex h-full min-h-[22rem] flex-col justify-between gap-10 rounded-[calc(2.25rem-0.5rem)] p-7 md:p-10',
                                            i === 0
                                                ? 'bg-ink-accent text-ink-on-accent'
                                                : 'bg-ink-bg-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                                        )}
                                    >
                                        <p className="font-mono text-sm">{edu.year}</p>
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
