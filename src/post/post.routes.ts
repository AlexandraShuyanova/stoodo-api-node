import { Router } from 'express';
import {createPost, getPosts} from './post.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import {userInfo} from "../auth/auth.controller";

const router = Router();

router.post('/create', authMiddleware, createPost);
router.get('/posts', getPosts);

export default router;