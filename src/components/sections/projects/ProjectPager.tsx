import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { SplitHeadline } from '@/components/shared/SplitHeadline';
import type { Project } from '@/content/types';

interface ProjectPagerProps {
    prev: Pick<Project, 'slug' | 'title'> | null;
    next: Pick<Project, 'slug' | 'title'> | null;
}

export function ProjectPager({ prev, next }: ProjectPagerProps) {
    return (
        <nav aria-label="More projects" className="border-t border-ink-line pb-16 pt-16 md:pb-24 md:pt-28">
            {next ? (
                <Link href={`/projects/${next.slug}`} className="group block">
                    <span className="label page-x block text-ink-muted">Next project</span>
                    <SplitHeadline as="p" lines={['Up next', `${next.title}.`]} fillOnHover className="mt-6" />
                </Link>
            ) : null}

            <div className="page-x mt-12 flex flex-wrap items-center justify-between gap-4 md:mt-16">
                <Link
                    href="/projects"
                    className="group inline-flex h-11 items-center gap-2 rounded-full border border-ink-line pl-3 pr-5 text-sm font-medium text-ink-muted transition-colors hover:border-ink-fg/30 hover:text-ink-fg"
                >
                    <ArrowLeft aria-hidden="true" className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" strokeWidth={1.75} />
                    All projects
                </Link>
                {prev ? (
                    <Link
                        href={`/projects/${prev.slug}`}
                        className="group inline-flex min-h-11 items-center gap-3 text-sm font-medium text-ink-muted transition-colors hover:text-ink-fg"
                    >
                        <span className="label">Previous</span>
                        <span className="font-wide uppercase tracking-[-0.02em]">{prev.title}</span>
                    </Link>
                ) : null}
            </div>
        </nav>
    );
}
