# PHP Backend for Local Services Marketplace

This backend powers the marketplace APIs for authentication, listings, bookings, reviews, and basic session management. It uses plain PHP with SQLite so the project can run locally without a full database setup.

## Run locally

```bash
cd backend
php -S localhost:8000 -t public
```

## Environment

Create a `backend/.env` file or set the following environment variables:

```
FRONTEND_ORIGIN=http://localhost:3000
SQLITE_PATH=./storage/app.db
APP_ENV=development
SESSION_SECURE=false
```

## Notes
- The backend currently uses SQLite for local development and demo use.
- Stripe endpoints are still stubbed for local testing.
- OTP responses include the code during development for convenience.
- Frontend requests must include credentials so PHP sessions work correctly.
