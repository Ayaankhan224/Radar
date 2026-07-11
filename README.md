# Radar

Radar is an AI-assisted career prep workspace for practicing interviews and improving resumes. It pairs a React frontend with an Express API, MongoDB persistence, JWT authentication, and Gemini-powered feedback.

## What It Does

- Creates protected user accounts for interview and resume workflows.
- Guides candidates through interview setup and practice sessions.
- Generates structured interview reports with AI feedback.
- Uploads, analyzes, and renders resumes.
- Exports resume views through the backend PDF pipeline.

## Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Axios
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Multer, Puppeteer
- AI: Google Gemini (gemini-2.5-flash)

## Getting Started

Install dependencies:

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

Create `backend/.env`:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=6767
FRONTEND_URL=http://localhost:5173
```

Optionally create `frontend/.env`:

```bash
VITE_API_BASE_URL=http://localhost:6767
```

Run the backend:

```bash
cd backend
npm run dev
```

Run the frontend:

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173`.

## Project Structure

```text
backend/   Express API, auth, database models, AI services, file handling
frontend/  Vite React app, routes, pages, feature modules, styling
```

## Notes

The app expects the API at `http://localhost:6767` in development. In production, configure the deployed frontend URL in the backend CORS environment variables and set `VITE_API_BASE_URL` for the frontend build.
