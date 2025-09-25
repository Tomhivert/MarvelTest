import { Router } from 'express';
import marvelRoutes from './marvelRoutes';

const router = Router();

// Marvel assignment routes
router.use('/', marvelRoutes);

export default router;
