import { ChatbotLoader } from '@/components/chat/ChatbotLoader';
import { Backdrop } from '@/components/layout/Backdrop';
import { BackToTop } from '@/components/layout/BackToTop';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { SplashScreen } from '@/components/layout/SplashScreen';

export default function WebsiteLayout({ children }: LayoutProps<'/'>) {
    return (
        <>
            <SmoothScroll />
            <SplashScreen />
            <Backdrop />
            <Navbar />
            <main id="main" className="relative z-10 flex min-h-screen flex-col">
                {children}
            </main>
            <Footer />
            <BackToTop />
            <ChatbotLoader />
        </>
    );
}
