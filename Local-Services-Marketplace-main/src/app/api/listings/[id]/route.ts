import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { listingSchema } from "@/lib/validators";
import { requireRole } from "@/lib/access";

const LISTINGS_COLLECTION = "service_listings";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const dbInstance = await getDb();

  const listing = await dbInstance.collection(LISTINGS_COLLECTION).findOne({
    _id: id
  } as any);

  if (!listing) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  // Add avgRating and reviewCount
  const avgRating = calculateAverageRating(listing.reviews || []);
  const reviewCount = (listing.reviews || []).length;

  const enrichedListing = {
    ...listing,
    avgRating,
    reviewCount
  };

  return NextResponse.json({ listing: enrichedListing });
}

function calculateAverageRating(reviews: any[]): number | null {
  if (!reviews || reviews.length === 0) {
    return null;
  }
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Number((total / reviews.length).toFixed(1));
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const user = await requireRole("LOCAL_PRO");
    const payload = await request.json();
    const highlights =
      typeof payload.highlights === "string"
        ? payload.highlights
            .split(/[\n,]/)
            .map((item: string) => item.trim())
            .filter(Boolean)
        : payload.highlights;
    const requirements =
      typeof payload.requirements === "string"
        ? payload.requirements
            .split(/[\n,]/)
            .map((item: string) => item.trim())
            .filter(Boolean)
        : payload.requirements;

    const parsed = listingSchema
      .partial()
      .safeParse({ ...payload, highlights, requirements });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    const dbInstance = await getDb();
    const listing = await dbInstance.collection(LISTINGS_COLLECTION).findOne({ _id: id } as any);

    if (!listing || listing.localProId !== user._id) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const updated = await dbInstance.collection(LISTINGS_COLLECTION).findOneAndUpdate(
      { _id: id } as any,
      { $set: parsed.data },
      { returnDocument: "after" }
    );

    if (!updated) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    return NextResponse.json({ listing: updated });
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

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const user = await requireRole("LOCAL_PRO");

    const dbInstance = await getDb();
    const listing = await dbInstance.collection(LISTINGS_COLLECTION).findOne({ _id: id } as any);

    if (!listing || listing.localProId !== user._id) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    await dbInstance.collection(LISTINGS_COLLECTION).updateOne(
      { _id: id } as any,
      { $set: { status: "PAUSED" } }
    );

    return NextResponse.json({ ok: true });
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
