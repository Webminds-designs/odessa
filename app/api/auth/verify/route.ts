import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    return NextResponse.json({ user: decoded }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
