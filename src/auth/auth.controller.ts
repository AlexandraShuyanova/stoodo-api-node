import * as authService from './auth.service';
import { Request, Response } from 'express'

export async function register(req: Request, res: Response) {

    const user = await authService.register(req.body);

    res.status(201).json(user);

}