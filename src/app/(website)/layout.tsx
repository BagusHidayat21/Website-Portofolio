import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { SplashScreen } from "@/components/layout/SplashScreen";

export default function WebsiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <SplashScreen />
            <AnimatedBackground />
            <Navbar />
            <main className="relative z-10">{children}</main>
            <Footer />
        </>
    );
}
