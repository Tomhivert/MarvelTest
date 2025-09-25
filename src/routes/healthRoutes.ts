import { Router } from 'express';
import { getHealth, getDetailedHealth } from '../controllers/healthController';

const router = Router();

// Basic health check
router.get('/', getHealth);

// Detailed health check with additional system information
router.get('/detailed', getDetailedHealth);

export default router;
