import { Router } from 'express';
import { 
  moviesPerActor, 
  actorsWithMultipleCharacters, 
  charactersWithMultipleActors 
} from '../controllers/marvelController';

const router = Router();

// Assignment endpoints
router.get('/moviesPerActor', moviesPerActor);
router.get('/actorsWithMultipleCharacters', actorsWithMultipleCharacters);
router.get('/charactersWithMultipleActors', charactersWithMultipleActors);

export default router;
