// app/api/cart/route.js

import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../utils/dbconnect";
import Cart from "../../models/cart";

connectDB();
interface CartItem {
  product: any; // Optionally replace 'any' with a more specific type like mongoose.Types.ObjectId
  quantity: number;
}

// GET: Retrieve cart for a user
export async function GET(request: NextRequest) {
  try {
    // For simplicity, we're using a query parameter to get the user ID.
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    return NextResponse.json({ cart }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving cart:", error);
    return NextResponse.json(
      { error: "Failed to retrieve cart" },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const { user, product, quantity } = await request.json();

    if (!user || !product) {
      return NextResponse.json(
        { error: "Missing user or product" },
        { status: 400 }
      );
    }

    // Try to find an existing cart for the user
    let cart = await Cart.findOne({ user });
    if (!cart) {
      // Create a new cart if one doesn't exist
      cart = new Cart({
        user,
        items: [{ product, quantity: quantity || 1 }],
      });
    } else {
      // Check if the product is already in the cart
      const itemIndex = cart.items.findIndex(
        (item: CartItem) => item.product.toString() === product
      );
      if (itemIndex > -1) {
        // Update quantity if the product exists
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        // Add the new item if it doesn't exist
        cart.items.push({ product, quantity: quantity || 1 });
      }
    }
    await cart.save();
    return NextResponse.json(
      { message: "Cart updated", cart },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}
