// app/api/order/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../utils/dbconnect";
import Order from "../../models/order";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const orderData = await req.json(); // Parse the JSON body
    const newOrder = new Order(orderData);
    await newOrder.save();
    return NextResponse.json(
      { message: "Order saved successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error saving order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
