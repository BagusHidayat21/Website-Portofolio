import { projectsData } from "@/data/static-db";
import { ProjectsClient } from "@/components/sections/ProjectsClient";

export default function ProjectsPage() {
    const projects = projectsData.filter((p) => p.isVisible).sort((a, b) => a.order - b.order);
    return <ProjectsClient projects={projects} />;
}
