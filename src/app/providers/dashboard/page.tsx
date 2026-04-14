import Link from "next/link";
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

export default async function ProviderDashboard() {
  const user = await getCurrentUser();

  if (!user || user.role !== "PROVIDER") {
    redirect("/login");
  }

  return (
    <div className="container section">
      <div className="card" style={{ display: "grid", gap: 16 }}>
        <h2>Local Pro dashboard</h2>
        <p className="muted">
          {user
            ? `Welcome back, ${user.name}. Manage your listings and payouts.`
            : "Log in to manage your listings and payouts."}
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/providers/listings/new" className="button primary">
            Create new listing
          </Link>
          <Link href="/providers/bookings" className="button outline">
            View bookings
          </Link>
          <form action="/api/stripe/connect" method="POST">
            <button className="button ghost" type="submit">
              Connect Stripe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
