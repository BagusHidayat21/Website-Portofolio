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

        const aboutContent = await prisma.aboutContent.findFirst()
        return aboutContent
    } catch (error) {
        console.error("Error fetching about content:", error)
        return null
    }
}

export async function updateAboutContent(data: AboutContentData) {
    try {

        const firstAboutContent = await prisma.aboutContent.findFirst()

        if (!firstAboutContent) {

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
                    philosophy: (data.philosophy as any) || [], // eslint-disable-line @typescript-eslint/no-explicit-any
                }
            })
        } else {

            await prisma.aboutContent.update({
                where: { id: firstAboutContent.id },
                data: {
                    ...data,
                    philosophy: data.philosophy ? (data.philosophy as any) : undefined // eslint-disable-line @typescript-eslint/no-explicit-any
                }
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
