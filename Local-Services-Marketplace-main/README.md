# Local Services Marketplace

Local Services Marketplace is a full-stack local service booking platform where customers can discover service providers, browse listings, and book appointments, while providers can manage their services and profile. The project combines a Next.js frontend with a PHP + SQLite backend for authentication, listings, bookings, and basic marketplace operations, with MongoDB-backed API routes.

## What this project does
- Lets customers browse local service providers and listings
- Supports user registration, login, and OTP-based login
- Allows providers to create and manage service listings
- Supports booking requests and booking history
- Includes review, messaging, and profile-related flows
- Provides a clean modern UI for a local marketplace experience

## Main features
- Customer and provider role flows
- Listing discovery and search
- Booking and service request workflow
- Profile and authentication handling
- Review and messaging support
- Responsive marketplace UI
- Security: CSRF protection, rate limiting, secure sessions, password validation

## Tech stack
- Next.js (App Router, TypeScript)
- React and Tailwind CSS
- PHP with SQLite backend
- MongoDB (API routes)
- Session-based authentication
- Stripe integration hooks

## Project structure
- `src/` contains the Next.js frontend pages, components, contexts, and app logic
- `backend/` contains the PHP backend and SQLite-backed API routes
- `public/` stores the backend entrypoint and storage files

## Getting started
1. Install frontend dependencies:
   - `npm install`
2. Copy the environment template:
   - `cp .env.example .env`
3. Start the backend:
   - `cd backend`
   - `php -S localhost:8000 -t public`
4. Start the frontend:
   - `npm run dev`

The app runs at http://localhost:3000 and the PHP backend at http://localhost:8000.

## Environment
See `.env.example` for the available environment variables used by the app.

## Useful scripts
- `npm run dev` - start the local development server
- `npm run build` - create a production build
- `npm run start` - run the production build locally
- `npm run lint` - lint the codebase
- `npm run db:seed` - create a MongoDB test user

## Docker deployment
The project ships with `docker-compose.yml` for a one-command deployment:

```bash
docker compose up --build -d
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- MongoDB: internal at `mongodb://mongo:27017`

### Deploying to a VPS / public server
1. Push this repository to GitHub and clone it on your server (Docker + Docker Compose required).
2. Optionally override the browser-facing backend URL at build time:
   ```bash
   docker compose build --build-arg NEXT_PUBLIC_API_BASE_URL=http://YOUR_SERVER_IP:8000
   docker compose up -d
   ```
3. Open a firewall/security group for ports `3000` and `8000`.
4. Visit `http://YOUR_SERVER_IP:3000` to use the app.

### Notes
- The backend uses SQLite for storage by default (`backend/storage/app.db`). For a persistent Docker volume, mount `backend/storage`.
- The Next.js API routes use MongoDB. Point `MONGODB_URI` at your MongoDB instance (or MongoDB Atlas) for production.
- Stripe endpoints are stubbed in the PHP backend and require live keys in production.
- OTP responses include the code during local testing for convenience.
