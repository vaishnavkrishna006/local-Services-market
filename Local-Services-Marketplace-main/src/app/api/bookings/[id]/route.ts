import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireRole } from "@/lib/access";

const BOOKINGS_COLLECTION = "bookings";
const LISTINGS_COLLECTION = "service_listings";
const PAYMENTS_COLLECTION = "payments";
const USERS_COLLECTION = "users";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const dbInstance = await getDb();

  const booking = await dbInstance.collection(BOOKINGS_COLLECTION).findOne({
    filter: { _id: id }
  });

  if (!booking) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  // Enrich booking with related data
  const [listing, payment, customer, localPro] = await Promise.all([
    dbInstance.collection(LISTINGS_COLLECTION).findOne({ _id: booking.listingId }),
    dbInstance.collection(PAYMENTS_COLLECTION).findOne({ _id: booking.id }),
    dbInstance.collection(USERS_COLLECTION).findOne({ _id: booking.customerId }),
    dbInstance.collection(USERS_COLLECTION).findOne({ _id: booking.localProId })
  ]);

  const enrichedBooking = {
    ...booking,
    id: booking._id.toString(),
    listing,
    payment,
    customer,
    localPro
  };

  return NextResponse.json({ booking: enrichedBooking });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const user = await requireRole(["LOCAL_PRO", "ADMIN"]);
    const payload = await request.json();
    const status = payload.status;

    if (!status) {
      return NextResponse.json({ error: "Missing status." }, { status: 400 });
    }

    const dbInstance = await getDb();
    const booking = await dbInstance.collection(BOOKINGS_COLLECTION).findOne({ _id: id });

    if (!booking) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    if (user.role === "LOCAL_PRO" && booking.localProId !== user._id) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const updated = await dbInstance.collection(BOOKINGS_COLLECTION).findOneAndUpdate(
      { _id: id },
      { $set: { status } },
      { returnDocument: "after" }
    );

    if (!updated) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    return NextResponse.json({ booking: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
