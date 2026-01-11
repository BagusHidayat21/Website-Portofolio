import { projectsData } from "@/data/static-db";
import { ProjectDetailClient } from "@/components/sections/ProjectDetailClient";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return projectsData.filter(p => p.isVisible).map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug } = await params;

    if (!slug) {
        return notFound();
    }

    const decodedSlug = decodeURIComponent(slug);
    const project = projectsData.find(p => p.slug === slug || p.slug === decodedSlug);

    if (!project) {
        return notFound();
    }

    return <ProjectDetailClient project={project} />;
}
