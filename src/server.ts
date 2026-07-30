import express from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

app.get('/users', async (_, res) => {
    const users = await prisma.users.findMany();

    res.json(users);
});

app.listen(3000, () => {
    console.log('Server started');
});