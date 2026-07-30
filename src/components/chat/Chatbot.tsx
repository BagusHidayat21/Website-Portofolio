'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatMessage } from './ChatMessage';
import { getChatResponse, quickSuggestions } from './chatbot-responses';

interface Message {
    id: string;
    content: string;
    isBot: boolean;
}

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: "Hi! I'm Bagus's virtual assistant. Ask me about skills, projects, or experience!",
            isBot: true,
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!hasInteracted) {
            const timer = setTimeout(() => setShowTooltip(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [hasInteracted]);

    useEffect(() => {
        if (showTooltip) {
            const timer = setTimeout(() => {
                setShowTooltip(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showTooltip]);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    useEffect(() => {
        const isMobile = window.innerWidth < 1024;
        if (isOpen && isMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && window.innerWidth >= 1024) {
                const chatWindow = document.getElementById('chat-window');
                const chatButton = document.getElementById('chat-toggle-button');
                if (chatWindow && !chatWindow.contains(event.target as Node) &&
                    chatButton && !chatButton.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleOpen = () => {
        setIsOpen(true);
        setShowTooltip(false);
        setHasInteracted(true);
    };

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: text.trim(),
            isBot: false,
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const response = getChatResponse(text);
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: response,
                isBot: true,
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 800 + Math.random() * 500);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(inputValue);
    };

    const handleSuggestionClick = (suggestion: string) => {
        sendMessage(suggestion);
    };

    return (
        <>
            <AnimatePresence>
                {showTooltip && !isOpen && (
                    <ChatTooltip onClose={() => setShowTooltip(false)} />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[1001] lg:hidden" onClick={() => setIsOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                    </div>
                )}
            </AnimatePresence>

            <motion.button
                id="chat-toggle-button"
                onClick={handleOpen}
                className={`fixed bottom-6 right-6 z-[1000] h-14 w-14 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-lg shadow-zinc-900/25 hover:scale-110 transition-transform flex items-center justify-center ${isOpen ? 'hidden' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open chat"
            >
                {!hasInteracted && (
                    <>
                        <span className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-zinc-100 animate-ping opacity-20" />
                        <span className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-zinc-100 animate-pulse opacity-30" />
                    </>
                )}
                <MessageCircle className="w-6 h-6 relative z-10" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="chat-window"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-4 right-4 left-4 lg:left-auto lg:bottom-6 lg:right-6 z-[1002] lg:w-[380px] h-[70dvh] lg:h-[600px] lg:max-h-[calc(100vh-120px)] bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden overscroll-none"
                    >
                        <ChatHeader onClose={() => setIsOpen(false)} />

                        <div className="flex-1 overflow-y-auto p-4 space-y-1 overscroll-contain bg-zinc-50/50 dark:bg-zinc-950/50">
                            {messages.map((message) => (
                                <ChatMessage
                                    key={message.id}
                                    content={message.content}
                                    isBot={message.isBot}
                                />
                            ))}
                            {isTyping && <ChatMessage content="" isBot isTyping />}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
                            <div className="pb-3 flex flex-wrap gap-2">
                                {quickSuggestions.map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border-none text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-zinc-100/5 transition-all"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={!inputValue.trim() || isTyping}
                                    className="h-11 w-11 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:scale-105 transition-all disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function ChatHeader({ onClose }: { onClose: () => void }) {
    return (
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white dark:text-zinc-900" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white dark:border-zinc-900" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Bagus Assistant</h3>
                    <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-[11px] font-medium text-green-600 dark:text-green-500">Active now</p>
                    </div>
                </div>
            </div>
            <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
                <X className="w-4 h-4" />
            </Button>
        </div>
    );
}

function ChatTooltip({ onClose }: { onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-[1000] bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-5 py-3.5 rounded-2xl rounded-br-sm shadow-2xl max-w-[220px] border border-white/10 dark:border-black/5"
        >
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">Virtual Assistant</p>
            <p className="text-[13px] font-medium leading-relaxed">Hey! I&apos;m here to help with any questions. ✨</p>
            <button
                onClick={onClose}
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 flex items-center justify-center border border-white/20 dark:border-black/10 shadow-lg"
            >
                <X className="w-3 h-3" />
            </button>
        </motion.div>
    );
}
