import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../utils/dbconnect"; // Adjust path as needed
import Order from "../../../models/order"; // Adjust path as needed

type tParams = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: tParams }
) {
  const { id } : { id: string } = await params;
  try {
    await dbConnect();
    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(order, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching order details:", error);
    return NextResponse.json(
      { error: "Error fetching order details" },
      { status: 500 }
    );
  }
}
