import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/dbconnect";
import Favourite from "@/app/models/favourite";

connectDB();

// GET request to retrieve all favourites
export default async function GET(request: NextRequest) {
  try {
    const favourites = await Favourite.find({});
    return NextResponse.json({ favourites }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving favourites:", error);
    return NextResponse.json(
      { error: "Failed to retrieve favourites" },
      { status: 500 }
    );
  }
}

// POST request to create a new favourite
export async function POST(request: NextRequest) {
  try {
    const { userId, products } = await request.json();

    const newFavourite = new Favourite({
      userId,
      products,
    });

    await newFavourite.save();
    return NextResponse.json(
      { message: "Favourite created", favourite: newFavourite },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating favourite:", error);
    return NextResponse.json(
      { error: "Failed to create favourite" },
      { status: 500 }
    );
  }
}

// PUT request to update an existing favourite
export async function PUT(request: NextRequest) {
  try {
    const { userId, products } = await request.json();

    const updatedFavourite = await Favourite.findOneAndUpdate(
      { userId, products },
      { userId, products },
      { new: true }
    );

    return NextResponse.json(
      { message: "Favourite updated", favourite: updatedFavourite },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating favourite:", error);
    return NextResponse.json(
      { error: "Failed to update favourite" },
      { status: 500 }
    );
  }
}