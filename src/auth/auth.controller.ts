import * as authService from './auth.service';
import { Request, Response } from 'express'

export async function register(req: Request, res: Response) {

    try {
        const authResponse = await authService.register(req.body);
        res.status(201).json(authResponse);
    } catch (error){
        res.status(400).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

export async function login(req: Request, res: Response) {

    try {
        const authResponse = await authService.login(req.body);
        res.status(201).json(authResponse);
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}