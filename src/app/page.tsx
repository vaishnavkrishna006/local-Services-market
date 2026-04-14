import ListingCard from "@/components/ListingCard";
import Section from "@/components/Section";
import Badge from "@/components/Badge";

const sampleListings = [
  {
    id: "demo-1",
    title: "Premium Home Cleaning",
    category: "Home Care",
    location: "Mumbai, MH",
    durationMinutes: 180,
    priceCents: 49999,
    currency: "inr",
    providerName: "Sparkle Co.",
    rating: 4.9,
    reviewCount: 118
  },
  {
    id: "demo-2",
    title: "Private Math Tutoring",
    category: "Education",
    location: "Bangalore, KA",
    durationMinutes: 60,
    priceCents: 39999,
    currency: "inr",
    providerName: "Elevate Tutors",
    rating: 4.8,
    reviewCount: 76
  },
  {
    id: "demo-3",
    title: "Mobile Auto Detailing",
    category: "Auto",
    location: "Delhi, DL",
    durationMinutes: 120,
    priceCents: 75000,
    currency: "inr",
    providerName: "SeaBreeze Auto",
    rating: 4.7,
    reviewCount: 52
  }
];

const categories = ["Home Care", "Wellness", "Education", "Events", "Auto", "Tech"];

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Trusted local pros</p>
            <h1>Book verified services in minutes, not days.</h1>
            <p className="muted">
              LocalPulse connects customers with vetted providers. Pay securely, track your
              booking, and leave verified reviews.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
              <a className="button primary" href="/listings">Explore services</a>
              <a className="button ghost" href="/providers/dashboard">Become a provider</a>
            </div>
            <div className="category-row">
              {categories.map((category) => (
                <span key={category} className="pill">
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div className="hero-card">
            <h3>Live marketplace stats</h3>
            <div style={{ display: "grid", gap: "12px", marginTop: "16px" }}>
              <div>
                <Badge tone="mint">98% on-time</Badge>
                <p className="muted">Bookings completed successfully.</p>
              </div>
              <div>
                <Badge tone="sun">24 hours</Badge>
                <p className="muted">Average provider response time.</p>
              </div>
              <div>
                <Badge tone="clay">4.8/5</Badge>
                <p className="muted">Verified customer ratings.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <Section
          eyebrow="Popular now"
          title="Explore high-demand services"
          subtitle="These are trending in your area based on booking velocity."
        >
          <div className="listing-grid">
            {sampleListings.map((listing) => (
              <ListingCard key={listing.id} {...listing} />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="How it works"
          title="From discovery to payout, in one flow"
          subtitle="Built for trust, speed, and accountability."
        >
          <div className="listing-grid">
            {[
              "Discover vetted providers",
              "Book and pay in one step",
              "Track delivery and leave verified reviews"
            ].map((item) => (
              <div key={item} className="card">
                <h3>{item}</h3>
                <p className="muted">Designed to keep customers and providers protected.</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
