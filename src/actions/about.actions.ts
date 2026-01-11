'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { uploadFile, deleteFile } from "@/lib/storage"



export async function getAboutContent() {
    try {
        const aboutContent = await prisma.aboutContent.findFirst()
        return aboutContent
    } catch (error) {
        console.error("Error fetching about content:", error)
        return null
    }
}

export async function updateAboutContent(formData: FormData) {
    try {
        const firstAboutContent = await prisma.aboutContent.findFirst()

        const heroTitle = formData.get('heroTitle') as string
        const heroSubtitle = formData.get('heroSubtitle') as string
        const heroDescription = formData.get('heroDescription') as string
        const storyTitle = formData.get('storyTitle') as string
        const storyContent = formData.get('storyContent') as string

        // Tags and Philosophy are passed as JSON strings because FormData only supports string/File
        const tags = JSON.parse(formData.get('tags') as string || '[]')
        const philosophy = JSON.parse(formData.get('philosophy') as string || '[]')

        const existingImages = JSON.parse(formData.get('existingImages') as string || '[]') as string[]
        const newHelperImages = formData.getAll('newImages') as File[]

        // Upload new images
        const uploadedImageUrls: string[] = []
        for (const file of newHelperImages) {
            if (file.size > 0 && file.name !== 'undefined') {
                const url = await uploadFile(file, 'about')
                uploadedImageUrls.push(url)
            }
        }

        // Final Images List
        const finalImages = [...existingImages, ...uploadedImageUrls]

        // Handle deletion of removed images
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((firstAboutContent as any)?.images) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const oldImages = (firstAboutContent as any).images as string[]
            const imagesToDelete = oldImages.filter((img: string) => !finalImages.includes(img))

            for (const img of imagesToDelete) {
                await deleteFile(img)
            }
        }

        const dataToSave = {
            heroTitle: heroTitle || "ENGINEERING",
            heroSubtitle: heroSubtitle || "EXCELLENCE",
            heroDescription: heroDescription || "Default description",
            storyTitle: storyTitle,
            storyContent: storyContent,
            images: finalImages,
            tags: tags,
            philosophy: philosophy,
        }

        if (!firstAboutContent) {
            await prisma.aboutContent.create({
                data: dataToSave
            })
        } else {
            await prisma.aboutContent.update({
                where: { id: firstAboutContent.id },
                data: dataToSave
            })
        }

        revalidatePath("/")
        revalidatePath("/about")
        revalidatePath("/admin/about")
        return { success: true }
    } catch (error) {
        console.error("Error updating about content:", error)
        return { success: false, error }
    }
}

export async function getExperience() {
    try {
        const experience = await prisma.experience.findMany({
            where: { isVisible: true },
            orderBy: { order: 'asc' }
        })
        return experience
    } catch (error) {
        console.error("Error fetching experience:", error)
        return []
    }
}
