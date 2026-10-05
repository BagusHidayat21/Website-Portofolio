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
                {/* Opaque, clipped page sheet that slides off the sticky footer (curtain reveal). */}
                <main className="relative z-10 overflow-clip rounded-b-[2rem] bg-ink-bg shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] md:rounded-b-[3rem]">
                    {children}
                </main>
                <Footer />
                <BackToTop />
                <ChatbotLoader />
            </SplashScreen>
        </SmoothScroll>
    );
}
