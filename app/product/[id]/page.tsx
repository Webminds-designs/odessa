"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import diamonds from "../../../public/images/diamonds.js";
import { useParams } from "next/navigation";
import ProductCards from "../../components/ProductCards";

// Define a type for Diamond
type Diamond = {
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

function DiamondDisplay() {
  const { id } = useParams();

  // Initialize selectedDiamond as Diamond or undefined
  const [selectedDiamond, setSelectedDiamond] = useState<Diamond | undefined>(
    diamonds[0]
  );
  // Initialize selectedImage safely
  const [selectedImage, setSelectedImage] = useState<string>(
    selectedDiamond ? selectedDiamond.images[0] : ""
  );

  // Update the selected diamond when id changes
  useEffect(() => {
    if (id) {
      const selected = diamonds.find((diamond: Diamond) => diamond.id === id);
      setSelectedDiamond(selected);
    }
  }, [id]);

  // Update selected image when the selected diamond changes
  useEffect(() => {
    if (selectedDiamond) {
      setSelectedImage(selectedDiamond.images[0]);
    }
  }, [selectedDiamond]);

  // Render a fallback if no diamond is found
  if (!selectedDiamond) {
    return <div>Diamond not found</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main product display */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12 items-center">
          {/* Main diamond image */}
          <div className="lg:w-1/2 relative flex justify-center">
            {/* Main diamond image with glow effect */}
            <div className="relative mb-4 rounded-full w-full h-full mx-auto overflow-hidden group">
              <img
                src={selectedImage}
                alt={selectedDiamond.name}
                className="w-full h-full object-fit transition-transform duration-700"
              />
            </div>
          </div>

          {/* Product details */}
          <div className="lg:w-2/5">
            <h1 className="text-3xl font-light mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {selectedDiamond.name}
            </h1>

            <div className="w-16 h-1 bg-brown mb-6"></div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              {selectedDiamond.description}
            </p>

            {/* Diamond specifications */}
            <div className="mb-6 grid grid-cols-2 gap-4 bg-gray-900/50 p-4 rounded-lg">
              <div className="col-span-2 mb-2 pb-2 border-b border-gray-800">
                <h3 className="text-sm uppercase tracking-wider text-gray-400">
                  Specifications
                </h3>
              </div>
              <p className="flex flex-col">
                <span className="text-xs text-gray-400">Shape</span>
                <span className="text-sm">{selectedDiamond.shape}</span>
              </p>
              <p className="flex flex-col">
                <span className="text-xs text-gray-400">Carat</span>
                <span className="text-sm">{selectedDiamond.carat}</span>
              </p>
              <p className="flex flex-col">
                <span className="text-xs text-gray-400">Measurements</span>
                <span className="text-sm">{selectedDiamond.measurements}</span>
              </p>
              <p className="flex flex-col">
                <span className="text-xs text-gray-400">Cut Design</span>
                <span className="text-sm">
                  {selectedDiamond.diamondCutDesign}
                </span>
              </p>
            </div>
            <div className="flex justify-between items-center mb-6 p-4 rounded-lg shadow-inner">
              <span className="font-medium">Price</span>
              <span className="text-xl font-light text-brown">
                {selectedDiamond.price}
              </span>
            </div>

            {/* Add to cart button */}
            <button className="w-full bg-brown hover:bg-white text-white hover:text-black py-3 text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-amber-80 flex items-center justify-center gap-2 group cursor-pointer">
              <span>Add to cart</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
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
        </div>

        {/* Similar diamonds section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <h2 className="text-2xl font-light mb-8 relative">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Similar Diamonds
            </span>
            <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mt-2"></div>
          </h2>

          <div className="w-full flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-items-center">
              {diamonds.slice(0, 3).map((diamond, index) => (
                <ProductCards key={index} diamond={diamond} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiamondDisplay;
