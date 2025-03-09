"use client";

import React, { useState } from "react";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import Image from "next/image";

import diamonds from "../../public/images/diamonds.js";

const NewCollection = () => {
  // Add state to track current slide
  const [currentIndex, setCurrentIndex] = useState(0);
  // Add state for transitions
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fadeState, setFadeState] = useState("fade-in");

  // Navigation functions with animation handling
  const goToPrevious = () => {
    if (isTransitioning) return;

    setFadeState("fade-out");
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? diamonds.length - 1 : prevIndex - 1
      );
      setFadeState("fade-in");
      setTimeout(() => setIsTransitioning(false), 500);
    }, 300);
  };

  const goToNext = () => {
    if (isTransitioning) return;

    setFadeState("fade-out");
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === diamonds.length - 1 ? 0 : prevIndex + 1
      );
      setFadeState("fade-in");
      setTimeout(() => setIsTransitioning(false), 500);
    }, 300);
  };

  // Get current diamond data
  const currentDiamond = diamonds[currentIndex];

  return (
    <div className="flex flex-col w-full gap-4 md:gap-10 bg-black h-fit py-4 px-4 md:px-16">
      {/* Title 1 */}
      <div className="flex justify-between items-end">
        <div className="flex gap-4 md:gap-10 items-end">
          <p className="font-vasion text-4xl lg:text-9xl">NEW</p>

          <p className="hidden font-aeonikregularitalic text-lg lg:text-2xl text-gray-300 lg:flex flex-col">
            <span>EXPLORE THE POSSIBILITIES OF </span>
            <span>TAILORED CREAFTMANSHIP AND </span>
            <span>UNLIMITED CAPABILITIES</span>
          </p>
        </div>

        <div className="flex ">
          <div className="flex relative">
            <div className="md:flex hidden items-center justify-center rounded-full h-12 w-12 lg:h-20 lg:w-20 border absolute right-0 "></div>
            <div className="md:flex hidden items-center justify-center rounded-full h-12 w-12 lg:h-20 lg:w-20 border absolute right-10 lg:right-16 p-3">
              <img
                src="/images/diamond1.png"
                alt="diamond"
                width="auto"
                height="auto"
              />
            </div>
            <div className="md:flex hidden items-center justify-center rounded-full h-12 w-12 lg:h-20 lg:w-20 border absolute right-20 lg:right-32"></div>
          </div>

          <div className="flex items-center justify-center rounded-full h-12 w-12 lg:h-20 lg:w-20 bg-brown hover:bg-primary hover:border transition-colors duration-300 cursor-pointer">
            <GoArrowRight className="text-white text-2xl lg:text-6xl" />
          </div>

          <div className="flex items-center justify-center h-12 lg:h-20 px-4 lg:px-10 border rounded-full hover:scale-95 transition-all duration-300 cursor-pointer">
            <p className="font-aeonikregularitalic text-lg md:text-2xl">
              try it now!
            </p>
          </div>
        </div>
      </div>

      {/* Title 2 */}
      <div className="flex justify-between gap-4">
        <p className="font-aeonikregularitalic text-md lg:text-2xl text-gray-300 md:flex flex-col hidden">
          <span>EXPLORE THE POSSIBILITIES OF </span>
          <span>TAILORED CREAFTMANSHIP AND </span>
          <span>UNLIMITED CAPABILITIES</span>
        </p>
        <p className="font-vasion text-4xl lg:text-9xl">COLLECTION</p>
      </div>

      {/* Full-width carousel without padding */}
      <div className="relative w-full ">
        {" "}
        {/* Negative margin to break out of container */}
        <div
          className="flex flex-col md:flex-row w-full h-fit md:h-[30vw] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/bgimg1.png')" }}
        >
          <div className="w-full h-full md:h-full md:w-3/5 relative overflow-hidden ">
            <div
              className={`transition-all duration-500 ${
                fadeState === "fade-out"
                  ? "opacity-0 scale-105"
                  : "opacity-100 scale-100"
              }`}
            >
              <img
                src={currentDiamond.images[0]}
                alt={currentDiamond.name}
                className="w-full h-full"
                key={`image-${currentIndex}`}
              />
            </div>
            <GoArrowLeft
              onClick={goToPrevious}
              className="absolute bottom-5 right-2 text-white text-2xl cursor-pointer hover:-translate-x-2 transform transition-transform duration-300 hidden md:flex"
            />
          </div>

          <div className="flex flex-col relative gap-5 w-full md:w-2/5 bg-zinc-900 opacity-70 py-2 px-4 md:py-10 md:px-20 h-fit md:h-full">
            <div className="flex justify-end">
              <div className="flex justify-center items-center py-1 px-5 border rounded-full cursor-pointer hover:scale-105 transition-transform duration-500">
                <GoArrowRight
                  className="text-white text-3xl "
                  onClick={() =>
                    (window.location.href = `/product/${currentDiamond.id}`)
                  }
                />
              </div>
            </div>

            <div
              className={`transition-all duration-500 ${
                fadeState === "fade-out"
                  ? "opacity-0 transform translate-y-4"
                  : "opacity-100 transform translate-y-0"
              }`}
            >
              <p className="font-vasion text-3xl">{currentDiamond.name}</p>
            </div>

            <div
              className={`transition-all duration-500 delay-100 ${
                fadeState === "fade-out"
                  ? "opacity-0 transform translate-y-4"
                  : "opacity-100 transform translate-y-0"
              }`}
            >
              <p className="font-vasion text-xl text-brown">
                {currentDiamond.shortDescription}
              </p>
            </div>

            <div
              className={`transition-all duration-500 delay-200 ${
                fadeState === "fade-out"
                  ? "opacity-0 transform translate-y-4"
                  : "opacity-100 transform translate-y-0"
              }`}
            >
              <p className="font-vasion text-lg md:text-xl">
                <span>{currentDiamond.description}</span>
                <span className="text-brown"> See More...</span>
              </p>
            </div>

            <GoArrowRight
              onClick={goToNext}
              className="absolute bottom-5 left-2 text-brown text-2xl cursor-pointer hover:translate-x-2 transform transition-transform duration-300 md:flex hidden"
            />
            <div className="w-full flex justify-center md:hidden">
              <div className="flex justify-between  w-fit gap-2">
                <GoArrowLeft
                  onClick={goToPrevious}
                  className=" text-white text-2xl cursor-pointer hover:-translate-x-2 transform transition-transform duration-300"
                />
                <GoArrowRight
                  onClick={goToNext}
                  className=" text-brown text-2xl cursor-pointer hover:translate-x-2 transform transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCollection;
