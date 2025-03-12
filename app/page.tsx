"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Highlight from "./components/Highlight";
import ShopByShape from "./components/ShopByShape";
import HeroContent from "./components/HeroContent";
import Footer from "./components/Footer";
import Contact from "./components/Contanct";
import NewCollection from "./components/NewCollection";
import AfterHero from "./components/AfterHero";

const Hero = dynamic(() => import("./components/Hero"), { ssr: false });

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulate progress until page load event fires.
  useEffect(() => {
    let intervalId;
    if (!isLoaded) {
      intervalId = setInterval(() => {
        setProgress((prev) => {
          // Increase progress gradually until 95%
          if (prev >= 95) {
            return prev;
          }
          return prev + Math.random() * 5;
        });
      }, 300);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLoaded]);

  // Listen for the window load event to mark the page as loaded.
  useEffect(() => {
    const handleLoad = () => {
      setProgress(100);
      // Slight delay for a smooth transition before hiding preloader
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
      {/* Preloader Overlay */}
      {!isLoaded && (
        <>
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black gap-2 lg:gap-12">
            <img
              src="/images/odessa.png"
              alt="Odessa Logo"
              className="h-16 w-auto"
            />
            <div className="text-white text-2xl mb-4">
              Diamond in growing for you...
            </div>
          </div>

          {/* Thin Progress Bar at the Bottom */}
          <div className="fixed bottom-10 left-0 w-full z-60 pb-4 flex items-center justify-center">
            <div className="w-2/3 h-1 bg-gray-700">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-brown rounded transition-all duration-300"
              ></div>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div
        className={`transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Hero />
        <HeroContent />
        <div className="w-full h-screen"></div>
        <div className="w-full h-[400px] lg:h-[800px]">
          <AfterHero />
        </div>
        <Highlight />
        <NewCollection />
        <ShopByShape />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
