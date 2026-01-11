import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function uploadFile(file: File, folder: string = 'uploads'): Promise<string> {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
        throw new Error('File validation failed. File is too large. Max size is 2MB.');
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        throw new Error(`File validation failed. Invalid file type. Allowed: ${ALLOWED_FILE_TYPES.map(t => t.split('/')[1]).join(', ')}`);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const sanitizedOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
    const filename = `${uuidv4()}-${sanitizedOriginalName}`;

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', folder);
    try {
        await mkdir(uploadDir, { recursive: true });
    } catch {
        // Ignore error if directory exists
    }

    // Write file
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return public URL
    return `/${folder}/${filename}`;
}

export async function deleteFile(url: string): Promise<void> {
    if (!url) return;
    try {
        // Remove leading slash if present to join correctly with cwd/public
        const relativePath = url.startsWith('/') ? url.slice(1) : url;
        const filepath = path.join(process.cwd(), 'public', relativePath);

        // Security check: ensure path is within public folder to prevent directory traversal
        const publicDir = path.join(process.cwd(), 'public');
        if (!filepath.startsWith(publicDir)) {
            return;
        }

        await unlink(filepath);
    } catch {
        // Ignore error if file doesn't exist
    }
}
