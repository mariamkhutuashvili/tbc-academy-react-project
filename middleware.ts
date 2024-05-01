import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";
import { AUTH_COOKIE_KEY } from "./constants";

export default async function middleware(request: NextRequest) {
  const cookieStore = request.cookies;
  const cookie = cookieStore.get(AUTH_COOKIE_KEY);

  console.log("cookie:", cookie);

  const { pathname } = request.nextUrl;

  if (!cookie && !pathname.startsWith(`/login`)) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  if (cookie && pathname.startsWith(`/login`)) {
    return NextResponse.redirect(new URL(`/`, request.url));
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
