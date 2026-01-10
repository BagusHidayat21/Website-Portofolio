'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getEducation(includeHidden: boolean = false) {
    try {
        const where = includeHidden ? {} : { isVisible: true };
        return await prisma.education.findMany({
            where,
            orderBy: { order: 'asc' }
        })
    } catch (error) {
        console.error("Error fetching education:", error)
        return []
    }
}

export async function createEducation(data: {
    institution: string;
    degree: string;
    field: string;
    year: string;
    description: string;
    location?: string | null;
    isVisible?: boolean;
    order?: number;
}) {
    try {
        await prisma.education.create({ data })
        revalidatePath("/admin/education")
        revalidatePath("/about")
        return { success: true }
    } catch (error) {
        console.error("Error creating education:", error)
        return { success: false, error }
    }
}

export async function updateEducation(id: number, data: {
    institution?: string;
    degree?: string;
    field?: string;
    year?: string;
    description?: string;
    location?: string | null;
    isVisible?: boolean;
    order?: number;
}) {
    try {
        await prisma.education.update({
            where: { id },
            data
        })
        revalidatePath("/admin/education")
        revalidatePath("/about")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Error updating education:", error)
        return { success: false, error }
    }
}

export async function deleteEducation(id: number) {
    try {
        await prisma.education.delete({
            where: { id }
        })
        revalidatePath("/admin/education")
        revalidatePath("/about")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Error deleting education:", error)
        return { success: false, error }
    }
}
