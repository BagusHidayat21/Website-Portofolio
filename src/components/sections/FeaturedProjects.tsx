
import { projectsData } from "@/data/static-db";
import { withGithubStats } from "@/lib/github";
import { FeaturedProjectsClient } from "./FeaturedProjectsClient";

export async function FeaturedProjects() {
    const projects = projectsData
        .filter(p => p.isFeatured && p.isVisible)
        .sort((a, b) => a.order - b.order);

    if (!projects || projects.length === 0) {
        return null;
    }

    const withStats = await withGithubStats(projects);

    return (
        <FeaturedProjectsClient projects={withStats} />
    );
}
