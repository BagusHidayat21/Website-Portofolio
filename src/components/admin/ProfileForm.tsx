'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { updateProfile } from '@/actions/profile.actions';
import { Profile } from '@prisma/client';
import { Save, User, Mail, MapPin, Link as LinkIcon, Github, Linkedin } from 'lucide-react';

import { useRouter } from 'next/navigation';

export function ProfileForm({ initialData }: { initialData: Profile }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isAvailable, setIsAvailable] = useState(initialData.isAvailableForWork ?? true);

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        const data = {
            name: formData.get('name') as string,
            tagline: formData.get('tagline') as string,
            bio: formData.get('bio') as string,
            email: formData.get('email') as string,
            location: formData.get('location') as string,
            avatarUrl: formData.get('avatarUrl') as string,
            yearsCoding: parseInt(formData.get('yearsCoding') as string),
            projectsCount: parseInt(formData.get('projectsCount') as string),
            githubUrl: formData.get('githubUrl') as string,
            linkedinUrl: formData.get('linkedinUrl') as string,
            isAvailableForWork: isAvailable,
        };

        await updateProfile(data);
        setIsLoading(false);
        router.refresh();
        alert('Profile updated successfully!');
    }

    return (
        <form action={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
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

                    <div className="space-y-2">
                        <Label htmlFor="avatarUrl">Avatar URL</Label>
                        <div className="flex gap-3">
                            <Input
                                id="avatarUrl"
                                name="avatarUrl"
                                defaultValue={initialData.avatarUrl || ''}
                                placeholder="https://..."
                                className="h-11"
                            />
                            {initialData.avatarUrl && (
                                <div className="w-11 h-11 rounded-lg overflow-hidden border-2 border-zinc-200 dark:border-zinc-800">
                                    <img
                                        src={initialData.avatarUrl}
                                        alt="Avatar preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Availability Status */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
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
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
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
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <LinkIcon className="h-5 w-5" />
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
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Github className="h-5 w-5" />
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
    );
}
