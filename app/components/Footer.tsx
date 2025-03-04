import React from "react";
import { GoArrowRight } from "react-icons/go";

const Footer = () => {
  return (
    <div className="w-full h-11/12 mt-36 text-white flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col text-wrap font-vasion text-8xl w-full text-left gap-2">
        <div>GET the Last Infromation</div>
        <div className="flex gap-2">
          From Us
          <span className="flex  relative h-full items-end p-2">
            <div className="rounded-full h-[80px] w-[80px] bg-white absolute -right-30 " />
            <div className="rounded-full h-[80px] w-[80px] bg-[#A07648] absolute  flex items-center">
              <GoArrowRight className="w-20" />
            </div>
          </span>
        </div>
      </div>
      <div className="py-3 w-full h-fit  flex justify-between items-end gap-12">
        <div className="flex w-1/2 relative">
          <input
            type="email"
            placeholder="Your Email here"
            className="bg-[#202020] px-4 py-3 h-16 w-full rounded-full"
          />
          <div className="rounded-full h-16 w-16 bg-white absolute right-0 flex items-center justify-center hover:bg-[#A07648] cursor-pointer">
            <GoArrowRight className="text-black w-8" />
          </div>
        </div>
        <div className="text-wrap w-1/3 text-xl">
          Experience timeless brilliance with{" "}
          <span className="text-[#A07648]">Odessa’s</span> exclusive diamond
          collections. Subscribe for the latest offers and insights to shine
          with unmatched elegance.
        </div>
      </div>
      <div className="w-full h-[200px]"></div>
      <hr className="w-full border-1 border-solid border-white opacity-80"></hr>
    </div>
  );
};

export default Footer;
