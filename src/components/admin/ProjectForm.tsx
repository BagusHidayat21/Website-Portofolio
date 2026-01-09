'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Project } from '@prisma/client';
import { createProject, updateProject } from '@/actions/project.actions';
import { useRouter } from 'next/navigation';
import {
    Save,
    FileText,
    Link as LinkIcon,
    Image as ImageIcon,
    Tag,
    Code,
    Eye,
    EyeOff,
    Star,
    ArrowLeft
} from 'lucide-react';

export function ProjectForm({ project }: { project?: Project | null }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const isEditing = !!project;

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);

        const rawTags = formData.get('tags') as string;
        const rawTech = formData.get('techStack') as string;
        const rawImages = formData.get('images') as string;

        const data = {
            title: formData.get('title') as string,
            slug: formData.get('slug') as string,
            description: formData.get('description') as string,
            content: formData.get('content') as string,
            liveUrl: formData.get('liveUrl') as string,
            githubUrl: formData.get('githubUrl') as string,
            isFeatured: formData.get('isFeatured') === 'on',
            isVisible: formData.get('isVisible') === 'on',
            order: parseInt(formData.get('order') as string) || 0,

            tags: rawTags.split(',').map(s => s.trim()).filter(Boolean),
            techStack: rawTech.split(',').map(s => s.trim()).filter(Boolean),
            images: rawImages.split(',').map(s => s.trim()).filter(Boolean),
        };

        let result;
        if (isEditing && project) {
            result = await updateProject(project.id, data);
        } else {
            result = await createProject(data);
        }

        setIsLoading(false);
        if (result.success) {
            router.push('/admin/projects');
        } else {
            alert('Error saving project: ' + JSON.stringify(result.error));
        }
    }

    return (
        <form action={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.back()}
                    className="gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Projects
                </Button>
            </div>

            {/* Basic Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Basic Information
                    </CardTitle>
                    <CardDescription>Essential details about your project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Project Title *</Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={project?.title || ''}
                                required
                                className="h-11"
                                placeholder="My Awesome Project"
                                onChange={(e) => {
                                    // Auto-generate slug if creating new or simple heuristic
                                    const slugInput = document.getElementById('slug') as HTMLInputElement;
                                    if (slugInput && !project) { // Only auto-fill for new projects
                                        slugInput.value = e.target.value
                                            .toLowerCase()
                                            .replace(/[^a-z0-9]+/g, '-')
                                            .replace(/(^-|-$)+/g, '');
                                    }
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">URL Slug *</Label>
                            <Input
                                id="slug"
                                name="slug"
                                defaultValue={project?.slug || ''}
                                required
                                className="h-11"
                                placeholder="my-awesome-project"
                            />
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Used in the project URL
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Short Description *</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={project?.description || ''}
                            required
                            className="min-h-[100px] resize-none"
                            placeholder="A brief overview of your project..."
                        />
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            This appears in project cards and search results
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Full Content (Markdown)</Label>
                        <Textarea
                            id="content"
                            name="content"
                            defaultValue={project?.content || ''}
                            className="min-h-[200px] font-mono text-sm"
                            placeholder="## Project Overview&#10;&#10;Write detailed content here using Markdown..."
                        />
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Detailed project description using Markdown syntax
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Links */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <LinkIcon className="h-5 w-5" />
                        Project Links
                    </CardTitle>
                    <CardDescription>External references and live demos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="liveUrl">Live Demo URL</Label>
                            <Input
                                id="liveUrl"
                                name="liveUrl"
                                defaultValue={project?.liveUrl || ''}
                                className="h-11"
                                placeholder="https://project-demo.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="githubUrl">GitHub Repository</Label>
                            <Input
                                id="githubUrl"
                                name="githubUrl"
                                defaultValue={project?.githubUrl || ''}
                                className="h-11"
                                placeholder="https://github.com/user/repo"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Media */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5" />
                        Images & Screenshots
                    </CardTitle>
                    <CardDescription>Project visuals and thumbnails</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="images">Image URLs (comma separated)</Label>
                        <Textarea
                            id="images"
                            name="images"
                            defaultValue={project?.images?.join(', ') || ''}
                            className="min-h-[80px] resize-none font-mono text-sm"
                            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                        />
                        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                            <Badge variant="outline" className="text-xs">TIP</Badge>
                            <span>First image will be used as the thumbnail</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Technologies */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        Technologies & Tags
                    </CardTitle>
                    <CardDescription>Technical details and categories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
                        <Input
                            id="techStack"
                            name="techStack"
                            defaultValue={project?.techStack?.join(', ') || ''}
                            className="h-11"
                            placeholder="React, Node.js, PostgreSQL, Docker"
                        />
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Technologies used in the project
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                            id="tags"
                            name="tags"
                            defaultValue={project?.tags?.join(', ') || ''}
                            className="h-11"
                            placeholder="Web Development, E-commerce, SaaS"
                        />
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Categories and keywords for filtering
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Visibility & Display
                    </CardTitle>
                    <CardDescription>Control how this project appears</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="isFeatured"
                                name="isFeatured"
                                defaultChecked={project?.isFeatured}
                                className="w-5 h-5 rounded border-zinc-300 dark:border-zinc-700"
                            />
                            <div className="space-y-0.5">
                                <Label htmlFor="isFeatured" className="flex items-center gap-2 font-semibold cursor-pointer">
                                    <Star className="h-4 w-4 text-yellow-500" />
                                    Featured Project
                                </Label>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Highlight on homepage
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="isVisible"
                                name="isVisible"
                                defaultChecked={project?.isVisible ?? true}
                                className="w-5 h-5 rounded border-zinc-300 dark:border-zinc-700"
                            />
                            <div className="space-y-0.5">
                                <Label htmlFor="isVisible" className="flex items-center gap-2 font-semibold cursor-pointer">
                                    {project?.isVisible ?? true ? (
                                        <Eye className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <EyeOff className="h-4 w-4 text-red-500" />
                                    )}
                                    Public Visibility
                                </Label>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Show on website
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="space-y-0.5">
                                <Label htmlFor="order" className="font-semibold">Display Order</Label>
                                <Input
                                    id="order"
                                    name="order"
                                    type="number"
                                    defaultValue={project?.order || 0}
                                    className="w-24 h-9"
                                    min="0"
                                />
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Sort priority
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Submit Actions */}
            <div className="flex justify-end gap-4 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => router.back()}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading}
                    size="lg"
                    className="gap-2 min-w-[150px]"
                >
                    {isLoading ? (
                        <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4" />
                            {isEditing ? 'Update Project' : 'Create Project'}
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
