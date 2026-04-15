import ListingCard from "@/components/ListingCard";
import Section from "@/components/Section";
import Badge from "@/components/Badge";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import EnhancedFooter from "@/components/EnhancedFooter";
import ServicesSection from "@/components/ServicesSection";
import CitiesSection from "@/components/CitiesSection";

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
  },
  {
    id: "demo-4",
    title: "Professional Hair Styling",
    category: "Wellness",
    location: "Pune, MH",
    durationMinutes: 90,
    priceCents: 29999,
    currency: "inr",
    providerName: "Salon Bliss",
    rating: 4.9,
    reviewCount: 203
  },
  {
    id: "demo-5",
    title: "Yoga & Fitness Training",
    category: "Wellness",
    location: "Bangalore, KA",
    durationMinutes: 60,
    priceCents: 24999,
    currency: "inr",
    providerName: "FitLife Academy",
    rating: 4.8,
    reviewCount: 145
  },
  {
    id: "demo-6",
    title: "Web Development & Design",
    category: "Tech",
    location: "Hyderabad, TG",
    durationMinutes: 240,
    priceCents: 150000,
    currency: "inr",
    providerName: "CodeCraft Studio",
    rating: 4.9,
    reviewCount: 89
  },
  {
    id: "demo-7",
    title: "Event Planning & Coordination",
    category: "Events",
    location: "Chennai, TN",
    durationMinutes: 480,
    priceCents: 200000,
    currency: "inr",
    providerName: "Elite Events Co.",
    rating: 4.7,
    reviewCount: 67
  },
  {
    id: "demo-8",
    title: "AC Installation & Repair",
    category: "Home Care",
    location: "Kolkata, WB",
    durationMinutes: 120,
    priceCents: 59999,
    currency: "inr",
    providerName: "Cool Comfort Services",
    rating: 4.6,
    reviewCount: 98
  },
  {
    id: "demo-9",
    title: "Photography & Videography",
    category: "Events",
    location: "Mumbai, MH",
    durationMinutes: 300,
    priceCents: 120000,
    currency: "inr",
    providerName: "Capture Moments",
    rating: 4.9,
    reviewCount: 124
  },
  {
    id: "demo-10",
    title: "Car Wash & Maintenance",
    category: "Auto",
    location: "Ahmedabad, GJ",
    durationMinutes: 60,
    priceCents: 15999,
    currency: "inr",
    providerName: "Quick Shine Auto",
    rating: 4.8,
    reviewCount: 178
  },
  {
    id: "demo-11",
    title: "Cooking Classes - Indian Cuisine",
    category: "Education",
    location: "Delhi, DL",
    durationMinutes: 120,
    priceCents: 34999,
    currency: "inr",
    providerName: "Flavor Academy",
    rating: 4.9,
    reviewCount: 156
  },
  {
    id: "demo-12",
    title: "Electrical & Plumbing Repairs",
    category: "Home Care",
    location: "Jaipur, RJ",
    durationMinutes: 60,
    priceCents: 19999,
    currency: "inr",
    providerName: "Pro Fix Services",
    rating: 4.7,
    reviewCount: 201
  }
];

const categories = ["Home Care", "Wellness", "Education", "Events", "Auto", "Tech"];
const cities = ["Mumbai, MH", "Bangalore, KA", "Delhi, DL", "Pune, MH", "Hyderabad, TG", "Chennai, TN", "Kolkata, WB", "Ahmedabad, GJ", "Jaipur, RJ"];

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      
      <ServicesSection />

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

      <CitiesSection />
      <TestimonialsSection />
      <CTASection />
      <EnhancedFooter />
    </div>
  );
}
