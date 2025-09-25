import { Router } from 'express';
import { getHello } from '../controllers/greetingController';

const router = Router();

// Hello endpoint
router.get('/hello', getHello);

// Add more API routes here as the application grows
// router.get('/users', getUsers);
// router.post('/users', createUser);

export default router;
