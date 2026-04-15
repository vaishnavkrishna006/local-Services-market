# Authentication System

This project has a comprehensive authentication system with the following features:

## Features

### 1. **Session-Based Authentication**
- HTTP-only cookies for security
- 14-day session expiration (configurable via `SESSION_DAYS` env variable)
- Automatic session validation

### 2. **Rate Limiting**
- Protects against brute force attacks
- 5 login attempts per 15 minutes per email
- Automatic reset on successful login

### 3. **Role-Based Access Control (RBAC)**
- Three roles: `CUSTOMER`, `PROVIDER`, `ADMIN`
- Route-level protection via middleware
- API endpoint-level protection via `requireRole()` and `requireAuth()`

### 4. **Two Authentication Methods**
- **Password Login**: `/api/auth/login`
- **OTP Login**: `/api/auth/otp/request` and `/api/auth/otp/verify`

## Usage

### Server-Side (API Routes)

```typescript
import { requireAuth, requireRole } from '@/lib/auth-guard';

export async function GET() {
  try {
    // Get authenticated user (any role)
    const user = await requireAuth();
    
    // Get user and verify specific role
    const adminUser = await requireRole(['ADMIN']);
    
    // Get optional user (null if not authenticated)
    const optionalUser = await getOptionalUser();
    
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
```

### Client-Side (React Components)

```typescript
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Protected, AdminOnly } from '@/components/Protected';

export function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// Use Protected component to guard pages
export function AdminPage() {
  return (
    <AdminOnly>
      <h1>Admin Dashboard</h1>
    </AdminOnly>
  );
}

// Or use custom role protection
export function ProviderArea() {
  return (
    <Protected requiredRole={['PROVIDER']}>
      <h1>Provider Dashboard</h1>
    </Protected>
  );
}
```

## Protected Routes

The following routes are automatically protected by middleware:

| Route | Required Role | Description |
|-------|---------------|-------------|
| `/bookings` | CUSTOMER, PROVIDER | View bookings |
| `/providers/*` | PROVIDER | Provider dashboard |
| `/admin` | ADMIN | Admin panel |
| `/profile` | Any authenticated | User profile |

## Public Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/login` | Password login |
| `/otp-login` | OTP login |
| `/register` | Registration |
| `/listings` | Browse listings |

## API Endpoints

### Authentication

- **POST** `/api/auth/login` - Password login
- **POST** `/api/auth/register` - Register new account
- **POST** `/api/auth/logout` - Logout
- **GET** `/api/auth/me` - Get current user
- **POST** `/api/auth/otp/request` - Request OTP
- **POST** `/api/auth/otp/verify` - Verify OTP

### Protected Endpoints

All other API endpoints under `/api/*` require authentication via session cookie.

## Environment Variables

```env
# Session configuration
SESSION_DAYS=14

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/db

# Payment
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLIC_KEY=pk_...
```

## Security Best Practices

✅ HTTP-only cookies (prevent XSS)
✅ CSRF protection via same-site cookies
✅ Password hashing with bcryptjs (10 rounds)
✅ Rate limiting on login attempts
✅ Session expiration
✅ Role-based access control
✅ Automatic session cleanup on logout

## Testing

Test the authentication:

1. **Register**: `/register` with email/password
2. **Login**: `/login` with credentials
3. **OTP**: `/otp-login` for OTP-based authentication
4. **Protected Route**: Try accessing `/profile` while logged in
5. **Rate Limit**: Try logging in with wrong password 5+ times
