import { Metadata } from "next";
import { projectsData } from "@/data/static-db";
import { ProjectDetailClient } from "@/components/sections/ProjectDetailClient";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return projectsData.filter((p) => p.isVisible).map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const project = projectsData.find((p) => p.slug === slug || p.slug === decodedSlug);

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
            images: project.thumbnail ? [{ url: project.thumbnail }] : [{ url: "/og-image.png", width: 1200, height: 630 }],
        },
        alternates: { canonical: `/projects/${project.slug}` },
    };
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug } = await params;

    if (!slug) {
        return notFound();
    }

    const decodedSlug = decodeURIComponent(slug);
    const project = projectsData.find((p) => p.slug === slug || p.slug === decodedSlug);

    if (!project) {
        return notFound();
    }

    const sorted = projectsData.filter((p) => p.isVisible).sort((a, b) => a.order - b.order);
    const currentIndex = sorted.findIndex((p) => p.id === project.id);
    const prevProject = currentIndex > 0 ? sorted[currentIndex - 1] : null;
    const nextProject = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;

    return (
        <ProjectDetailClient
            project={project}
            prevProject={prevProject}
            nextProject={nextProject}
        />
    );
}
