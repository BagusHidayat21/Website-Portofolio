'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { uploadFile, deleteFile } from "@/lib/storage"

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

export async function createProject(formData: FormData) {
    try {
        const title = formData.get('title') as string
        const slug = formData.get('slug') as string
        const description = formData.get('description') as string
        const content = formData.get('content') as string
        const liveUrl = formData.get('liveUrl') as string
        const githubUrl = formData.get('githubUrl') as string
        const isFeatured = formData.get('isFeatured') === 'true'
        const isVisible = formData.get('isVisible') === 'true'
        const order = parseInt(formData.get('order') as string) || 0

        const tags = JSON.parse(formData.get('tags') as string || '[]')
        const techStack = JSON.parse(formData.get('techStack') as string || '[]')

        // --- Image Handling ---
        let coverUrl = ''

        // 1. Handle Cover
        const coverFile = formData.get('coverImageFile') as File | null
        if (coverFile && coverFile.size > 0 && coverFile.name !== 'undefined') {
            coverUrl = await uploadFile(coverFile, 'projects')
        }

        // 2. Handle Gallery
        const galleryFiles = formData.getAll('galleryImageFiles') as File[]
        const galleryUrls: string[] = []

        for (const file of galleryFiles) {
            if (file.size > 0 && file.name !== 'undefined') {
                const url = await uploadFile(file, 'projects')
                galleryUrls.push(url)
            }
        }

        // 3. Combine (Cover is always index 0 if exists)
        const finalImages = coverUrl ? [coverUrl, ...galleryUrls] : galleryUrls

        await prisma.project.create({
            data: {
                title, slug, description, content, liveUrl, githubUrl,
                isFeatured, isVisible, order,
                tags, techStack,
                images: finalImages
            }
        })

        revalidatePath("/projects")
        revalidatePath("/admin/projects")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Error creating project:", error)
        return { success: false, error }
    }
}

export async function updateProject(formData: FormData) {
    try {
        const id = parseInt(formData.get('id') as string)
        const project = await prisma.project.findUnique({ where: { id } })
        if (!project) throw new Error("Project not found")

        const title = formData.get('title') as string
        const slug = formData.get('slug') as string
        const description = formData.get('description') as string
        const content = formData.get('content') as string
        const liveUrl = formData.get('liveUrl') as string
        const githubUrl = formData.get('githubUrl') as string
        const isFeatured = formData.get('isFeatured') === 'true'
        const isVisible = formData.get('isVisible') === 'true'
        const order = parseInt(formData.get('order') as string) || 0

        const tags = JSON.parse(formData.get('tags') as string || '[]')
        const techStack = JSON.parse(formData.get('techStack') as string || '[]')

        // --- Image Handling ---

        // 1. Resolve Cover
        let coverUrl = formData.get('coverImageUrl') as string || ''
        const coverFile = formData.get('coverImageFile') as File | null

        if (coverFile && coverFile.size > 0 && coverFile.name !== 'undefined') {
            coverUrl = await uploadFile(coverFile, 'projects')
        }

        // 2. Resolve Gallery
        const existingGalleryUrls = JSON.parse(formData.get('galleryImageUrls') as string || '[]') as string[]
        const galleryFiles = formData.getAll('galleryImageFiles') as File[]
        const newGalleryUrls: string[] = []

        for (const file of galleryFiles) {
            if (file.size > 0 && file.name !== 'undefined') {
                const url = await uploadFile(file, 'projects')
                newGalleryUrls.push(url)
            }
        }

        const finalGalleryUrls = [...existingGalleryUrls, ...newGalleryUrls]
        const finalImages = coverUrl ? [coverUrl, ...finalGalleryUrls] : finalGalleryUrls

        // Cleanup: Delete removed images
        const oldImages = project.images
        const imagesToDelete = oldImages.filter(img => !finalImages.includes(img))

        for (const img of imagesToDelete) {
            await deleteFile(img)
        }

        await prisma.project.update({
            where: { id },
            data: {
                title, slug, description, content, liveUrl, githubUrl,
                isFeatured, isVisible, order,
                tags, techStack,
                images: finalImages
            }
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
        const project = await prisma.project.findUnique({ where: { id } })
        if (project) {
            for (const img of project.images) {
                await deleteFile(img)
            }
        }

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
