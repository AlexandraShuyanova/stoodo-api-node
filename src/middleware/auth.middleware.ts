import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../jwt/jwt.service.ts';

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                error: 'Authorization header is required',
            });
        }

        const [type, token] = authHeader.split(' ');

        if (type !== 'Bearer' || !token) {
            return res.status(401).json({
                error: 'Invalid authorization format',
            });
        }

        const payload = verifyToken(token);

        req.user = payload;

        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Invalid or expired token',
        });
    }
};