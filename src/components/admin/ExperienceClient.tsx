'use client';

import { useState } from 'react';
import { Experience } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { createExperience, updateExperience, deleteExperience } from '@/actions/experience.actions';
import { Plus, Edit, Trash2, Calendar, MapPin, Briefcase, Building2, AlignLeft, Layers, GripVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';


interface ExperienceClientProps {
    initialData: Experience[];
}

export function ExperienceClient({ initialData }: ExperienceClientProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Experience | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const openCreate = () => {
        setEditingItem(null);
        setIsOpen(true);
    };

    const openEdit = (item: Experience) => {
        setEditingItem(item);
        setIsOpen(true);
    };

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        const data = {
            title: formData.get('title') as string,
            company: formData.get('company') as string,
            year: formData.get('year') as string,
            location: formData.get('location') as string,
            description: formData.get('description') as string,
            skills: (formData.get('skills') as string).split(',').map(s => s.trim()).filter(s => s !== ''),
            isVisible: formData.get('isVisible') === 'on',
            order: parseInt(formData.get('order') as string) || 0,
        };

        if (editingItem) {
            await updateExperience(editingItem.id, data);
        } else {
            await createExperience(data);
        }

        setIsLoading(false);
        setIsOpen(false);
        router.refresh();
    }

    async function handleDelete(id: number) {
        if (!confirm('Are you sure you want to delete this item?')) return;
        await deleteExperience(id);
        router.refresh();
    }

    return (
        <AdminPageShell>
            <AdminPageHeader
                title="Experience"
                description="Manage your professional history, work experience, and career milestones."
                action={
                    <Button onClick={openCreate} size="sm" className="bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                    </Button>
                }
            />

            <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {initialData.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 mb-4">
                                <Briefcase className="w-6 h-6 text-zinc-400" />
                            </div>
                            <h3 className="text-zinc-900 dark:text-zinc-100 font-medium mb-1">No experience entries</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">Get started by adding your first professional role.</p>
                            <Button variant="outline" size="sm" onClick={openCreate}>Add Experience</Button>
                        </div>
                    )}

                    {initialData.map((item) => (
                        <div key={item.id} className="group p-5 flex flex-col sm:flex-row gap-5 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                            {/* Icon Box */}
                            <div className="shrink-0">
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                    <Briefcase className="w-5 h-5" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 py-1">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                                        {item.title}
                                    </h3>
                                    <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">•</span>
                                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                        {item.company}
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{item.year}</span>
                                    </div>
                                    {item.location && (
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>{item.location}</span>
                                        </div>
                                    )}
                                </div>

                                <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2 leading-relaxed mb-3">
                                    {item.description}
                                </p>

                                {item.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.skills.map(skill => (
                                            <Badge key={skill} variant="secondary" className="px-1.5 py-0 h-5 text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-transparent">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pl-0 sm:pl-4 sm:border-l border-zinc-100 dark:border-zinc-800 min-w-[100px]">
                                <div className="flex items-center gap-1 mb-0 sm:mb-auto">
                                    {!item.isVisible && (
                                        <Badge variant="outline" className="text-[10px] h-5 border-yellow-200 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-500 dark:border-yellow-900/50">
                                            Hidden
                                        </Badge>
                                    )}
                                    <div className="flex items-center gap-1 text-[10px] font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                                        <GripVertical className="w-3 h-3" />
                                        {item.order}
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => openEdit(item)}>
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => handleDelete(item.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto p-0 gap-0 overflow-hidden">
                    <DialogHeader className="p-6 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
                        <DialogTitle className="text-xl flex items-center gap-2">
                            {editingItem ? <Edit className="w-5 h-5 text-zinc-500" /> : <Plus className="w-5 h-5 text-zinc-500" />}
                            {editingItem ? 'Edit Experience' : 'Add New Experience'}
                        </DialogTitle>
                        <DialogDescription>
                            Detailed professional history enhances your portfolio&apos;s credibility.
                        </DialogDescription>
                    </DialogHeader>
                    <form action={handleSubmit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" />
                                    Job Title <span className="text-red-500">*</span>
                                </Label>
                                <Input id="title" name="title" defaultValue={editingItem?.title} required placeholder="e.g. Senior Frontend Engineer" className="bg-zinc-50/50" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company" className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    Company <span className="text-red-500">*</span>
                                </Label>
                                <Input id="company" name="company" defaultValue={editingItem?.company} required placeholder="e.g. Google" className="bg-zinc-50/50" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="year" className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Duration / Year <span className="text-red-500">*</span>
                                </Label>
                                <Input id="year" name="year" defaultValue={editingItem?.year} required placeholder="e.g. 2022 - Present" className="bg-zinc-50/50" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location" className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    Location
                                </Label>
                                <Input id="location" name="location" defaultValue={editingItem?.location || ''} placeholder="e.g. Remote / San Francisco, CA" className="bg-zinc-50/50" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="flex items-center gap-2">
                                <AlignLeft className="w-4 h-4" />
                                Description <span className="text-red-500">*</span>
                            </Label>
                            <Textarea id="description" name="description" defaultValue={editingItem?.description} required placeholder="Briefly describe your responsibilities and achievements..." className="bg-zinc-50/50 min-h-[120px]" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="skills" className="flex items-center gap-2">
                                <Layers className="w-4 h-4" />
                                Skills (Comma separated)
                            </Label>
                            <Input id="skills" name="skills" defaultValue={editingItem?.skills.join(', ')} placeholder="React, TypeScript, System Design" className="bg-zinc-50/50" />
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="isVisible" className="cursor-pointer">Visible</Label>
                                    <input type="checkbox" id="isVisible" name="isVisible" defaultChecked={editingItem?.isVisible ?? true} className="w-4 h-4 rounded border-zinc-300" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="order" className="text-xs text-zinc-500">Order:</Label>
                                    <Input id="order" name="order" type="number" defaultValue={editingItem?.order || 0} className="w-16 h-8 text-xs" />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
                                <Button type="submit" disabled={isLoading} className="min-w-[100px]">
                                    {isLoading ? 'Saving...' : 'Save Entry'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AdminPageShell>
    );
}
