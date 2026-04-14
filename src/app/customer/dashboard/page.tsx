import Link from "next/link";
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { formatMoney } from "@/lib/utils";

export default async function CustomerDashboard() {
  const user = await getCurrentUser();

  if (!user || user.role !== "CUSTOMER") {
    redirect("/login");
  }

  // Fetch recent bookings for the customer dashboard
  const recentBookings = await db.booking.findMany({
    where: { customerId: user.id },
    include: { listing: true, provider: true },
    orderBy: { createdAt: "desc" },
    take: 3
  });

  return (
    <div className="container section">
      <div style={{ display: "grid", gap: 24 }}>
        <div className="card">
          <h2>Welcome, {user.name}</h2>
          <p className="muted">Manage your bookings, explore local pros, and keep track of your active services.</p>
          <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
            <Link href="/listings" className="button primary">Explore services</Link>
            <Link href="/bookings" className="button outline">View all bookings</Link>
          </div>
        </div>

        <div className="card">
          <h3>Recent Bookings</h3>
          {recentBookings.length === 0 ? (
            <p className="muted" style={{ marginTop: 12 }}>You don't have any bookings yet.</p>
          ) : (
            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
              {recentBookings.map((booking) => (
                <Link
                  key={booking.id}
                  href={`/bookings/${booking.id}`}
                  className="card"
                  style={{ background: "var(--bg-mist)", border: "1px solid var(--border-light)" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h4 style={{ margin: 0 }}>{booking.listing.title}</h4>
                      <p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>
                        with {booking.provider.name}
                      </p>
                    </div>
                    <div>
                      <span className="pill">{booking.status}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
