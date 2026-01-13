import { Metadata } from "next";
import { projectsData } from "@/data/static-db";
import { ProjectsClient } from "@/components/sections/ProjectsClient";

export const metadata: Metadata = {
    title: "Projects",
    description: "Explore the portfolio of projects by Bagus Hidayat - featuring web applications, mobile apps, and data engineering solutions built with Next.js, Laravel, React Native, and more.",
    openGraph: {
        title: "Projects | Bagus Hidayat",
        description: "Explore web applications, mobile apps, and data engineering solutions by Bagus Hidayat.",
        url: "https://bagus-hidayat.my.id/projects",
    },
};

export default function ProjectsPage() {
    const projects = projectsData.filter((p) => p.isVisible).sort((a, b) => a.order - b.order);
    return <ProjectsClient projects={projects} />;
}
