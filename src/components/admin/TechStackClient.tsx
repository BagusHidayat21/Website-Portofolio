'use client';

import { useState } from 'react';
import { TechStack } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { createTech, updateTech, deleteTech } from '@/actions/tech.actions';
import { Plus, Edit, Trash2, Code, Box, Link2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';


interface TechStackClientProps {
    initialData: TechStack[];
}

export function TechStackClient({ initialData }: TechStackClientProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TechStack | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const openCreate = () => {
        setEditingItem(null);
        setIsOpen(true);
    };

    const openEdit = (item: TechStack) => {
        setEditingItem(item);
        setIsOpen(true);
    };

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        const data = {
            name: formData.get('name') as string,
            category: formData.get('category') as string,
            icon: formData.get('icon') as string,
            isVisible: formData.get('isVisible') === 'on',
            inMarquee: formData.get('inMarquee') === 'on',
            order: parseInt(formData.get('order') as string) || 0,
        };

        if (editingItem) {
            await updateTech(editingItem.id, data);
        } else {
            await createTech(data);
        }

        setIsLoading(false);
        setIsOpen(false);
        router.refresh();
    }

    async function handleDelete(id: number) {
        if (!confirm('Are you sure you want to delete this item?')) return;
        await deleteTech(id);
        router.refresh();
    }

    return (
        <AdminPageShell>
            <AdminPageHeader
                title="Tech Stack"
                description="Manage your tools, frameworks, and languages."
                action={
                    <Button onClick={openCreate} size="sm" className="bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Tech
                    </Button>
                }
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {initialData.length === 0 && (
                    <div className="col-span-2 md:col-span-3 lg:col-span-4 p-12 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 mb-4">
                            <Code className="w-6 h-6 text-zinc-400" />
                        </div>
                        <h3 className="text-zinc-900 dark:text-zinc-100 font-medium mb-1">No technology entries</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">Start by adding languages or tools you use.</p>
                        <Button variant="outline" size="sm" onClick={openCreate}>Add First Tech</Button>
                    </div>
                )}

                {initialData.map((item) => (
                    <Card key={item.id} className="group relative overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all duration-300">
                        <CardContent className="p-4 flex flex-col items-center gap-3 text-center">
                            <div className="h-12 w-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shrink-0 group-hover:scale-110 transition-transform duration-300">
                                {item.icon ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={item.icon} alt="" className="w-7 h-7 object-contain" />
                                ) : (
                                    <span className="text-sm font-black text-zinc-400">{item.name.substring(0, 2).toUpperCase()}</span>
                                )}
                            </div>

                            <div className="w-full space-y-1">
                                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 truncate text-sm">{item.name}</h4>
                                <Badge variant="secondary" className="px-1.5 py-0 h-4 text-[10px] font-normal bg-zinc-100 dark:bg-zinc-900 text-zinc-500 border-0">
                                    {item.category}
                                </Badge>
                            </div>

                            <div className="w-full flex items-center justify-center gap-2 mt-1">
                                {item.inMarquee && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" title="In Marquee" />
                                )}
                                {item.isVisible ? (
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Visible" />
                                ) : (
                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" title="Hidden" />
                                )}
                            </div>

                            {/* Floating Action Buttons */}
                            <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="secondary" size="icon" onClick={() => openEdit(item)} className="h-6 w-6 rounded-md bg-white/90 dark:bg-zinc-900/90 shadow-sm border border-zinc-100 dark:border-zinc-800">
                                    <Edit className="w-3 h-3 text-zinc-600 dark:text-zinc-400" />
                                </Button>
                                <Button variant="secondary" size="icon" onClick={() => handleDelete(item.id)} className="h-6 w-6 rounded-md bg-white/90 dark:bg-zinc-900/90 shadow-sm border border-zinc-100 dark:border-zinc-800 hover:text-red-600">
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>

                            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] font-mono text-zinc-300 dark:text-zinc-700 select-none">#{item.order}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-xl flex items-center gap-2">
                            {editingItem ? <Edit className="w-5 h-5 text-zinc-500" /> : <Plus className="w-5 h-5 text-zinc-500" />}
                            {editingItem ? 'Edit Tech' : 'Add Tech'}
                        </DialogTitle>
                        <DialogDescription>
                            Tech stack items appear in the About page and scrolling marquee.
                        </DialogDescription>
                    </DialogHeader>

                    <form action={handleSubmit} className="p-6 pt-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <Code className="w-4 h-4" />
                                Name <span className="text-red-500">*</span>
                            </Label>
                            <Input id="name" name="name" defaultValue={editingItem?.name} required placeholder="e.g. React" className="bg-zinc-50/50" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="flex items-center gap-2">
                                <Box className="w-4 h-4" />
                                Category <span className="text-red-500">*</span>
                            </Label>
                            <Input id="category" name="category" defaultValue={editingItem?.category} required placeholder="e.g. Frontend / Backend / DevOps" className="bg-zinc-50/50" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="icon" className="flex items-center gap-2">
                                <Link2 className="w-4 h-4" />
                                Icon URL <span className="text-zinc-400 font-normal text-xs ml-auto">(Optional)</span>
                            </Label>
                            <Input id="icon" name="icon" defaultValue={editingItem?.icon || ''} placeholder="https://cdn.simpleicons.org/react" className="bg-zinc-50/50" />
                            <p className="text-[10px] text-zinc-400">Recommended: Use simpleicons.org or clear PNGs.</p>
                        </div>

                        <div className="space-y-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="inMarquee" className="cursor-pointer flex flex-col">
                                    <span className="font-medium">Show in Home Marquee</span>
                                    <span className="text-xs text-zinc-500 font-normal">Also show in the scrolling banner on homepage.</span>
                                </Label>
                                <input type="checkbox" id="inMarquee" name="inMarquee" defaultChecked={editingItem?.inMarquee ?? false} className="w-5 h-5 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900" />
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex-1 flex items-center justify-between">
                                    <Label htmlFor="isVisible" className="cursor-pointer">Visible</Label>
                                    <input type="checkbox" id="isVisible" name="isVisible" defaultChecked={editingItem?.isVisible ?? true} className="w-4 h-4 rounded border-zinc-300" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="order" className="text-xs text-zinc-500">Priority:</Label>
                                    <Input id="order" name="order" type="number" defaultValue={editingItem?.order || 0} className="w-16 h-8 text-xs" />
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="pt-2">
                            <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isLoading} className="min-w-[100px]">
                                {isLoading ? 'Saving...' : 'Save'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AdminPageShell>
    );
}
