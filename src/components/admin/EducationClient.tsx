'use client';

import { useState } from 'react';
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
    SheetFooter,
    SheetClose
} from '@/components/ui/sheet';
import { createEducation, updateEducation, deleteEducation } from '@/actions/education.actions';
import { Plus, Edit, Trash2, Check, X, Calendar, MapPin, GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';

interface Education {
    id: number;
    institution: string;
    degree: string;
    field: string;
    year: string;
    description: string;
    location: string | null;
    isVisible: boolean;
    order: number;
}

interface EducationClientProps {
    initialData: Education[];
}

export function EducationClient({ initialData }: EducationClientProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Education | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const openCreate = () => {
        setEditingItem(null);
        setIsOpen(true);
    };

    const openEdit = (item: Education) => {
        setEditingItem(item);
        setIsOpen(true);
    };

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);

        const data = {
            institution: formData.get('institution') as string,
            degree: formData.get('degree') as string,
            field: formData.get('field') as string,
            year: formData.get('year') as string,
            description: formData.get('description') as string,
            location: formData.get('location') as string || null,
            isVisible: formData.get('isVisible') === 'on',
            order: parseInt(formData.get('order') as string) || 0,
        };

        if (editingItem) {
            await updateEducation(editingItem.id, data);
        } else {
            await createEducation(data);
        }

        setIsLoading(false);
        setIsOpen(false);
        router.refresh();
    }

    async function handleDelete(id: number) {
        if (!confirm('Are you sure you want to delete this education entry?')) return;
        await deleteEducation(id);
        router.refresh();
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                        Education
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                        Manage your educational background
                    </p>
                </div>
                <Button onClick={openCreate} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Education
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {initialData.length === 0 && (
                            <div className="p-12 text-center text-zinc-500">
                                No education entries found. Add one to get started.
                            </div>
                        )}
                        {initialData.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0">
                                        <GraduationCap className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h4 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">{item.institution}</h4>
                                        </div>
                                        <p className="text-zinc-600 dark:text-zinc-300 font-medium">{item.degree} - {item.field}</p>

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {item.year}
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
                        <SheetTitle>{editingItem ? 'Edit Education' : 'Add Education'}</SheetTitle>
                        <SheetDescription>
                            {editingItem ? 'Update educational details.' : 'Add a new educational entry.'}
                        </SheetDescription>
                    </SheetHeader>

                    <form action={handleSubmit} className="space-y-6 mt-6">
                        <div className="space-y-2">
                            <Label htmlFor="institution">Institution *</Label>
                            <Input id="institution" name="institution" defaultValue={editingItem?.institution} required placeholder="e.g. Universitas Negeri Malang" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="degree">Degree *</Label>
                            <Input id="degree" name="degree" defaultValue={editingItem?.degree} required placeholder="e.g. Bachelor of Science (S1)" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="field">Field of Study *</Label>
                            <Input id="field" name="field" defaultValue={editingItem?.field} required placeholder="e.g. Informatics Engineering Education" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="year">Year / Period *</Label>
                            <Input id="year" name="year" defaultValue={editingItem?.year} required placeholder="e.g. 2022 - Present or 2019 - 2022" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" name="location" defaultValue={editingItem?.location || ''} placeholder="e.g. Malang, Indonesia" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={editingItem?.description}
                                required
                                className="min-h-[120px]"
                                placeholder="Describe your studies, achievements, and activities..."
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
