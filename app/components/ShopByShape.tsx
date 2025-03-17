"use client";

import React, { useState, useEffect } from "react";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

type Diamond = {
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
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    scale: 0.8,
    opacity: 0
  }),
  center: (position: number) => ({
    x: position * 150,
    scale: position === 0 ? 1 : 0.8,
    opacity: Math.abs(position) === 2 ? 0.3 : 1,
    zIndex: 2 - Math.abs(position),
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 350,
      damping: 30
    }
  }),
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.5
    }
  })
};

const ShopByShape = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(0);
  const [allDiamonds, setAllDiamonds] = useState<Diamond[]>([]);
  const [uniqueDiamonds, setUniqueDiamonds] = useState<Diamond[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modified useEffect to filter unique diamonds by shape
  useEffect(() => {
    const fetchAllDiamonds = async () => {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        if (data.products) {
          setAllDiamonds(data.products);
          
          // Filter unique diamonds by shape
          const uniqueByShape = Object.values(
            data.products.reduce((acc: { [key: string]: Diamond }, diamond: Diamond) => {
              if (!acc[diamond.shape]) {
                acc[diamond.shape] = diamond;
              }
              return acc;
            }, {})
          ) as Diamond[];
          
          setUniqueDiamonds(uniqueByShape);
        }
      } catch (err) {
        console.error("Error fetching all diamonds:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllDiamonds();
  }, []);

  // Update getVisibleDiamonds to use uniqueDiamonds
  const getVisibleDiamonds = () => {
    if (!uniqueDiamonds.length) return [];
    
    const wrappedIndex = (index: number) => {
      const wrapped = ((index % uniqueDiamonds.length) + uniqueDiamonds.length) % uniqueDiamonds.length;
      return wrapped;
    };

    const items = [];
    for (let i = -2; i <= 2; i++) {
      const diamond = uniqueDiamonds[wrappedIndex(currentIndex + i)];
      if (diamond) {
        items.push({
          ...diamond,
          position: i
        });
      }
    }
    return items;
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setDirection(1);
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % uniqueDiamonds.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setDirection(-1);
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + uniqueDiamonds.length) % uniqueDiamonds.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const visibleDiamonds = getVisibleDiamonds();

  return (
    <div className="flex flex-col gap-4 w-full min-h-screen p-4 md:p-26 bg-black text-white">
      {/* First Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row justify-between items-center w-full">
        <p className="font-vasion text-4xl md:text-6xl lg:text-8xl text-center md:text-left mb-4 md:mb-0">
          Shop Diamond
        </p>
        <div className="flex  items-center">
          <div className="flex items-center justify-center rounded-full h-12 w-12 md:h-20 md:w-20 bg-brown hover:bg-primary hover:border transition-colors duration-300 cursor-pointer">
            <GoArrowRight className="text-white text-3xl md:text-4xl" />
          </div>
          <div className="flex items-center justify-center border rounded-full h-12 md:h-20 px-6 py-2 hover:scale-95 transition-all duration-300 cursor-pointer">
            <p className="font-aeonikregularitalic text-xl md:text-2xl">
              try it now!
            </p>
          </div>
        </div>
      </motion.div>

      {/* Second Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row justify-end items-center gap-4">
        <p className="flex flex-col font-aeonikregularitalic max-w-[800px] text-sm md:text-lg lg:text-2xl text-gray-300 text-wrap md:text-right">
          <span>EXPLORE THE POSSIBILITIES OF TAILORED</span>
          <span>CRAFTSMANSHIP AND UNLIMITED</span>
          <span>CAPABILITIES</span>
        </p>
        <p className="font-vasion text-4xl md:text-6xl lg:text-8xl text-center">
          by Shape
        </p>
      </motion.div>

      {/* Enhanced Diamond Slider */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative mt-8 md:mt-16 h-[400px] md:h-[500px] overflow-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-brown opacity-50 rounded-full p-3 transition-all duration-300"
          disabled={isTransitioning}
        >
          <ChevronLeft className="text-primary hover:text-white text-2xl" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-brown opacity-50 rounded-full p-3 transition-all duration-300"
          disabled={isTransitioning}
        >
          <ChevronRight className="text-primary hover:text-white text-2xl" />
        </button>

        {/* Carousel Container */}
        <div className="absolute top-0 left-0 right-0 flex justify-center items-center z-10 h-full">
          <div className="relative flex items-center justify-center w-full">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              {visibleDiamonds.map((diamond) => {
                const isCenter = diamond.position === 0;

                return (
                  <motion.div
                    key={`${diamond._id}-${diamond.position}`}
                    onClick={() => (isCenter ? window.location.href = `/product/${diamond._id}` : null)}
                    custom={diamond.position}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    style={{
                      position: 'absolute',
                      width: isCenter ? '300px' : '240px',
                    }}
                  >
                    <motion.div
                      className={`relative rounded-full border bg-primary p-3 sm:p-4 md:p-6 
                        group hover:shadow-lg hover:shadow-amber-100/20 aspect-square`}
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    >
                      <motion.img
                        src={diamond.images[0]}
                        alt={diamond.name}
                        className={`w-full h-full object-contain
                          ${isCenter ? 'group-hover:animate-none' : ''}`}
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 1 }}
                      />
                      {isCenter && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute font-aeonikbolditalic inset-0 bg-black/60 rounded-full flex flex-col 
                            items-center justify-center p-4 cursor-pointer"
                        >
                          <p className="text-white text-sm md:text-base font-bold">{diamond.price}</p>
                          <p className="text-white text-xs md:text-sm">{diamond.carat} Carat</p>
                          <p className="text-white text-xs md:text-sm mt-2">Click to View</p>
                        </motion.div>
                      )}
                    </motion.div>
                    <motion.p
                      className={`font-eurostyle text-center mt-4
                        ${isCenter
                          ? 'font-extrabold text-lg md:text-xl lg:text-2xl'
                          : 'font-bold text-sm md:text-base text-gray-500'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {diamond.name}
                    </motion.p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ShopByShape;
