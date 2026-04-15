import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { verifyOTP } from "@/lib/otp";
import { createSession } from "@/lib/auth";
import { z } from "zod";

const verifySchema = z.object({
  email: z.string().email(),
  code: z.string().length(6)
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = verifySchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email or OTP code" },
        { status: 400 }
      );
    }

    const { email, code } = parsed.data;

    // Verify OTP
    const verification = await verifyOTP(email, code);
    if (!verification.valid) {
      return NextResponse.json(
        { error: verification.message },
        { status: 401 }
      );
    }

    // Get user
    const user = await db.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Create session
    const session = await createSession(user.id);
    (await cookies()).set("session", session.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: session.expiresAt
    });

    return NextResponse.json({
      message: "Successfully logged in via OTP",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { error: "OTP verification failed" },
      { status: 500 }
    );
  }
}
