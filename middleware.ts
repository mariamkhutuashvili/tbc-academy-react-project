import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";
import { createI18nMiddleware } from "next-international/middleware";

export default async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const cookieStore = request.cookies;
  const appSessionCookie = cookieStore.get("appSession");
  const { pathname } = request.nextUrl;
  if (
    !appSessionCookie &&
    (pathname.startsWith("/profile") || pathname.startsWith("/cart"))
  ) {
    return NextResponse.redirect(new URL("/api/auth/login", request.url));
  }

  const session = await getSession(request, res);
  const isAdmin =
    Array.isArray(session?.user?.role) && session?.user.role.includes("Admin");
  if (!isAdmin && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/api/auth/login", request.url));
  }

  const I18nMiddleware = createI18nMiddleware({
    locales: ["en", "ka"],
    defaultLocale: "en",
    urlMappingStrategy: "rewrite",
  });

  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|static|.*\\..*|favicon.ico|robots.txt).*)"],
};
