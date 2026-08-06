import bcrypt from 'bcrypt';
import {PrismaClient} from "@prisma/client";
import {generateAccessToken, verifyToken} from "../jwt/jwt.service";

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    isSaveSession: boolean;
}

export interface AuthenticationRequest {
    email: string;
    password: string;
    isSaveSession: boolean;
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
            email: true,
            role: true,
        },
    });

    const access_token = generateAccessToken(user);

    return {
        access_token
    };
}

export async function login(data: AuthenticationRequest) {
    const { email, password, isSaveSession } = data;

    if (!email || !password) {
        throw new Error('All fields are required');
    }

    const user =  await prisma.users.findUnique({
        where: {
            email
        },
        select: {
            id: true,
            email: true,
            password: true,
            role: true,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const passOk = await bcrypt.compare(password, user.password);
    if (!passOk) {
        throw new Error("Invalid password");
    }

    const access_token = generateAccessToken(user);

    return {
        access_token
    };
}

export async function userInfo(authHeader?: string ) {
    if (!authHeader) {
        throw new Error("Missing Authorization header");
    }

    const token = authHeader.replace("Bearer ", "");

    const payload = verifyToken(token);

    const user =  await prisma.users.findUnique({
        where: {
            id: payload.id
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            username: true,
            created_by: true,
            created_at: true,
            last_modified_by: true,
            last_modified_at: true,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        createdBy: user.created_by,
        createdAt: user.created_at,
        lastModifiedBy: user.last_modified_by,
        lastModifiedAt: user.last_modified_at,
    }

}