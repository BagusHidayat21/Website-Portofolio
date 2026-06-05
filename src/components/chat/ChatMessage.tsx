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
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center mb-1">
                    <Sparkles className="w-4 h-4 text-white dark:text-zinc-900" />
                </div>
            )}
            <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${isBot
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-sm'
                        : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-tr-sm'
                    }`}
            >
                {isTyping ? (
                    <div className="flex items-center gap-1 py-1 px-2">
                        <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                ) : isBot ? (
                    <div className="prose prose-sm dark:prose-invert prose-p:my-1 prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100 max-w-none whitespace-pre-wrap">
                        <ReactMarkdown
                            components={{
                                a: ({ href, children }) => (
                                    <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline" target={href?.startsWith('http') ? '_blank' : undefined}>
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
