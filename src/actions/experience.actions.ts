'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getExperiences(includeHidden: boolean = false) {
    try {
        const where = includeHidden ? {} : { isVisible: true };
        return await prisma.experience.findMany({
            where,
            orderBy: { order: 'asc' }
        })
    } catch (error) {
        console.error("Error fetching experiences:", error)
        return []
    }
}

export async function createExperience(data: any) {
    try {
        await prisma.experience.create({ data })
        revalidatePath("/admin/experience")
        revalidatePath("/about")
        return { success: true }
    } catch (error) {
        console.error("Error creating experience:", error)
        return { success: false, error }
    }
}

export async function updateExperience(id: number, data: any) {
    try {
        await prisma.experience.update({
            where: { id },
            data
        })
        revalidatePath("/admin/experience")
        revalidatePath("/about")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Error updating experience:", error)
        return { success: false, error }
    }
}

export async function deleteExperience(id: number) {
    try {
        await prisma.experience.delete({
            where: { id }
        })
        revalidatePath("/admin/experience")
        revalidatePath("/about")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Error deleting experience:", error)
        return { success: false, error }
    }
}
