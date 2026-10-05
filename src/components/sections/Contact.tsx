import { ArrowUpRight } from 'lucide-react';
import { site } from '@/config/site';
import { CopyEmailButton } from '@/components/shared/CopyEmailButton';
import { MagneticOrb } from '@/components/shared/MagneticOrb';
import { socialIcons } from '@/components/shared/SocialIcon';
import { SplitHeadline } from '@/components/shared/SplitHeadline';

const SOCIALS = site.socials.filter((s) => s.platform !== 'Instagram');

export function Contact() {
    const mailto = `mailto:${site.email}`;
    return (
        <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden py-16 sm:py-24 md:py-36">
            <SplitHeadline id="contact-heading" lines={['Have an idea?', "Let's build it."]} />

            <div className="page-x mt-12 grid grid-cols-1 items-center gap-12 sm:mt-16 md:mt-24 lg:grid-cols-12">
                <div className="lg:col-span-6">
                    <p className="max-w-[44ch] text-lg leading-relaxed text-ink-muted md:text-xl">
                        I work full-time at PT Universal Big Data and still make room for good collaborations, technical work and data projects. Email
                        is the fastest way to reach me.
                    </p>

                    <div className="mt-10 flex flex-col gap-3">
                        <a href={mailto} className="group inline-flex w-max max-w-full items-center gap-3 text-[clamp(1.25rem,2.6vw,2.25rem)] font-medium tracking-[-0.03em]">
                            <span className="relative truncate">
                                {site.email}
                                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-ink-accent transition-transform duration-500 ease-expo group-hover:scale-x-100" />
                            </span>
                        </a>
                        <CopyEmailButton email={site.email} />
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        {SOCIALS.map(({ platform, url }) => {
                            const Icon = socialIcons[platform];
                            return (
                                <a
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex h-12 items-center gap-3 rounded-full border border-ink-line pl-5 pr-2 text-sm font-medium transition-colors hover:bg-ink-fg hover:text-ink-bg"
                                >
                                    <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
                                    {platform}
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-fg/[0.08] transition-transform duration-500 group-hover:rotate-45">
                                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="lg:col-span-6">
                    <MagneticOrb href={mailto} label="Say Hello" />
                </div>
            </div>
        </section>
    );
}
