import { NextResponse } from "next/server";
import { isValidPassword, isValidUsername, usernameKey } from "@/lib/account";
import { attachSessionCookie, createSessionToken, toPublicUser } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  let body: { username?: string; password?: string };
  try {
    body = (await request.json()) as { username?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const username = body.username ?? "";
  const password = body.password ?? "";
  if (!isValidUsername(username) || !isValidPassword(password)) {
    return NextResponse.json({ error: "invalidCredentials" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { usernameLower: usernameKey(username) },
    select: { id: true, username: true, email: true, passwordHash: true },
  });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: "invalidCredentials" }, { status: 401 });
  }

  const response = NextResponse.json({
    user: toPublicUser({ id: user.id, username: user.username, email: user.email }),
  });
  return attachSessionCookie(response, await createSessionToken(user.id));
}
