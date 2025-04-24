import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroContent = () => {
  return (
    <div className="absolute bottom-0 w-full h-screen px-6 mb-4 md:mb-0 md:px-24">
      <div className="flex flex-col items-start justify-end md:justify-center w-full md:w-2/3 h-screen text-start text-white gap-8 md:gap-16">
        <Image
          src="/images/odessa.png"
          alt="logo"
          width={100}
          height={100}
          className="hidden md:visible"
        />

        <div className="flex flex-col gap-2">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-sm md:text-lg w-2/3 font-aeonikregularitalic ">
            Our young and expert design the most exquisite jewelry for you to
            shine in a special way in the world
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-vasion">
            Diamonds that reflect your uniqueness.
          </motion.div>
        </div>
        <div className="w-fit h-fit flex gap-0 font-aeonikregularitalic">
          <Link href="/collection">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="group relative inline-block">
              <div
                className="relative px-4 py-2 bg-white text-black rounded-full cursor-pointer overflow-hidden  border-white border-2 ">
                {/* Animated overlay */}
                <span className="absolute inset-0 bg-brown transform -translate-x-full transition-transform duration-600 group-hover:translate-x-0"></span>
                {/* Button text */}
                <span className="relative z-10 transition-colors duration-600 text-sm md:text-lg group-hover:text-white ">
                  Order Now
                </span>
              </div>
            </motion.div>
          </Link>

          <Link href="/collection">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="group relative inline-block">
              <div className="relative px-4 py-2 bg-transparent text-white border-solid border-white border-2 rounded-full cursor-pointer overflow-hidden  ">
                {/* Animated overlay */}
                <span className="absolute inset-0 bg-brown transform -translate-x-full transition-transform duration-600 group-hover:translate-x-0"></span>
                {/* Button text */}
                <span className="relative z-10 transition-colors duration-600 text-sm md:text-lg group-hover:text-white ">
                  See Collection
                </span>
              </div>
            </motion.div>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
