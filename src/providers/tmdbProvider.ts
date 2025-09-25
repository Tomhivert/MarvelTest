import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { config } from '../config';
import { TMDBMovie, TMDBMovieCredits } from '../types';

export class TMDBProvider {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.tmdb.baseUrl,
      timeout: config.tmdb.timeout,
      params: {
        api_key: config.tmdb.apiKey
      }
    });
  }

  async getMovieDetails(movieId: number): Promise<TMDBMovie> {
    try {
      const response: AxiosResponse<TMDBMovie> = await this.client.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie details for ID ${movieId}:`, error);
      throw new Error(`Failed to fetch movie details for ID ${movieId}`);
    }
  }

  async getMovieCredits(movieId: number): Promise<TMDBMovieCredits> {
    try {
      const response: AxiosResponse<TMDBMovieCredits> = await this.client.get(`/movie/${movieId}/credits`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie credits for ID ${movieId}:`, error);
      throw new Error(`Failed to fetch movie credits for ID ${movieId}`);
    }
  }

  async getMovieWithCredits(movieId: number): Promise<TMDBMovie & { credits: TMDBMovieCredits }> {
    try {
      // Use append_to_response to get movie details and credits in a single API call
      const response: AxiosResponse<TMDBMovie & { credits: TMDBMovieCredits }> = await this.client.get(
        `/movie/${movieId}?append_to_response=credits`
      );
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie with credits for ID ${movieId}:`, error);
      throw new Error(`Failed to fetch movie with credits for ID ${movieId}`);
    }
  }

  async getAllMarvelMoviesWithCredits(movieIds: number[]): Promise<(TMDBMovie & { credits: TMDBMovieCredits })[]> {
    try {
      console.log(`Fetching details for ${movieIds.length} Marvel movies using parallel requests...`);
      
      // Use Promise.allSettled for parallel requests with error handling
      const moviePromises = movieIds.map(async (movieId) => {
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
        .filter((result): result is PromiseFulfilledResult<TMDBMovie & { credits: TMDBMovieCredits }> => 
          result.status === 'fulfilled'
        )
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
export const tmdbProvider = new TMDBProvider();
