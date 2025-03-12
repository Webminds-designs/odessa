import { NextResponse } from "next/server";
import connectDB from "../../../utils/dbconnect";
import User from "../../../models/user";

connectDB();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, confirmPassword } = body;

    // Validate that password and confirmPassword match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords don't match" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = new User({
      email,
      password,
    });

    // Save user to the database
    const savedUser = await newUser.save();

    // Remove password from response
    const user = savedUser.toObject();
    delete user.password;

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
