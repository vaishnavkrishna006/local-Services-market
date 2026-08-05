import { cookies } from "next/headers";
import { getDb } from "@/lib/db";
import { Role } from "@prisma/client";

const SESSIONS_COLLECTION = "sessions";
const USERS_COLLECTION = "users";

export async function requireAuth() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    throw new Error("Unauthorized: No session token");
  }

  try {
    const dbInstance = await getDb();
    const session = await dbInstance.collection(SESSIONS_COLLECTION).findOne({ token: sessionToken });

    if (!session) {
      throw new Error("Unauthorized: Invalid session token");
    }

    if (session.expiresAt < new Date()) {
      await dbInstance.collection(SESSIONS_COLLECTION).deleteOne({ token: sessionToken });
      throw new Error("Unauthorized: Session expired");
    }

    const user = await dbInstance.collection(USERS_COLLECTION).findOne({ _id: session.userId });
    return user;
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

    const dbInstance = await getDb();
    const session = await dbInstance.collection(SESSIONS_COLLECTION).findOne({ token: sessionToken });

    if (!session || session.expiresAt < new Date()) {
      return null;
    }

    const user = await dbInstance.collection(USERS_COLLECTION).findOne({ _id: session.userId });
    return user;
  } catch {
    return null;
  }
}

export async function validateSession(token: string) {
  try {
    const dbInstance = await getDb();
    const session = await dbInstance.collection(SESSIONS_COLLECTION).findOne({ token });

    if (!session) {
      return { valid: false, reason: "Session not found" };
    }

    if (session.expiresAt < new Date()) {
      return { valid: false, reason: "Session expired" };
    }

    const user = await dbInstance.collection(USERS_COLLECTION).findOne({ _id: session.userId });
    return { valid: true, user };
  } catch {
    return { valid: false, reason: "Session validation failed" };
  }
}
