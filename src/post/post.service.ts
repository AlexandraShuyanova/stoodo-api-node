import bcrypt from 'bcrypt';
import {PrismaClient} from "@prisma/client";
import {generateAccessToken, verifyToken} from "../jwt/jwt.service";

export interface CreatePostRequest {
    title: string;
    image: string;
    content: string;
}

const prisma = new PrismaClient();

export async function createPost(data: CreatePostRequest, userId: string) {
    const { title, image, content} = data;

    if (!title || !image || !content) {
        throw new Error('All fields are required');
    }

    const post = await prisma.posts.create({
        data: {
            title,
            slug: title.toLowerCase().replaceAll(' ', '-'),
            image_id: image,
            owner_id: userId,
            is_published: true,
            created_by: userId,
            created_at: new Date(),
        }
    });

    console.log(post.id);

    const postContent = await prisma.posts_content.create({
        data: {
            post_id: post.id,
            text: content,
            version: 1,
            is_current_version: true,

            created_by: userId,
            created_at: new Date(),
        }
    });

    return {
        post,
        postContent,
    };
}

export async function getPosts() {

    const posts = await prisma.posts.findMany({
        where: {
            is_published: true,
        },
        include: {
            images: true,
            posts_content: {
                where: {
                    is_current_version: true
                },
            },
            owner: {
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                },
            },
        }
    });

    const formattedPosts = posts.map((post) => ({
        ...post,
        images: post.images
            ? {
                ...post.images,
                url: `${process.env.R2_PUBLIC_URL}/${post.images.key}`,
            }
            : null,
    }));

    return {
        content: formattedPosts,
    };
}