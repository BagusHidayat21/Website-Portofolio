import { getProjectBySlug } from "@/actions/project.actions";
import { ProjectDetailClient } from "@/components/sections/ProjectDetailClient";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug } = await params;

    // Safety check for slug
    if (!slug) {
        return notFound();
    }

    // Try precise match first, then decoded
    let project = await getProjectBySlug(slug);

    if (!project) {
        project = await getProjectBySlug(decodeURIComponent(slug));
    }

    if (!project) {
        return notFound();
    }

    return <ProjectDetailClient project={project} />;
}
