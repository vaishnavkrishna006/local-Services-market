import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export default async function AdminPage() {
  const user = await getCurrentUser();
  const reports = user
    ? await db.report.findMany({ include: { listing: true, reporter: true }, take: 10 })
    : [];

  return (
    <div className="container section">
      <div className="card">
        <h2>Admin moderation</h2>
        <p className="muted">Review flagged listings and resolve disputes.</p>
        <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
          {reports.map((report) => (
            <div key={report.id} className="card" style={{ background: "#f9fbfd" }}>
              <h3>{report.listing.title}</h3>
              <p className="muted">Reason: {report.reason}</p>
              <p className="muted">Status: {report.status}</p>
            </div>
          ))}
          {reports.length === 0 ? <p className="muted">No open reports.</p> : null}
        </div>
      </div>
    </div>
  );
}
