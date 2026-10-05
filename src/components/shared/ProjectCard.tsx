import { ArrowUpRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ProjectCard as ProjectCardData } from '@/content/types';
import { cn } from '@/lib/utils';
import { ProjectLinks } from './ProjectLinks';

interface ProjectCardProps {
    project: ProjectCardData;
    /** Shows a running number in the corner (archive). */
    index?: number;
    className?: string;
    mediaClassName?: string;
    titleClassName?: string;
    sizes: string;
}

/** Shared by the home gallery and the archive; their GSAP scenes target `.card-media`, `.card-img`, `.card-title`. */
export function ProjectCard({ project, index, className, mediaClassName, titleClassName, sizes }: ProjectCardProps) {
    return (
        <article className={className}>
            <Link href={`/projects/${project.slug}`} className="group block">
                <div className={cn('card-media relative overflow-hidden rounded-card bg-ink-bg-2 ring-1 ring-ink-line', mediaClassName)}>
                    {project.image ? (
                        <div className="card-img absolute inset-[-10%]">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes={sizes}
                                className="object-cover contrast-[1.08] grayscale-[40%] transition-[filter,transform] duration-700 ease-expo group-hover:scale-[1.04] group-hover:grayscale-0"
                            />
                        </div>
                    ) : null}
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

                    {index === undefined ? null : (
                        <span className="label absolute left-5 top-6 text-white/80 md:left-7 md:top-8">{String(index + 1).padStart(2, '0')}</span>
                    )}
                    <span className="absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-full bg-ink-accent text-ink-on-accent transition-transform duration-500 ease-expo group-hover:rotate-45 md:right-7 md:top-7">
                        <ArrowUpRight aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                    </span>

                    <div className="absolute inset-x-5 bottom-5 md:inset-x-8 md:bottom-8">
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                            {project.techStack.slice(0, 4).map((tech) => (
                                <span key={tech} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                                    {tech}
                                </span>
                            ))}
                            {project.stars === undefined ? null : (
                                <span className="flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white">
                                    <Star aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
                                    {project.stars}
                                </span>
                            )}
                        </div>
                        <h3 className={cn('card-title font-wide uppercase leading-[0.85] tracking-[-0.04em] text-white', titleClassName)}>{project.title}</h3>
                    </div>
                </div>
            </Link>

            <div className="mt-6 flex items-start justify-between gap-6">
                <p className="max-w-[56ch] text-base leading-relaxed text-ink-muted">{project.description}</p>
                <ProjectLinks title={project.title} githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
            </div>
        </article>
    );
}
