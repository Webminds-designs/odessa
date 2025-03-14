"use client";
import React, { useState, useEffect } from "react";
import ProductCards from "../components/ProductCards";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import Link from "next/link";
import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

// Define an interface for the diamond object
interface Diamond {
  _id: string;
  id: string;
  name: string;
  price: string;
  cut: string;
  shape: string;
  shortDescription: string;
  description: string;
  diamondCutDesign: string;
  carat: number;
  measurements: string;
  images: string[];
}

// A skeleton component to mimic a ProductCard while loading
const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-200 rounded-xl p-5 animate-pulse">
      {/* Image placeholder */}
      <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
      {/* Title placeholder */}
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      {/* Subtitle placeholder */}
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

const CollectionPage: React.FC = () => {
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>({});

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  useEffect(() => {

    // Get the user from localStorage
    if (typeof window !== 'undefined' && window.localStorage) {      
      const user = JSON.parse(localStorage?.getItem("user") || "{}");
      setUser(user);
    }
    
    const fetchDiamonds = async () => {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        // Assuming your API returns an object with a "products" property
        setDiamonds(data.products || []);
      } catch (err) {
        console.error("Error fetching diamonds:", err);
        setError("Failed to fetch diamonds");
      } finally {
        setLoading(false);
      }
    };

    fetchDiamonds();
  }, []);

  // Fetch user's favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch("/api/favorites", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) throw new Error("Failed to fetch favorites");

        const data = await res.json();
        console.log("data", data);
        // Update this line to correctly access the favorites data
        const userFavorite = data.favourites.find((fav: { userId: any; }) => fav.userId === user.id);
        setFavorites(userFavorite?.products || []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast.error("Error fetching favorites", {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    };

    if (user.id) {
      fetchFavorites();
    }
  }, [user.id]);

  // Handle favorite toggle
  const handleFavoriteToggle = async (productId: string) => {
    const isCurrentlyFavorite = favorites.includes(productId);
    const method = isCurrentlyFavorite ? "DELETE" : "POST";

    try {
      const res = await fetch("/api/favorites", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user.id,
          product: productId,
        }),
      });

      if (!res.ok) throw new Error("Failed to update favorites");

      if (isCurrentlyFavorite) {
        setFavorites(prev => prev.filter(id => id !== productId));
        toast.success("Removed from favorites!", {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      } else {
        setFavorites(prev => [...prev, productId]);
        toast.success("Added to favorites!", {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      toast.error("Error updating favorites", {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  // Calculate total pages and current page items
  const totalItems = diamonds.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentData = diamonds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers for pagination
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary px-2 py-6 sm:px-2 md:px-6 lg:px-16 font-aeonikregular">
        {/* Page Title */}
        <h2 className="font-vasion text-4xl lg:text-9xl mb-10 px-4">
          Your Brilliance
          <br /> Begins
        </h2>
        {/* Render skeleton cards */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {Array.from({ length: itemsPerPage }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-primary px-2 py-6 sm:px-2 md:px-6 lg:px-16 font-aeonikregular">
      {/* Page Title */}
      <h2 className="font-vasion text-4xl lg:text-9xl mb-10 px-4">
        Your Brilliance
        <br /> Begins
      </h2>

      {/* Responsive grid */}
      <AnimatePresence>
        <div className="flex flex-wrap justify-center gap-5">
          {currentData.map((diamond: Diamond) => (
            <div key={diamond.id}>
              <ProductCards
                diamond={diamond}
                isFavourited={favorites.includes(diamond._id)}
                onFavouriteToggle={handleFavoriteToggle}
              />
            </div>
          ))}
        </div>
      </AnimatePresence>

      {/* Pagination controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex items-center gap-2 bg-transparent text-white px-4 py-2 rounded-l disabled:opacity-50 hover:text-brown cursor-pointer"
        >
          <GoArrowLeft className="text-lg sm:text-xl" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <span className="text-white text-sm sm:text-base">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 bg-transparent text-white px-4 py-2 rounded-r disabled:opacity-50 hover:text-brown cursor-pointer"
        >
          <span className="hidden sm:inline">Next</span>
          <GoArrowRight className="text-lg sm:text-xl" />
        </button>
      </div>
    </div>
  );
};

export default CollectionPage;
