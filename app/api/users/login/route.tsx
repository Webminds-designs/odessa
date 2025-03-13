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

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    
    //create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    // Generate token
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
    });

    return response;

  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { error: "Failed to log in user" },
      { status: 500 }
    );
  }
}