import { NextResponse } from "next/server";
import { getCurrentUser } from "./current-user";

export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    return {
      error: true,
      response: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
      user: null
    };
  }

  return {
    error: false,
    response: null,
    user
  };
}

export async function requireRole(allowedRoles: string[]) {
  const user = await getCurrentUser();
  
  if (!user) {
    return {
      error: true,
      response: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
      user: null
    };
  }

  if (!allowedRoles.includes(user.role)) {
    return {
      error: true,
      response: NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      ),
      user: null
    };
  }

  return {
    error: false,
    response: null,
    user
  };
}
