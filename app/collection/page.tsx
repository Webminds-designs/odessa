"use client";
import React, { useState } from "react";
import diamonds from "../../public/images/diamonds.js";
import ProductCards from "../components/ProductCards";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import Link from "next/link";

const CollectionPage = () => {
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);

  // 8 items per page for consistent pagination
  const itemsPerPage = 8;

  // Calculate total pages
  const totalItems = diamonds.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Slice the data for the current page
  const currentData = diamonds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers for next/previous
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-primary px-2 py-6 sm:px-2 md:px-6 lg:px-16 font-aeonikregular">
      {/* Page Title */}
      <h2 className="font-vasion text-4xl lg:text-9xl mb-10 px-4">
        Your Brilliance
        <br /> Begins
      </h2>

      {/* Responsive grid with auto-fit so cards don't overlap */}
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
      >
        {currentData.map((diamond) => (
          <Link href={`/product/${diamond.id}`} key={diamond.id}>
            <ProductCards diamond={diamond} />
          </Link>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex items-center gap-2 bg-transparent text-white px-4 py-2 
                     rounded-l disabled:opacity-50 hover:text-brown cursor-pointer"
        >
          <GoArrowLeft className="text-lg sm:text-xl" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page indicator (optional) */}
        <span className="text-white text-sm sm:text-base">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 bg-transparent text-white px-4 py-2 
                     rounded-r disabled:opacity-50 hover:text-brown cursor-pointer"
        >
          <span className="hidden sm:inline">Next</span>
          <GoArrowRight className="text-lg sm:text-xl" />
        </button>
      </div>
    </div>
  );
};

export default CollectionPage;
