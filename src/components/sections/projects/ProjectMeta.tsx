import { ArrowUpRight, Star } from 'lucide-react';
import type { Project } from '@/content/types';

function ExternalRow({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-12 items-center justify-between rounded-full border border-ink-line pl-5 pr-2 text-sm font-medium transition-colors hover:bg-ink-fg hover:text-ink-bg"
        >
            {label}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-fg/[0.08] transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
            </span>
        </a>
    );
}

export function ProjectMeta({ project, stars }: { project: Project; stars?: number }) {
    return (
        <aside className="lg:col-span-4">
            <div className="shell lg:sticky lg:top-28">
                <div className="shell-core space-y-8 bg-ink-bg-2 p-7 md:p-9">
                    <dl className="space-y-8">
                        <div>
                            <dt className="label text-ink-muted">Year</dt>
                            <dd className="mt-1 font-wide text-3xl tracking-[-0.03em] tabular-nums">{project.createdAt.getFullYear()}</dd>
                        </div>
                        <div>
                            <dt className="label text-ink-muted">Built with</dt>
                            <dd>
                                <ul className="mt-3 flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <li key={tech} className="chip text-ink-fg/80">
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </div>
                        {stars === undefined ? null : (
                            <div>
                                <dt className="label text-ink-muted">GitHub stars</dt>
                                <dd className="mt-1 flex items-center gap-2 font-wide text-3xl tracking-[-0.03em] tabular-nums">
                                    <Star aria-hidden="true" className="h-6 w-6 text-ink-accent-ink" strokeWidth={1.75} />
                                    {stars}
                                </dd>
                            </div>
                        )}
                    </dl>
                    {project.liveUrl || project.githubUrl ? (
                        <div className="flex flex-col gap-2 border-t border-ink-line pt-6">
                            {project.liveUrl ? <ExternalRow href={project.liveUrl} label="Live site" /> : null}
                            {project.githubUrl ? <ExternalRow href={project.githubUrl} label="Repository" /> : null}
                        </div>
                    ) : null}
                </div>
            </div>
        </aside>
    );
}
