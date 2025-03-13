import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function middleware(req: NextRequest) {
  try {
    // Retrieve JWT from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url)); // Redirect if no token
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    console.log("Decoded Token:", decoded);

    // Ensure decoded data contains required fields
    if (!decoded.id || !decoded.role) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Define protected routes for admin-only access
    const adminRoutes = ["/admin", "/api/admin"];

    const isAdminRoute = adminRoutes.some((path) =>
      req.nextUrl.pathname.startsWith(path)
    );

    if (isAdminRoute && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (error: any) {
    console.error("JWT Verification Error:", error.message);
    return NextResponse.redirect(new URL("/unauthorized", req.url)); // Redirect on invalid token
  }
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"], // Protect /admin and /api/admin
};
