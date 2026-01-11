'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { updateProfile } from '@/actions/profile.actions';
import { Profile } from '@prisma/client';
import { Save, User, Mail, MapPin, Link as LinkIcon, Github, Linkedin, Camera, Upload, X, Check } from 'lucide-react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/cropImage';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function ProfileForm({ initialData }: { initialData: Profile }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isAvailable, setIsAvailable] = useState(initialData.isAvailableForWork ?? true);

    const [previewUrl, setPreviewUrl] = useState(initialData.avatarUrl);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Crop state
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
    const [isCropping, setIsCropping] = useState(false);
    const [cropImage, setCropImage] = useState<string | null>(null);
    const [croppedFile, setCroppedFile] = useState<Blob | null>(null);

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        formData.set('isAvailableForWork', String(isAvailable));

        // If defined, append the cropped blob instead of the original file
        if (croppedFile) {
            formData.set('avatar', croppedFile, 'avatar.jpg');
        }

        const result = await updateProfile(formData);

        setIsLoading(false);
        if (result?.success) {
            router.refresh();
            setCroppedFile(null); // Reset after save
            toast.success('Profile updated successfully!');
        } else {
            console.error('Profile update error:', result?.error);
            // Try to extract a meaningful error message
            const errorMessage = result?.error instanceof Error ? result.error.message : 'Unknown error occurred';
            toast.error(`Failed to update profile: ${errorMessage}`);
        }
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setCropImage(url);
            setIsCropping(true);
        }
    };

    const handleRemoveAvatar = () => {
        setPreviewUrl(null);
        setCroppedFile(null);
        setCropImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const onCropComplete = useCallback((croppedArea: { x: number; y: number; width: number; height: number }, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCropSave = async () => {
        if (!cropImage || !croppedAreaPixels) return;
        try {
            const croppedBlob = await getCroppedImg(cropImage, croppedAreaPixels);
            if (croppedBlob) {
                const croppedUrl = URL.createObjectURL(croppedBlob);
                setPreviewUrl(croppedUrl);
                setCroppedFile(croppedBlob);
                setIsCropping(false);
            }
        } catch (e) {
            console.error(e);
            toast.error('Something went wrong cropping the image');
        }
    };

    const handleCropCancel = () => {
        setIsCropping(false);
        setCropImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset input to allow re-selection of same file
        }
    };

    return (
        <>
            {isCropping && cropImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-lg bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-zinc-800 flex flex-col max-h-[90vh]">
                        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-white">Edit Photo</h3>
                            <button onClick={handleCropCancel} className="text-zinc-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="relative h-64 sm:h-80 w-full bg-black">
                            <Cropper
                                image={cropImage}
                                crop={crop}
                                zoom={zoom}
                                aspect={1} // Square aspect ratio
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
                                <Button variant="outline" onClick={handleCropCancel} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                                    Cancel
                                </Button>
                                <Button onClick={handleCropSave} className="bg-white text-black hover:bg-zinc-200 gap-2">
                                    <Check className="w-4 h-4" />
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <form action={handleSubmit} className="space-y-6">
                <input type="hidden" name="avatarUrl" value={previewUrl || ''} />
                {/* Personal Info */}
                <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/50">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <User className="h-4 w-4" />
                            Personal Information
                        </CardTitle>
                        <CardDescription>Update your personal details and bio</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={initialData.name}
                                    required
                                    className="h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tagline">Tagline *</Label>
                                <Input
                                    id="tagline"
                                    name="tagline"
                                    placeholder="e.g., Full-Stack Developer"
                                    defaultValue={initialData.tagline}
                                    required
                                    className="h-11"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio *</Label>
                            <Textarea
                                id="bio"
                                name="bio"
                                defaultValue={initialData.bio}
                                required
                                className="min-h-[120px] resize-none"
                                placeholder="Tell us about yourself..."
                            />
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Write a brief description about yourself and your expertise
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-base font-semibold">Profile Photo</Label>
                            <div className="flex flex-col md:flex-row gap-8 items-center p-4 border border-zinc-100 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50">
                                <div className="relative group cursor-pointer shrink-0">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl bg-zinc-100 dark:bg-zinc-800 relative ring-1 ring-zinc-200 dark:ring-zinc-700">
                                        {previewUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={previewUrl} alt="Avatar" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-zinc-300 dark:text-zinc-600 bg-zinc-50 dark:bg-zinc-900">
                                                <User className="w-12 h-12" />
                                            </div>
                                        )}
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                            <Camera className="w-8 h-8 text-white drop-shadow-md" />
                                        </div>
                                    </div>

                                    <Label
                                        htmlFor="avatar-upload"
                                        className="absolute inset-0 z-10 cursor-pointer rounded-full"
                                    >
                                        <span className="sr-only">Upload profile photo</span>
                                    </Label>
                                    <Input
                                        ref={fileInputRef}
                                        id="avatar-upload"
                                        name="avatar"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </div>

                                <div className="space-y-3 text-center md:text-left flex-1">
                                    <div>
                                        <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                            Profile Picture
                                        </h4>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-[250px] leading-relaxed mx-auto md:mx-0 mt-1">
                                            Supports JPG, PNG or WEBP. Max size 5MB.
                                        </p>
                                    </div>
                                    <div className="flex gap-3 justify-center md:justify-start items-center">
                                        <Label
                                            htmlFor="avatar-upload"
                                            className="inline-flex items-center justify-center gap-2 rounded-full text-xs font-bold tracking-wide ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:scale-105 h-9 px-5 py-2 cursor-pointer shadow-md"
                                        >
                                            <Upload className="w-3.5 h-3.5" />
                                            Upload New
                                        </Label>
                                        {previewUrl && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={handleRemoveAvatar}
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full px-4"
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Availability Status */}
                <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/50">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <div className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
                            Work Availability
                        </CardTitle>
                        <CardDescription>Set your current availability status</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                            <div className="space-y-0.5">
                                <Label className="text-base">Available for Work</Label>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {isAvailable ? 'Currently accepting new projects' : 'Currently busy or unavailable'}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsAvailable(!isAvailable)}
                                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-300 dark:focus-visible:ring-offset-zinc-950 ${isAvailable ? 'bg-zinc-900 dark:bg-zinc-50' : 'bg-zinc-200 dark:bg-zinc-800'
                                    }`}
                            >
                                <span className="sr-only">Use setting</span>
                                <span
                                    className={`pointer-events-none block h-6 w-6 rounded-full bg-white dark:bg-zinc-900 shadow-lg ring-0 transition-transform ${isAvailable ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                />
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Info */}
                <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/50">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Mail className="h-4 w-4" />
                            Contact Information
                        </CardTitle>
                        <CardDescription>How people can reach you</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    Email *
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    defaultValue={initialData.email}
                                    required
                                    className="h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location" className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    Location *
                                </Label>
                                <Input
                                    id="location"
                                    name="location"
                                    placeholder="City, Country"
                                    defaultValue={initialData.location}
                                    required
                                    className="h-11"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats */}
                <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/50">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <LinkIcon className="h-4 w-4" />
                            Statistics
                        </CardTitle>
                        <CardDescription>Your professional milestones</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="yearsCoding">Years of Experience *</Label>
                                <Input
                                    id="yearsCoding"
                                    name="yearsCoding"
                                    type="number"
                                    min="0"
                                    defaultValue={initialData.yearsCoding}
                                    required
                                    className="h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="projectsCount">Projects Completed *</Label>
                                <Input
                                    id="projectsCount"
                                    name="projectsCount"
                                    type="number"
                                    min="0"
                                    defaultValue={initialData.projectsCount}
                                    required
                                    className="h-11"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Social Links */}
                <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/50">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Github className="h-4 w-4" />
                            Social Links
                        </CardTitle>
                        <CardDescription>Connect your social profiles</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="githubUrl" className="flex items-center gap-2">
                                    <Github className="h-4 w-4" />
                                    GitHub URL
                                </Label>
                                <Input
                                    id="githubUrl"
                                    name="githubUrl"
                                    placeholder="https://github.com/username"
                                    defaultValue={initialData.githubUrl || ''}
                                    className="h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="linkedinUrl" className="flex items-center gap-2">
                                    <Linkedin className="h-4 w-4" />
                                    LinkedIn URL
                                </Label>
                                <Input
                                    id="linkedinUrl"
                                    name="linkedinUrl"
                                    placeholder="https://linkedin.com/in/username"
                                    defaultValue={initialData.linkedinUrl || ''}
                                    className="h-11"
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
            </form >
        </>
    );
}
