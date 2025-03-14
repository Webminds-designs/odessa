import { NextResponse } from "next/server";
import dbConnect from "../../../utils/dbconnect"; // Adjust path as needed
import Order from "../../../models/order"; // Adjust path as needed

export async function GET(
  request: Request,
  context: { params: { id: string } } | Promise<{ params: { id: string } }>
): Promise<Response> {
  const { params } = await context;
  const { id } = params;
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
