"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";

const AboutUs: React.FC = () => {
  const [lineHeight, setLineHeight] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / documentHeight) * 100;

      // Smooth transition using requestAnimationFrame
      requestAnimationFrame(() => {
        setLineHeight(scrollPercentage);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className=" py-8 px-4 sm:px-6 md:px-10 bg-black text-white">
      <div className="flex md:flex-row justify-between items-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-vasion text-center md:text-left">
          ABOUT US
        </h1>
        <div className="flex items-center mt-4 md:mt-0">
          {/* */}{" "}
          <div className="bg-brown rounded-full w-9 h-9 sm:w-14 sm:h-14 flex justify-center items-center">
            <GoArrowRight className="text-white text-2xl sm:text-5xl rotate-[140deg]" />
          </div>
          <div className="text-1xl sm:text-3xl border py-2 px-6 sm:px-10 rounded-full italic ">
            here
          </div>
        </div>
      </div>

      <div className="flex justify-center md:justify-end text-2xl sm:text-3xl md:text-4xl font-vasion mt-6 md:m-6 text-center md:text-right">
        <div>- The Journey of Crafting Brilliance</div>
      </div>

      <div className="flex justify-center w-full text-center mt-4">
        <div className="w-full md:w-4/5 text-sm sm:text-base">
          At Odessa, we believe in redefining luxury with sustainably crafted,
          lab-grown diamonds that embody purity, brilliance, and ethical
          responsibility. Our journey is a testament to innovation, passion, and
          a commitment to a brighter, more sustainable future.
        </div>
      </div>

      <div className="mt-10 relative space-y-10">
        {/* Vertical Center Line */}
        <div className="content absolute md:left-1/2 rounded-2xl  transform -translate-x-2/4 border-1 border-gray-100 h-full"></div>
        <div
          className="absolute md:left-1/2 rounded-2xl transform -translate-x-1/2 w-[3px] bg-brown transition-all duration-500 ease-out"
          style={{ height: `${lineHeight}%` }}
        ></div>

        {/* Vision Section */}
        <div className="flex flex-col md:flex-row  md:justify-between gap-2 p-4 sm:p-6 rounded-lg">
          <div className="md:w-1/2 pl-10">
            <div className="md:w-9/12 h-62 ">
              <Image
                src="/images/aboutus1.jpg"
                width={300}
                height={300}
                alt="Vision"
                className="rounded-lg shadow-lg w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-sm sm:text-lg md:w-2/5">
            <div className="text-lg sm:text-xl flex ">
              {/*  <div className="w-6 h-6 bg-brown rounded-full"></div> */}{" "}
              <div className="ml-10"></div> The vision - A Spark of Change (Year
              1)
            </div>
            <p className="text-xs sm:text-sm text-gray-100 leading-relaxed mt-2 ml-10">
              Our story began with a simple yet profound question: &quot;How can
              we offer the beauty of diamonds without harming the Earth?&quot;
              <br></br>
              Traditional diamond mining comes with ethical and environmental
              challenges. Seeing the demand for a sustainable alternative, we
              embarked on a mission to{" "}
              <span className="text-white font-bold">
                create lab-grown diamonds that match the brilliance, durability,
                and beauty of mined diamonds
              </span>
              —without the environmental cost. With a team of scientists,
              gemologists, and designers, we explored cutting-edge technology to
              craft diamonds that are chemically, physically, and optically
              identical to natural diamonds.
            </p>
          </div>
        </div>

        {/* Innovation Section */}
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6 p-4 sm:p-6 rounded-lg">
          <div className="text-sm sm:text-lg  ml-10 md:w-2/5">
            <div className="text-lg sm:text-xl flex items-center">
              <div>The Innovation - Perfecting Craft(Year 3-5)</div>
              {/*   <div className="w-6 h-6  bg-gray-400 rounded-full ml-auto"></div> */}
            </div>

            <p className="text-xs sm:text-sm text-gray-100 leading-relaxed mt-2 md:mr-10">
              Our passion for excellence led us to refine the process of diamond
              creation. Using advanced CVD (Chemical Vapor Deposition) and HPHT
              (High Pressure High Temperature) methods, we began growing pure
              carbon diamonds in a controlled environment.
              <br></br>
              100% Conflict-Free – No unethical mining practices
              <br></br>
              Eco-Friendly – Reduced carbon footprint & water usage
              <br></br>
              Affordability Without Compromise – Luxury diamonds at a fraction
              of the cost
              <br></br>
              With each passing year, we continued innovating and perfecting our
              diamonds—ensuring they meet the highest standards of quality and
              brilliance.
            </p>
          </div>

          <div className="md:w-2/5 ">
            <div className="md:w-10/12 h-62 ml-10">
              <Image
                src="/images/aboutus2.jpg"
                width={300}
                height={300}
                alt="Innovation"
                className="rounded-lg shadow-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Luxury Diamonds Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-4 sm:p-6 rounded-lg ml-10">
          <div className="md:w-1/2">
            <div className="md:w-9/12 h-62">
              {" "}
              {/* Increased height */}
              <Image
                src="/images/aboutus3.jpg"
                width={300}
                height={300} // Adjust height here
                alt="Diamonds"
                className="rounded-lg shadow-lg w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-sm sm:text-lg md:w-2/5">
            <div className="flex  text-lg sm:text-xl">
              {/*  <div className="w-6 h-6  bg-gray-400 rounded-full"></div>*/}{" "}
              <div className="md:ml-10">
                {" "}
                The Innovation - Perfecting Craft<br></br>(Year 5-7)
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-100 leading-relaxed mt-2 md:ml-10">
              Today, we proudly craft exquisite lab-grown diamonds that tell a
              story of love, responsibility, and innovation. Our diamonds are
              now cherished by couples, jewelry lovers, and ethical consumers
              worldwide. Whether it’s an engagement ring, a timeless necklace,
              or a bespoke design, every piece we create represents a future
              where luxury and sustainability go hand in hand.<br></br>✨ Join
              us in embracing a new era of diamonds—where brilliance meets
              responsibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
