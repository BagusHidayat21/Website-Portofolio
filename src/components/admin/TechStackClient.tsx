'use client';

import { useState } from 'react';
import { TechStack } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
// Table imports removed
import { createTech, updateTech, deleteTech } from '@/actions/tech.actions';
import { Plus, Edit, Trash2, GripVertical, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Fallback for Table if not exists
const TableComponent = ({ children }: { children: React.ReactNode }) => <div className="w-full overflow-auto"><table className="w-full caption-bottom text-sm">{children}</table></div>;

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
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                        Tech Stack
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                        Manage your skills and technologies
                    </p>
                </div>
                <Button onClick={openCreate} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Technology
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {initialData.length === 0 && (
                            <div className="p-12 text-center text-zinc-500">
                                No technologies found. Add one to get started.
                            </div>
                        )}
                        {initialData.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500">
                                        {item.icon ? (
                                            <img src={item.icon} alt="" className="w-6 h-6 object-contain" />
                                        ) : (
                                            item.name.substring(0, 2).toUpperCase()
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</h4>
                                            <Badge variant="outline" className="text-[10px] h-5 px-1.5">{item.category}</Badge>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                                            <span className="flex items-center gap-1">
                                                {item.isVisible ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-500" />}
                                                Visible
                                            </span>
                                            <span className="flex items-center gap-1">
                                                {item.inMarquee ? <Check className="w-3 h-3 text-blue-500" /> : <X className="w-3 h-3 text-zinc-400" />}
                                                Marquee
                                            </span>
                                            <span>Order: {item.order}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
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
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>{editingItem ? 'Edit Technology' : 'Add Technology'}</SheetTitle>
                        <SheetDescription>
                            {editingItem ? 'Update the details of your technology.' : 'Add a new technology to your stack.'}
                        </SheetDescription>
                    </SheetHeader>

                    <form action={handleSubmit} className="space-y-6 mt-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" defaultValue={editingItem?.name} required placeholder="e.g. React" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" name="category" defaultValue={editingItem?.category} required placeholder="e.g. Frontend" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="icon">Icon URL (Optional)</Label>
                            <Input id="icon" name="icon" defaultValue={editingItem?.icon || ''} placeholder="https://..." />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order">Order Priority</Label>
                            <Input id="order" name="order" type="number" defaultValue={editingItem?.order || 0} />
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="isVisible" className="cursor-pointer">Visible</Label>
                                <input type="checkbox" id="isVisible" name="isVisible" defaultChecked={editingItem?.isVisible ?? true} className="w-4 h-4" />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="inMarquee" className="cursor-pointer">Show in Marquee</Label>
                                <input type="checkbox" id="inMarquee" name="inMarquee" defaultChecked={editingItem?.inMarquee ?? false} className="w-4 h-4" />
                            </div>
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
