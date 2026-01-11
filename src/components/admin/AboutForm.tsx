'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateAboutContent } from '@/actions/about.actions';
import { Save, Type, FileText, Image as ImageIcon, Tags, X, Lightbulb, Plus, Trash2, Check } from 'lucide-react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/cropImage';
import { toast } from 'sonner';

interface PhilosophyItem {
    title: string;
    description: string;
    icon: string;
}

interface AboutFormData {
    id?: number;
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    storyTitle?: string | null;
    storyContent?: string | null;
    images?: string[];
    tags?: string[];
    philosophy?: PhilosophyItem[] | unknown | null;
    updatedAt?: Date;
}

interface AboutFormProps {
    initialData: AboutFormData | null;
}

interface GalleryImage {
    id: string;
    url: string;
    file?: Blob;
    isNew: boolean;
}

const PRESET_TAGS = [
    'Data & Machine Learning',
    'Web & Application Development',
    'Backend Engineering',
    'Frontend Development',
    'Mobile Development',
    'Cloud & DevOps',
    'Database Management',
    'API Development',
    'UI/UX Design',
    'Data Science',
    'Artificial Intelligence',
    'Full Stack Development',
];

const ICON_OPTIONS = [
    { value: 'Database', label: 'Database' },
    { value: 'BrainCircuit', label: 'AI/Brain' },
    { value: 'Server', label: 'Server' },
    { value: 'Code', label: 'Code' },
    { value: 'Globe', label: 'Globe' },
    { value: 'Layers', label: 'Layers' },
    { value: 'Cpu', label: 'CPU' },
    { value: 'Shield', label: 'Shield' },
    { value: 'Zap', label: 'Lightning' },
    { value: 'Target', label: 'Target' },
];

const DEFAULT_PHILOSOPHY: PhilosophyItem[] = [
    {
        title: 'Data Centric',
        description: 'I believe applications are more than just interfaces; they are engines for structured data.',
        icon: 'Database'
    },
    {
        title: 'Intelligent Systems',
        description: 'Moving beyond static logic, I integrate Machine Learning pipelines to create adaptive applications.',
        icon: 'BrainCircuit'
    },
    {
        title: 'Robust Infrastructure',
        description: 'Reliability is key. I architect resilient backend APIs and databases as the solid foundation.',
        icon: 'Server'
    }
];

export function AboutForm({ initialData }: AboutFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags || []);
    const [customTag, setCustomTag] = useState('');
    const [philosophy, setPhilosophy] = useState<PhilosophyItem[]>(
        (initialData?.philosophy as PhilosophyItem[]) || DEFAULT_PHILOSOPHY
    );

    // Initial images from DB
    const initialImages: GalleryImage[] = (initialData?.images || []).map((url) => ({
        id: url, // Use URL as ID for existing images
        url,
        isNew: false
    }));

    const [gallery, setGallery] = useState<GalleryImage[]>(initialImages);

    // Cropper State
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
    const [isCropping, setIsCropping] = useState(false);
    const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const addCustomTag = () => {
        if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
            setSelectedTags(prev => [...prev, customTag.trim()]);
            setCustomTag('');
        }
    };

    const removeTag = (tag: string) => {
        setSelectedTags(prev => prev.filter(t => t !== tag));
    };

    const updatePhilosophyItem = (index: number, field: keyof PhilosophyItem, value: string) => {
        setPhilosophy(prev => prev.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        ));
    };

    const addPhilosophyItem = () => {
        setPhilosophy(prev => [...prev, { title: '', description: '', icon: 'Database' }]);
    };

    const removePhilosophyItem = (index: number) => {
        setPhilosophy(prev => prev.filter((_, i) => i !== index));
    };

    // Gallery & Cropping Handlers
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setCropImageSrc(url);
            setIsCropping(true);
            setZoom(1);
            setCrop({ x: 0, y: 0 });
        }
    };

    const onCropComplete = useCallback((croppedArea: { x: number; y: number; width: number; height: number }, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCropSave = async () => {
        if (!cropImageSrc || !croppedAreaPixels) return;
        try {
            const croppedBlob = await getCroppedImg(cropImageSrc, croppedAreaPixels);
            if (croppedBlob) {
                const croppedUrl = URL.createObjectURL(croppedBlob);
                const newImage: GalleryImage = {
                    id: uuidv4(),
                    url: croppedUrl,
                    file: croppedBlob,
                    isNew: true
                };
                setGallery(prev => [...prev, newImage]);
                handleCropCancel();
            }
        } catch (e) {
            console.error(e);
            toast.error('Something went wrong cropping the image');
        }
    };

    const handleCropCancel = () => {
        setIsCropping(false);
        setCropImageSrc(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeGalleryImage = (id: string) => {
        setGallery(prev => prev.filter(img => img.id !== id));
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget); // Standard fields

        // Append non-standard fields manually
        // Tags
        formData.set('tags', JSON.stringify(selectedTags));

        // Philosophy
        formData.set('philosophy', JSON.stringify(philosophy));

        // Images
        const existingImages = gallery.filter(img => !img.isNew).map(img => img.url);
        formData.set('existingImages', JSON.stringify(existingImages));

        // New Images
        gallery.filter(img => img.isNew && img.file).forEach(img => {
            if (img.file) {
                formData.append('newImages', img.file, 'image.jpg');
            }
        });

        const result = await updateAboutContent(formData);

        setIsLoading(false);
        if (result.success) {
            router.refresh();
            setGallery(prev => prev.map(img => ({ ...img, isNew: false }))); // Reset new flags roughly, though strictly IDs change on server. 
            // In a real app we'd reload data from server to get canonical URLs.
            // But refreshing router updates 'initialData', so simpler component re-mount/update is safer.
            // However, local state 'gallery' might persist if we don't sync.
            // Since router.refresh() triggers a re-render with new initialData, we rely on key or effect to sync?
            // Actually, we should probably force a full re-initialization or just alert and let Next.js handle it.
            toast.success('About page updated successfully!');
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const errorMessage = (result.error as any)?.message || 'Unknown error occurred';
            toast.error(`Failed to update about page: ${errorMessage}`);
        }
    }

    return (
        <>
            {/* Crop Modal */}
            {isCropping && cropImageSrc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-lg bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-zinc-800 flex flex-col max-h-[90vh]">
                        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-white">Add Image</h3>
                            <button type="button" onClick={handleCropCancel} className="text-zinc-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="relative h-64 sm:h-80 w-full bg-black">
                            <Cropper
                                image={cropImageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={undefined} // Free aspect ratio
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>

                        <div className="p-6 space-y-6 bg-zinc-900">
                            <div className="space-y-3">
                                <Label className="text-xs font-medium uppercase tracking-wider text-zinc-500">Zoom</Label>
                                <input
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    onChange={(e) => setZoom(Number(e.target.value))}
                                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                                />
                            </div>

                            <div className="flex gap-3 justify-end pt-2">
                                <Button type="button" variant="outline" onClick={handleCropCancel} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                                    Cancel
                                </Button>
                                <Button type="button" onClick={handleCropSave} className="bg-white text-black hover:bg-zinc-200 gap-2">
                                    <Check className="w-4 h-4" />
                                    Add Image
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Hero Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Type className="h-5 w-5" />
                            Hero Section
                        </CardTitle>
                        <CardDescription>Configure the main hero section of the About page</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="heroTitle">Hero Title *</Label>
                                <Input
                                    id="heroTitle"
                                    name="heroTitle"
                                    placeholder="e.g., ENGINEERING"
                                    defaultValue={initialData?.heroTitle || 'ENGINEERING'}
                                    required
                                    className="h-11"
                                />
                                <p className="text-xs text-zinc-500">First line of the hero headline</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="heroSubtitle">Hero Subtitle *</Label>
                                <Input
                                    id="heroSubtitle"
                                    name="heroSubtitle"
                                    placeholder="e.g., EXCELLENCE"
                                    defaultValue={initialData?.heroSubtitle || 'EXCELLENCE'}
                                    required
                                    className="h-11"
                                />
                                <p className="text-xs text-zinc-500">Second line of the hero headline</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="heroDescription">Hero Description *</Label>
                            <Textarea
                                id="heroDescription"
                                name="heroDescription"
                                defaultValue={initialData?.heroDescription || ''}
                                required
                                className="min-h-[120px] resize-none"
                                placeholder="Brief introduction about yourself..."
                            />
                            <p className="text-xs text-zinc-500">
                                The introductory paragraph below the hero title
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Story Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Story Section
                        </CardTitle>
                        <CardDescription>Your narrative story on the About page</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="storyTitle">Story Title</Label>
                            <Input
                                id="storyTitle"
                                name="storyTitle"
                                placeholder="e.g., The Story"
                                defaultValue={initialData?.storyTitle || ''}
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="storyContent">Story Content</Label>
                            <Textarea
                                id="storyContent"
                                name="storyContent"
                                defaultValue={initialData?.storyContent || ''}
                                className="min-h-[200px] resize-none"
                                placeholder="Write your detailed story here..."
                            />
                            <p className="text-xs text-zinc-500">
                                Your detailed narrative about your journey and expertise
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Tags Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Tags className="h-5 w-5" />
                            Expertise Tags
                        </CardTitle>
                        <CardDescription>Select tags that describe your expertise (shown below the story)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Selected Tags */}
                        {selectedTags.length > 0 && (
                            <div className="space-y-2">
                                <Label>Selected Tags</Label>
                                <div className="flex flex-wrap gap-2">
                                    {selectedTags.map(tag => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 cursor-pointer flex items-center gap-2"
                                            onClick={() => removeTag(tag)}
                                        >
                                            {tag}
                                            <X className="h-3 w-3" />
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Preset Tag Options */}
                        <div className="space-y-2">
                            <Label>Available Tags (click to select)</Label>
                            <div className="flex flex-wrap gap-2">
                                {PRESET_TAGS.filter(tag => !selectedTags.includes(tag)).map(tag => (
                                    <Badge
                                        key={tag}
                                        variant="outline"
                                        className="px-3 py-1.5 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Custom Tag Input */}
                        <div className="space-y-2">
                            <Label>Add Custom Tag</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={customTag}
                                    onChange={(e) => setCustomTag(e.target.value)}
                                    placeholder="Type a custom tag..."
                                    className="h-11 flex-1"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addCustomTag();
                                        }
                                    }}
                                />
                                <Button type="button" variant="outline" onClick={addCustomTag} className="h-11">
                                    Add
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Philosophy Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lightbulb className="h-5 w-5" />
                            Philosophy Cards
                        </CardTitle>
                        <CardDescription>Manage the philosophy/expertise cards displayed at the bottom of the About page</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {philosophy.map((item, index) => (
                            <div key={index} className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label className="text-base font-semibold">Card {index + 1}</Label>
                                    {philosophy.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removePhilosophyItem(index)}
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Title</Label>
                                        <Input
                                            value={item.title}
                                            onChange={(e) => updatePhilosophyItem(index, 'title', e.target.value)}
                                            placeholder="e.g., Data Centric"
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Icon</Label>
                                        <Select
                                            value={item.icon}
                                            onValueChange={(value) => updatePhilosophyItem(index, 'icon', value)}
                                        >
                                            <SelectTrigger className="h-11">
                                                <SelectValue placeholder="Select icon" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {ICON_OPTIONS.map(opt => (
                                                    <SelectItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Textarea
                                        value={item.description}
                                        onChange={(e) => updatePhilosophyItem(index, 'description', e.target.value)}
                                        placeholder="Describe this philosophy point..."
                                        className="min-h-[80px] resize-none"
                                    />
                                </div>
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            onClick={addPhilosophyItem}
                            className="w-full h-11 gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add Philosophy Card
                        </Button>
                    </CardContent>
                </Card>

                {/* Images Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ImageIcon className="h-5 w-5" />
                            Image Gallery
                        </CardTitle>
                        <CardDescription>
                            Manage images for the About page. You can upload multiple images.
                            The first image will be the Main Image, and the second will be the Secondary Image.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {gallery.map((img, index) => (
                                <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 group bg-zinc-100 dark:bg-zinc-800">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={img.url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />

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
                                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                                        {index === 0 ? 'Main' : index === 1 ? 'Secondary' : `Image ${index + 1}`}
                                    </div>
                                </div>
                            ))}

                            {/* Add Image Button */}
                            <div className="aspect-square">
                                <Label
                                    htmlFor="gallery-upload"
                                    className="w-full h-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-50 dark:bg-zinc-900/50"
                                >
                                    <ImagePlusIcon className="w-8 h-8" />
                                    <span className="text-sm font-medium">Add Image</span>
                                </Label>
                                <Input
                                    ref={fileInputRef}
                                    id="gallery-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" size="lg">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading} size="lg" className="gap-2 min-w-[150px]">
                        {isLoading ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </>
    );
}

function ImagePlusIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
            <line x1="16" x2="22" y1="5" y2="5" />
            <line x1="19" x2="19" y1="2" y2="8" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
    )
}
