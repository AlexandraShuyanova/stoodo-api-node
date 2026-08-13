import bcrypt from 'bcrypt';
import {PrismaClient} from "@prisma/client";
import {generateAccessToken, verifyToken} from "../jwt/jwt.service";

export interface CreatePostRequest {
    title: string;
    slug: string;
    image: string;
    description: string;
    topic: string;
}

const prisma = new PrismaClient();

export async function createPost(data: CreatePostRequest, userId: string) {
    const { title, image, description, topic, slug } = data;

    if (!title || !description || !topic || !slug || !image) {
        throw new Error('All fields are required');
    }

    const post = await prisma.posts.create({
        data: {
            title,
            slug,
            description,

            image_id: image,
            topic_id: topic,

            owner_id: userId,

            is_published: true,

            created_by: userId,
            created_at: new Date(),
        }
    });

    return post;
}