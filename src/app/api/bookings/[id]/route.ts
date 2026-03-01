import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/access";

export async function GET(_: Request, context: { params: { id: string } }) {
  const booking = await db.booking.findUnique({
    where: { id: context.params.id },
    include: { listing: true, payment: true, customer: true, provider: true }
  });

  if (!booking) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ booking });
}

export async function PATCH(request: Request, context: { params: { id: string } }) {
  try {
    const user = await requireRole(["PROVIDER", "ADMIN"]);
    const payload = await request.json();
    const status = payload.status;

    if (!status) {
      return NextResponse.json({ error: "Missing status." }, { status: 400 });
    }

    const booking = await db.booking.findUnique({ where: { id: context.params.id } });
    if (!booking) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    if (user.role === "PROVIDER" && booking.providerId !== user.id) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const updated = await db.booking.update({
      where: { id: booking.id },
      data: { status }
    });

    return NextResponse.json({ booking: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
