import { NextResponse } from "next/server";

const SESSION_COOKIE = "internal_team_session";

export async function POST(request: Request) {
  const password = process.env.INTERNAL_TEAM_PASSWORD;
  const sessionSecret = process.env.INTERNAL_SESSION_SECRET;

  if (!password || !sessionSecret) {
    return NextResponse.json({ error: "Team login is not configured." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const submitted =
    typeof body === "object" && body !== null && "password" in body
      ? String((body as { password?: unknown }).password ?? "")
      : "";

  if (submitted !== password) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, sessionSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
