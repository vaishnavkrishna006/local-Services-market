import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function getCurrentUser() {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  const session = await db.session.findUnique({
    where: { token },
    include: { user: true }
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) return null;

  return session.user;
}
