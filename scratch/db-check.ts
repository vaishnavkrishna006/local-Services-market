import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function check() {
  try {
    await prisma.$connect();
    console.log("DATABASE_CONNECTED");
    const userCount = await prisma.user.count();
    console.log("USER_COUNT:", userCount);
  } catch (err) {
    console.error("DATABASE_CONNECTION_ERROR:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
