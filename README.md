# Socially Approved Carousel

Full-stack video carousel built with React, Node.js, Express, and MongoDB.

## Features
- Outer carousel/grid for 30–40 videos
- Modal inner carousel showing 3 videos at a time
- Lazy-loaded videos and thumbnails
- IntersectionObserver-based playback pause/load behavior
- Play/Pause and Mute/Unmute controls
- Progress bar and loading spinner
- Like and share APIs with real-time UI update
- Active video limit optimization

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Setup

### 1. Install all dependencies
```bash
npm run install:all
```

### 2. Configure backend env
```bash
cd server
cp .env.example .env
```

Update `MONGO_URI` if needed.

### 3. Seed videos
```bash
cd server
npm run seed
```

### 4. Run frontend + backend
From root folder:
```bash
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

## API Endpoints

### GET /api/videos
Returns video metadata.

### POST /api/like
Body:
```json
{ "videoId": "mongo_id_here" }
```

### POST /api/share
Body:
```json
{ "videoId": "mongo_id_here", "platform": "copy-link" }
```
