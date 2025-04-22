import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../utils/dbconnect";
import Cart from "../../../models/cart";

connectDB();

interface ClearCartBody {
  user: string;
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { user }: ClearCartBody = await request.json();
    if (!user) {
      return NextResponse.json({ error: "Missing user" }, { status: 400 });
    }

    const cart = await Cart.findOne({ user });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Clear all items from the cart
    cart.items = [];
    await cart.save();

    return NextResponse.json(
      { message: "Cart cleared", cart },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { error: "Failed to clear cart" },
      { status: 500 }
    );
  }
}
