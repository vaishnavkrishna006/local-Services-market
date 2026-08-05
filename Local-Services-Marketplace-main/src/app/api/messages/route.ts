import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { messageSchema } from "@/lib/validators";
import { requireUser } from "@/lib/access";

const MESSAGES_COLLECTION = "messages";

export async function GET(request: Request) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get("threadId");

    if (!threadId) {
      return NextResponse.json({ error: "Missing threadId" }, { status: 400 });
    }

    const dbInstance = await getDb();
    const messages = await dbInstance.collection(MESSAGES_COLLECTION).find({
      filter: { threadId }
    }).toArray();

    const allowed = messages.some((message) => message.senderId === user._id);
    if (!allowed) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Convert to consistent format with MongoDB ObjectIds
    const formattedMessages = messages.map((message) => ({
      ...message,
      id: message._id.toString(),
      senderId: message.senderId,
      createdAt: message.createdAt
    }));

    return NextResponse.json({ messages: formattedMessages });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const payload = await request.json();
    const parsed = messageSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    const dbInstance = await getDb();

    const messageId = generateId();
    const message = await dbInstance.collection(MESSAGES_COLLECTION).insertOne({
      _id: messageId,
      threadId: parsed.data.threadId,
      senderId: user._id,
      body: parsed.data.body,
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({
      message: {
        _id: messageId,
        threadId: parsed.data.threadId,
        senderId: user._id,
        body: parsed.data.body,
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
