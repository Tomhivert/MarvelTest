const request = require('supertest');
const express = require('express');
const { 
  moviesPerActor, 
  actorsWithMultipleCharacters, 
  charactersWithMultipleActors 
} = require('../../src/controllers/marvelController');
const marvelAnalysisService = require('../../src/services/marvelAnalysisService');

// Mock the analysis service
jest.mock('../../src/services/marvelAnalysisService');
const mockMarvelAnalysisService = marvelAnalysisService;

describe('Marvel Controller', () => {
  let app;

  beforeEach(() => {
    jest.clearAllMocks();
    
    app = express();
    app.use(express.json());
    
    // Set up routes
    app.get('/moviesPerActor', moviesPerActor);
    app.get('/actorsWithMultipleCharacters', actorsWithMultipleCharacters);
    app.get('/charactersWithMultipleActors', charactersWithMultipleActors);
  });

  describe('GET /moviesPerActor', () => {
    it('should return movies per actor successfully', async () => {
      const mockData = {
        'Robert Downey Jr.': ['Iron Man', 'Iron Man 2'],
        'Chris Evans': ['Captain America: The First Avenger']
      };

      mockMarvelAnalysisService.getMoviesPerActor.mockResolvedValue(mockData);

      const response = await request(app)
        .get('/moviesPerActor')
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        data: mockData,
        message: 'Movies per actor retrieved successfully'
      });
      expect(response.body.timestamp).toBeDefined();
    });

    it('should handle service errors', async () => {
      mockMarvelAnalysisService.getMoviesPerActor.mockRejectedValue(
        new Error('Service error')
      );

      const response = await request(app)
        .get('/moviesPerActor')
        .expect(500);

      expect(response.body).toMatchObject({
        success: false,
        error: 'Failed to retrieve movies per actor',
        message: 'Service error'
      });
    });
  });

  describe('GET /actorsWithMultipleCharacters', () => {
    it('should return actors with multiple characters successfully', async () => {
      const mockData = {
        'Robert Downey Jr.': [
          { movieName: 'Iron Man', characterName: 'Tony Stark / Iron Man' },
          { movieName: 'Avengers', characterName: 'The Vision' }
        ]
      };

      mockMarvelAnalysisService.getActorsWithMultipleCharacters.mockResolvedValue(mockData);

      const response = await request(app)
        .get('/actorsWithMultipleCharacters')
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        data: mockData,
        message: 'Actors with multiple characters retrieved successfully'
      });
    });

    it('should handle service errors', async () => {
      mockMarvelAnalysisService.getActorsWithMultipleCharacters.mockRejectedValue(
        new Error('Analysis failed')
      );

      const response = await request(app)
        .get('/actorsWithMultipleCharacters')
        .expect(500);

      expect(response.body).toMatchObject({
        success: false,
        error: 'Failed to retrieve actors with multiple characters'
      });
    });
  });

  describe('GET /charactersWithMultipleActors', () => {
    it('should return characters with multiple actors successfully', async () => {
      const mockData = {
        'Spider-Man': [
          { movieName: 'Civil War', actorName: 'Tom Holland' },
          { movieName: 'Homecoming', actorName: 'Tobey Maguire' }
        ]
      };

      mockMarvelAnalysisService.getCharactersWithMultipleActors.mockResolvedValue(mockData);

      const response = await request(app)
        .get('/charactersWithMultipleActors')
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        data: mockData,
        message: 'Characters with multiple actors retrieved successfully'
      });
    });

    it('should handle unknown errors', async () => {
      mockMarvelAnalysisService.getCharactersWithMultipleActors.mockRejectedValue(
        'Unknown error'
      );

      const response = await request(app)
        .get('/charactersWithMultipleActors')
        .expect(500);

      expect(response.body).toMatchObject({
        success: false,
        error: 'Failed to retrieve characters with multiple actors',
        message: 'Unknown error'
      });
    });
  });
});
