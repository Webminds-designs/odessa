"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import diamonds from "../../../public/images/diamonds.js";
import { useParams } from "next/navigation.js";

function DiamondDisplay() {
  const { id } = useParams();

  console.log(id);
  const [selectedDiamond, setSelectedDiamond] = useState(diamonds[0]);

  useEffect(() => {
    const selected = diamonds.find((diamond) => diamond.id === id);
    setSelectedDiamond(selected);
  }, [id]);
  const [selectedImage, setSelectedImage] = useState(selectedDiamond.images[0]);

  // const thumbnails = selectedDiamond.images.map((image, index) => ({
  //   id: index + 1,
  //   src: image,
  //   alt: `${selectedDiamond.name} view ${index + 1}`,
  // }));

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main product display */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12 items-center">
          {/* Main diamond image */}
          <div className="lg:w-1/2  relative flex justify-center">
            {/* Main diamond image with glow effect */}
            <div className="relative mb-4 rounded-full w-full h-full mx-auto overflow-hidden group">
              <img
                src={selectedImage}
                alt={selectedDiamond.name}
                className="w-full h-full object-fit transition-transform duration-700"
              />
            </div>
          </div>

          {/* Vertical thumbnail selectors - now in the middle */}
          {/* <div className="lg:w-1/5 flex justify-center">
            <div className="flex flex-col gap-4 self-center">
              {thumbnails.map((thumb) => (
                <div
                  key={thumb.id}
                  className={`cursor-pointer border rounded p-1 transition-all duration-300 ${
                    selectedImage === thumb.src
                      ? "border-amber-500 scale-110"
                      : "border-gray-700 hover:border-gray-500"
                  }`}
                  onClick={() => {
                    setSelectedImage(thumb.src);
                  }}
                >
                  <div className="w-12 h-12 relative">
                    <Image
                      src={thumb.src}
                      alt={thumb.alt}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Product details */}
          <div className="lg:w-2/5">
            <h1 className="text-3xl font-light mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {selectedDiamond.name}
            </h1>

            <div className="w-16 h-1 bg-brown mb-6"></div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              {selectedDiamond.description}
            </p>

            {/* Diamond details with improved styling */}
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
            <div className="flex justify-between items-center mb-6  p-4 rounded-lg shadow-inner">
              <span className="font-medium">Price</span>
              <span className="text-xl font-light text-brown">
                {selectedDiamond.price}
              </span>
            </div>

            {/* Add to cart button with animation */}
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

        {/* Similar diamonds section with improved styling */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <h2 className="text-2xl font-light mb-8 relative">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Similar Diamonds
            </span>
            <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mt-2"></div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {diamonds.slice(0, 3).map((diamond, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl p-5 relative group overflow-hidden hover:shadow-lg hover:shadow-amber-900/10 transition-all duration-300"
              >
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
                    <Image
                      src={diamond.images[0]}
                      alt={diamond.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="flex justify-center gap-2 mb-4">
                  <span className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="w-4 h-4 bg-gray-600 rounded-full"></span>
                  </span>
                  <span className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="w-4 h-4 bg-gray-600 rounded-full"></span>
                  </span>
                  <span className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="w-4 h-4 bg-gray-600 rounded-full"></span>
                  </span>
                </div>

                <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 text-sm rounded-lg mb-4 transition-colors duration-300 flex items-center justify-center gap-1 group">
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

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">{diamond.name}</span>
                  <span className="text-sm font-medium text-amber-400">
                    {diamond.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Add this to your global CSS or in a style tag
// @keyframes diamondRotate {
//   0% { transform: rotate(0deg) scale(1); }
//   50% { transform: rotate(180deg) scale(1.05); }
//   100% { transform: rotate(360deg) scale(1); }
// }
// .animate-diamond-rotate {
//   animation: diamondRotate 10s linear infinite;
// }

export default DiamondDisplay;
