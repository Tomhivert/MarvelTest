const { tmdbProvider } = require('../providers/tmdbProvider');
const { movies, actors } = require('../dataForQuestions');

const analyzeMarvelData = async () => {
  try {
    console.log('Starting Marvel data analysis...');

    // Get all movie IDs from our data
    const movieIds = Object.values(movies);

    // Fetch all Marvel movies with their credits
    const marvelMovies = await tmdbProvider.getAllMarvelMoviesWithCredits(movieIds);

    console.log('Analysis complete! Processing results...');
    return marvelMovies;
  } catch (error) {
    console.error('Error in Marvel data analysis:', error);
    throw error;
  }
};

const getMoviesPerActor = async () => {
  const marvelMovies = await analyzeMarvelData();
  const result = {};

  // Initialize all our known actors
  actors.forEach(actor => {
    result[actor] = [];
  });

  // Process each movie
  marvelMovies.forEach(movie => {
    if (movie.credits?.cast) {
      movie.credits.cast.forEach(castMember => {
        // Check if this actor is in our list
        if (actors.includes(castMember.name)) {
          if (!result[castMember.name].includes(movie.title)) {
            result[castMember.name].push(movie.title);
          }
        }
      });
    }
  });

  // Remove actors with no movies
  Object.keys(result).forEach(actor => {
    if (result[actor]?.length === 0) {
      delete result[actor];
    }
  });

  return result;
};

const getActorsWithMultipleCharacters = async () => {
  const marvelMovies = await analyzeMarvelData();
  const actorCharacters = {};

  // Collect all character roles for each actor
  marvelMovies.forEach(movie => {
    if (movie.credits?.cast) {
      movie.credits.cast.forEach(castMember => {
        if (actors.includes(castMember.name)) {
          if (!actorCharacters[castMember.name]) {
            actorCharacters[castMember.name] = [];
          }

          // Check if this character/movie combination already exists
          const existingRole = actorCharacters[castMember.name].find(
            role => role.movieName === movie.title && role.characterName === castMember.character
          );

          if (!existingRole) {
            actorCharacters[castMember.name].push({
              movieName: movie.title,
              characterName: castMember.character,
            });
          }
        }
      });
    }
  });

  // Filter to only actors with TRULY DIFFERENT characters (not same character in multiple movies)
  const result = {};
  Object.entries(actorCharacters).forEach(([actorName, characters]) => {
    // Get unique character names (normalize to handle slight variations)
    const uniqueCharacters = [
      ...new Set(
        characters.map(
          c =>
            c.characterName
              .toLowerCase()
              .trim()
              .replace(/\s+/g, ' ') // normalize whitespace
              .replace(/[^\w\s]/g, '') // remove special characters for comparison
        )
      ),
    ];

    // Only include actors who played MORE THAN ONE DISTINCT character
    if (uniqueCharacters.length > 1) {
      result[actorName] = characters;
      console.log(
        `Found actor with multiple characters: ${actorName} - ${uniqueCharacters.join(', ')}`
      );
    } else if (characters.length > 1) {
      // Log when same character appears in multiple movies (for debugging)
      console.log(
        `Actor ${actorName} played same character "${characters[0]?.characterName}" in multiple movies:`,
        characters.map(c => c.movieName).join(', ')
      );
    }
  });

  return result;
};

const getCharactersWithMultipleActors = async () => {
  const marvelMovies = await analyzeMarvelData();
  const characterActors = {};

  // Collect all actors for each character (normalize character names)
  marvelMovies.forEach(movie => {
    if (movie.credits?.cast) {
      movie.credits.cast.forEach(castMember => {
        if (actors.includes(castMember.name)) {
          // Normalize character name for better matching
          const normalizedCharacter = castMember.character.trim();

          if (!characterActors[normalizedCharacter]) {
            characterActors[normalizedCharacter] = [];
          }

          // Check if this actor/movie combination already exists for this character
          const existingActor = characterActors[normalizedCharacter].find(
            actor => actor.actorName === castMember.name && actor.movieName === movie.title
          );

          if (!existingActor) {
            characterActors[normalizedCharacter].push({
              movieName: movie.title,
              actorName: castMember.name,
            });
          }
        }
      });
    }
  });

  // Filter to only characters with TRULY DIFFERENT actors
  const result = {};
  Object.entries(characterActors).forEach(([characterName, actorsList]) => {
    const uniqueActors = [...new Set(actorsList.map(a => a.actorName))];
    if (uniqueActors.length > 1) {
      result[characterName] = actorsList;
      console.log(
        `Found character with multiple actors: "${characterName}" - ${uniqueActors.join(', ')}`
      );
    }
  });

  return result;
};

module.exports = {
  getMoviesPerActor,
  getActorsWithMultipleCharacters,
  getCharactersWithMultipleActors,
};
