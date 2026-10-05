import { Parallax } from '@/components/shared/Parallax';
import { FramedImage } from '@/components/shared/FramedImage';
import { RevealGroup } from '@/components/shared/RevealGroup';
import { ScrollWords } from '@/components/shared/ScrollWords';
import { socialIcons } from '@/components/shared/SocialIcon';
import type { AboutContent, Profile } from '@/content/types';

export function Story({ profile, about }: { profile: Profile; about: AboutContent }) {
    const paragraphs = about.storyContent.split('\n\n');
    // The story's closing lines double as the scroll-lit statement, echoing the home manifesto.
    const statement = (paragraphs.at(-1) ?? '').split(/(?<=\.)\s/).slice(-2).join(' ');

    return (
        <section aria-labelledby="story-heading" className="relative overflow-hidden pt-14 sm:pt-20 md:pt-28">
            <div className="page-x">
                <p className="label mb-6 flex items-center gap-2 text-ink-muted">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink-accent-ink" />
                    In short
                </p>
                <ScrollWords text={statement} highlight={['make', 'sense']} />
            </div>

            <div className="page-x mt-16 grid grid-cols-1 gap-16 pb-32 sm:mt-20 md:mt-28 md:pb-48 lg:grid-cols-12 lg:gap-10">
                <Parallax speed={-0.4} className="lg:col-span-5">
                    <FramedImage src={profile.avatarUrl} alt={`Portrait of ${profile.name}`} sizes="(min-width: 1024px) 40vw, 100vw">
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                        <p className="label absolute inset-x-6 bottom-6 text-white/85">
                            {profile.location}
                            {profile.currentCompany ? `, ${profile.currentCompany}` : ''}
                        </p>
                    </FramedImage>
                </Parallax>

                <RevealGroup className="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
                    <h2 id="story-heading" className="rise font-wide text-subhead uppercase">
                        {about.storyTitle}
                        <span className="text-ink-accent-ink">.</span>
                    </h2>
                    <div className="rise mt-8 space-y-6">
                        {paragraphs.map((paragraph) => (
                            <p key={paragraph.slice(0, 32)} className="max-w-[58ch] text-lg leading-relaxed text-ink-muted">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                    <ul className="rise mt-10 flex flex-wrap gap-2">
                        {about.tags.map((tag) => (
                            <li key={tag} className="chip text-ink-fg/80">
                                {tag}
                            </li>
                        ))}
                    </ul>
                    <div className="rise mt-12 flex flex-wrap items-center gap-3">
                        {profile.socials.map(({ platform, url }) => {
                            const Icon = socialIcons[platform];
                            return (
                                <a
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={platform}
                                    className="flex h-14 w-14 items-center justify-center rounded-full border border-ink-line transition-colors hover:bg-ink-fg hover:text-ink-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink"
                                >
                                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                                </a>
                            );
                        })}
                    </div>
                </RevealGroup>
            </div>
        </section>
    );
}
