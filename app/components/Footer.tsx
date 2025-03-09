import React from "react";
import { GoArrowRight } from "react-icons/go";

const Footer = () => {
  return (
    <div className="w-full h-fit  md:h-11/12 md:py-8 text-white flex flex-col items-center justify-center gap-4 px-4 md:px-16 bg-black">
      <div className="flex flex-col text-wrap font-vasion text-3xl md:text-8xl w-full text-left gap-2">
        <div>GET the Last Infromation</div>
        <div className="flex  gap-2">From Us</div>
      </div>
      <div className="py-3 w-full h-fit  flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="flex w-full md:w-1/2 relative">
          <input
            type="email"
            placeholder="Your Email here"
            className="bg-[#202020] px-4 py-3 h-10 md:h-16 w-full rounded-full"
          />
          <div className="rounded-full h-10 w-10 bg-white absolute right-0 flex items-center justify-center hover:bg-[#A07648] cursor-pointer">
            <GoArrowRight className="text-black text-lg" />
          </div>
        </div>
        <div className="text-wrap w-full md:w-1/3 text-xl font-aeonikregularitalic">
          Experience timeless brilliance with{" "}
          <span className="text-[#A07648]">Odessa’s</span> exclusive diamond
          collections. Subscribe for the latest offers and insights to shine
          with unmatched elegance.
        </div>
      </div>
      <div className="w-full h-[100px] md:h-[200px]"></div>
      <hr className="w-full border-1 border-solid border-white opacity-80"></hr>
      <div className="w-full flex md:flex-row md:justify-between flex-col items-center font-aeonikregularitalic ">
        <div className="w-fit text-sm text-center md:text-left">
          @2025 All right Reserved. Developed by WebMinds
        </div>
        <div className="w-fit flex flex-col md:flex-row justify-end items-center text-sm ">
          {[
            "Home",
            "About Us",
            "Contact Us",
            "Privacy Policy",
            "Terms & Conditions",
          ].map((link, index) => (
            <div
              key={index}
              className="px-4 border-2 border-white rounded-full py-1 cursor-pointer hover:bg-white hover:text-black"
            >
              {link}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
