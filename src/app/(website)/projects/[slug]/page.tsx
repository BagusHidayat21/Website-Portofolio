import { Metadata } from "next";
import { projectsData } from "@/data/static-db";
import { withGithubStats } from "@/lib/github";
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const project = projectsData.find(p => p.slug === slug || p.slug === decodedSlug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: project.title,
        description: project.description || `${project.title} - A project by Bagus Hidayat built with ${project.techStack?.slice(0, 3).join(", ") || "modern technologies"}.`,
        openGraph: {
            title: `${project.title} | Bagus Hidayat`,
            description: project.description || `${project.title} - A project by Bagus Hidayat.`,
            url: `https://www.bagus-hidayat.my.id/projects/${project.slug}`,
            images: project.thumbnail ? [{ url: project.thumbnail }] : undefined,
        },
    };
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

    const [withStats] = await withGithubStats([project]);

    return <ProjectDetailClient project={withStats} />;
}
