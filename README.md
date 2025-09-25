# Marvel Test - Marvel API Analysis Server

A Node.js server that analyzes Marvel movie data using The Movie Database (TMDB) API.

## Features

- Express.js web framework with modern JavaScript
- TMDB API integration with parallel requests
- Smart character normalization and matching
- Comprehensive test coverage with Jest
- ESLint + Prettier for code quality

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

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

## API Endpoints

### Assignment Questions

1. **`GET /moviesPerActor`** - Which Marvel movies did each actor play in?
2. **`GET /actorsWithMultipleCharacters`** - Who played more than one Marvel character?
3. **`GET /charactersWithMultipleActors`** - Which roles were played by multiple actors?

### Response Format

```json
{
  "success": true,
  "data": { ... },
  "message": "...",
  "timestamp": "2025-09-25T..."
}
```

## Scripts

```bash
npm run dev          # Development server with hot reload
npm start           # Production server
npm test            # Run tests
npm run test:watch  # Watch mode for tests
npm run lint        # Check code quality
npm run format      # Format code
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
TMDB_API_KEY=your_api_key_here
PORT=3000
NODE_ENV=development
```

## Project Structure

```
src/
├── index.js                     # Server entry point
├── dataForQuestions.js          # Marvel data
├── controllers/                 # Request handlers
├── services/                    # Business logic
├── providers/                   # External APIs
├── routes/                      # Route definitions
└── middleware/                  # Custom middleware

tests/                           # Test files
├── controllers/
├── services/
└── providers/
```

## Performance Features

- **Parallel API requests** using `Promise.allSettled()`
- **Single API calls** using TMDB's `append_to_response`
- **Character normalization** for accurate matching

## License

MIT
