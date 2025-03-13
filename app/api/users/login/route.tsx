import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../utils/dbconnect";
import User from "../../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log("Login request body:", body);

    // Ensure JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    // Validate email and password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check password
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    // Generate token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    console.log("Generated Token:", token);

    // Create response
    const response = NextResponse.json(
      { message: "Login successful", token, user: tokenData },
      { status: 200 }
    );

    // Set secure cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "strict",
      path: "/", // Ensure the cookie is available globally
      maxAge: 24 * 60 * 60, // 1 day expiration
    });

    response.cookies.set("user_role", user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { error: "Failed to log in user", details: error.message },
      { status: 500 }
    );
  }
}
