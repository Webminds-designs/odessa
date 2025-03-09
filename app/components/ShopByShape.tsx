"use client";

import React, { useState, useEffect } from "react";
import { GoArrowRight } from "react-icons/go";

const shapesData = [
  { id: 0, name: "Oval", src: "/images/diamond1.png" },
  { id: 1, name: "Cushion", src: "/images/diamond2.png" },
  { id: 2, name: "Round", src: "/images/diamond2.png" },
  { id: 3, name: "Princess", src: "/images/diamond1.png" },
  { id: 4, name: "Pear", src: "/images/diamond1.png" },
];

const ShopByShape = () => {
  const [currentShapes, setCurrentShapes] = useState(shapesData);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      // Wait longer before changing shapes
      setTimeout(() => {
        setCurrentShapes((prevShapes) => {
          const newShapes = [...prevShapes];
          const lastItem = newShapes.pop();
          if (lastItem) newShapes.unshift(lastItem);
          return newShapes;
        });

        // Allow more time for the transition to complete
        setTimeout(() => {
          setIsTransitioning(false);
        }, 600);
      }, 100);
    }, 5000); // Longer interval for better user experience

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full h-screen p-4 md:p-8 bg-black">
      {/* First Title Section */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full">
        <p className="font-vasion text-4xl md:text-7xl lg:text-9xl text-center md:text-left mb-4 md:mb-0">
          Shop Diamond
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center justify-center rounded-full h-16 w-16 md:h-20 md:w-20 bg-brown hover:bg-primary hover:border transition-colors duration-300 cursor-pointer">
            <GoArrowRight className="text-white text-3xl md:text-4xl" />
          </div>
          <div className="flex items-center justify-center border rounded-full px-6 py-2 hover:scale-95 transition-all duration-300 cursor-pointer">
            <p className="font-aeonikregularitalic text-xl md:text-2xl">
              try it now!
            </p>
          </div>
        </div>
      </div>

      {/* Second Title Section */}
      <div className="flex flex-col md:flex-row justify-end items-center gap-4">
        <p className="font-aeonikregularitalic text-sm md:text-lg lg:text-2xl text-gray-300 text-center md:text-right">
          <span>
            EXPLORE THE POSSIBILITIES OF TAILORED
            <br className="md:hidden" />
          </span>
          <span>
            CRAFTSMANSHIP AND UNLIMITED
            <br className="md:hidden" />
          </span>
          <span>CAPABILITIES</span>
        </p>
        <p className="font-vasion text-4xl md:text-7xl lg:text-9xl text-center">
          by Shape
        </p>
      </div>

      {/* Diamond Slider */}
      <div className="relative mt-8 md:mt-16 h-full overflow-hidden">
        {/* The flex container is set to no-wrap so that on mobile only 3 items (1/3 each)
            are visible within the screen width while on desktop, each item is 1/5 of the container */}
        <div className="absolute top-0 left-0 right-0 flex flex-nowrap justify-center md:justify-evenly items-center z-10 bg-transparent px-2 md:px-6 h-full">
          {currentShapes.map((shape, index) => {
            const isCenter = index === 2;
            return (
              <div
                key={shape.id}
                className={`w-1/3 md:w-1/5 flex flex-col items-center transition-all duration-700 ease-out ${
                  isTransitioning ? "transform-gpu" : ""
                }`}
              >
                <div
                  className={`rounded-full border bg-primary p-3 sm:p-5 md:p-7 mb-4 md:mb-10 transition-all duration-700 ease-out hover:shadow-lg hover:shadow-amber-100/20 ${
                    isCenter
                      ? "w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48"
                      : "w-20 h-20 sm:w-24 sm:h-24 md:w-40 md:h-40"
                  } ${isCenter ? "hover:scale-105" : "hover:scale-110"}`}
                >
                  <img
                    src={shape.src}
                    alt={shape.name}
                    className={`transition-all duration-700 ease-out w-full h-full object-contain ${
                      isCenter ? "animate-[spin_30s_linear_infinite]" : ""
                    }`}
                  />
                </div>
                <p
                  className={`font-eurostyle text-center transition-all duration-700 ease-in-out transform ${
                    isCenter
                      ? "font-extrabold text-xl md:text-2xl"
                      : "font-bold text-sm md:text-lg text-gray-500"
                  } ${isTransitioning ? "-translate-x-2" : "opacity-100"}`}
                >
                  {shape.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopByShape;
