import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { listingSchema } from "@/lib/validators";
import { requireRole } from "@/lib/access";

const LISTINGS_COLLECTION = "service_listings";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const category = searchParams.get("category");
  const location = searchParams.get("location");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const dbInstance = await getDb();

  // Build filter query
  const filter: any = { status: "ACTIVE" };

  if (category) {
    filter.category = category;
  }

  if (location) {
    filter.location = { $regex: location, $options: "i" };
  }

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } }
    ];
  }

  if (minPrice || maxPrice) {
    filter.priceCents = {};
    if (minPrice) {
      filter.priceCents.$gte = Number(minPrice);
    }
    if (maxPrice) {
      filter.priceCents.$lte = Number(maxPrice);
    }
  }

  const listings = await dbInstance
    .collection(LISTINGS_COLLECTION)
    .find(filter)
    .toArray();

  // Add avgRating and reviewCount to listings
  const listingsWithStats = listings.map((listing) => ({
    ...listing,
    avgRating: calculateAverageRating(listing.reviews || []),
    reviewCount: (listing.reviews || []).length
  }));

  return NextResponse.json({ listings: listingsWithStats });
}

function calculateAverageRating(reviews: any[]): number | null {
  if (!reviews || reviews.length === 0) {
    return null;
  }
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Number((total / reviews.length).toFixed(1));
}

export async function POST(request: Request) {
  try {
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

    const parsed = listingSchema.safeParse({
      ...payload,
      priceCents: Number(payload.priceCents),
      durationMinutes: payload.durationMinutes ? Number(payload.durationMinutes) : undefined,
      highlights,
      requirements
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    const listing = await db.serviceListing.create({
      data: {
        ...parsed.data,
        highlights: parsed.data.highlights ?? [],
        requirements: parsed.data.requirements ?? [],
        localProId: user.id,
        status: "ACTIVE"
      }
    });

    return NextResponse.json({ id: listing.id });
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
