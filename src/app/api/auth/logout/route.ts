import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revokeSession } from "@/lib/auth";

export async function POST() {
  const token = cookies().get("session")?.value;
  if (token) {
    await revokeSession(token);
  }

  cookies().set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0)
  });

  return NextResponse.json({ ok: true });
}
