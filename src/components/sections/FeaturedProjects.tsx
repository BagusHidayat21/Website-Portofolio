
import { projectsData } from "@/data/static-db";
import { FeaturedProjectsClient } from "./FeaturedProjectsClient";

export function FeaturedProjects() {
    const projects = projectsData
        .filter(p => p.isFeatured && p.isVisible)
        .sort((a, b) => a.order - b.order);

    if (!projects || projects.length === 0) {
        return null;
    }

    return (
        <FeaturedProjectsClient projects={projects} />
    );
}
