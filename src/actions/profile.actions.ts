'use server'

import prisma from "@/lib/prisma"
import { Profile } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function getProfile() {
    try {
        const profile = await prisma.profile.findFirst()
        return profile
    } catch (error) {
        console.error("Error fetching profile:", error)
        return null
    }
}

export async function updateProfile(data: Partial<Profile>) {
    try {
        const firstProfile = await prisma.profile.findFirst()

        // If no profile exists, create one (should act as upsert largely)
        if (!firstProfile) {
            // Validation needed here in real app
            await prisma.profile.create({
                data: {
                    name: data.name || "Admin",
                    tagline: data.tagline || "Tagline",
                    bio: data.bio || "Bio",
                    email: data.email || "admin@example.com",
                    location: data.location || "Earth",
                    ...data
                } as any // simple cast for quick MVP
            })
        } else {
            await prisma.profile.update({
                where: { id: firstProfile.id },
                data
            })
        }

        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Error updating profile:", error)
        return { success: false, error }
    }
}
