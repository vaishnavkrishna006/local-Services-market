import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { db } from "@/lib/db";

const SESSION_DAYS = Number(process.env.SESSION_DAYS ?? 14);

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function createSessionToken() {
  return randomBytes(32).toString("hex");
}

export async function createSession(userId: string) {
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  const session = await db.session.create({
    data: {
      token,
      userId,
      expiresAt
    }
  });

  return session;
}

export async function revokeSession(token: string) {
  try {
    await db.session.delete({
      where: { token }
    });
  } catch {
    return;
  }
}
