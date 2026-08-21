import { Router } from 'express';
import {getTopics} from './topic.controller';

const router = Router();

router.get('/topics', getTopics);

export default router;