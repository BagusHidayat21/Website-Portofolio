import { ExternalLink, Github } from 'lucide-react';

interface ProjectLinksProps {
    title: string;
    githubUrl: string | null;
    liveUrl: string | null;
}

const button =
    'flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-ink-fg transition-colors hover:bg-ink-fg hover:text-ink-bg';

export function ProjectLinks({ title, githubUrl, liveUrl }: ProjectLinksProps) {
    return (
        <div className="flex shrink-0 items-center gap-1">
            {githubUrl ? (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${title} on GitHub`} className={button}>
                    <Github className="h-4 w-4" strokeWidth={1.75} />
                </a>
            ) : null}
            {liveUrl ? (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${title} live site`} className={button}>
                    <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
                </a>
            ) : null}
        </div>
    );
}
