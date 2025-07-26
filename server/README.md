# View Count Server

This is a simple Express.js server that handles view counting for the portfolio website.

## Setup

1. Install server dependencies:
```bash
npm install express cors fs-extra
```

2. Create a `.env` file in the root directory:
```bash
VITE_API_URL=http://localhost:3001
```

## Running the Server

Start the server:
```bash
npm run server
```

The server will run on port 3001 by default. You can change this by setting the `PORT` environment variable.

## API Endpoints

- `GET /api/viewCount` - Get current view count
- `POST /api/viewCount` - Increment view count (with visit tracking)
- `GET /api/health` - Health check endpoint

## Features

- **Visit Tracking**: Prevents duplicate counts from the same user within 1 hour
- **Fallback Support**: Frontend falls back to localStorage if server is unavailable
- **CORS Enabled**: Allows cross-origin requests from the frontend
- **Data Persistence**: Stores view count data in JSON file

## Data Storage

View count data is stored in `server/data/viewCount.json` with the following structure:

```json
{
  "viewCount": 1234,
  "lastUpdated": 1703123456789,
  "visits": {
    "clientId1": 1703123456789,
    "clientId2": 1703123456790
  }
}
```

## Deployment

For production deployment, consider:

1. **Database**: Replace JSON file storage with a proper database (PostgreSQL, MongoDB, etc.)
2. **Environment Variables**: Set `VITE_API_URL` to your production API endpoint
3. **HTTPS**: Ensure your API endpoint uses HTTPS
4. **Rate Limiting**: Add rate limiting to prevent abuse
5. **Monitoring**: Add logging and monitoring for the API endpoints 