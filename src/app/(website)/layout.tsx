import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { BackToTop } from "@/components/layout/BackToTop";
import { ChatbotLoader } from "@/components/chat/ChatbotLoader";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

export default function WebsiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SmoothScroll>
            <SplashScreen>
                <AnimatedBackground />
                <Navbar />
                <main className="relative z-10 flex min-h-screen flex-col bg-ink-bg">
                    {children}
                </main>
                <Footer />
                <BackToTop />
                <ChatbotLoader />
            </SplashScreen>
        </SmoothScroll>
    );
}
