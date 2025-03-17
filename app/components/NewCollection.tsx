"use client";

import React, { useEffect, useState } from "react";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { motion } from "framer-motion";
import Link from "next/link";

interface Diamond {
  _id: string;
  id: string;
  name: string;
  price: string;
  cut: string;
  shape: string;
  shortDescription: string;
  description: string;
  diamondCutDesign: string;
  carat: number;
  measurements: string;
  images: string[];
}

const NewCollection: React.FC = () => {
  // Track current slide index
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // Transition state for animation
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [fadeState, setFadeState] = useState<"fade-in" | "fade-out">("fade-in");

  // Diamonds data, loading and error states
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Navigation functions with animation handling
  const goToPrevious = (): void => {
    if (isTransitioning) return;

    setFadeState("fade-out");
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0
          ? diamonds.length > 0
            ? diamonds.length - 1
            : 0
          : prevIndex - 1
      );
      setFadeState("fade-in");
      setTimeout(() => setIsTransitioning(false), 500);
    }, 300);
  };

  const goToNext = (): void => {
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

  useEffect(() => {
    const fetchDiamonds = async () => {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        // Assuming your API returns an object with a "products" property
        setDiamonds(data.products || []);
      } catch (err) {
        console.error("Error fetching diamonds:", err);
        setError("Failed to fetch diamonds");
      } finally {
        setLoading(false);
      }
    };

    fetchDiamonds();
  }, []);

  // Safely retrieve current diamond, or null if diamonds are empty
  const currentDiamond: Diamond | null =
    diamonds.length > 0 ? diamonds[currentIndex] : null;

  if (loading) return <p>Loading diamonds...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col w-full gap-4 md:gap-10 bg-black h-fit py-4 px-4 md:px-16">
      {/* Title 1 */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="flex justify-between items-end"
      >
        <div className="flex gap-4 md:gap-10 items-end">
          <p className="font-vasion text-6xl lg:text-9xl">NEW</p>
          <p className="hidden font-aeonikregularitalic text-sm lg:text-2xl text-gray-300 md:flex flex-col">
            <span>EXPLORE THE POSSIBILITIES OF </span>
            <span>TAILORED CRAFTMANSHIP AND </span>
            <span>UNLIMITED CAPABILITIES</span>
          </p>
        </div>

        <div className="flex">
          <div className="flex relative">
            <div className="md:flex hidden items-center justify-center rounded-full h-12 w-12 lg:h-20 lg:w-20 border absolute right-0"></div>
            <div className="md:flex hidden items-center justify-center rounded-full h-12 w-12 lg:h-20 lg:w-20 border absolute right-10 lg:right-16 p-3">
              <img
                src="/images/diamond1.png"
                alt="diamond"
                width={50}
                height={50}
              />
            </div>
            <div className="lg:flex hidden items-center justify-center rounded-full h-12 w-12 lg:h-20 lg:w-20 border absolute right-20 lg:right-32"></div>
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
      </motion.div>

      {/* Title 2 */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="flex justify-start lg:justify-end gap-4"
      >
        <p className="font-vasion text-5xl lg:text-9xl">COLLECTION</p>
      </motion.div>

      {/* Full-width carousel */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative w-full"
      >
        {/* Background image container */}
        <div
          className="flex flex-col lg:flex-row w-full h-fit lg:h-[30vw] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/bgimg1.png')" }}
        >
          <div className="w-full h-full lg:h-full lg:w-3/5 relative overflow-hidden">
            <div
              className={`transition-all duration-500 ${
                fadeState === "fade-out"
                  ? "opacity-0 scale-105"
                  : "opacity-100 scale-100"
              }`}
            >
              {currentDiamond ? (
                <img
                  src={currentDiamond.images[0]}
                  alt={currentDiamond.name}
                  className="w-full h-full"
                  key={`image-${currentIndex}`}
                />
              ) : null}
            </div>
            <GoArrowLeft
              onClick={goToPrevious}
              className="absolute bottom-5 right-2 text-white text-2xl cursor-pointer hover:-translate-x-2 transform transition-transform duration-300 hidden lg:flex"
            />
          </div>

          <div className="flex flex-col relative gap-5 w-full lg:w-2/5 bg-zinc-900 opacity-70 py-2 px-4 md:py-10 md:px-20 h-fit lg:h-full">
            <div className="flex justify-end">
              <div className="flex justify-center items-center py-1 px-5 border rounded-full cursor-pointer hover:scale-105 transition-transform duration-500">
                <GoArrowRight
                  className="text-white text-3xl"
                  onClick={() =>
                    (window.location.href = `/product/${currentDiamond?._id}`)
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
              {currentDiamond && (
                <p className="font-vasion text-3xl">{currentDiamond.name}</p>
              )}
            </div>

            <div
              className={`transition-all duration-500 delay-100 ${
                fadeState === "fade-out"
                  ? "opacity-0 transform translate-y-4"
                  : "opacity-100 transform translate-y-0"
              }`}
            >
              {currentDiamond && (
                <p className="font-vasion text-xl text-brown">
                  {currentDiamond.shortDescription}
                </p>
              )}
            </div>

            <div
              className={`transition-all duration-500 delay-200 ${
                fadeState === "fade-out"
                  ? "opacity-0 transform translate-y-4"
                  : "opacity-100 transform translate-y-0"
              }`}
            >
              {currentDiamond && (
                <p className="font-vasion text-lg lg:text-xl">
                  <span>{currentDiamond.description}</span>
                  <span className="text-brown"> See More...</span>
                </p>
              )}
            </div>

            <GoArrowRight
              onClick={goToNext}
              className="absolute bottom-5 left-2 text-brown text-2xl cursor-pointer hover:translate-x-2 transform transition-transform duration-300 lg:flex hidden"
            />
            <div className="w-full flex justify-center lg:hidden">
              <div className="flex justify-between w-fit gap-2">
                <GoArrowLeft
                  onClick={goToPrevious}
                  className="text-white text-2xl cursor-pointer hover:-translate-x-2 transform transition-transform duration-300"
                />
                <GoArrowRight
                  onClick={goToNext}
                  className="text-brown text-2xl cursor-pointer hover:translate-x-2 transform transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewCollection;
