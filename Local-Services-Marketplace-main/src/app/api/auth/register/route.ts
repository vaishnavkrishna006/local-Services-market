import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb } from "@/lib/db";
import { createSession, hashPassword, generateId, validatePassword } from "@/lib/auth";
import { registerSchema } from "@/lib/validators";

const USERS_COLLECTION = "users";
const LOCAL_PRO_PROFILES_COLLECTION = "local_pro_profiles";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = registerSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    const { name, email, password, role } = parsed.data;
    
    try {
      const dbInstance = await getDb();
      const existing = await dbInstance.collection(USERS_COLLECTION).findOne({ email });
      if (existing) {
        return NextResponse.json({ error: "Email already registered." }, { status: 409 });
      }

      const passwordError = validatePassword(password);
      if (passwordError) {
        return NextResponse.json({ error: passwordError }, { status: 400 });
      }

      const userId = generateId();
      const userData = {
        _id: userId,
        name,
        email,
        passwordHash: await hashPassword(password),
        role: 'CUSTOMER'
      };

      await dbInstance.collection(USERS_COLLECTION).insertOne(userData as any);

      if (role === 'LOCAL_PRO') {
        await dbInstance.collection(LOCAL_PRO_PROFILES_COLLECTION).insertOne({
          userId: userId,
          displayName: name
        });
      }

      const session = await createSession(userId);
      (await cookies()).set("session", session.token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: session.expiresAt
      });

      return NextResponse.json({ id: userId, role: 'CUSTOMER' });
    } catch (dbError) {
      console.error("Database error during registration:", dbError);
      return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
