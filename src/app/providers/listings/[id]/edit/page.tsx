import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await db.serviceListing.findUnique({ where: { id } });
  if (!listing) return notFound();

  return (
    <div className="container section">
      <div className="card">
        <h2>Edit listing</h2>
        <p className="muted">Editing is handled in the provider dashboard UI.</p>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(listing, null, 2)}</pre>
      </div>
    </div>
  );
}
