import express from 'express';
import authRouter from './auth/auth.routes';
import { PrismaClient } from '@prisma/client';
import imageRouter from './image/image.routes';
import postRouter from './post/post.routes';
import topicRouter from './topic/topic.routes';


const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/image', imageRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/topic', topicRouter);

app.get('/users', async (_, res) => {
    const users = await prisma.users.findMany();

    res.json(users);
});

app.listen(3000, () => {
    console.log('Server started');
});