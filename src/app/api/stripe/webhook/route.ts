import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = headers().get("stripe-signature");
  const body = await request.text();
  const secret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

  if (!signature || !secret) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as { id: string; metadata?: { bookingId?: string } };
      const bookingId = session.metadata?.bookingId;
      if (bookingId) {
        await db.payment.updateMany({
          where: { bookingId },
          data: { status: "PAID", stripeCheckoutSessionId: session.id }
        });
        await db.booking.update({
          where: { id: bookingId },
          data: { status: "ACCEPTED" }
        });
      }
      break;
    }
    case "payment_intent.payment_failed": {
      const intent = event.data.object as { id: string; metadata?: { bookingId?: string } };
      const bookingId = intent.metadata?.bookingId;
      if (bookingId) {
        await db.payment.updateMany({
          where: { bookingId },
          data: { status: "FAILED", stripePaymentIntentId: intent.id }
        });
      }
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
