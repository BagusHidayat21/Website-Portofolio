'use client';

import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("./Chatbot").then(mod => mod.Chatbot), {
    ssr: false,
});

export function ChatbotLoader() {
    return <Chatbot />;
}
