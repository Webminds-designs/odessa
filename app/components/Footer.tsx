import React from "react";
import { GoArrowRight } from "react-icons/go";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-fit md:h-11/12 md:py-8 text-white flex flex-col items-center justify-center gap-4 px-4 md:px-16 bg-black"
    >
      {/* Top Section: Title and Blog Description */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full h-fit flex lg:flex-row flex-col items-start justify-center gap-4"
      >
        <div className="flex flex-col font-vasion text-3xl md:text-8xl w-full text-left gap-2 ">
          <div>GET the Last Information</div>
          <div className="relative flex w-fit">
            <span className="mr-5">From Us</span>
            <div className="absolute -right-8 rounded-full h-12 w-12 lg:h-20 lg:w-20 bg-white" />
            <div className="flex items-center justify-center rounded-full h-12 w-12 lg:h-20 lg:w-20 bg-brown text-white text-2xl lg:text-6xl hover:bg-white hover:text-brown transition-colors duration-300 cursor-pointer z-10">
              <GoArrowRight />
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full text-lg font-aeonikregularitalic md:px-6 px-3 lg:px-12 lg:py-8 md:py-2 py-1 flex flex-col gap-2 bg-[#202020] rounded-lg">
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            Meghan Markle Wears Lab-Grown Ethical Diamonds
          </h2>
          <div className="relative w-full lg:w-1/2 rounded-lg overflow-hidden shadow-lg group">
            <img
              src="/images/magon.png"
              alt="Meghan Markle Lab-Grown Ethical Diamonds"
              className="w-full h-auto object-cover"
            />
            <a
              href="https://people.com/royals/meghan-markle-wears-lab-grown-ethical-diamonds-she-really-loved-these-earrings/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <span className="text-white text-lg md:text-2xl font-bold">
                Read More
              </span>
            </a>
          </div>
          <p className="text-xl text-gray-300 text-center px-4">
            The Duchess of Sussex dazzles in sustainable style as she showcases
            her favorite lab-grown diamond earrings—merging elegance with
            eco-friendly fashion.
          </p>
        </div>
      </motion.div>

      {/* Subscription and Description Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="py-3 w-full h-fit flex flex-col md:flex-row justify-between items-end gap-12"
      >
        <div className="flex w-full md:w-1/2 relative">
          <input
            type="email"
            placeholder="Your Email here"
            className="bg-[#202020] px-4 py-3 h-10 md:h-16 w-full rounded-full"
          />
          <div className="absolute right-0 -translate-y-[0.5vw] flex items-center justify-center rounded-full h-12 w-12 lg:h-20 lg:w-20 bg-white text-primary text-2xl lg:text-6xl hover:bg-brown hover:text-white transition-colors duration-300 cursor-pointer">
            <GoArrowRight />
          </div>
        </div>
        <div className="text-wrap w-full md:w-1/3 text-xl font-aeonikregularitalic">
          Experience timeless brilliance with{" "}
          <span className="text-[#A07648]">Odessa’s</span> exclusive diamond
          collections. Subscribe for the latest offers and insights to shine
          with unmatched elegance.
        </div>
      </motion.div>

      {/* Spacer */}
      <div className="w-full h-[100px] md:h-[200px]"></div>
      <hr className="w-full border border-white opacity-80" />

      {/* Bottom Section: Copyright and Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="w-full flex md:flex-row md:justify-between flex-col items-center font-aeonikregularitalic"
      >
        <div className="w-fit text-sm text-center md:text-left">
          @2025 All right Reserved. Developed by WebMinds
        </div>
        <div className="w-fit flex flex-col md:flex-row justify-end items-center text-sm gap-2">
          <Link
            href="/"
            className="px-4 border-2 border-white rounded-full py-1 cursor-pointer hover:bg-white hover:text-black"
          >
            Home
          </Link>
          <Link
            href="/aboutus"
            className="px-4 border-2 border-white rounded-full py-1 cursor-pointer hover:bg-white hover:text-black"
          >
            About Us
          </Link>
          <Link
            href="/#contact"
            className="px-4 border-2 border-white rounded-full py-1 cursor-pointer hover:bg-white hover:text-black"
          >
            Contact Us
          </Link>
          <Link
            href="/privacy-policy"
            className="px-4 border-2 border-white rounded-full py-1 cursor-pointer hover:bg-white hover:text-black"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="px-4 border-2 border-white rounded-full py-1 cursor-pointer hover:bg-white hover:text-black"
          >
            Terms &amp; Conditions
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
