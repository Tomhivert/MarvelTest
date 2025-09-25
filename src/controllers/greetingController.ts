import { Request, Response } from 'express';
import { generateGreeting, generateWelcomeMessage } from '../services/greetingService';
import { ApiResponse } from '../types';

export const getWelcome = (req: Request, res: Response): void => {
  try {
    const welcomeMessage = generateWelcomeMessage();
    
    const response: ApiResponse = {
      success: true,
      data: welcomeMessage,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: 'Failed to generate welcome message',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };

    res.status(500).json(response);
  }
};

export const getHello = (req: Request, res: Response): void => {
  try {
    const { name } = req.query;
    const greeting = generateGreeting(name as string);
    
    const response: ApiResponse = {
      success: true,
      data: greeting,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: 'Failed to generate greeting',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };

    res.status(500).json(response);
  }
};
