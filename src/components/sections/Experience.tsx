import { ArrowUpRight } from 'lucide-react';
import type { Experience as ExperienceItem } from '@/content/types';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { StackedCards } from '@/components/shared/StackedCards';

const muted = 'text-ink-muted group-data-current/card:text-black/70';

function ExperienceCard({ item, current }: { item: ExperienceItem; current: boolean }) {
    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4 md:col-span-4 md:flex-col md:items-start">
                <p className="rise label">{item.year}</p>
                <p className={`rise chip ${muted} group-data-current/card:border-black/20`}>{current ? 'Current role' : item.category}</p>
            </div>
            <div className="flex min-w-0 flex-col justify-between gap-8 md:col-span-8">
                <div>
                    <h3 className="rise font-wide text-card uppercase [overflow-wrap:anywhere]">{item.title}</h3>
                    <p className={`rise mt-4 text-base font-medium md:text-lg ${muted}`}>{item.company}</p>
                </div>
                <div>
                    <p className="rise max-w-[60ch] leading-relaxed text-ink-fg/75 group-data-current/card:text-black/80">{item.description}</p>
                    <ul className="rise mt-6 flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                            <li key={skill} className="chip text-ink-fg/80 group-data-current/card:border-black/15 group-data-current/card:bg-black/5 group-data-current/card:text-current">
                                {skill}
                            </li>
                        ))}
                    </ul>
                    {item.url ? (
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rise group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-1 underline-offset-4"
                        >
                            Read the paper
                            <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
                        </a>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export function Experience({ items }: { items: ExperienceItem[] }) {
    if (items.length === 0) return null;
    return (
        <section aria-labelledby="experience-heading" className="relative pb-20 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-40">
            <SectionHeading id="experience-heading" label="Where I have worked" title="Experience" className="page-x" />
            <div className="mt-12 md:mt-20">
                <StackedCards cards={items.map((item, i) => ({ id: item.id, content: <ExperienceCard item={item} current={i === 0} /> }))} />
            </div>
        </section>
    );
}
