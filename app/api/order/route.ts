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
