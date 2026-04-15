import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createOTP, sendOTPEmail } from "@/lib/otp";
import { z } from "zod";

const requestSchema = z.object({
  email: z.string().email()
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = requestSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // Check if user exists
    const user = await db.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Don't reveal if user exists (security best practice)
      return NextResponse.json(
        { message: "If a user with this email exists, an OTP has been sent." },
        { status: 200 }
      );
    }

    // Create OTP
    const { code, expiresAt } = await createOTP(email);

    // Send OTP via email
    await sendOTPEmail(email, code);

    console.log(`✅ OTP created for ${email}: ${code}`);

    return NextResponse.json(
      {
        message: "OTP sent to your email",
        email,
        expiresAt
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP request error:", error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
