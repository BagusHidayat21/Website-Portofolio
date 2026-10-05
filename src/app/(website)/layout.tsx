import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Backdrop } from "@/components/ui/backdrop";
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
                <Backdrop />
                <Navbar />
                <main id="main" className="relative z-10 flex min-h-screen flex-col">
                    {children}
                </main>
                <Footer />
                <BackToTop />
                <ChatbotLoader />
            </SplashScreen>
        </SmoothScroll>
    );
}
