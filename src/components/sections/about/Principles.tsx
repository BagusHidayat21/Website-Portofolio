import { ArrowUpRight, Database, GraduationCap, HeartHandshake, Shield, Target, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { StackedCards } from '@/components/shared/StackedCards';
import type { Principle } from '@/content/types';
import { isRoute } from '@/lib/links';

const icons: Record<Principle['icon'], LucideIcon> = { Target, Database, GraduationCap, HeartHandshake, Shield };

const pad = (n: number) => String(n).padStart(2, '0');

function ProofRow({ label, href }: Principle['proof'][number]) {
    const row = 'group flex min-h-12 items-center justify-between gap-4 border-b border-ink-line py-3 text-[0.9375rem] font-medium group-data-current/card:border-black/15';
    if (!href) return <span className={row}>{label}</span>;

    const arrow = (
        <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
    );
    return isRoute(href) ? (
        <Link href={href} className={row}>
            {label}
            {arrow}
        </Link>
    ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className={row}>
            {label}
            {arrow}
        </a>
    );
}

function PrincipleCard({ principle, index, total }: { principle: Principle; index: number; total: number }) {
    const Icon = icons[principle.icon];
    return (
        <>
            <div className="flex flex-col gap-6 md:col-span-5">
                <div className="flex items-center justify-between gap-4">
                    <p className="rise label">
                        {pad(index + 1)} / {pad(total)}
                    </p>
                    <span aria-hidden="true" className="rise flex h-12 w-12 items-center justify-center rounded-full bg-ink-fg/[0.06] group-data-current/card:bg-black/10">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                </div>
                <h3 className="rise font-wide text-[clamp(1.5rem,3vw,2.75rem)] uppercase leading-[0.92] tracking-[-0.035em] [overflow-wrap:anywhere]">
                    {principle.title}
                </h3>
            </div>
            <div className="flex min-w-0 flex-col gap-6 md:col-span-7">
                <p className="rise max-w-[56ch] text-lg leading-relaxed text-ink-muted group-data-current/card:text-black/75">{principle.description}</p>
                {principle.proof.length > 0 ? (
                    <div className="rise">
                        <p className="label text-ink-muted group-data-current/card:text-black/60">In practice</p>
                        <ul className="mt-3 border-t border-ink-line group-data-current/card:border-black/15">
                            {principle.proof.map((proof) => (
                                <li key={proof.label}>
                                    <ProofRow {...proof} />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>
        </>
    );
}

export function Principles({ principles }: { principles: Principle[] }) {
    return (
        <section aria-labelledby="principles-heading" className="relative pb-20 sm:pb-32 md:pb-48">
            <SectionHeading id="principles-heading" label="How I work" title="Principles" className="page-x" />
            <div className="mt-12 md:mt-20">
                <StackedCards
                    cards={principles.map((principle, i) => ({
                        id: principle.title,
                        content: <PrincipleCard principle={principle} index={i} total={principles.length} />,
                    }))}
                />
            </div>
        </section>
    );
}
