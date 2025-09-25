const axios = require('axios');
const { TMDBProvider } = require('../../src/providers/tmdbProvider');
const { mockMovieWithCredits } = require('../mocks/tmdbMockData');

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

describe('TMDB Provider', () => {
  let tmdbProvider;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock axios.create to return mocked axios instance
    mockedAxios.create.mockReturnValue(mockedAxios);

    tmdbProvider = new TMDBProvider();
  });

  describe('getMovieWithCredits', () => {
    it('should fetch movie with credits using append_to_response', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockMovieWithCredits });

      const result = await tmdbProvider.getMovieWithCredits(1726);

      expect(mockedAxios.get).toHaveBeenCalledWith('/movie/1726?append_to_response=credits');
      expect(result).toEqual(mockMovieWithCredits);
    });

    it('should handle errors when fetching movie with credits', async () => {
      mockedAxios.get.mockRejectedValue(new Error('API Error'));

      await expect(tmdbProvider.getMovieWithCredits(1726)).rejects.toThrow(
        'Failed to fetch movie with credits for ID 1726'
      );
    });
  });

  describe('getAllMarvelMoviesWithCredits', () => {
    it('should fetch all movies in parallel', async () => {
      const movieIds = [1726, 1724];
      const mockMovies = [
        mockMovieWithCredits,
        { ...mockMovieWithCredits, id: 1724, title: 'The Incredible Hulk' },
      ];

      mockedAxios.get
        .mockResolvedValueOnce({ data: mockMovies[0] })
        .mockResolvedValueOnce({ data: mockMovies[1] });

      const result = await tmdbProvider.getAllMarvelMoviesWithCredits(movieIds);

      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
      expect(result).toHaveLength(2);
      expect(result[0]?.title).toBe('Iron Man');
      expect(result[1]?.title).toBe('The Incredible Hulk');
    });

    it('should handle partial failures gracefully', async () => {
      const movieIds = [1726, 1724, 9999];

      mockedAxios.get
        .mockResolvedValueOnce({ data: mockMovieWithCredits })
        .mockResolvedValueOnce({ data: { ...mockMovieWithCredits, id: 1724 } })
        .mockRejectedValueOnce(new Error('Movie not found'));

      const result = await tmdbProvider.getAllMarvelMoviesWithCredits(movieIds);

      expect(result).toHaveLength(2); // Should return 2 successful results
      expect(mockedAxios.get).toHaveBeenCalledTimes(3);
    });

    it('should handle complete failure', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Complete API failure'));

      const result = await tmdbProvider.getAllMarvelMoviesWithCredits([1726]);

      expect(result).toHaveLength(0); // Should return empty array
    });
  });
});
