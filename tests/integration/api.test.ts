import request from 'supertest';
import app from '../../src/index';

// Mock the TMDB provider to avoid real API calls
jest.mock('../../src/providers/tmdbProvider', () => ({
  tmdbProvider: {
    getAllMarvelMoviesWithCredits: jest.fn().mockResolvedValue([
      {
        id: 1726,
        title: 'Iron Man',
        overview: 'After being held captive...',
        release_date: '2008-05-02',
        credits: {
          id: 1726,
          cast: [
            {
              id: 3223,
              name: 'Robert Downey Jr.',
              character: 'Tony Stark / Iron Man',
              order: 0
            },
            {
              id: 12835,
              name: 'Gwyneth Paltrow',
              character: 'Pepper Potts',
              order: 1
            }
          ]
        }
      },
      {
        id: 1771,
        title: 'Captain America: The First Avenger',
        overview: 'During World War II...',
        release_date: '2011-07-22',
        credits: {
          id: 1771,
          cast: [
            {
              id: 1896,
              name: 'Chris Evans',
              character: 'Steve Rogers / Captain America',
              order: 0
            }
          ]
        }
      }
    ])
  }
}));

describe('Marvel API Integration Tests', () => {
  describe('GET /moviesPerActor', () => {
    it('should return the correct API response structure', async () => {
      const response = await request(app)
        .get('/moviesPerActor')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
      
      // Check data structure
      expect(typeof response.body.data).toBe('object');
      if (Object.keys(response.body.data).length > 0) {
        const firstActor = Object.keys(response.body.data)[0];
        if (firstActor) {
          expect(Array.isArray(response.body.data[firstActor])).toBe(true);
        }
      }
    });
  });

  describe('GET /actorsWithMultipleCharacters', () => {
    it('should return the correct API response structure', async () => {
      const response = await request(app)
        .get('/actorsWithMultipleCharacters')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
      
      // Check data structure
      expect(typeof response.body.data).toBe('object');
      if (Object.keys(response.body.data).length > 0) {
        const firstActor = Object.keys(response.body.data)[0];
        if (firstActor) {
          expect(Array.isArray(response.body.data[firstActor])).toBe(true);
          if (response.body.data[firstActor].length > 0) {
            expect(response.body.data[firstActor][0]).toHaveProperty('movieName');
            expect(response.body.data[firstActor][0]).toHaveProperty('characterName');
          }
        }
      }
    });
  });

  describe('GET /charactersWithMultipleActors', () => {
    it('should return the correct API response structure', async () => {
      const response = await request(app)
        .get('/charactersWithMultipleActors')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
      
      // Check data structure
      expect(typeof response.body.data).toBe('object');
      if (Object.keys(response.body.data).length > 0) {
        const firstCharacter = Object.keys(response.body.data)[0];
        if (firstCharacter) {
          expect(Array.isArray(response.body.data[firstCharacter])).toBe(true);
          if (response.body.data[firstCharacter].length > 0) {
            expect(response.body.data[firstCharacter][0]).toHaveProperty('movieName');
            expect(response.body.data[firstCharacter][0]).toHaveProperty('actorName');
          }
        }
      }
    });
  });

  describe('404 handling', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Route not found');
    });
  });
});
