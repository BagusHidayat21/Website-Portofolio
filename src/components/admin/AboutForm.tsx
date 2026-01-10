'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateAboutContent } from '@/actions/about.actions';
import { Save, Type, FileText, Image as ImageIcon, Tags, X, Lightbulb, Plus, Trash2 } from 'lucide-react';

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
    mainImage?: string | null;
    secondaryImage?: string | null;
    tags?: string[];
    philosophy?: PhilosophyItem[] | unknown | null;
    updatedAt?: Date;
}

interface AboutFormProps {
    initialData: AboutFormData | null;
}

// Preset tag options the user can choose from
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

// Available icon options for philosophy cards
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

// Default philosophy items
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

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        const data = {
            heroTitle: formData.get('heroTitle') as string,
            heroSubtitle: formData.get('heroSubtitle') as string,
            heroDescription: formData.get('heroDescription') as string,
            storyTitle: formData.get('storyTitle') as string,
            storyContent: formData.get('storyContent') as string,
            mainImage: formData.get('mainImage') as string,
            secondaryImage: formData.get('secondaryImage') as string,
            tags: selectedTags,
            philosophy: philosophy,
        };

        await updateAboutContent(data);
        setIsLoading(false);
        router.refresh();
        alert('About page updated successfully!');
    }

    return (
        <form action={handleSubmit} className="space-y-6">
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
                        Images
                    </CardTitle>
                    <CardDescription>Image URLs for the About page photo grid</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="mainImage">Main Image URL</Label>
                            <Input
                                id="mainImage"
                                name="mainImage"
                                placeholder="https://..."
                                defaultValue={initialData?.mainImage || ''}
                                className="h-11"
                            />
                            <p className="text-xs text-zinc-500">Large image in the photo grid</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="secondaryImage">Secondary Image URL</Label>
                            <Input
                                id="secondaryImage"
                                name="secondaryImage"
                                placeholder="https://..."
                                defaultValue={initialData?.secondaryImage || ''}
                                className="h-11"
                            />
                            <p className="text-xs text-zinc-500">Smaller secondary image</p>
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
    );
}
