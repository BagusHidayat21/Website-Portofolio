'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getProjects(includeHidden: boolean = false) {
    try {
        const where = includeHidden ? {} : { isVisible: true };
        return await prisma.project.findMany({
            orderBy: { order: 'asc' },
            where
        })
    } catch (error) {
        console.error("Error fetching projects:", error)
        return []
    }
}

export async function getFeaturedProjects() {
    try {
        return await prisma.project.findMany({
            where: { isFeatured: true, isVisible: true },
            orderBy: { order: 'asc' }
        })
    } catch (error) {
        console.error("Error fetching featured projects:", error)
        return []
    }
}

export async function getProjectBySlug(slug: string) {
    try {
        return await prisma.project.findUnique({
            where: { slug }
        })
    } catch (error) {
        console.error("Error fetching project:", error)
        return null
    }
}

export async function getProjectById(id: number) {
    try {
        return await prisma.project.findUnique({
            where: { id }
        })
    } catch (error) {
        console.error("Error fetching project:", error)
        return null
    }
}

interface ProjectInput {
    title: string;
    slug: string;
    description: string;
    content?: string;
    liveUrl?: string;
    githubUrl?: string;
    images?: string[];
    techStack?: string[];
    tags?: string[];
    isFeatured?: boolean;
    isVisible?: boolean;
    order?: number;
}

export async function createProject(data: ProjectInput) {
    try {
        await prisma.project.create({ data })
        revalidatePath("/projects")
        revalidatePath("/admin/projects")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Error creating project:", error)
        return { success: false, error }
    }
}

export async function updateProject(id: number, data: ProjectInput) {
    try {
        await prisma.project.update({
            where: { id },
            data
        })
        revalidatePath("/projects")
        revalidatePath("/admin/projects")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Error updating project:", error)
        return { success: false, error }
    }
}

export async function deleteProject(id: number) {
    try {
        await prisma.project.delete({
            where: { id }
        })
        revalidatePath("/projects")
        revalidatePath("/admin/projects")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Error deleting project:", error)
        return { success: false, error }
    }
}
