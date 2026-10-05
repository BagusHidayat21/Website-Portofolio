'use client';

import Image from 'next/image';
import { ArrowUpRight, BrainCircuit, Database, Github, Linkedin, Instagram, Shield, Target, Zap, FileText, type LucideIcon } from 'lucide-react';
import { useRef } from 'react';
import { ExperienceClient } from '@/components/sections/ExperienceClient';
import { KineticHero } from '@/components/sections/KineticHero';
import { ScrollWords } from '@/components/sections/ScrollWords';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { type AboutContent, type Education, type Experience, type Profile } from '@/data/static-db';
import { gsap, useGSAP, applyParallax, MOTION_OK } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface AboutPageClientProps {
    profile: Profile;
    aboutContent: AboutContent;
    experience: Experience[];
    education: Education[];
    marqueeItems: string[];
}

// Philosophy icons come from data; only icons that match each principle are mapped.
const PRINCIPLE_ICONS: Record<string, LucideIcon> = { Database, BrainCircuit, Zap, Target, Shield };
const SOCIAL_ICONS: Record<string, LucideIcon> = { GitHub: Github, LinkedIn: Linkedin, Instagram };
const STACK_MOTION = '(min-width: 768px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)';

export function AboutPageClient({ profile, aboutContent, experience, education, marqueeItems }: AboutPageClientProps) {
    const root = useRef<HTMLDivElement>(null);

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

    useGSAP(
        () => {
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

                gsap.from('.ab-story > *', {
                    y: 40,
                    autoAlpha: 0,
                    stagger: 0.12,
                    duration: 1,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: '.ab-story', start: 'top 80%' },
                });

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
                gsap.utils.toArray<HTMLElement>('.pp-card').forEach((card) => {
                    gsap.from(card.querySelectorAll('.pp-rise'), {
                        yPercent: 40,
                        autoAlpha: 0,
                        stagger: 0.06,
                        duration: 0.9,
                        ease: 'expo.out',
                        scrollTrigger: { trigger: card, start: 'top 80%', once: true },
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
        { scope: root }
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
                                className="pp-card mb-6 last:mb-0 [@media(min-width:768px)_and_(min-height:700px)]:sticky [@media(min-width:768px)_and_(min-height:700px)]:mb-[16vh]"
                                style={{ top: `calc(6rem + ${i * 1}rem)` }}
                            >
                                <article className="pp-inner shell relative origin-top">
                                    <div
                                        className={cn(
                                            'shell-core grid grid-cols-1 gap-6 p-6 sm:p-8 md:min-h-[360px] md:grid-cols-12 md:gap-8 md:p-12',
                                            current ? 'bg-ink-accent text-ink-on-accent' : 'bg-ink-bg-2 text-ink-fg'
                                        )}
                                    >
                                        <div className="flex items-center justify-between gap-6 md:col-span-3 md:flex-col md:items-start">
                                            <p className="pp-rise label">{String(i + 1).padStart(2, '0')}</p>
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
                                        <div className="flex min-w-0 flex-col justify-between gap-8 md:col-span-9">
                                            <h3 className="pp-rise font-wide text-[clamp(1.5rem,3.2vw,3rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em] [overflow-wrap:anywhere]">
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
                <section aria-labelledby="education-heading" className="ed-section relative pb-32 pt-8 text-ink-fg md:pb-48">
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
