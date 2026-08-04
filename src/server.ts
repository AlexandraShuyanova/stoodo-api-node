import express from 'express';
import authRouter from './auth/auth.routes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.get('/users', async (_, res) => {
    const users = await prisma.users.findMany();

    res.json(users);
});

app.listen(3000, () => {
    console.log('Server started');
});