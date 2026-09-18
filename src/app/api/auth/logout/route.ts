import { NextResponse } from "next/server";
import { attachClearSessionCookie } from "@/lib/auth";

export async function POST() {
  return attachClearSessionCookie(NextResponse.json({ ok: true }));
}
