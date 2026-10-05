import { Metadata } from "next";
import { profileData, projectsData, techStackData } from "@/data/static-db";
import { ProjectsClient } from "@/components/sections/ProjectsClient";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
    title: "Projects",
    description: "Explore the portfolio of projects by Bagus Hidayat - featuring web applications, mobile apps, and data engineering solutions built with Next.js, Laravel, Flutter, and more.",
    openGraph: {
        title: "Projects | Bagus Hidayat",
        description: "Explore web applications, mobile apps, and data engineering solutions by Bagus Hidayat.",
        url: "https://www.bagus-hidayat.my.id/projects",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Bagus Hidayat Portfolio" }],
    },
    alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
    const projects = projectsData.filter((p) => p.isVisible).sort((a, b) => a.order - b.order);
    const marqueeItems = techStackData
        .filter((t) => t.inMarquee && t.isVisible)
        .sort((a, b) => a.order - b.order)
        .map((t) => t.name);
    const githubUrl = profileData.socials.find((s) => s.platform === 'GitHub')?.url;

    return (
        <>
            <ProjectsClient projects={projects} marqueeItems={marqueeItems} githubUrl={githubUrl} />
            <Contact />
        </>
    );
}
