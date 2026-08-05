import Link from "next/link";
import { formatMoney } from "@/lib/utils";
import type { ListingCard as ListingCardType } from "@/types";

export default function ListingCard({
  id,
  title,
  category,
  location,
  durationMinutes,
  priceCents,
  currency,
  providerName,
  rating,
  reviewCount
}: ListingCardType) {
  return (
    <Link href={`/listings/${id}`} className="card listing-card">
      <div className="listing-card-top">
        <div>
          <p className="eyebrow">{category}</p>
          <h3>{title}</h3>
        </div>
        <span className="price">{formatMoney(priceCents, currency)}</span>
      </div>
      <p className="muted">{location}</p>
      <div className="listing-card-meta">
        <span className="pill">{providerName}</span>
        <span className="muted">
          {durationMinutes ? `${durationMinutes} min` : "Flexible"}
        </span>
        <span className="muted">
          {rating ? `${rating.toFixed(1)} (${reviewCount ?? 0})` : "New"}
        </span>
      </div>
    </Link>
  );
}
