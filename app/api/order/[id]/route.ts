import { NextResponse } from "next/server";
import dbConnect from "../../../utils/dbconnect"; // adjust the path as needed
import Order from "../../../models/order"; // adjust the path as needed

export async function GET(request: Request): Promise<Response> {
  console.log("get orders");
  // Parse the query parameters from the URL.
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    // Connect to the database.
    await dbConnect();

    // Fetch all orders for the provided userId.
    // (Assuming your order model stores the user id in a field named "userid")
    const orders = await Order.find({ userid: userId }).sort({ orderDate: -1 });

    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Error fetching orders" },
      { status: 500 }
    );
  }
}
