import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env' });

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
