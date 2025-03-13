"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

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
  isFavourited?: boolean;
  onFavouriteToggle?: (productId: string) => Promise<void>;
}

const ProductCards: React.FC<ProductCardsProps> = ({ 
  diamond, 
  isFavourited = false,
  onFavouriteToggle 
}) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleAddToCart = async (e: React.MouseEvent<HTMLDivElement>) => {
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

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error response from API:", errorData);
        throw new Error("Failed to add to cart");
      }

      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding product to cart");
    }
  };

  const handleToggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    
    if (!user.id) {
      toast.error("Please log in to manage favorites");
      return;
    }

    if (onFavouriteToggle) {
      await onFavouriteToggle(diamond._id);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="relative flex flex-col justify-center items-center h-[450px] w-[350px] bg-[#292929] rounded-2xl font-aeonikregular"
      >
        {/* Favorite Button */}
        <div 
          className="absolute right-4 top-4 hover:cursor-pointer"
          onClick={handleToggleFavorite}
        >
          {isFavourited ? (
            <FaHeart size={20} color="#ff4f4f" />
          ) : (
            <FaRegHeart size={20} />
          )}
        </div>

        {/* Product Image */}
        <Link href={`/product/${diamond._id}`}>
          <div className="flex items-center object-cover justify-center h-[270px] w-[250px]">
            <img
              src={diamond.images[0]}
              alt={diamond.name}
            />
          </div>
        </Link>

        {/* Add to Cart Button */}
        <div 
          onClick={handleAddToCart}
          className="h-12 w-[300px] px-10 bg-primary flex justify-center items-center mb-5 rounded-xl border border-black cursor-pointer"
        >
          <div className="text-white">Add to cart</div>
        </div>

        {/* Product Info */}
        <div className="flex justify-between items-center p-2 h-12 w-[300px] bg-primary border border-black rounded-xl">
          <div className="text-gray-400">{diamond.name}</div>
          <div className="text-white">{diamond.price} £</div>
        </div>
      </motion.div>
      <ToastContainer position="bottom-center" theme="dark" />
    </>
  );
};

export default ProductCards;
