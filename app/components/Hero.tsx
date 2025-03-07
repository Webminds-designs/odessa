"use client";

import React, { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationweb from "../asset/lotteie/gemWeb.json";
// import animationmob from "../../public/animation2mobi.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [isPotrait, setIsPotrait] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setIsPotrait(window.innerWidth < window.innerHeight);
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
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

    // Clean up any existing ScrollTrigger instances
    const cleanup = () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
    cleanup();

    const totalFrames = lottieRef.current.getDuration(true);

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
      }, screenSize.width < 768 ? 50 : 100); // Faster on mobile
    };

    reverseAnimation();

    // Set up GSAP ScrollTrigger with mobile-friendly settings
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: screenSize.width < 768 ? "200% top" : "bottom top", // Longer scroll range on mobile
      scrub: true,
      onUpdate: (self) => {
        const frame = Math.floor(self.progress * totalFrames);
        lottieRef.current.goToAndStop(frame, true);
      },
    });

    return cleanup;
  }, [screenSize.width]); // Re-run when screen width changes

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center -z-10 overflow-hidden"
    >
      <div className="relative w-full h-full overflow-hidden">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationweb}
          // animationData={isPotrait ? animationmob : animationweb}
          loop={false}
          autoplay={false}
          className={`
            object-cover
            w-full h-full
            ${isPotrait ? 'scale-[1.4] md:scale-125' : 'scale-110'}
            ${screenSize.width < 640 ? 'transform translate-y-[-5%]' : ''}
          `}
          style={{
            // Fine-tune positioning based on screen dimensions
            objectPosition: isPotrait ? 'center center' : '50% 50%',
            maxWidth: 'none'
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
