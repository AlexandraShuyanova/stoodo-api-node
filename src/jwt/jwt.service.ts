import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

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
        JWT_SECRET,
        {
            expiresIn: '15m',
        }
    );
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as {
        id: string;
        email: string;
        role: string;
    };
}
