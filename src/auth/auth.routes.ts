import { Router } from 'express';
import {register, login, userInfo} from './auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/user_info', userInfo);

export default router;