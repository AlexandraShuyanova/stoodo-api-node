import * as topicService from './topic.service';
import { Request, Response } from 'express'

export async function getTopics(req: Request, res: Response) {
    try {
        const topicsResponse = await topicService.getTopics();
        res.status(201).json(topicsResponse);
    } catch (error){
        console.error(error);
        res.status(400).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}