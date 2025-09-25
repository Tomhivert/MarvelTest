import { Request, Response } from 'express';
import { getHealthStatus, performDetailedHealthCheck } from '../services/healthService';
import { ApiResponse } from '../types';

export const getHealth = async (req: Request, res: Response): Promise<void> => {
  try {
    const healthStatus = getHealthStatus();
    
    const response: ApiResponse = {
      success: true,
      data: healthStatus,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: 'Health check failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };

    res.status(500).json(response);
  }
};

export const getDetailedHealth = async (req: Request, res: Response): Promise<void> => {
  try {
    const healthStatus = await performDetailedHealthCheck();
    
    const response: ApiResponse = {
      success: true,
      data: healthStatus,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: 'Detailed health check failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };

    res.status(500).json(response);
  }
};
