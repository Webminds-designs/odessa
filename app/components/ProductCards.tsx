import React from "react";
import Image from "next/image";

interface ProductCardsProps {
  diamond: {
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
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl p-5 relative group w-[300px] h-[350px] overflow-hidden hover:shadow-lg hover:shadow-amber-900/10 transition-all duration-300 justify-between flex flex-col">
      {/* Diagonal decorative line */}
      <div className="absolute -right-8 -top-8 w-16 h-16 bg-amber-600/10 rotate-45 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>

      <button className="absolute top-4 right-4 z-10 text-gray-400 hover:text-red-400 transition-colors">
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      <div className="mb-6 flex justify-center">
        <div className="w-40 h-40 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
          <img
            src={diamond.images[0]}
            alt={diamond.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-300">{diamond.name}</span>
        <span className="text-sm font-medium text-amber-400">
          {diamond.price}
        </span>
      </div>
      <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 text-sm rounded-lg mb-4 transition-colors duration-300 flex items-center justify-center gap-1 group mt-4">
        <span>Add to cart</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
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
  );
};

export default ProductCards;
