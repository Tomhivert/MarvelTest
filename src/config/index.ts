export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiVersion: '1.0.0',
  
  // Add more configuration options here
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  },
  
  // TMDB API configuration
  tmdb: {
    apiKey: process.env.TMDB_API_KEY || '',
    baseUrl: process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3',
    timeout: 10000
  }
};
