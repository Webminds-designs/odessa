import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../utils/dbconnect";
import User from "../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();


    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }


    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const tokenData = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };


    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {

      expiresIn: "24h",
    });

    // Create response
    const response = NextResponse.json(
      { message: "Login successful",token: token, user: tokenData },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // ← Change from 'strict' to 'lax'
      path: "/",
      maxAge: 24 * 60 * 60,

    });
    console.log("Set-Cookie header:", response.headers.get("Set-Cookie"));
    return response;

  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { error: "Failed to log in user" },
      { status: 500 }
    );
  }
}