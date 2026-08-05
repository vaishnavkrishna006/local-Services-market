import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = globalThis as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  client = globalWithMongo._mongoClient;
} else {
  client = new MongoClient(uri, options);
}

clientPromise = client.connect();

export async function getDb() {
  const mongoClient = await clientPromise;
  const dbName = process.env.MONGODB_DB_NAME || "local_services_marketplace";
  return mongoClient.db(dbName);
}

export async function withTransaction<T>(fn: (session: any) => Promise<T>): Promise<T> {
  const db = await getDb();
  const session = db.client.startSession();
  
  try {
    return await session.withTransaction(async () => {
      return await fn(session);
    });
  } finally {
    await session.endSession();
  }
}

export async function closeDb() {
  if (client) {
    await client.close();
  }
}

process.on("SIGINT", async () => {
  await closeDb();
  process.exit(0);
});
