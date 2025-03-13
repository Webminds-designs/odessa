import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../utils/dbconnect";
import Cart from "../../../models/cart";

connectDB();

// Define an interface for the expected request body
interface RemoveProductBody {
  user: string;
  product: string;
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { user, product }: RemoveProductBody = await request.json();
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

    // Filter out the product from the cart items
    cart.items = cart.items.filter(
      (item: any) => item.product.toString() !== product
    );
    await cart.save();

    return NextResponse.json(
      { message: "Product removed", cart },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error removing product from cart:", error);
    return NextResponse.json(
      { error: "Failed to remove product" },
      { status: 500 }
    );
  }
}
