import { 
  getMoviesPerActor, 
  getActorsWithMultipleCharacters, 
  getCharactersWithMultipleActors 
} from '../../src/services/marvelAnalysisService';
import { tmdbProvider } from '../../src/providers/tmdbProvider';
import { 
  mockMovieWithCredits, 
  mockMovieWithMultipleCharacters,
  mockCharacterWithMultipleActors 
} from '../mocks/tmdbMockData';

// Mock the TMDB provider
jest.mock('../../src/providers/tmdbProvider');
const mockTmdbProvider = tmdbProvider as jest.Mocked<typeof tmdbProvider>;

describe('Marvel Analysis Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMoviesPerActor', () => {
    it('should return movies grouped by actor', async () => {
      mockTmdbProvider.getAllMarvelMoviesWithCredits.mockResolvedValue([
        mockMovieWithCredits
      ]);

      const result = await getMoviesPerActor();

      expect(result['Robert Downey Jr.']).toBeDefined();
      expect(result['Robert Downey Jr.']).toContain('Iron Man');
      expect(result['Robert Downey Jr.']).toHaveLength(1);
    });

    it('should handle actors not in our list', async () => {
      const movieWithUnknownActor = {
        ...mockMovieWithCredits,
        credits: {
          ...mockMovieWithCredits.credits,
          cast: [
            {
              id: 99999,
              name: 'Unknown Actor',
              character: 'Unknown Character',
              order: 0
            }
          ]
        }
      };

      mockTmdbProvider.getAllMarvelMoviesWithCredits.mockResolvedValue([
        movieWithUnknownActor
      ]);

      const result = await getMoviesPerActor();

      expect(result).not.toHaveProperty('Unknown Actor');
    });

    it('should not duplicate movies for the same actor', async () => {
      const duplicateMovie = { ...mockMovieWithCredits };
      mockTmdbProvider.getAllMarvelMoviesWithCredits.mockResolvedValue([
        mockMovieWithCredits,
        duplicateMovie
      ]);

      const result = await getMoviesPerActor();

      expect(result['Robert Downey Jr.']).toHaveLength(1);
    });
  });

  describe('getActorsWithMultipleCharacters', () => {
    it('should identify actors with truly different characters', async () => {
      mockTmdbProvider.getAllMarvelMoviesWithCredits.mockResolvedValue([
        mockMovieWithMultipleCharacters
      ]);

      const result = await getActorsWithMultipleCharacters();

      expect(result['Robert Downey Jr.']).toBeDefined();
      expect(result['Robert Downey Jr.']).toHaveLength(2);
      expect(result['Robert Downey Jr.']?.[0]?.characterName).toBe('Tony Stark / Iron Man');
      expect(result['Robert Downey Jr.']?.[1]?.characterName).toBe('The Vision');
    });

    it('should NOT include actors who play the same character in multiple movies', async () => {
      const sameCharacterMovies = [
        {
          id: 1726,
          title: 'Iron Man',
          overview: '',
          release_date: '2008-05-02',
          credits: {
            id: 1726,
            cast: [
              {
                id: 1269,
                name: 'Chris Hemsworth',
                character: 'Thor',
                order: 0
              }
            ]
          }
        },
        {
          id: 10195,
          title: 'Thor',
          overview: '',
          release_date: '2011-05-06',
          credits: {
            id: 10195,
            cast: [
              {
                id: 1269,
                name: 'Chris Hemsworth',
                character: 'Thor',
                order: 0
              }
            ]
          }
        }
      ];

      mockTmdbProvider.getAllMarvelMoviesWithCredits.mockResolvedValue(
        sameCharacterMovies
      );

      const result = await getActorsWithMultipleCharacters();

      expect(result).not.toHaveProperty('Chris Hemsworth');
    });

    it('should normalize character names for comparison', async () => {
      const movieWithSimilarCharacterNames = {
        ...mockMovieWithCredits,
        credits: {
          ...mockMovieWithCredits.credits,
          cast: [
            {
              id: 3223,
              name: 'Robert Downey Jr.',
              character: 'Tony Stark',
              order: 0
            },
            {
              id: 3223,
              name: 'Robert Downey Jr.',
              character: 'Tony Stark!', // Same character with punctuation
              order: 1
            }
          ]
        }
      };

      mockTmdbProvider.getAllMarvelMoviesWithCredits.mockResolvedValue([
        movieWithSimilarCharacterNames
      ]);

      const result = await getActorsWithMultipleCharacters();

      expect(result).not.toHaveProperty('Robert Downey Jr.');
    });
  });

  describe('getCharactersWithMultipleActors', () => {
    it('should identify characters played by multiple actors', async () => {
      mockTmdbProvider.getAllMarvelMoviesWithCredits.mockResolvedValue([
        mockCharacterWithMultipleActors
      ]);

      const result = await getCharactersWithMultipleActors();

      expect(result['Spider-Man']).toBeDefined();
      expect(result['Spider-Man']).toHaveLength(2);
      expect(result['Spider-Man']?.[0]?.actorName).toBe('Chris Evans');
      expect(result['Spider-Man']?.[1]?.actorName).toBe('Tom Holland');
    });

    it('should handle empty or missing credits', async () => {
      const movieWithoutCredits = {
        ...mockMovieWithCredits,
        credits: {
          id: 1726,
          cast: []
        }
      };

      mockTmdbProvider.getAllMarvelMoviesWithCredits.mockResolvedValue([
        movieWithoutCredits
      ]);

      const result = await getCharactersWithMultipleActors();

      expect(Object.keys(result)).toHaveLength(0);
    });
  });

  describe('Error handling', () => {
    it('should handle TMDB provider errors', async () => {
      mockTmdbProvider.getAllMarvelMoviesWithCredits.mockRejectedValue(
        new Error('TMDB API Error')
      );

      await expect(getMoviesPerActor()).rejects.toThrow('TMDB API Error');
    });
  });
});
