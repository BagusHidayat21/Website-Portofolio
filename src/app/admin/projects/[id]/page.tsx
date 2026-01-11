
import { ProjectForm } from '@/components/admin/ProjectForm';
import { getProjectById } from '@/actions/project.actions';


interface EditProjectPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProjectPage(props: EditProjectPageProps) {
    const params = await props.params;
    const id = parseInt(params.id);

    if (isNaN(id)) {
        return (
            <div className="p-8 text-red-500">
                Invalid ID received: {String(params.id)}
            </div>
        );
    }

    const project = await getProjectById(id);

    if (!project) {
        return (
            <div className="p-8">
                <h1 className="text-xl font-bold text-red-500">Project Not Found</h1>
                <p className="mt-2 text-zinc-600">
                    Tried to fetch Project ID: <strong>{id}</strong> (Type: {typeof id})
                </p>
                <p className="mt-2 text-zinc-500">
                    Check if this ID exists in your database.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-8 dark:text-zinc-50">Edit Project: {project.title}</h1>
            <ProjectForm project={project} />
        </div>
    );
}
