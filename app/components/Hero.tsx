"use client";

import React, { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationweb from "../asset/lotteie/gemWeb2.json";
import animationmob from "../asset/lotteie/gemWeb2Por.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [isPotrait, setIsPotrait] = useState(false);

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsPotrait(window.innerWidth < window.innerHeight);
    };

    handleOrientationChange();
    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  const animationData = isPotrait ? animationmob : animationweb;

  useEffect(() => {
    const handleResize = () => {
      setIsPotrait(window.innerWidth < window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const lottieRef = useRef<any>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!lottieRef.current || !containerRef.current) return;

    const totalFrames = lottieRef.current.getDuration(true);

    console.log("taonta", totalFrames);

    // Reverse the animation from last frame to first on load
    const reverseAnimation = () => {
      let currentFrame = totalFrames;
      const interval = setInterval(() => {
        if (currentFrame <= 0) {
          clearInterval(interval);
        } else {
          currentFrame -= 1;
          lottieRef.current.goToAndStop(currentFrame, true);
        }
      }, 100); // Adjust speed of reversal
    };

    reverseAnimation();

    // Set up GSAP ScrollTrigger
    ScrollTrigger.create({
      trigger: containerRef.current, // Trigger animation when this element is in view
      start: "top top", // Start when the top of the component hits the top of the viewport
      end: "bottom top", // End when the bottom of the component hits the top of the viewport
      scrub: true, // Smoothly scrub through the animation as the user scrolls
      onUpdate: (self) => {
        // Calculate the frame based on scroll progress
        const frame = Math.floor(self.progress * totalFrames);
        lottieRef.current.goToAndStop(frame, true);
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen bg-black fixed top-0 left-0 flex items-center justify-center -z-10 overflow-hidden"
    >
      <div className="w-screen h-full overflow-hidden">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          // animationData={isPotrait ? animationmob : animationweb}

          loop={false}
          autoplay={false}
          className="w-screen  object-cover overflow-hidden"
        />
      </div>
    </div>
  );
};

export default Hero;
