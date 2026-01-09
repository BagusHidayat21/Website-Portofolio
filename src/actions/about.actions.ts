'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

interface PhilosophyItem {
    title: string;
    description: string;
    icon: string;
}

interface AboutContentData {
    heroTitle?: string;
    heroSubtitle?: string;
    heroDescription?: string;
    storyTitle?: string;
    storyContent?: string;
    mainImage?: string;
    secondaryImage?: string;
    tags?: string[];
    philosophy?: PhilosophyItem[];
}

export async function getAboutContent() {
    try {
        // @ts-ignore - Prisma client may need regeneration
        const aboutContent = await prisma.aboutContent.findFirst()
        return aboutContent
    } catch (error) {
        console.error("Error fetching about content:", error)
        return null
    }
}

export async function updateAboutContent(data: AboutContentData) {
    try {
        // @ts-ignore - Prisma client may need regeneration
        const firstAboutContent = await prisma.aboutContent.findFirst()

        if (!firstAboutContent) {
            // @ts-ignore - Prisma client may need regeneration
            await prisma.aboutContent.create({
                data: {
                    heroTitle: data.heroTitle || "ENGINEERING",
                    heroSubtitle: data.heroSubtitle || "EXCELLENCE",
                    heroDescription: data.heroDescription || "Default description",
                    storyTitle: data.storyTitle,
                    storyContent: data.storyContent,
                    mainImage: data.mainImage,
                    secondaryImage: data.secondaryImage,
                    tags: data.tags || [],
                }
            })
        } else {
            // @ts-ignore - Prisma client may need regeneration
            await prisma.aboutContent.update({
                where: { id: firstAboutContent.id },
                data
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
