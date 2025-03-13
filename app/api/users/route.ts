import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/dbconnect";
import User from "@/app/models/user";

// Connect to the database
connectDB();

export async function GET(request: NextRequest) {
  try {
    // Read user ID and role from headers (set by middleware)
    // const userId = request.headers.get("x-user-id");
    // const userRole = request.headers.get("x-user-role");

    // if (!userId || !userRole) {
    //   return NextResponse.json(
    //     { message: "Unauthorized. Please log in." },
    //     { status: 401 }
    //   );
    // }

    // // Example: Restrict access to only admin users
    // if (userRole !== "admin") {
    //   return NextResponse.json(
    //     { message: "Access denied. Admins only." },
    //     { status: 403 }
    //   );
    // }

    // Fetch all users
    const users = await User.find({});

    return NextResponse.json(
      { message: "Users retrieved successfully", users },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving users:", error);
    return NextResponse.json(
      { error: "Failed to retrieve users" },
      { status: 500 }
    );
  }
}