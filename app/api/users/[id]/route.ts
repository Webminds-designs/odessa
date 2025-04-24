import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/dbconnect";
import User from "@/app/models/user";

// Connect to the database
connectDB();

// GET user by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await context.params;

    if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User retrieved successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving user:", error);
    return NextResponse.json(
      { error: "Failed to retrieve user" },
      { status: 500 }
    );
  }
}

// UPDATE user
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await context.params;
    const body = await request.json();

    if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // Handle password update
    if (body.oldPassword && body.newPassword) {
      const user = await User.findById(userId).select("+password");
      
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Verify old password
      const isValidPassword = await user.comparePassword(body.oldPassword);
      if (!isValidPassword) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 400 }
        );
      }

      // Update password
      user.password = body.newPassword;
      await user.save();

      return NextResponse.json(
        { message: "Password updated successfully" },
        { status: 200 }
      );
    }

    // Handle regular user update
    if (body.password) {
      delete body.password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: body },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE user
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await context.params;

    if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}