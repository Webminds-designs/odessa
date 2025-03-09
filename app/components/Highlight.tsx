import React from "react";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";

const persons = [
  {
    src: "/images/person1.png",
    right: "right-[72px] sm:right-[84px] md:right-[96px]",
  },
  {
    src: "/images/person2.png",
    right: "right-[48px] sm:right-[56px] md:right-[64px]",
  },
  {
    src: "/images/person3.png",
    right: "right-[24px] sm:right-[28px] md:right-[32px]",
  },
  { src: "/images/person4.png", right: "right-0" },
];

const Highlight = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-7 w-full px-4 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-7 bg-black">
      {/* First Card */}
      <div className="flex flex-col sm:flex-row bg-zinc-900 px-4 sm:px-6 md:px-10 py-5 sm:py-6 md:py-8 rounded-xl gap-4 sm:gap-6 md:gap-10 w-full">
        {/* diamond image - fixed positioning issues */}
        <div className="relative w-24 sm:w-32 md:w-40 h-32 sm:h-36 md:h-40 mx-auto sm:mx-0 flex items-center justify-center">
          <Image
            src="/images/diamond1.png"
            alt="diamond"
            width={160}
            height={160}
            className="w-full h-auto object-contain"
          />
          <div className="bg-brown h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full absolute -right-2 sm:-right-3 md:-right-4 top-1/2 flex items-center justify-center">
            <GoArrowRight className="text-white text-xl sm:text-2xl" />
          </div>
        </div>

        <div className="flex flex-col space-y-2 sm:space-y-3 text-center sm:text-left">
          <h2 className="font-aeonikbolditalic text-gray-400 text-xs sm:text-sm md:text-xl">
            Discover brilliance in every facet
          </h2>
          <p className="flex flex-col font-vasion text-lg sm:text-2xl md:text-3xl lg:text-5xl leading-tight">
            <span>Shop exquisitely </span>
            <span>finished and finely cut </span>
            <span>diamonds</span>
          </p>
        </div>
      </div>

      {/* Second Card */}
      <div className="bg-brown px-4 sm:px-6 md:px-10 py-5 sm:py-6 md:py-8 rounded-xl flex flex-col gap-4 sm:gap-6 md:gap-10 w-full lg:w-[40%] xl:w-1/3">
        <p className="font-aeonikbolditalic flex flex-col text-center sm:text-left text-xs sm:text-sm md:text-xl">
          <span>Users and Supportive</span>
          <span>Community</span>
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <p className="font-vasion text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            4.8K
          </p>
          <div className="flex relative h-12 sm:h-14 md:h-16">
            <div className="w-[120px] sm:w-[140px] md:w-[160px] relative">
              {persons.map((person, index) => (
                <div
                  key={index}
                  className={`rounded-full border-2 border-brown w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 
                                    hover:scale-110 hover:-translate-y-1 transition-transform duration-300 absolute ${person.right}`}
                >
                  <img
                    src={person.src}
                    alt={`community member ${index + 1}`}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlight;
