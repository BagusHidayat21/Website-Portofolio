import ReactMarkdown, { type Components } from 'react-markdown';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
    content: string;
    isBot: boolean;
    isTyping?: boolean;
}

const markdown: Components = {
    a: ({ href, children }) => (
        <a
            href={href}
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="font-medium text-ink-accent-ink underline underline-offset-2"
        >
            {children}
        </a>
    ),
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
};

export function ChatMessage({ content, isBot, isTyping = false }: ChatMessageProps) {
    return (
        <div className={cn('mb-4 flex items-end gap-2 duration-200 animate-in fade-in slide-in-from-bottom-2', isBot ? 'justify-start' : 'justify-end')}>
            {isBot ? (
                <div className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-fg">
                    <Sparkles className="h-4 w-4 text-ink-bg" />
                </div>
            ) : null}
            <div
                className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                    isBot ? 'rounded-tl-sm bg-ink-bg-2 text-ink-fg' : 'rounded-tr-sm bg-ink-fg text-ink-bg'
                )}
            >
                {isTyping ? (
                    <div className="flex items-center gap-1 px-2 py-1" aria-label="Assistant is typing">
                        {[0, 150, 300].map((delay) => (
                            <span key={delay} className="h-2 w-2 animate-bounce rounded-full bg-ink-muted" style={{ animationDelay: `${delay}ms` }} />
                        ))}
                    </div>
                ) : isBot ? (
                    <div className="whitespace-pre-wrap [&_strong]:text-ink-fg">
                        <ReactMarkdown components={markdown}>{content}</ReactMarkdown>
                    </div>
                ) : (
                    <span>{content}</span>
                )}
            </div>
        </div>
    );
}
