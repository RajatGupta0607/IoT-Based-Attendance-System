import { auth } from "@/server/auth";

export default auth((req) => {
  if (!req.auth?.user && req.nextUrl.pathname !== "/signin") {
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  } else if (req.auth?.user && req.nextUrl.pathname === "/signin") {
    const newUrl = new URL("/dashboard", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
