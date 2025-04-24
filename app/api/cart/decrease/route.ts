import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../utils/dbconnect";
import Cart from "../../../models/cart";

connectDB();

interface DecreaseQuantityBody {
  user: string;
  product: string;
  amount?: number;
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const { user, product, amount }: DecreaseQuantityBody =
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

    const itemIndex: number = cart.items.findIndex(
      (item: any) => item.product.toString() === product
    );
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: "Product not found in cart" },
        { status: 404 }
      );
    }

    const decrementAmount = amount || 1;
    cart.items[itemIndex].quantity -= decrementAmount;
    // If quantity falls below 1, remove the item from the cart
    if (cart.items[itemIndex].quantity < 1) {
      cart.items.splice(itemIndex, 1);
    }
    await cart.save();

    return NextResponse.json(
      { message: "Quantity decreased", cart },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error decreasing quantity:", error);
    return NextResponse.json(
      { error: "Failed to decrease quantity" },
      { status: 500 }
    );
  }
}
