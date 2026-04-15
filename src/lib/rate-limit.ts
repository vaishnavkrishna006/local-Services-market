// Simple in-memory rate limiter for login attempts
// In production, use Redis for better performance

interface RateLimitEntry {
  attempts: number;
  resetAt: number;
}

const loginAttempts = new Map<string, RateLimitEntry>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(email: string): { allowed: boolean; remainingAttempts: number; resetAt?: Date } {
  const now = Date.now();
  const entry = loginAttempts.get(email);

  // If no entry or window has expired, reset
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(email, { attempts: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS - 1 };
  }

  // Increment attempts
  entry.attempts++;

  if (entry.attempts > MAX_ATTEMPTS) {
    return { 
      allowed: false, 
      remainingAttempts: 0,
      resetAt: new Date(entry.resetAt)
    };
  }

  return { allowed: true, remainingAttempts: MAX_ATTEMPTS - entry.attempts };
}

export function resetRateLimit(email: string) {
  loginAttempts.delete(email);
}

export function getRateLimitStatus(email: string): { locked: boolean; resetAt?: Date } {
  const entry = loginAttempts.get(email);
  if (!entry) {
    return { locked: false };
  }
  if (Date.now() > entry.resetAt) {
    loginAttempts.delete(email);
    return { locked: false };
  }
  return { locked: entry.attempts > MAX_ATTEMPTS, resetAt: new Date(entry.resetAt) };
}
