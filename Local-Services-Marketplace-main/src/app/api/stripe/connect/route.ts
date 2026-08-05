import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireRole } from "@/lib/access";
import { stripe } from "@/lib/stripe";

const LOCAL_PRO_PROFILES_COLLECTION = "local_pro_profiles";

export const runtime = "nodejs";

export async function POST() {
  try {
    const user = await requireRole("LOCAL_PRO");
    const baseUrl = process.env.APP_BASE_URL ?? "http://localhost:3000";

    const dbInstance = await getDb();
    const profile = await dbInstance.collection(LOCAL_PRO_PROFILES_COLLECTION).findOne({
      filter: { userId: user._id }
    });

    const accountId = profile?.stripeAccountId
      ? profile.stripeAccountId
      : (await stripe.accounts.create({
          type: "express",
          email: user.email
        })).id;

    if (!profile?.stripeAccountId) {
      await dbInstance.collection(LOCAL_PRO_PROFILES_COLLECTION).updateOne(
        { _id: profile._id },
        { $set: { stripeAccountId: accountId } }
      );
    }

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${baseUrl}/providers/dashboard?stripe=refresh`,
      return_url: `${baseUrl}/providers/dashboard?stripe=connected`,
      type: "account_onboarding"
    });

    return NextResponse.redirect(accountLink.url);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    if (message === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }
    return NextResponse.json({ error: "Stripe connection failed." }, { status: 500 });
  }
}
