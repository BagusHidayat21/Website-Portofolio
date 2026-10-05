import { notFound } from 'next/navigation';
import { ProjectDetail } from '@/components/sections/projects/ProjectDetail';
import { getAdjacentProjects, getProject, getProjects } from '@/lib/content';
import { getRepoStars, starsFor } from '@/lib/github';
import { pageMetadata } from '@/lib/seo';

export const revalidate = 3600;
export const dynamicParams = false;

export const generateStaticParams = () => getProjects().map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: PageProps<'/projects/[slug]'>) {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) return { title: 'Project Not Found' };
    return pageMetadata({
        title: project.title,
        description: project.description,
        path: `/projects/${project.slug}`,
        image: project.thumbnail ?? undefined,
    });
}

export default async function ProjectPage({ params }: PageProps<'/projects/[slug]'>) {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) notFound();

    const stars = await getRepoStars();
    const { prev, next } = getAdjacentProjects(project.slug);

    return <ProjectDetail project={project} stars={starsFor(stars, project.githubUrl)} prev={prev} next={next} />;
}
