import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { bookingSchema } from "@/lib/validators";
import { requireRole } from "@/lib/access";
import { generateId } from "@/lib/auth";

const BOOKINGS_COLLECTION = "bookings";
const LISTINGS_COLLECTION = "service_listings";
const PAYMENTS_COLLECTION = "payments";
const MESSAGE_THREADS_COLLECTION = "message_threads";

export async function GET() {
  try {
    const user = await requireRole(["CUSTOMER", "LOCAL_PRO", "ADMIN"]);
    const dbInstance = await getDb();

    const bookings = await dbInstance.collection(BOOKINGS_COLLECTION).find({
      $or: [{ customerId: user._id }, { localProId: user._id }]
    }).toArray();

    // Populate listings and payments for each booking
    const enrichedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const [listing, payment] = await Promise.all([
          dbInstance.collection(LISTINGS_COLLECTION).findOne({ _id: booking.listingId }),
          dbInstance.collection(PAYMENTS_COLLECTION).findOne({ _id: booking.id })
        ]);

        return {
          ...booking,
          listing,
          payment,
          id: booking._id.toString()
        };
      })
    );

    return NextResponse.json({ bookings: enrichedBookings });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireRole("CUSTOMER");
    const payload = await request.json();
    const parsed = bookingSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    const dbInstance = await getDb();

    const listing = await dbInstance.collection(LISTINGS_COLLECTION).findOne({
      _id: parsed.data.listingId
    } as any);

    if (!listing || listing.status !== "ACTIVE") {
      return NextResponse.json({ error: "Listing not available." }, { status: 404 });
    }

    const tipCents = parsed.data.tipCents ? Number(parsed.data.tipCents) : 0;

    const bookingId = generateId();
    await dbInstance.collection(BOOKINGS_COLLECTION).insertOne({
      _id: bookingId,
      listingId: listing._id,
      customerId: user._id,
      localProId: (listing as any).localProId,
      startAt: new Date(parsed.data.startAt),
      endAt: new Date(parsed.data.endAt),
      notes: parsed.data.notes,
      totalCents: listing.priceCents,
      tipCents,
      status: "PENDING"
    } as any);

    await dbInstance.collection(PAYMENTS_COLLECTION).insertOne({
      _id: generateId(),
      bookingId,
      amountCents: listing.priceCents + tipCents,
      currency: listing.currency,
      tipCents,
      status: "REQUIRES_PAYMENT"
    } as any);

    await dbInstance.collection(MESSAGE_THREADS_COLLECTION).insertOne({
      _id: generateId(),
      bookingId
    } as any);

    return NextResponse.json({ bookingId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    if (message === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
