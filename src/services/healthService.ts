import { HealthStatus } from '../types';

export const getHealthStatus = (): HealthStatus => {
  return {
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  };
};

export const performDetailedHealthCheck = async (): Promise<HealthStatus & { checks: Record<string, boolean> }> => {
  const baseHealth = getHealthStatus();
  
  // Add more health checks here (database, external APIs, etc.)
  const checks = {
    memory: process.memoryUsage().heapUsed < 1000000000, // Less than 1GB
    uptime: process.uptime() > 0,
    timestamp: true
  };

  return {
    ...baseHealth,
    checks
  };
};
