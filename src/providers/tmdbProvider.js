const axios = require('axios');
const { config } = require('../config');

class TMDBProvider {
  constructor() {
    this.client = axios.create({
      baseURL: config.tmdb.baseUrl,
      timeout: config.tmdb.timeout,
      params: {
        api_key: config.tmdb.apiKey,
      },
    });
  }

  async getMovieWithCredits(movieId) {
    try {
      // Use append_to_response to get movie details and credits in a single API call
      const response = await this.client.get(`/movie/${movieId}?append_to_response=credits`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching movie with credits for ID ${movieId}:`, error);
      throw new Error(`Failed to fetch movie with credits for ID ${movieId}`);
    }
  }

  async getAllMarvelMoviesWithCredits(movieIds) {
    try {
      console.log(
        `Fetching details for ${movieIds.length} Marvel movies using parallel requests...`
      );

      // Use Promise.allSettled for parallel requests with error handling
      const moviePromises = movieIds.map(async movieId => {
        try {
          const movie = await this.getMovieWithCredits(movieId);
          console.log(`✓ Fetched: ${movie.title} (ID: ${movieId})`);
          return movie;
        } catch (error) {
          console.error(`✗ Failed to fetch movie ID ${movieId}:`, error);
          throw error;
        }
      });

      // Execute all requests in parallel
      const results = await Promise.allSettled(moviePromises);

      // Extract successful results
      const movies = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);

      const failedCount = results.length - movies.length;
      if (failedCount > 0) {
        console.warn(`⚠️  ${failedCount} movie(s) failed to fetch`);
      }

      console.log(`Successfully fetched ${movies.length} out of ${movieIds.length} movies`);
      return movies;
    } catch (error) {
      console.error('Error fetching Marvel movies:', error);
      throw new Error('Failed to fetch Marvel movies data');
    }
  }
}

// Export a singleton instance
const tmdbProvider = new TMDBProvider();
module.exports = { TMDBProvider, tmdbProvider };
