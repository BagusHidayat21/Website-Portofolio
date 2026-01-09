import { getProjects } from "@/actions/project.actions";
import { ProjectsClient } from "@/components/sections/ProjectsClient";

export default async function ProjectsPage() {
    const projects = await getProjects();
    return <ProjectsClient projects={projects} />;
}
