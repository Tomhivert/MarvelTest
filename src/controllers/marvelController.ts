import { Request, Response } from 'express';
import { 
  getMoviesPerActor, 
  getActorsWithMultipleCharacters, 
  getCharactersWithMultipleActors 
} from '../services/marvelAnalysisService';
import { ApiResponse } from '../types';

export const moviesPerActor = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Fetching movies per actor...');
    const data = await getMoviesPerActor();
    
    const response: ApiResponse = {
      success: true,
      data,
      message: 'Movies per actor retrieved successfully',
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    console.error('Error in moviesPerActor:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to retrieve movies per actor',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };

    res.status(500).json(response);
  }
};

export const actorsWithMultipleCharacters = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Fetching actors with multiple characters...');
    const data = await getActorsWithMultipleCharacters();
    
    const response: ApiResponse = {
      success: true,
      data,
      message: 'Actors with multiple characters retrieved successfully',
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    console.error('Error in actorsWithMultipleCharacters:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to retrieve actors with multiple characters',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };

    res.status(500).json(response);
  }
};

export const charactersWithMultipleActors = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Fetching characters with multiple actors...');
    const data = await getCharactersWithMultipleActors();
    
    const response: ApiResponse = {
      success: true,
      data,
      message: 'Characters with multiple actors retrieved successfully',
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    console.error('Error in charactersWithMultipleActors:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to retrieve characters with multiple actors',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };

    res.status(500).json(response);
  }
};
