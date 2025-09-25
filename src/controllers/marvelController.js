const {
  getMoviesPerActor,
  getActorsWithMultipleCharacters,
  getCharactersWithMultipleActors,
} = require('../services/marvelAnalysisService');

const moviesPerActor = async (req, res) => {
  try {
    console.log('Fetching movies per actor...');
    const data = await getMoviesPerActor();

    const response = {
      success: true,
      data,
      message: 'Movies per actor retrieved successfully',
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    console.error('Error in moviesPerActor:', error);
    const response = {
      success: false,
      error: 'Failed to retrieve movies per actor',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    };

    res.status(500).json(response);
  }
};

const actorsWithMultipleCharacters = async (req, res) => {
  try {
    console.log('Fetching actors with multiple characters...');
    const data = await getActorsWithMultipleCharacters();

    const response = {
      success: true,
      data,
      message: 'Actors with multiple characters retrieved successfully',
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    console.error('Error in actorsWithMultipleCharacters:', error);
    const response = {
      success: false,
      error: 'Failed to retrieve actors with multiple characters',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    };

    res.status(500).json(response);
  }
};

const charactersWithMultipleActors = async (req, res) => {
  try {
    console.log('Fetching characters with multiple actors...');
    const data = await getCharactersWithMultipleActors();

    const response = {
      success: true,
      data,
      message: 'Characters with multiple actors retrieved successfully',
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    console.error('Error in charactersWithMultipleActors:', error);
    const response = {
      success: false,
      error: 'Failed to retrieve characters with multiple actors',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    };

    res.status(500).json(response);
  }
};

module.exports = {
  moviesPerActor,
  actorsWithMultipleCharacters,
  charactersWithMultipleActors,
};
