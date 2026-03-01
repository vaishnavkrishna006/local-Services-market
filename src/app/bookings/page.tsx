import Link from "next/link";
import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { formatMoney } from "@/lib/utils";

export default async function BookingsPage() {
  const user = await getCurrentUser();

  const bookings = user
    ? await db.booking.findMany({
        where: { customerId: user.id },
        include: { listing: true, payment: true },
        orderBy: { createdAt: "desc" }
      })
    : [];

  return (
    <div className="container section">
      <div className="card">
        <h2>Your bookings</h2>
        <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
          {bookings.map((booking) => (
            <Link
              key={booking.id}
              href={`/bookings/${booking.id}`}
              className="card"
              style={{ background: "#f9fbfd" }}
            >
              <h3>{booking.listing.title}</h3>
              <p className="muted">Status: {booking.status}</p>
              <p className="muted">Payment: {booking.payment?.status ?? "Not started"}</p>
              <p className="muted">
                Total: {formatMoney(booking.totalCents + booking.tipCents, booking.listing.currency)}
              </p>
            </Link>
          ))}
          {bookings.length === 0 ? <p className="muted">No bookings yet.</p> : null}
        </div>
      </div>
    </div>
  );
}
