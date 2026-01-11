'use server'

import prisma from "@/lib/prisma"
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

import { uploadFile, deleteFile } from "@/lib/storage";

export async function updateProfile(formData: FormData) {
    try {
        const firstProfile = await prisma.profile.findFirst()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = {
            name: formData.get('name') as string,
            tagline: formData.get('tagline') as string,
            bio: formData.get('bio') as string,
            email: formData.get('email') as string,
            location: formData.get('location') as string,
            yearsCoding: parseInt(formData.get('yearsCoding') as string || '0'),
            projectsCount: parseInt(formData.get('projectsCount') as string || '0'),
            githubUrl: formData.get('githubUrl') as string,
            linkedinUrl: formData.get('linkedinUrl') as string,
            isAvailableForWork: formData.get('isAvailableForWork') === 'true',
        };

        const avatarFile = formData.get('avatar') as File;
        const hiddenAvatarUrl = formData.get('avatarUrl') as string;

        // Logic for handling Avatar update/display/delete
        const isNewFileUploaded = avatarFile && avatarFile.size > 0 && avatarFile.name !== 'undefined';
        const isAvatarRemoved = hiddenAvatarUrl === '';

        // If uploading new file OR removing existing one, delete the old file
        if ((isNewFileUploaded || isAvatarRemoved) && firstProfile?.avatarUrl) {
            await deleteFile(firstProfile.avatarUrl);
        }

        if (isNewFileUploaded) {
            const avatarUrl = await uploadFile(avatarFile, 'avatars');
            data.avatarUrl = avatarUrl;
        } else if (isAvatarRemoved) {
            data.avatarUrl = null;
        }

        // If no profile exists, create one
        if (!firstProfile) {
            await prisma.profile.create({
                data: {
                    name: data.name || "Admin",
                    tagline: data.tagline || "Tagline",
                    bio: data.bio || "Bio",
                    email: data.email || "admin@example.com",
                    location: data.location || "Earth",
                    ...data
                }
            })
        } else {
            await prisma.profile.update({
                where: { id: firstProfile.id },
                data
            })
        }

        revalidatePath("/")
        revalidatePath("/admin")
        return { success: true }
    } catch (error) {
        console.error("Error updating profile:", error)
        return { success: false, error }
    }
}
