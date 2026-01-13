import { Metadata } from "next";
import { aboutData, educationData, experienceData } from "@/data/static-db";
import { AboutPageClient, AboutContentData } from "@/components/sections/AboutPageClient";

export const metadata: Metadata = {
    title: "About",
    description: "Learn about Bagus Hidayat - Full-Stack Web Developer specializing in Data Engineering, Machine Learning, and modern web technologies. Currently studying at Universitas Negeri Malang.",
    openGraph: {
        title: "About | Bagus Hidayat",
        description: "Learn about Bagus Hidayat - Full-Stack Web Developer specializing in Data Engineering and Machine Learning.",
        url: "https://bagus-hidayat.my.id/about",
    },
};

export default function AboutPage() {
    return <AboutPageClient aboutContent={aboutData as unknown as AboutContentData} experience={experienceData} education={educationData} />;
}
