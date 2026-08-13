import { PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import { r2, R2_BUCKET_NAME } from '../config/r2';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
];

export async function uploadImage(file: Express.Multer.File, userId: string) {
    if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new Error('Unsupported image type');
    }

    const extension =
        file.originalname.split('.').pop()?.toLowerCase() ?? 'webp';

    const key = `posts/${crypto.randomUUID()}.${extension}`;

    await r2.send(
        new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        })
    );

    const image = await prisma.images.create({
        data: {
            key,
            created_by: userId,
            created_at: new Date(),
            file_name: file.originalname,
            mime_type: file.mimetype,
            size: file.size,
        },
    });

    return image;

}