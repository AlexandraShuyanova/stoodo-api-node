import * as postService from './post.service';
import { Request, Response } from 'express'

export async function createPost(req: Request, res: Response) {

    try {
        const createPostResponse = await postService.createPost(
            req.body,
            req.user!.id
        );
        res.status(201).json(createPostResponse);
    } catch (error){
        console.error(error);
        res.status(400).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

export async function getPosts(req: Request, res: Response) {
    try {
        const listPublishedResponse = await postService.getPosts();
        res.status(201).json(listPublishedResponse);
    } catch (error){
        console.error(error);
        res.status(400).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}