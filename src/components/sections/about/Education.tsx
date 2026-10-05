import { RevealGroup } from '@/components/shared/RevealGroup';
import { SectionHeading } from '@/components/shared/SectionHeading';
import type { Education as EducationItem } from '@/content/types';

export function Education({ items }: { items: EducationItem[] }) {
    if (items.length === 0) return null;
    return (
        <section aria-labelledby="education-heading" className="relative pb-32 pt-8 md:pb-48">
            <div className="page-x">
                <SectionHeading id="education-heading" label="Where I studied" title="Education" />
                <RevealGroup className="mt-16 grid grid-cols-1 gap-6 md:mt-24 md:grid-cols-2">
                    {items.map((edu, i) => (
                        <article key={edu.id} className="rise shell">
                            <div
                                data-current={i === 0 ? '' : undefined}
                                className="group/card shell-core flex h-full min-h-[22rem] flex-col justify-between gap-10 bg-ink-bg-2 p-6 data-current:bg-ink-accent data-current:text-ink-on-accent sm:p-8 md:p-10"
                            >
                                <p className="label">{edu.year}</p>
                                <div>
                                    <h3 className="font-wide text-[clamp(1.5rem,2.6vw,2.5rem)] uppercase leading-[0.92] tracking-[-0.035em]">{edu.institution}</h3>
                                    <p className="mt-4 font-medium text-ink-muted group-data-current/card:text-black/70">
                                        {edu.degree}, {edu.field}
                                    </p>
                                    <p className="mt-4 max-w-[52ch] leading-relaxed text-ink-fg/75 group-data-current/card:text-black/80">{edu.description}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}
