import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../utils/dbconnect";
import Order from "../../models/order";
import Cart from "../../models/cart";

connectDB();

// GET: Retrieve all orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    let query = {};
    if (userId) {
      query = { user: userId };
    }

    const orders = await Order.find(query)
      .populate("user", "-password")
    //   .populate("items.product")
      .sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    return NextResponse.json(
      { error: "Failed to retrieve orders" },
      { status: 500 }
    );
  }
}

// POST: Create a new order
export async function POST(request: NextRequest) {
  try {
    const { 
      user, 
      items, 
      totalAmount,
      customer,
      email,
      contact,
      address,
      city,
      postalCode
    } = await request.json();

    if (!user || !items || !totalAmount) {
      return NextResponse.json(
        { error: "Missing required order information" },
        { status: 400 }
      );
    }

    // Generate a unique order number
    const orderNumber = `ORD${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;

    // Create a new order
    const newOrder = new Order({
      orderNumber,
      user,
      items,
      totalAmount,
      status: "Pending",
      customer,
      email,
      contact,
      address,
      city,
      postalCode,
    });

    await newOrder.save();

    // Optional: Clear the user's cart after successful order
    await Cart.findOneAndUpdate(
      { user },
      { $set: { items: [] } }
    );

    return NextResponse.json(
      { message: "Order created successfully", order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}