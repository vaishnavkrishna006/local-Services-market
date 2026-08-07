# Local Services Marketplace

Local Services Marketplace is a full-stack local service booking platform where customers can discover service providers, browse listings, and book appointments, while providers can manage their services and profile. The project combines a Next.js frontend with a PHP + SQLite backend for authentication, listings, bookings, and basic marketplace operations.

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

## Tech stack
- Next.js (App Router, TypeScript)
- React and Tailwind CSS
- PHP with SQLite backend
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

## Environment
See `.env.example` for the available environment variables used by the app.

## Useful scripts
- `npm run dev` - start the local development server
- `npm run build` - create a production build
- `npm run start` - run the production build locally

## Notes
- The backend currently uses SQLite for local development and demo purposes.
- Stripe endpoints are currently stubbed in the PHP backend.
- OTP responses include the code during local testing for convenience.
