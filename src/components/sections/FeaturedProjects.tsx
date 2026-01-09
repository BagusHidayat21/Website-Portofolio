
import { getFeaturedProjects } from "@/actions/project.actions";
import { FeaturedProjectsClient } from "./FeaturedProjectsClient";

export async function FeaturedProjects() {
    const projects = await getFeaturedProjects();

    if (!projects || projects.length === 0) {
        return null;
    }

    return (
        <FeaturedProjectsClient projects={projects} />
    );
}
