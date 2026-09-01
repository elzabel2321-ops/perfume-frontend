import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = Boolean(req.auth);
  const role = req.auth?.user?.role;
  const isAdmin = role === "admin" || role === "admnin";

  if (pathname.startsWith("/admnin") && (!isLoggedIn || !isAdmin)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (
    (pathname.startsWith("/orders") ||
      pathname.startsWith("/checkout") ||
      pathname.startsWith("/payment") ||
      pathname.startsWith("/profile")) &&
    !isLoggedIn
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admnin/:path*",
    "/orders/:path*",
    "/checkout",
    "/payment/:path*",
    "/profile",
  ],
};
