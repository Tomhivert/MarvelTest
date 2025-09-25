# Marvel Test - Marvel API Analysis Server

A Node.js JavaScript server that analyzes Marvel movie data using The Movie Database (TMDB) API.

## Assignment Overview

This server answers three key questions about Marvel actors and characters:
1. Which Marvel movies did each actor play in?
2. Who are the actors who played more than one Marvel character?
3. Which roles (characters) were played by more than one actor?

## Features

- ✅ Modern JavaScript (ES6+) 
- ✅ Express.js web framework
- ✅ TMDB API integration with performance optimizations
- ✅ Parallel API requests for fast data fetching
- ✅ Smart character normalization and matching
- ✅ Error handling middleware
- ✅ Development hot reload with nodemon

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Test the endpoints:
   - http://localhost:3000/moviesPerActor
   - http://localhost:3000/actorsWithMultipleCharacters  
   - http://localhost:3000/charactersWithMultipleActors

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm start` - Start the production server
- `npm run clean` - Clean the dist directory
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

### API Endpoints

#### Assignment Endpoints
- `GET /moviesPerActor` - Which Marvel movies did each actor play in?
- `GET /actorsWithMultipleCharacters` - Who are the actors who played more than one Marvel character?
- `GET /charactersWithMultipleActors` - Roles (characters) that were played by more than one actor?

#### Response Structures
```json
// /moviesPerActor
{ 
  "success": true,
  "data": { "actorName": ["movie1", "movie2"] },
  "message": "Movies per actor retrieved successfully",
  "timestamp": "2025-09-25T..."
}

// /actorsWithMultipleCharacters  
{ 
  "success": true,
  "data": { "actorName": [{"movieName": "movie", "characterName": "character"}] },
  "message": "Actors with multiple characters retrieved successfully",
  "timestamp": "2025-09-25T..."
}

// /charactersWithMultipleActors
{ 
  "success": true,
  "data": { "characterName": [{"movieName": "movie", "actorName": "actor"}] },
  "message": "Characters with multiple actors retrieved successfully",
  "timestamp": "2025-09-25T..."
}
```

### Project Structure

```
src/
├── index.js              # Main server file
├── dataForQuestions.js   # Marvel movies and actors data (from skeleton)
├── config/               # Configuration files
│   └── index.js          # App configuration
├── controllers/          # Request handlers and business logic
│   └── marvelController.js  # Marvel assignment endpoints
├── middleware/           # Custom middleware
│   └── errorHandler.js   # Error handling middleware
├── providers/            # External API providers
│   └── tmdbProvider.js   # TMDB API client
├── routes/               # Route definitions
│   ├── index.js          # Main route file
│   └── marvelRoutes.js   # Marvel assignment routes
└── services/             # Business logic and external API calls
    └── marvelAnalysisService.js  # Marvel data analysis
tests/                    # Test files
├── setup.js              # Test configuration
├── mocks/                # Mock data for testing
│   └── tmdbMockData.js   # Mock TMDB responses
├── controllers/          # Controller unit tests
├── providers/            # Provider unit tests
└── services/             # Service unit tests
package.json              # Dependencies and scripts
jest.config.js            # Jest testing configuration
.gitignore               # Git ignore rules
```

### Environment Variables

The project includes a `.env` file for local development. For production or custom setups, copy `.env.example`:

```bash
cp .env.example .env
```

Then edit `.env` with your configuration:

```env
# TMDB API Configuration
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3

# Server Configuration
PORT=3000
NODE_ENV=development
```

**Note**: The provided API key in the assignment is already configured for local development.

### Performance Optimizations

The implementation uses several performance optimizations:
- **Parallel API calls** using `Promise.allSettled()` instead of sequential requests
- **append_to_response** parameter to fetch movie details and credits in a single API call
- **Efficient data processing** with normalized character name matching

## How It Works

1. **Data Source**: Uses Marvel movies and actors from the provided skeleton
2. **API Integration**: Fetches detailed movie credits from TMDB API
3. **Performance**: Uses parallel requests and `append_to_response` for fast data retrieval
4. **Analysis**: Processes cast data to answer the assignment questions
5. **Smart Matching**: Normalizes character names to detect truly different roles

## Testing

The project includes comprehensive test coverage:

### Test Types
- **Unit Tests**: Test individual components in isolation
- **Mocking**: TMDB API calls are mocked to avoid external dependencies

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure
- **Controllers**: Test HTTP request/response handling
- **Services**: Test business logic and data processing
- **Providers**: Test external API integration

## Development

The server includes:
- Hot reload during development with nodemon
- Modern JavaScript features
- Comprehensive error handling
- Security middleware (Helmet, CORS)
- Performance optimizations for API calls
- Full test suite with Jest and Supertest

## Production

To deploy to production:

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## License

MIT

