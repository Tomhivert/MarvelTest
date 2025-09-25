const { Router } = require('express');
const {
  moviesPerActor,
  actorsWithMultipleCharacters,
  charactersWithMultipleActors,
} = require('../controllers/marvelController');

const router = Router();

// Assignment endpoints
router.get('/moviesPerActor', moviesPerActor);
router.get('/actorsWithMultipleCharacters', actorsWithMultipleCharacters);
router.get('/charactersWithMultipleActors', charactersWithMultipleActors);

module.exports = router;
