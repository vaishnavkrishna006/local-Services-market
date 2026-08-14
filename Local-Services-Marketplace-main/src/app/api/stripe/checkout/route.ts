import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { stripe, calculatePlatformFee } from "@/lib/stripe";
import { requireRole } from "@/lib/access";

const BOOKINGS_COLLECTION = "bookings";
const LISTINGS_COLLECTION = "service_listings";
const PAYMENTS_COLLECTION = "payments";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const user = await requireRole("CUSTOMER");
    const { bookingId } = await request.json();

    if (!bookingId) {
      return NextResponse.json({ error: "Missing bookingId." }, { status: 400 });
    }

    const dbInstance = await getDb();
    const booking = await dbInstance.collection(BOOKINGS_COLLECTION).findOne({
      _id: bookingId
    } as any);

    if (!booking || booking.customerId !== user._id) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    const listing = await dbInstance.collection(LISTINGS_COLLECTION).findOne({
      _id: booking.listingId
    } as any);

    if (!listing) {
      return NextResponse.json({ error: "Listing not found." }, { status: 404 });
    }

    const localProProfile = await dbInstance.collection("local_pro_profiles").findOne({
      userId: booking.localProId
    });

    const destination = localProProfile?.stripeAccountId;
    if (!destination) {
      return NextResponse.json({ error: "Local Pro not connected to Stripe." }, { status: 400 });
    }

    const successUrl = process.env.STRIPE_SUCCESS_URL ?? "http://localhost:3000/bookings";
    const cancelUrl = process.env.STRIPE_CANCEL_URL ?? "http://localhost:3000/listings";

    const lineItems = [
      {
        price_data: {
          currency: listing.currency,
          product_data: { name: listing.title },
          unit_amount: listing.priceCents
        },
        quantity: 1
      }
    ];

    if (booking.tipCents > 0) {
      lineItems.push({
        price_data: {
          currency: listing.currency,
          product_data: { name: "Tip" },
          unit_amount: booking.tipCents
        },
        quantity: 1
      });
    }

    const platformFeeCents = calculatePlatformFee(listing.priceCents + booking.tipCents);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      payment_intent_data: {
        application_fee_amount: platformFeeCents,
        transfer_data: { destination },
        metadata: { bookingId: booking._id.toString() }
      },
      metadata: { bookingId: booking._id.toString() }
    });

    const payment = await dbInstance.collection(PAYMENTS_COLLECTION).findOne({
      bookingId: booking._id.toString()
    });

    if (payment) {
      await dbInstance.collection(PAYMENTS_COLLECTION).updateOne(
        { _id: payment._id } as any,
        { 
          $set: {
            stripeCheckoutSessionId: session.id,
            platformFeeCents,
            tipCents: booking.tipCents,
            amountCents: listing.priceCents + booking.tipCents
          }
        }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    if (message === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }
    return NextResponse.json({ error: "Stripe checkout failed." }, { status: 500 });
  }
}
