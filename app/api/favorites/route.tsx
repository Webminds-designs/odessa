import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/dbconnect";
import Favourite from "@/app/models/favourite";

connectDB();

// GET request to retrieve all favourites
export async function GET(request: NextRequest) {
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
    const { user: userId, product: productId } = await request.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "User ID and product ID are required" },
        { status: 400 }
      );
    }

    // Check if user already has favorites
    let userFavorites = await Favourite.findOne({ userId });

    if (userFavorites) {
      // User already has favorites, add new product if not already there
      if (!userFavorites.products.includes(productId)) {
        userFavorites.products.push(productId);
        await userFavorites.save();
      }
    } else {
      // Create new favorites document for user
      userFavorites = new Favourite({
        userId,
        products: [productId],
      });
      await userFavorites.save();
    }

    return NextResponse.json(
      { message: "Product added to favorites", products: userFavorites.products },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
    try {
        // Extract user and product IDs from the request body
        const { user: userId, product: productId } = await request.json();
        
        if (!userId || !productId) {
            return NextResponse.json(
                { error: "User ID and product ID are required" },
                { status: 400 }
            );
        }

        // Find the user's favorites document
        const userFavorites = await Favourite.findOne({ userId });
        
        if (!userFavorites) {
            return NextResponse.json(
                { error: "No favorites found for this user" },
                { status: 404 }
            );
        }
        
        // Remove the product ID from the products array
        userFavorites.products = userFavorites.products.filter(
            (id) => id.toString() !== productId
        );
        
        // Save the updated document
        await userFavorites.save();
        
        return NextResponse.json(
            { 
                message: "Product removed from favorites",
                products: userFavorites.products 
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error removing favorite:", error);
        return NextResponse.json(
            { error: "Failed to remove favorite" },
            { status: 500 }
        );
    }
}