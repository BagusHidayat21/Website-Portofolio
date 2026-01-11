'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Project } from '@prisma/client';
import { createProject, updateProject } from '@/actions/project.actions';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import {
    Save,
    FileText,
    Link as LinkIcon,
    Image as ImageIcon,
    Code,
    Eye,
    EyeOff,
    Star,
    ArrowLeft,
    X,
    Plus,
    Trash2,
    ImagePlus
} from 'lucide-react';
import { ImageCropperDialog } from './ImageCropperDialog';

interface GalleryImage {
    id: string;
    url: string;
    file?: File;
    isNew: boolean;
}

const PRESET_TECH = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL',
    'TailwindCSS', 'Prisma', 'Docker', 'AWS', 'Firebase',
    'Supabase', 'GraphQL', 'Redux', 'Zustand', 'Framer Motion',
    'Three.js', 'Flutter', 'React Native', 'Python', 'Django',
    'FastAPI', 'Go', 'Rust', 'Vite', 'Vue.js', 'Svelte'
];

export function ProjectForm({ project }: { project?: Project | null }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const isEditing = !!project;

    // Refs
    const coverInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);

    // Cropper State
    const [cropperOpen, setCropperOpen] = useState(false);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [cropTarget, setCropTarget] = useState<'cover' | 'gallery'>('cover');

    // Tech Stack State
    const [techStack, setTechStack] = useState<string[]>(project?.techStack || []);
    const [customTech, setCustomTech] = useState('');

    // Tags State
    const [tags, setTags] = useState<string[]>(project?.tags || []);
    const [customTag, setCustomTag] = useState('');

    // --- Images State ---

    // Cover is the first image if it exists
    const initialCoverUrl = project?.images?.[0] || null;
    const [coverImage, setCoverImage] = useState<{ url: string, file?: File, isNew: boolean } | null>(
        initialCoverUrl ? { url: initialCoverUrl, isNew: false } : null
    );

    // Gallery is the rest
    const initialGallery: GalleryImage[] = (project?.images?.slice(1) || []).map((url) => ({
        id: url,
        url,
        isNew: false
    }));
    const [gallery, setGallery] = useState<GalleryImage[]>(initialGallery);

    // --- Helpers ---
    const readFile = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => resolve(reader.result as string));
            reader.readAsDataURL(file);
        });
    };

    // --- Handlers ---

    const handleCropComplete = (croppedBlob: Blob) => {
        const file = new File([croppedBlob], "cropped-image.jpg", { type: "image/jpeg" });
        const url = URL.createObjectURL(file);

        if (cropTarget === 'cover') {
            setCoverImage({ url, file, isNew: true });
        } else {
            const newImage: GalleryImage = {
                id: uuidv4(),
                url,
                file,
                isNew: true
            };
            setGallery(prev => [...prev, newImage]);
        }

        setCropperOpen(false);
        setImageToCrop(null);
    };

    // Cover Image
    const handleCoverSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageDataUrl = await readFile(file);
            setImageToCrop(imageDataUrl);
            setCropTarget('cover');
            setCropperOpen(true);

            if (coverInputRef.current) coverInputRef.current.value = '';
        }
    };

    const removeCoverImage = () => {
        setCoverImage(null);
    };

    // Gallery Images
    const handleGallerySelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);

            // If single file, crop it to ensure standard
            if (files.length === 1) {
                const imageDataUrl = await readFile(files[0]);
                setImageToCrop(imageDataUrl);
                setCropTarget('gallery');
                setCropperOpen(true);
            } else {
                // If multiple, just add them (bulk upload trade-off)
                const newImages: GalleryImage[] = files.map(file => ({
                    id: uuidv4(),
                    url: URL.createObjectURL(file), // Preview URL
                    file: file,
                    isNew: true
                }));
                setGallery(prev => [...prev, ...newImages]);
            }
            if (galleryInputRef.current) galleryInputRef.current.value = '';
        }
    };

    const removeGalleryImage = (id: string) => {
        setGallery(prev => prev.filter(img => img.id !== id));
    };

    // Tech Handlers
    const toggleTech = (tech: string) => {
        setTechStack(prev =>
            prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
        );
    };

    const addCustomTech = () => {
        if (customTech.trim() && !techStack.includes(customTech.trim())) {
            setTechStack(prev => [...prev, customTech.trim()]);
            setCustomTech('');
        }
    };

    const removeTech = (tech: string) => {
        setTechStack(prev => prev.filter(t => t !== tech));
    };

    // Tag Handlers
    const addCustomTag = () => {
        if (customTag.trim() && !tags.includes(customTag.trim())) {
            setTags(prev => [...prev, customTag.trim()]);
            setCustomTag('');
        }
    };

    const removeTag = (tag: string) => {
        setTags(prev => prev.filter(t => t !== tag));
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        if (isEditing && project) {
            formData.append('id', project.id.toString());
        }

        // Handle Checkboxes
        formData.set('isFeatured', (e.currentTarget.elements.namedItem('isFeatured') as HTMLInputElement).checked ? 'true' : 'false');
        formData.set('isVisible', (e.currentTarget.elements.namedItem('isVisible') as HTMLInputElement).checked ? 'true' : 'false');

        // Append JSON arrays
        formData.set('tags', JSON.stringify(tags));
        formData.set('techStack', JSON.stringify(techStack));

        // --- Images ---

        // 1. Cover
        if (coverImage) {
            if (coverImage.isNew && coverImage.file) {
                formData.append('coverImageFile', coverImage.file);
            } else {
                formData.append('coverImageUrl', coverImage.url);
            }
        }

        // 2. Gallery
        const existingGalleryUrls = gallery.filter(img => !img.isNew).map(img => img.url);
        formData.set('galleryImageUrls', JSON.stringify(existingGalleryUrls));

        gallery.filter(img => img.isNew && img.file).forEach(img => {
            if (img.file) formData.append('galleryImageFiles', img.file);
        });

        let result;
        if (isEditing) {
            result = await updateProject(formData);
        } else {
            result = await createProject(formData);
        }

        setIsLoading(false);
        if (result.success) {
            router.push('/admin/projects');
        } else {
            alert('Error saving project: ' + JSON.stringify(result.error));
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
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
                                    const slugInput = document.getElementById('slug') as HTMLInputElement;
                                    if (slugInput && !project) {
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

            {/* Technologies */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        Technologies & Stack
                    </CardTitle>
                    <CardDescription>Select the technologies used in this project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Selected Tech */}
                    <div className="space-y-2">
                        <Label>Selected Technologies</Label>
                        <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                            {techStack.length === 0 && <span className="text-zinc-400 text-sm">No technologies selected</span>}
                            {techStack.map(tech => (
                                <Badge
                                    key={tech}
                                    className="px-3 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
                                    onClick={() => removeTech(tech)}
                                >
                                    {tech} <X className="ml-1 w-3 h-3" />
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Preset Options */}
                    <div className="space-y-2">
                        <Label>Popular Frameworks & Tools</Label>
                        <div className="flex flex-wrap gap-2">
                            {PRESET_TECH.filter(t => !techStack.includes(t)).map(tech => (
                                <Badge
                                    key={tech}
                                    variant="outline"
                                    className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                    onClick={() => toggleTech(tech)}
                                >
                                    {tech} <Plus className="ml-1 w-3 h-3" />
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Custom Tech */}
                    <div className="flex gap-2">
                        <Input
                            value={customTech}
                            onChange={(e) => setCustomTech(e.target.value)}
                            placeholder="Add other technology..."
                            className="flex-1"
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTech())}
                        />
                        <Button type="button" onClick={addCustomTech} variant="secondary">Add</Button>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <Label>Project Categories / Tags</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {tags.map(tag => (
                                <Badge key={tag} variant="secondary" onClick={() => removeTag(tag)} className="cursor-pointer hover:bg-red-200">
                                    {tag} <X className="ml-1 w-3 h-3" />
                                </Badge>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                value={customTag}
                                onChange={(e) => setCustomTag(e.target.value)}
                                placeholder="e.g. E-commerce, Open Source..."
                                className="flex-1"
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
                            />
                            <Button type="button" onClick={addCustomTag} variant="outline">Add Tag</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Img: Cover Image */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5" />
                        Cover Image (Thumbnail)
                    </CardTitle>
                    <CardDescription>This is the main image displayed on the project card.</CardDescription>
                </CardHeader>
                <CardContent>
                    {!coverImage ? (
                        <div className="aspect-video relative max-w-md mx-auto">
                            <Label
                                htmlFor="cover-image"
                                className="w-full h-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-50 dark:bg-zinc-900/50"
                            >
                                <ImagePlus className="w-8 h-8" />
                                <span className="text-sm font-medium">Upload Cover</span>
                            </Label>
                            <Input
                                ref={coverInputRef}
                                id="cover-image"
                                type="file"
                                accept="image/*"
                                onChange={handleCoverSelect}
                                className="hidden"
                            />
                        </div>
                    ) : (
                        <div className="relative aspect-video max-w-md mx-auto rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 group bg-zinc-900">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={coverImage.url} alt="Cover" className="w-full h-full object-cover object-top" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => coverInputRef.current?.click()}
                                >
                                    Replace
                                </Button>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={removeCoverImage}
                                >
                                    Remove
                                </Button>
                            </div>
                            {/* Hidden input for replace logic re-trigger */}
                            <Input
                                ref={coverInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleCoverSelect}
                                className="hidden"
                            />
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Img: Gallery */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ImagePlus className="h-5 w-5" />
                        Project Gallery
                    </CardTitle>
                    <CardDescription>Additional screenshots and details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {gallery.map((img, index) => (
                            <div key={img.id} className="relative aspect-video rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 group bg-zinc-900">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={img.url} alt={`Screenshot ${index}`} className="w-full h-full object-cover object-top" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => removeGalleryImage(img.id)}
                                        className="h-9 w-9 p-0 rounded-full"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {/* Upload Button */}
                        <div className="aspect-video relative">
                            <Label
                                htmlFor="gallery-images"
                                className="w-full h-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-50 dark:bg-zinc-900/50"
                            >
                                <Plus className="w-8 h-8" />
                                <span className="text-sm font-medium">Add Images</span>
                            </Label>
                            <Input
                                ref={galleryInputRef}
                                id="gallery-images"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleGallerySelect}
                                className="hidden"
                            />
                        </div>
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
                            <Label htmlFor="isFeatured" className="flex items-center gap-2 font-semibold cursor-pointer">
                                <Star className="h-4 w-4 text-yellow-500" />
                                Featured Project
                            </Label>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="isVisible"
                                name="isVisible"
                                defaultChecked={project?.isVisible ?? true}
                                className="w-5 h-5 rounded border-zinc-300 dark:border-zinc-700"
                            />
                            <Label htmlFor="isVisible" className="flex items-center gap-2 font-semibold cursor-pointer">
                                {project?.isVisible ?? true ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                Public Visibility
                            </Label>
                        </div>

                        <div className="flex items-center gap-3">
                            <Label htmlFor="order" className="font-semibold">Order</Label>
                            <Input
                                id="order"
                                name="order"
                                type="number"
                                defaultValue={project?.order || 0}
                                className="w-24 h-9"
                                min="0"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Submit Actions */}
            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading} size="lg" className="gap-2 min-w-[150px]">
                    {isLoading ? (
                        <>Saving...</>
                    ) : (
                        <>
                            <Save className="h-4 w-4" />
                            {isEditing ? 'Update Project' : 'Create Project'}
                        </>
                    )}
                </Button>
            </div>

            <ImageCropperDialog
                open={cropperOpen}
                imageSrc={imageToCrop}
                aspectRatio={16 / 9}
                onClose={() => setCropperOpen(false)}
                onCropComplete={handleCropComplete}
            />
        </form>
    );
}
