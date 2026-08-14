const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB || "local_services_marketplace";

async function createTestUser() {
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);

    const hashedPassword = await bcrypt.hash("password123", 10);

    const result = await db.collection("users").updateOne(
      { email: "test@example.com" },
      { $setOnInsert: { name: "Test User", email: "test@example.com", passwordHash: hashedPassword, role: "CUSTOMER", createdAt: new Date() } },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      console.log("Test user created successfully:");
      console.log("Email: test@example.com");
      console.log("Password: password123");
      console.log("User ID:", result.upsertedId);
    } else {
      console.log("User already exists with that email: test@example.com");
    }
  } catch (error) {
    console.error("Error creating test user:", error.message);
  } finally {
    if (client) await client.close();
  }
}

createTestUser();