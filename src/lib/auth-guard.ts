import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export async function requireAuth() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    throw new Error("Unauthorized: No session token");
  }

  try {
    const session = await db.session.findUnique({
      where: { token: sessionToken },
      include: { user: true }
    });

    if (!session) {
      throw new Error("Unauthorized: Invalid session token");
    }

    if (session.expiresAt < new Date()) {
      await db.session.delete({ where: { token: sessionToken } });
      throw new Error("Unauthorized: Session expired");
    }

    return session.user;
  } catch (error) {
    throw new Error("Unauthorized: Session verification failed");
  }
}

export async function requireRole(allowedRoles: Role[]) {
  const user = await requireAuth();

  if (!allowedRoles.includes(user.role)) {
    throw new Error(`Forbidden: Required role not found. Allowed: ${allowedRoles.join(", ")}`);
  }

  return user;
}

export async function getOptionalUser() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (!sessionToken) {
      return null;
    }

    const session = await db.session.findUnique({
      where: { token: sessionToken },
      include: { user: true }
    });

    if (!session || session.expiresAt < new Date()) {
      return null;
    }

    return session.user;
  } catch {
    return null;
  }
}

export async function validateSession(token: string) {
  try {
    const session = await db.session.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!session) {
      return { valid: false, reason: "Session not found" };
    }

    if (session.expiresAt < new Date()) {
      return { valid: false, reason: "Session expired" };
    }

    return { valid: true, user: session.user };
  } catch {
    return { valid: false, reason: "Session validation failed" };
  }
}
