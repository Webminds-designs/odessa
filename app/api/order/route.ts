// app/api/order/route.ts
import { NextResponse } from "next/server";
import connectDB from "../../utils/dbconnect";
import Order from "../../models/order";

connectDB();

export async function POST(request: Request) {
  try {
    const orderData = await request.json();

    // Validate required fields
    if (!orderData.transactionId || !orderData.total) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Order Data received:", orderData);
    const newOrder = new Order(orderData);
    await newOrder.save();

    return NextResponse.json(
      { message: "Order saved successfully", orderId: newOrder._id },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to save order" },
      { status: 500 }
    );
  }
}
export async function GET(request: Request): Promise<Response> {
  console.log("GET orders API called");
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    // Fetch orders for the user sorted by creation date (latest first)
    const orders = await Order.find({ userid: userId }).sort({ createdAt: -1 });
    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Error fetching orders" },
      { status: 500 }
    );
  }
}
