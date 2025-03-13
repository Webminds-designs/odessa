// app/api/product/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../utils/dbconnect";
import Product from "../../../models/Product";

connectDB();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string }; searchParams: URLSearchParams }
) {
  try {
    const { id } = params;
    // Find product using the custom "id" field in your schema
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string }; searchParams: URLSearchParams }
) {
  try {
    const { id } = params;
    const updateData = await request.json();
    // Update the product document by the custom "id" field
    const product = await Product.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Product updated", product },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string }; searchParams: URLSearchParams }
) {
  try {
    const { id } = params;
    // Delete product by custom "id" field
    const product = await Product.findOneAndDelete({ _id: id });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
