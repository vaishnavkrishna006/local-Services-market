import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { reviewSchema } from "@/lib/validators";
import { requireRole } from "@/lib/access";
import { generateId } from "@/lib/auth";

const REVIEWS_COLLECTION = "reviews";
const BOOKINGS_COLLECTION = "bookings";

export async function POST(request: Request) {
  try {
    const user = await requireRole("CUSTOMER");
    const payload = await request.json();
    const parsed = reviewSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    const dbInstance = await getDb();

    const booking = await dbInstance.collection(BOOKINGS_COLLECTION).findOne({
      _id: parsed.data.bookingId,
      customerId: user._id
    } as any);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    const reviewId = generateId();
    const review = await dbInstance.collection(REVIEWS_COLLECTION).insertOne({
      _id: reviewId,
      bookingId: booking._id.toString(),
      listingId: booking.listingId,
      customerId: user._id,
      rating: parsed.data.rating,
      comment: parsed.data.comment,
      createdAt: new Date().toISOString()
    } as any);

    return NextResponse.json({ review: { ...review, _id: reviewId } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
