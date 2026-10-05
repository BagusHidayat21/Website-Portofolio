'use client';

import { MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ChatMessage } from './ChatMessage';
import { getChatResponse, quickSuggestions } from './chatbot-responses';

interface Message {
    id: string;
    content: string;
    isBot: boolean;
}

const GREETING: Message = {
    id: 'greeting',
    content: "Hi! I'm Bagus's virtual assistant. Ask me about skills, projects, or experience!",
    isBot: true,
};

const replyDelay = () => 800 + Math.random() * 500;

export function Chatbot({ defaultOpen = false }: { defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [hasInteracted, setHasInteracted] = useState(defaultOpen);
    const [showTooltip, setShowTooltip] = useState(false);
    const [messages, setMessages] = useState<Message[]>([GREETING]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const windowRef = useRef<HTMLDivElement>(null);
    const endRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (hasInteracted) return;
        const show = setTimeout(() => setShowTooltip(true), 1500);
        const hide = setTimeout(() => setShowTooltip(false), 6500);
        return () => {
            clearTimeout(show);
            clearTimeout(hide);
        };
    }, [hasInteracted]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    useEffect(() => {
        if (!isOpen) return;
        inputRef.current?.focus();
        const lockScroll = window.matchMedia('(max-width: 1023px)').matches;
        if (lockScroll) document.body.style.overflow = 'hidden';

        const onPointerDown = (e: PointerEvent) => {
            if (!windowRef.current?.contains(e.target as Node)) setIsOpen(false);
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            if (lockScroll) document.body.style.overflow = '';
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen]);

    const open = () => {
        setIsOpen(true);
        setShowTooltip(false);
        setHasInteracted(true);
    };

    const send = (text: string) => {
        const content = text.trim();
        if (!content || isTyping) return;
        setMessages((prev) => [...prev, { id: crypto.randomUUID(), content, isBot: false }]);
        setInput('');
        setIsTyping(true);
        setTimeout(() => {
            setMessages((prev) => [...prev, { id: crypto.randomUUID(), content: getChatResponse(content), isBot: true }]);
            setIsTyping(false);
        }, replyDelay());
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        send(input);
    };

    return (
        <>
            {showTooltip && !isOpen ? <ChatTooltip onClose={() => setShowTooltip(false)} /> : null}

            {isOpen ? (
                <div aria-hidden="true" className="fixed inset-0 z-[1001] bg-black/40 backdrop-blur-sm duration-200 animate-in fade-in lg:hidden" />
            ) : (
                <button
                    type="button"
                    onClick={open}
                    aria-label="Open chat"
                    className="fixed bottom-6 right-6 z-[1000] flex h-14 w-14 items-center justify-center rounded-full bg-ink-fg text-ink-bg shadow-lg shadow-ink-line transition-transform hover:scale-110 active:scale-95"
                >
                    {hasInteracted ? null : (
                        <span className="absolute inset-0 rounded-full bg-ink-fg opacity-20 animate-ping [animation-iteration-count:3]" />
                    )}
                    <MessageCircle className="relative h-6 w-6" />
                </button>
            )}

            {isOpen ? (
                <div
                    ref={windowRef}
                    role="dialog"
                    aria-label="Chat with Bagus's assistant"
                    data-lenis-prevent
                    className="fixed inset-x-4 bottom-4 z-[1002] flex h-[70dvh] flex-col overflow-hidden overscroll-none rounded-2xl border border-ink-line bg-ink-bg shadow-[0_20px_50px_rgba(0,0,0,0.25)] duration-200 animate-in fade-in slide-in-from-bottom-4 zoom-in-95 lg:inset-x-auto lg:bottom-6 lg:right-6 lg:h-[600px] lg:max-h-[calc(100dvh-120px)] lg:w-[380px]"
                >
                    <ChatHeader onClose={() => setIsOpen(false)} />

                    <div className="flex-1 space-y-1 overflow-y-auto overscroll-contain p-4">
                        {messages.map((m) => (
                            <ChatMessage key={m.id} content={m.content} isBot={m.isBot} />
                        ))}
                        {isTyping ? <ChatMessage content="" isBot isTyping /> : null}
                        <div ref={endRef} />
                    </div>

                    <div className="border-t border-ink-line p-3">
                        <div className="flex flex-wrap gap-2 pb-3">
                            {quickSuggestions.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => send(suggestion)}
                                    className="rounded-full bg-ink-bg-2 px-3 py-1.5 text-[11px] font-medium text-ink-muted transition-colors hover:bg-ink-fg hover:text-ink-bg"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={onSubmit} className="flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                aria-label="Message"
                                className="flex-1 rounded-xl bg-ink-bg-2 px-4 py-3 text-sm text-ink-fg placeholder:text-ink-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isTyping}
                                aria-label="Send message"
                                className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-fg text-ink-bg transition-transform hover:scale-105 disabled:pointer-events-none disabled:opacity-50"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}

function ChatHeader({ onClose }: { onClose: () => void }) {
    return (
        <div className="flex items-center justify-between border-b border-ink-line px-5 py-4">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-fg">
                        <Sparkles className="h-5 w-5 text-ink-bg" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-ink-bg bg-green-500" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-ink-fg">Bagus Assistant</p>
                    <p className="text-[11px] font-medium text-green-700 dark:text-green-500">Active now</p>
                </div>
            </div>
            <button
                type="button"
                onClick={onClose}
                aria-label="Close chat"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-ink-bg-2"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}

function ChatTooltip({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed bottom-24 right-6 z-[1000] max-w-[220px] rounded-2xl rounded-br-sm border border-ink-line bg-ink-fg px-5 py-3.5 text-ink-bg shadow-2xl duration-300 animate-in fade-in slide-in-from-right-4">
            <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-bg/60">Virtual Assistant</p>
            <p className="text-[13px] font-medium leading-relaxed">Questions about my work or stack? Ask here.</p>
            <button
                type="button"
                onClick={onClose}
                aria-label="Dismiss assistant message"
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-ink-line bg-ink-fg text-ink-bg shadow-lg"
            >
                <X className="h-3 w-3" />
            </button>
        </div>
    );
}
