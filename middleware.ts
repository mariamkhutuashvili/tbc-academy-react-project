import { cookies } from "next/headers";
import { AUTH_COOKIE_KEY } from "./constants";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const cookie = cookieStore.get(AUTH_COOKIE_KEY);

  console.log("cookie:", cookie);

  const { pathname } = request.nextUrl;

  if (!cookie?.value && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (cookie?.value && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return null;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
