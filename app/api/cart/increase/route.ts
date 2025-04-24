import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../utils/dbconnect";
import Cart from "../../../models/cart";

connectDB();

// Define an interface for the expected request body
interface IncreaseQuantityBody {
  user: string;
  product: string;
  amount?: number;
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse the JSON body and type it
    const { user, product, amount }: IncreaseQuantityBody =
      await request.json();
    if (!user || !product) {
      return NextResponse.json(
        { error: "Missing user or product" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ user });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Find the index of the product in the cart items array
    const itemIndex: number = cart.items.findIndex(
      (item: any) => item.product.toString() === product
    );
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: "Product not found in cart" },
        { status: 404 }
      );
    }

    // Increase quantity by provided amount or default to 1
    cart.items[itemIndex].quantity += amount || 1;
    await cart.save();

    return NextResponse.json(
      { message: "Quantity increased", cart },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error increasing quantity:", error);
    return NextResponse.json(
      { error: "Failed to increase quantity" },
      { status: 500 }
    );
  }
}
