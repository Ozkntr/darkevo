import { NextResponse } from "next/server";
import { isValidEmail, isValidPassword, isValidUsername, normalizeEmail, normalizeUsername, usernameKey } from "@/lib/account";
import { attachSessionCookie, createSessionToken, toPublicUser } from "@/lib/auth";
import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  let body: { username?: string; email?: string; password?: string };
  try {
    body = (await request.json()) as { username?: string; email?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const username = normalizeUsername(body.username ?? "");
  const email = normalizeEmail(body.email ?? "");
  const password = body.password ?? "";

  if (!isValidUsername(username)) {
    return NextResponse.json({ error: "usernameInvalid" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "emailInvalid" }, { status: 400 });
  }
  if (!isValidPassword(password)) {
    return NextResponse.json({ error: "passwordInvalid" }, { status: 400 });
  }

  const usernameLower = usernameKey(username);
  const existing = await prisma.user.findFirst({
    where: { OR: [{ usernameLower }, { emailLower: email }] },
    select: { usernameLower: true, emailLower: true },
  });
  if (existing?.usernameLower === usernameLower) {
    return NextResponse.json({ error: "usernameTaken" }, { status: 409 });
  }
  if (existing?.emailLower === email) {
    return NextResponse.json({ error: "emailTaken" }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      username,
      usernameLower,
      email,
      emailLower: email,
      passwordHash: await hashPassword(password),
    },
    select: { id: true, username: true, email: true },
  });

  const response = NextResponse.json({ user: toPublicUser(user) });
  return attachSessionCookie(response, await createSessionToken(user.id));
}
