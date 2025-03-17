import React from "react";

const JewelleryDescription: React.FC = () => {
  const title = " ' WE ARE MAKING BESPOKE JUWELARIES '";
  const description =
    "At Odessa Jewellery, we combine premium diamonds with expert craftsmanship to create bespoke pieces. Our designs blend modern style with timeless elegance, reflecting your unique taste.";

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-7 bg-black">
      <div className="w-full  bg-brown rounded-sm text-[#f3f3f3] px-4 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-7 ">
        <h1 className="lg:text-8xl md:text-6xl text-4xl font-bold mb-4 font-vasion">
          {title}
        </h1>
        <p className="text-xl leading-relaxed font-aeonikregularitalic">
          {description}
        </p>
      </div>
    </div>
  );
};

export default JewelleryDescription;
