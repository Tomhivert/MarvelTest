# Marvel Test - Node.js TypeScript Web Server

A modern Node.js web server built with TypeScript and Express.

## Features

- ✅ TypeScript for type safety
- ✅ Express.js web framework
- ✅ CORS support
- ✅ Security headers with Helmet
- ✅ JSON body parsing
- ✅ Health check endpoint
- ✅ Error handling middleware
- ✅ Development hot reload with tsx

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

3. Open your browser and visit: http://localhost:3000

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm start` - Start the production server
- `npm run clean` - Clean the dist directory

### API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check endpoint
- `GET /api/hello?name=YourName` - Hello endpoint with optional name parameter

### Project Structure

```
src/
├── index.ts              # Main server file
├── config/               # Configuration files
│   └── index.ts          # App configuration
├── controllers/          # Request handlers and business logic
│   ├── greetingController.ts
│   └── healthController.ts
├── middleware/           # Custom middleware
│   └── errorHandler.ts   # Error handling middleware
├── routes/               # Route definitions
│   ├── index.ts          # Main route file
│   ├── apiRoutes.ts      # API routes
│   └── healthRoutes.ts   # Health check routes
├── services/             # Business logic and external API calls
│   ├── greetingService.ts
│   └── healthService.ts
└── types/                # TypeScript type definitions
    └── index.ts          # Common interfaces and types
dist/                     # Compiled JavaScript (generated)
package.json              # Dependencies and scripts
tsconfig.json             # TypeScript configuration
.gitignore               # Git ignore rules
```

### Environment Variables

Create a `.env` file in the root directory to customize:

```env
PORT=3000
NODE_ENV=development
```

## Development

The server includes:
- Hot reload during development
- TypeScript compilation
- Error handling
- Security middleware
- CORS support

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

