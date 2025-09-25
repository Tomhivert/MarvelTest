import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/', routes);

// Error handling
app.use('*', notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Marvel API Server running on http://localhost:${PORT}`);
  console.log(`🎬 Assignment endpoints:`);
  console.log(`   GET /moviesPerActor`);
  console.log(`   GET /actorsWithMultipleCharacters`);
  console.log(`   GET /charactersWithMultipleActors`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Log Marvel data like the original skeleton
  const { movies, actors } = require('./data');
  console.log('\n--- Marvel Data Loaded ---');
  console.log(`📺 ${Object.keys(movies).length} Marvel movies`);
  console.log(`🎭 ${actors.length} Marvel actors`);
});

export default app;

