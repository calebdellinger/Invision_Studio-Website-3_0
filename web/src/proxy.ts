import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "internal_team_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/internal")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/internal/login")) {
    return NextResponse.next();
  }

  const secret = process.env.INTERNAL_SESSION_SECRET;
  if (!secret || !process.env.INTERNAL_TEAM_PASSWORD) {
    return new NextResponse("Team area is not configured.", { status: 503 });
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token !== secret) {
    const url = request.nextUrl.clone();
    url.pathname = "/internal/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/internal/:path*"],
};
