import jwt from 'jsonwebtoken';

export function generateAccessToken(user: {
    id: string;
    email: string;
    role: string;
}) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: '15m',
        }
    );
}