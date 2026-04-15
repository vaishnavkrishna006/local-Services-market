import ListingCard from "@/components/ListingCard";
import Section from "@/components/Section";
import Badge from "@/components/Badge";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import EnhancedFooter from "@/components/EnhancedFooter";

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
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      
      <div className="container py-5">
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
      </div>

      <TestimonialsSection />
      <CTASection />
      <EnhancedFooter />
    </div>
  );
}
