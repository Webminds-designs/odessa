"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductCardsProps {
  diamond: {
    _id: string;
    id: string;
    name: string;
    price: string;
    shape: string;
    shortDescription: string;
    description: string;
    diamondCutDesign: string;
    carat: number;
    measurements: string;
    images: string[];
  };
}

const ProductCards: React.FC<ProductCardsProps> = ({ diamond }) => {
  //get user from local storage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // console.log(user);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the click from bubbling to parent elements (like Link)
    e.stopPropagation();

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user.id,
          product: diamond._id,
          quantity: 1,
        }),
      });

      // Log response status for debugging
      console.log("Response status:", res.status);

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error response from API:", errorData);
        throw new Error("Failed to add to cart");
      }

      const data = await res.json();
      console.log("Added to cart:", data);
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding product to cart");
    }
  };

  return (
    <>
      <div
        className="
          bg-gradient-to-b from-[#1d1d1d] to-[#161616]
          rounded-xl p-5 relative group 
          overflow-hidden hover:shadow-lg hover:shadow-gray-500/10 
          transition-all duration-300 
          flex flex-col justify-between
          w-full max-w-xs min-w-[250px] mx-auto min-h-[350px]
          font-aeonikregular
        "
      >
        {/* Diagonal decorative line */}
        <div
          className="
            absolute -right-8 -top-8 w-16 h-16 
            bg-gray-600/10 rotate-45 transform 
            scale-0 group-hover:scale-100 
            transition-transform duration-500
          "
        ></div>

        {/* Wishlist/heart button */}
        <button
          className="
            absolute top-4 right-4 z-10 
            text-gray-400 hover:text-gray-300
            transition-colors
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364 
                 l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636
                 l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Image container wrapped in a Link */}
        <div className="mb-6 flex justify-center cursor-pointer">
          <Link href={`/product/${diamond._id}`}>
            <div className="w-36 h-36 sm:w-40 sm:h-40 relative group">
              <div
                className="
                  absolute inset-0 
                  bg-gradient-to-r from-gray-400/10 to-gray-500/10 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-500 
                  rounded-full
                "
              ></div>

              <img
                src={diamond.images[0]}
                alt={diamond.name}
                className="
                  w-full h-full object-cover 
                  transition-transform duration-500 
                  group-hover:scale-105
                "
              />
            </div>
          </Link>
        </div>

        {/* Product info */}
        <div className="flex flex-col-reverse justify-between items-center mb-2">
          <span className="text-sm sm:text-base text-gray-300">
            {diamond.name}
          </span>
          <span className="text-sm sm:text-base font-medium text-amber-400">
            {diamond.price} £
          </span>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className="
            mt-auto w-full bg-gray-700 hover:bg-[#292929]
            text-white py-2 text-sm sm:text-base 
            rounded-lg transition-colors duration-300 
            flex items-center justify-center gap-1 group
          "
        >
          <span>Add to cart</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="
              h-4 w-4 sm:h-5 sm:w-5
              transform group-hover:translate-x-1 
              transition-transform
            "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>
      {/* Toast container positioned at the bottom-center of the screen */}
      <ToastContainer position="bottom-center" theme="dark" />
    </>
  );
};

export default ProductCards;
