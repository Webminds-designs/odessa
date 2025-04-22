// app/api/product/insertmany/route.js

import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../utils/dbconnect";
import Product from "../../../models/Product";

connectDB();

export async function POST(request: NextRequest) {
  try {
    // Expecting an array of product objects in the request body
    const products = await request.json();
    if (!Array.isArray(products)) {
      return NextResponse.json(
        { error: "Request body must be an array of products" },
        { status: 400 }
      );
    }

    // Insert many products at once
    const insertedProducts = await Product.insertMany(products);
    return NextResponse.json(
      { message: "Products inserted", products: insertedProducts },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting products:", error);
    return NextResponse.json(
      { error: "Failed to insert products" },
      { status: 500 }
    );
  }
}
