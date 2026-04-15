const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const db = new PrismaClient();

async function createTestUser() {
  try {
    const hashedPassword = await bcrypt.hash("password123", 10);
    
    const user = await db.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        passwordHash: hashedPassword,
        role: "CUSTOMER",
      },
    });
    
    console.log("✅ Test user created successfully:");
    console.log("Email: test@example.com");
    console.log("Password: password123");
    console.log("User ID:", user.id);
  } catch (error) {
    if (error.code === "P2002") {
      console.log("⚠️  User already exists with that email");
    } else {
      console.error("Error creating test user:", error.message);
    }
  } finally {
    await db.$disconnect();
  }
}

createTestUser();
