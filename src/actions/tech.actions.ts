'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getTechStack(includeHidden: boolean = false) {
    try {
        const where = includeHidden ? {} : { isVisible: true };
        return await prisma.techStack.findMany({
            where,
            orderBy: { order: 'asc' }
        })
    } catch (error) {
        console.error("Error fetching tech stack:", error)
        return []
    }
}

export async function getMarqueeTech() {
    try {
        return await prisma.techStack.findMany({
            where: { isVisible: true, inMarquee: true },
            orderBy: { order: 'asc' }
        })
    } catch (error) {
        console.error("Error fetching marquee tech:", error)
        return []
    }
}

interface TechStackInput {
    name: string;
    category: string;
    icon?: string;
    isVisible?: boolean;
    inMarquee?: boolean;
    order?: number;
}

export async function createTech(data: TechStackInput) {
    try {
        await prisma.techStack.create({ data })
        revalidatePath("/admin/tech")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Error creating tech:", error)
        return { success: false, error }
    }
}

export async function updateTech(id: number, data: TechStackInput) {
    try {
        await prisma.techStack.update({
            where: { id },
            data
        })
        revalidatePath("/admin/tech")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Error updating tech:", error)
        return { success: false, error }
    }
}

export async function deleteTech(id: number) {
    try {
        await prisma.techStack.delete({
            where: { id }
        })
        revalidatePath("/admin/tech")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Error deleting tech:", error)
        return { success: false, error }
    }
}
