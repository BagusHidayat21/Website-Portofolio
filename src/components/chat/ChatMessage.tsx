'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Sparkles } from 'lucide-react';

interface ChatMessageProps {
    content: string;
    isBot: boolean;
    isTyping?: boolean;
}

export function ChatMessage({ content, isBot, isTyping }: ChatMessageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-end gap-2 ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
        >
            {isBot && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-ink-fg flex items-center justify-center mb-1">
                    <Sparkles className="w-4 h-4 text-ink-bg" />
                </div>
            )}
            <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${isBot
                        ? 'bg-ink-bg-2 text-ink-fg rounded-tl-sm'
                        : 'bg-ink-fg text-ink-bg rounded-tr-sm'
                    }`}
            >
                {isTyping ? (
                    <div className="flex items-center gap-1 py-1 px-2">
                        <span className="w-2 h-2 bg-ink-muted rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="w-2 h-2 bg-ink-muted rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-2 h-2 bg-ink-muted rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                ) : isBot ? (
                    <div className="prose prose-sm dark:prose-invert prose-p:my-1 prose-strong:text-ink-fg max-w-none whitespace-pre-wrap">
                        <ReactMarkdown
                            components={{
                                a: ({ href, children }) => (
                                    <a href={href} className="font-medium text-ink-accent-ink underline underline-offset-2" target={href?.startsWith('http') ? '_blank' : undefined}>
                                        {children}
                                    </a>
                                ),
                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                ) : (
                    <span>{content}</span>
                )}
            </div>
        </motion.div>
    );
}
