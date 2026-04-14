import { PrismaClient, ListingStatus } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hashPassword("Password123!");

  // 1. Create a Local Pro User (Provider)
  const provider = await prisma.user.upsert({
    where: { email: "rahul.pro@localpulse.in" },
    update: {},
    create: {
      name: "Rahul Sharma",
      email: "rahul.pro@localpulse.in",
      passwordHash,
      role: "PROVIDER",
      providerProfile: {
        create: {
          displayName: "Rahul Pro Services",
          companyName: "Sharma Home Care",
          bio: "Expert plumber and home maintenance specialist with 10+ years experience in Mumbai.",
          location: "Andheri, Mumbai",
          serviceArea: "Mumbai West",
          yearsExperience: 10
        }
      }
    }
  });

  // 2. Create some Service Listings for India
  const listings = [
    {
      title: "Deep Home Cleaning Mumbai",
      description: "Professional multi-room cleaning service using premium disinfectants.",
      category: "Home Care",
      location: "Andheri, Mumbai",
      serviceArea: "Mumbai West",
      durationMinutes: 240,
      highlights: ["Vetted Staff", "Premium Disinfectants", "6-Month Guarantee"],
      requirements: ["Electricity access", "Water supply"],
      priceCents: 150000, // ₹1,500
      currency: "inr",
      status: ListingStatus.ACTIVE
    },
    {
      title: "AC Servicing (Split/Window)",
      description: "Complete filter cleaning, gas check, and performance test for your AC.",
      category: "Home Care",
      location: "Powai, Mumbai",
      serviceArea: "Mumbai Central",
      durationMinutes: 90,
      highlights: ["Experienced Technicians", "Quick Turnaround", "Filter replacement"],
      requirements: ["Indoor unit accessibility"],
      priceCents: 59900, // ₹599
      currency: "inr",
      status: ListingStatus.ACTIVE
    },
    {
      title: "Personal Yoga Sessions Bangalore",
      description: "One-on-one yoga and meditation sessions tailored to your fitness goals.",
      category: "Health & Wellness",
      location: "Koramangala, Bangalore",
      serviceArea: "South Bangalore",
      durationMinutes: 60,
      highlights: ["Flexible timing", "Beginner friendly", "Pranayama included"],
      requirements: ["Yoga mat"],
      priceCents: 80000, // ₹800
      currency: "inr",
      status: ListingStatus.ACTIVE
    }
  ];

  for (const listData of listings) {
    await prisma.serviceListing.create({
      data: {
        ...listData,
        providerId: provider.id
      }
    });
  }

  console.log("Database seeded successfully with Indian Local Pros! 🚀");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
