import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const TOPICS = new Set(["account", "client", "report", "other"]);

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const tickets = await prisma.supportTicket.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, topic: true, message: true, status: true, createdAt: true },
  });

  return NextResponse.json({ tickets });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: { topic?: string; message?: string };
  try {
    body = (await request.json()) as { topic?: string; message?: string };
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const topic = body.topic ?? "";
  const message = (body.message ?? "").trim();
  if (!TOPICS.has(topic) || message.length < 8 || message.length > 4000) {
    return NextResponse.json({ error: "ticketInvalid" }, { status: 400 });
  }

  const ticket = await prisma.supportTicket.create({
    data: { userId: user.id, topic, message },
    select: { id: true, topic: true, message: true, status: true, createdAt: true },
  });

  return NextResponse.json({ ticket }, { status: 201 });
}
