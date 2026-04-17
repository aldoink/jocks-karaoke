# Backend API Documentation

## Overview

The Jock's Karaoke backend is a Spring Boot + Kotlin REST API exposing endpoints for authentication, song management, and high scores.

## Base URL

```
https://backend.jocks-karaoke.com
```

All API endpoints are under the `/api` path.

## Authentication

The API uses JWT (JSON Web Token) for authentication. Include the JWT in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

### Login

Obtain a JWT token by posting credentials:

```bash
curl -X POST https://backend.jocks-karaoke.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2026-03-14T18:00:00Z"
}
```

## Endpoints

### Authentication

#### POST `/api/auth/login`
Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:** `200 OK`
```json
{
  "token": "string",
  "expiresAt": "2026-03-14T18:00:00Z"
}
```

**Response:** `401 Unauthorized` (invalid credentials)
```json
{
  "error": "Invalid credentials"
}
```

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:** `201 Created`
```json
{
  "token": "string",
  "userId": "string"
}
```

### Songs

#### GET `/api/songs`
Search and list songs.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | string | Search term (song title or artist) |
| `limit` | number | Maximum results (default: 50) |
| `offset` | number | Pagination offset (default: 0) |

**Example Request:**
```bash
curl "https://backend.jocks-karaoke.com/api/songs?query=rock&limit=10"
```

**Response:** `200 OK`
```json
{
  "songs": [
    {
      "id": 1,
      "title": "Song Title",
      "artist": "Artist Name",
      "album": "Album Name",
      "duration": 245000,
      "genre": "Rock"
    }
  ],
  "total": 100,
  "page": 1,
  "size": 10
}
```

#### GET `/api/songs/{id}`
Get details for a specific song.

**Example Request:**
```bash
curl "https://backend.jocks-karaoke.com/api/songs/1"
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Song Title",
  "artist": "Artist Name",
  "album": "Album Name",
  "duration": 245000,
  "genre": "Rock",
  "lyrics": "Song lyrics here...",
  "year": 2020
}
```

#### DELETE `/api/songs/{id}`
Delete a song (requires authentication).

**Response:** `204 No Content`

### High Scores

#### GET `/api/high-scores`
Get the leaderboard.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | number | Maximum results (default: 50) |
| `game` | string | Filter by game name (optional) |

**Example Request:**
```bash
curl "https://backend.jocks-karaoke.com/api/high-scores?limit=10"
```

**Response:** `200 OK`
```json
{
  "highScores": [
    {
      "id": 1,
      "playerName": "Player1",
      "score": 9850,
      "timestamp": "2026-03-14T15:00:00Z",
      "game": "Karaoke"
    }
  ],
  "total": 25
}
```

#### POST `/api/high-scores`
Submit a new high score (requires authentication).

**Request Body:**
```json
{
  "playerName": "string",
  "score": 9850,
  "game": "Karaoke"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "playerName": "Player1",
  "score": 9850,
  "timestamp": "2026-03-14T15:00:00Z",
  "game": "Karaoke"
}
```

#### DELETE `/api/high-scores/{id}`
Delete a high score entry (requires authentication and ownership).

**Response:** `204 No Content`

## Error Responses

All errors follow this format:

```json
{
  "timestamp": "2026-03-14T15:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Error description",
  "path": "/api/songs"
}
```

### Common HTTP Status Codes

| Status | Description | Example |
|--------|-------------|---------|
| 400 | Bad Request | Invalid request body |
| 401 | Unauthorized | Missing/invalid JWT |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server error |

## Testing the API

### Using curl
```bash
# Login
curl -X POST http://localhost:9090/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}' \
  -c cookies.txt

# Get JWT from response, use in subsequent requests
# Example: -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman
1. Import the endpoints as a collection
2. Add JWT to Authorization header for protected endpoints
3. Run tests

## Rate Limiting

Currently, no rate limiting is implemented. Future versions may add:
- Endpoint-specific rate limits
- User-based rate limiting
- IP-based blocking for brute force attempts

## Versioning

The API is currently version 1.0. Future changes will use URL versioning:
- `/api/v1/songs` - Current version
- `/api/v2/songs` - Future major changes

## Related Documentation

- [ARCHITECTURE.md](../ARCHITECTURE.md) - System overview
- [README.md](../README.md) - Deployment guide
- [Frontend API Usage](../frontend/src/services/) - Frontend service implementations