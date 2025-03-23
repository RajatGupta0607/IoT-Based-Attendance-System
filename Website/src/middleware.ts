import { auth } from "@/server/auth";

export default auth((req) => {
  if (!req.auth?.user && req.nextUrl.pathname !== "/api/auth/signin") {
    const newUrl = new URL("/api/auth/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  } else if (req.auth?.user && req.nextUrl.pathname === "/api/auth/signin") {
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
