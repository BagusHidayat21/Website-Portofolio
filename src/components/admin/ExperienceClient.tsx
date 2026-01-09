'use client';

import { useState } from 'react';
import { Experience } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose
} from '@/components/ui/sheet';
import { createExperience, updateExperience, deleteExperience } from '@/actions/experience.actions';
import { Plus, Edit, Trash2, Check, X, Calendar, MapPin, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
// date-fns import removed

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

        // Parse dates
        const startDate = new Date(formData.get('startDate') as string);
        const endDateRaw = formData.get('endDate') as string;
        const endDate = endDateRaw ? new Date(endDateRaw) : null;

        const data = {
            company: formData.get('company') as string,
            position: formData.get('position') as string,
            location: formData.get('location') as string,
            description: formData.get('description') as string,
            startDate: startDate,
            endDate: endDate,
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
        if (!confirm('Are you sure you want to delete this experience?')) return;
        await deleteExperience(id);
        router.refresh();
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                        Experience
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                        Manage your work history and education
                    </p>
                </div>
                <Button onClick={openCreate} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Experience
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {initialData.length === 0 && (
                            <div className="p-12 text-center text-zinc-500">
                                No experience found. Add one to get started.
                            </div>
                        )}
                        {initialData.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0">
                                        <Briefcase className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h4 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">{item.company}</h4>
                                            <Badge variant="secondary" className="font-normal">{item.position}</Badge>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(item.startDate)} - {item.endDate ? formatDate(item.endDate) : 'Present'}
                                            </span>
                                            {item.location && (
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {item.location}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3 mt-1 text-xs text-zinc-400">
                                            <span className="flex items-center gap-1">
                                                {item.isVisible ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-500" />}
                                                Visible
                                            </span>
                                            <span>Order: {item.order}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 self-start sm:self-center ml-14 sm:ml-0">
                                    <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                                        <Edit className="w-4 h-4 text-zinc-500" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>{editingItem ? 'Edit Experience' : 'Add Experience'}</SheetTitle>
                        <SheetDescription>
                            {editingItem ? 'Update the details of your experience.' : 'Add a new work or education entry.'}
                        </SheetDescription>
                    </SheetHeader>

                    <form action={handleSubmit} className="space-y-6 mt-6">
                        <div className="space-y-2">
                            <Label htmlFor="company">Company / Institution</Label>
                            <Input id="company" name="company" defaultValue={editingItem?.company} required placeholder="e.g. Google" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="position">Position / Role</Label>
                            <Input id="position" name="position" defaultValue={editingItem?.position} required placeholder="e.g. Senior Software Engineer" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Input
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    defaultValue={editingItem?.startDate ? new Date(editingItem.startDate).toISOString().split('T')[0] : ''}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endDate">End Date (Leave empty for Present)</Label>
                                <Input
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    defaultValue={editingItem?.endDate ? new Date(editingItem.endDate).toISOString().split('T')[0] : ''}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" name="location" defaultValue={editingItem?.location || ''} placeholder="e.g. New York, NY" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={editingItem?.description}
                                required
                                className="min-h-[120px]"
                                placeholder="Describe your responsibilities and achievements..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order">Order Priority</Label>
                            <Input id="order" name="order" type="number" defaultValue={editingItem?.order || 0} />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <Label htmlFor="isVisible" className="cursor-pointer">Visible</Label>
                            <input type="checkbox" id="isVisible" name="isVisible" defaultChecked={editingItem?.isVisible ?? true} className="w-4 h-4" />
                        </div>

                        <SheetFooter className="pt-4">
                            <SheetClose asChild>
                                <Button variant="outline" type="button">Cancel</Button>
                            </SheetClose>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save'}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
}
