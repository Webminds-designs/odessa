"use client";

import React from "react";
import AnimatedTextGSAP from "./AnimatedTextGSAP";

const Description: React.FC = () => {
  const text = `
“When making an important purchase like a diamond, it’s essential to compare prices with trusted industry benchmarks. That’s why we align our pricing with leading online retailers such as Blue Nile and James Allen, ensuring our customers receive exceptional value without compromising on quality. Our transparent pricing model allows you to shop with confidence, knowing you’re getting a competitive price that reflects industry standards.”

`;
  const text1 = "“Industry-Leading Pricing Transparency”";

  return (
    <div className="w-full py-24 px-4 bg-black">
      <AnimatedTextGSAP text={text1} />

      <AnimatedTextGSAP text={text} />
    </div>
  );
};

export default Description;
