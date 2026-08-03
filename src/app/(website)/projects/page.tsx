import { Metadata } from "next";
import { projectsData } from "@/data/static-db";
import { withGithubStats } from "@/lib/github";
import { ProjectsClient } from "@/components/sections/ProjectsClient";

export const metadata: Metadata = {
    title: "Projects",
    description: "Explore the portfolio of projects by Bagus Hidayat - featuring web applications, mobile apps, and data engineering solutions built with Next.js, Laravel, React Native, and more.",
    openGraph: {
        title: "Projects | Bagus Hidayat",
        description: "Explore web applications, mobile apps, and data engineering solutions by Bagus Hidayat.",
        url: "https://www.bagus-hidayat.my.id/projects",
    },
};

export default async function ProjectsPage() {
    const projects = projectsData.filter((p) => p.isVisible).sort((a, b) => a.order - b.order);
    const withStats = await withGithubStats(projects);
    return <ProjectsClient projects={withStats} />;
}
