import { Metadata } from "next";
import { aboutData, educationData, experienceData, profileData, techStackData } from "@/data/static-db";
import { AboutPageClient } from "@/components/sections/AboutPageClient";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
    title: "About",
    description: "Learn about Bagus Hidayat, Full-Stack Web Developer specializing in Data Engineering, Machine Learning, and modern web architectures. Graduate of Universitas Negeri Malang currently working at PT Universal Big Data.",
    openGraph: {
        title: "About | Bagus Hidayat",
        description: "Learn about Bagus Hidayat, Full-Stack Web Developer specializing in Data Engineering and Machine Learning.",
        url: "https://www.bagus-hidayat.my.id/about",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Bagus Hidayat Portfolio" }],
    },
    alternates: { canonical: "/about" },
};

export default function AboutPage() {
    // Same tape as home, led by the focus areas.
    const marqueeItems = [
        ...aboutData.tags,
        ...techStackData.filter((t) => t.inMarquee && t.isVisible).sort((a, b) => a.order - b.order).map((t) => t.name),
    ];

    return (
        <>
            <AboutPageClient
                profile={profileData}
                aboutContent={aboutData}
                experience={experienceData}
                education={educationData}
                marqueeItems={marqueeItems}
            />
            <Contact />
        </>
    );
}
