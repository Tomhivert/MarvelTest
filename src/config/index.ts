export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiVersion: '1.0.0',
  
  // Add more configuration options here
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  },
  
  // Database configuration (for future use)
  database: {
    url: process.env.DATABASE_URL || '',
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '10')
  },
  
  // External API configuration (for future Marvel API integration)
  externalApis: {
    marvelApiKey: process.env.MARVEL_API_KEY || '',
    marvelPrivateKey: process.env.MARVEL_PRIVATE_KEY || ''
  }
};
