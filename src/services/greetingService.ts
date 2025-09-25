import { HelloResponse } from '../types';

export const generateGreeting = (name?: string): HelloResponse => {
  const greeting = name ? `Hello, ${name}!` : 'Hello, World!';
  
  return {
    message: greeting,
    timestamp: new Date().toISOString()
  };
};

export const generateWelcomeMessage = (): { message: string; timestamp: string; version: string } => {
  return {
    message: 'Welcome to the Marvel Test API!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  };
};
