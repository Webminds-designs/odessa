// app/api/product/route.js

import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../utils/dbconnect";
import Product from "../../models/Product";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const products = await Product.find({});
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving products:", error);
    return NextResponse.json(
      { error: "Failed to retrieve products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      id,
      name,
      price,
      cut,
      shape,
      shortDescription,
      description,
      diamondCutDesign,
      carat,
      measurements,
      images,
    } = await request.json();

    // Optionally validate required fields here

    const newProduct = new Product({
      id,
      name,
      price,
      cut,
      shape,
      shortDescription,
      description,
      diamondCutDesign,
      carat,
      measurements,
      images,
    });

    await newProduct.save();
    return NextResponse.json(
      { message: "Product created", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
