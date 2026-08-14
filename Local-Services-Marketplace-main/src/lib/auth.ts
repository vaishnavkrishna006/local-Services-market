import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

const SESSION_DAYS = Number(process.env.SESSION_DAYS ?? 14);
const SESSIONS_COLLECTION = "sessions";

type UserId = string | ObjectId;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/\d/.test(password)) {
    return 'Password must contain at least one number';
  }
  return null;
}

export function createSessionToken() {
  return randomBytes(32).toString("hex");
}

export function generateId() {
  return randomBytes(12).toString("hex");
}

export function normalizeUserId(userId: UserId) {
  return typeof userId === "string" ? userId : userId.toString();
}

export async function createSession(userId: UserId) {
  const normalizedUserId = normalizeUserId(userId);
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const dbInstance = await getDb();

  const result = await dbInstance.collection(SESSIONS_COLLECTION).insertOne({
    token,
    userId: normalizedUserId,
    expiresAt
  });

  return {
    _id: result.insertedId.toString(),
    token,
    userId: normalizedUserId,
    expiresAt
  };
}

export async function revokeSession(token: string) {
  try {
    const dbInstance = await getDb();
    await dbInstance.collection(SESSIONS_COLLECTION).deleteOne({ token });
  } catch {
    return;
  }
}
