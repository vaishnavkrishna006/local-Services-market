import { cookies } from "next/headers";
import { getDb } from "@/lib/db";

const SESSIONS_COLLECTION = "sessions";
const USERS_COLLECTION = "users";

export async function getCurrentUser() {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  const dbInstance = await getDb();
  const session = await dbInstance.collection(SESSIONS_COLLECTION).findOne({ token });

  if (!session) return null;
  if (session.expiresAt < new Date()) return null;

  const user = await dbInstance.collection(USERS_COLLECTION).findOne({ _id: session.userId });
  return user;
}
