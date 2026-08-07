# Authentication and Access Flow

This project uses a session-based authentication system for the Local Services Marketplace. It supports customer and provider access, protects private routes, and allows users to sign in with either password login or OTP login.

## Authentication features
- Session-based login with secure cookies
- Password-based authentication
- OTP-based authentication for quick sign-in
- Role-based access control for customers, providers, and admins
- CSRF protection on state-changing requests
- Rate limiting for authentication endpoints

## Auth flow
1. Users can register a new account from the registration page.
2. Users can sign in using email/password or through the OTP flow.
3. The backend creates a session and stores the user ID for future requests.
4. Protected pages and APIs check the authenticated session before allowing access.

## Important routes
- `/login` for password login
- `/otp-login` for OTP login
- `/register` for account creation
- `/profile` for authenticated users
- `/bookings` for customer and provider booking views
- `/admin` for admin-only access

## API endpoints
- `POST /api/auth/login` - sign in with email and password
- `POST /api/auth/register` - create a new account
- `POST /api/auth/logout` - end the current session
- `GET /api/auth/me` - fetch the current user
- `POST /api/auth/otp/request` - request an OTP code
- `POST /api/auth/otp/verify` - verify the OTP code

## Security notes
- Authentication relies on HTTP-only session cookies.
- Passwords are hashed before storage.
- The app uses role checks for protected routes and API actions.
- The backend currently uses SQLite for local development and testing.

## Local testing
To test authentication locally:
1. Start the backend from the `backend` folder.
2. Start the frontend with `npm run dev`.
3. Open the registration or login pages and create a test account.
