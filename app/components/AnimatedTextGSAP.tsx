"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextGSAPProps {
  text?: string;
}

const AnimatedTextGSAP: React.FC<AnimatedTextGSAPProps> = ({ text = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!text) return;

    // Select all .word elements inside containerRef with proper type
    const words =
      containerRef.current?.querySelectorAll<HTMLSpanElement>(".word");

    if (!words || words.length === 0) return;

    // Set initial opacity for each word
    gsap.set(words, { opacity: 0.2 });

    // Animate words as they scroll into view
    gsap.to(words, {
      opacity: 1,
      ease: "power1.out",
      stagger: 0.5, // Adjust delay between words
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    });
  }, [text]);

  return (
    <div ref={containerRef} className="p-8 bg-black font-vasion ">
      <p className="w-full text-left text-lg md:text-2xl lg:text-5xl leading-relaxed">
        {/* Split text into words and wrap each in a span */}
        {text.split(" ").map((word, index) => (
          <span key={index} className="word inline-block mr-2">
            {word}
          </span>
        ))}
      </p>
    </div>
  );
};

export default AnimatedTextGSAP;
