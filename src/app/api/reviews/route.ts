import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reviewSchema } from "@/lib/validators";
import { requireRole } from "@/lib/access";

export async function POST(request: Request) {
  try {
    const user = await requireRole("CUSTOMER");
    const payload = await request.json();
    const parsed = reviewSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    const booking = await db.booking.findUnique({
      where: { id: parsed.data.bookingId },
      include: { listing: true }
    });

    if (!booking || booking.customerId !== user.id) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    const review = await db.review.create({
      data: {
        bookingId: booking.id,
        listingId: booking.listingId,
        customerId: user.id,
        rating: parsed.data.rating,
        comment: parsed.data.comment
      }
    });

    return NextResponse.json({ review });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
