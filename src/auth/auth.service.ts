import bcrypt from 'bcrypt';
import {PrismaClient} from "@prisma/client";
import {generateAccessToken} from "../jwt/jwt.service";

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

const prisma = new PrismaClient();

export async function register(data: RegisterRequest) {
    const { email, username, password, firstName, lastName } = data;

    if (!email || !username || !password) {
        throw new Error('All fields are required');
    }

    const existingUser = await prisma.users.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
        data: {
            first_name: firstName,
            last_name: lastName,
            username,
            email,
            password: hashedPassword,
            role: 'USER',
            is_expired: false,
            is_locked: false,
            is_credentials_valid: true,
            is_active: true
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            username: true,
            email: true,
            role: true,
        },
    });

    const accessToken = generateAccessToken(user);

    return {
        accessToken,
        user,
    };
}