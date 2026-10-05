import ReactMarkdown, { type Components } from 'react-markdown';

const markdown: Components = {
    h2: ({ children }) => <h2 className="mb-6 mt-16 font-wide text-subhead uppercase first:mt-0">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-4 mt-10 font-wide text-xl uppercase tracking-[-0.02em]">{children}</h3>,
    p: ({ children }) => <p className="mb-6 max-w-[62ch] text-lg leading-relaxed text-ink-muted">{children}</p>,
    ul: ({ children }) => <ul className="mb-8 space-y-3">{children}</ul>,
    li: ({ children }) => (
        <li className="flex max-w-[62ch] items-start gap-3 border-t border-ink-line pt-3 text-lg leading-relaxed text-ink-fg/80">
            <span aria-hidden="true" className="mt-[0.7em] h-2 w-2 shrink-0 rounded-full bg-ink-accent-ink" />
            <span>{children}</span>
        </li>
    ),
    code: ({ children }) => <code className="rounded bg-ink-fg/[0.06] px-1.5 py-0.5 font-mono text-sm">{children}</code>,
};

/** Case-study markdown, rendered on the server so the parser never ships to the browser. */
export function ProjectBody({ content, fallback }: { content: string | null; fallback: string }) {
    return content ? (
        <ReactMarkdown components={markdown}>{content}</ReactMarkdown>
    ) : (
        <p className="max-w-[62ch] text-lg leading-relaxed text-ink-muted">{fallback}</p>
    );
}
