import { Router } from 'express';
import { getWelcome } from '../controllers/greetingController';
import healthRoutes from './healthRoutes';
import apiRoutes from './apiRoutes';

const router = Router();

// Root route
router.get('/', getWelcome);

// Mount sub-routes
router.use('/health', healthRoutes);
router.use('/api', apiRoutes);

export default router;
