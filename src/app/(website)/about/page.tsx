import { Metadata } from "next";
import { aboutData, educationData, experienceData, profileData } from "@/data/static-db";
import { AboutPageClient } from "@/components/sections/AboutPageClient";

export const metadata: Metadata = {
    title: "About",
    description: "Learn about Bagus Hidayat, Full-Stack Web Developer specializing in Data Engineering, Machine Learning, and modern web architectures. Graduate of Universitas Negeri Malang currently working at PT Universal Big Data.",
    openGraph: {
        title: "About | Bagus Hidayat",
        description: "Learn about Bagus Hidayat, Full-Stack Web Developer specializing in Data Engineering and Machine Learning.",
        url: "https://www.bagus-hidayat.my.id/about",
    },
};

export default function AboutPage() {
    return (
        <AboutPageClient
            profile={profileData}
            aboutContent={aboutData}
            experience={experienceData}
            education={educationData}
        />
    );
}
