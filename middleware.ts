import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function middleware(req: NextRequest) {
  try {
    // Extract JWT from the Authorization header
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { message: "Access denied. No token provided." },
        { status: 401 }
      );
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    console.log("Decoded Token:", decoded);

    // Store user data in request headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.id);
    requestHeaders.set("x-user-role", decoded.role);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (error: any) {
    console.error("JWT Verification Error:", error.message);
    return NextResponse.json(
      { message: "Invalid or expired token." },
      { status: 401 }
    );
  }
}

// Apply middleware to secured routes
export const config = {
  matcher: ["/api/users/"], // Middleware will run for these paths
};