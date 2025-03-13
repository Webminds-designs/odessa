"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProductCards from "../../components/ProductCards";
import { toast, ToastContainer } from "react-toastify";

type Diamond = {
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
};

function DiamondDisplay() {
  const { id } = useParams();

  // State for selected diamond (fetched via API)
  const [selectedDiamond, setSelectedDiamond] = useState<Diamond | undefined>(
    undefined
  );
  // State for all diamonds (for similar diamonds)
  const [allDiamonds, setAllDiamonds] = useState<Diamond[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the single diamond based on the URL parameter
  useEffect(() => {
    const fetchDiamond = async () => {
      if (id) {
        try {
          const res = await fetch(`/api/product/${id}`);
          const data = await res.json();
          if (data.product) {
            setSelectedDiamond(data.product);
          } else {
            setError("Diamond not found");
          }
        } catch (err) {
          console.error("Error fetching diamond:", err);
          setError("Failed to fetch diamond");
        }
      }
    };
    fetchDiamond();
  }, [id]);

  // Fetch all diamonds for the similar diamonds section
  useEffect(() => {
    const fetchAllDiamonds = async () => {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        if (data.products) {
          setAllDiamonds(data.products);
        }
      } catch (err) {
        console.error("Error fetching all diamonds:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllDiamonds();
  }, []);

  // Update selected image when selected diamond changes
  useEffect(() => {
    if (selectedDiamond) {
      setSelectedImage(selectedDiamond.images[0]);
    }
  }, [selectedDiamond]);

  if (loading) return <div>Loading...</div>;
  if (error || !selectedDiamond)
    return <div>{error || "Diamond not found"}</div>;

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the click from bubbling to parent elements (like Link)
    e.stopPropagation();

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "67d15ba3d12ba9bc35027815", // fixed userID
          product: selectedDiamond._id,
          quantity: 1,
        }),
      });

      // Log response status for debugging
      console.log("Response status:", res.status);

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error response from API:", errorData);
        throw new Error("Failed to add to cart");
      }

      const data = await res.json();
      console.log("Added to cart:", data);
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding product to cart");
    }
  };

  return (
    <>
      <div className="bg-primary text-white min-h-screen relative overflow-hidden font-aeonikregular">
        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Main product display */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12 items-center">
            {/* Main diamond image */}
            <div className="lg:w-1/2 relative flex justify-center">
              <div className="relative mb-4 rounded-full w-full h-full mx-auto overflow-hidden group">
                <img
                  src={selectedImage}
                  alt={selectedDiamond.name}
                  className="w-full h-full object-fit transition-transform duration-700"
                />
              </div>
            </div>

            {/* Product details */}
            <div className="lg:w-2/5">
              <h1 className="text-3xl fmb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent font-vasion font-bold">
                {selectedDiamond.name}
              </h1>
              <div className="w-16 h-1 bg-brown mb-6"></div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {selectedDiamond.description}
              </p>

              {/* Diamond specifications */}
              <div className="mb-6 grid grid-cols-2 gap-4 bg-gray-900/50 p-4 rounded-lg">
                <h3 className="text-sm uppercase tracking-wider text-gray-400">
                  Specifications
                </h3>
                <p className="flex flex-col">
                  <span className="text-xs text-gray-400">Shape</span>
                  <span className="text-sm">{selectedDiamond.cut}</span>
                </p>
                <p className="flex flex-col">
                  <span className="text-xs text-gray-400">Carat</span>
                  <span className="text-sm">{selectedDiamond.carat}</span>
                </p>
                <p className="flex flex-col">
                  <span className="text-xs text-gray-400">Measurements</span>
                  <span className="text-sm">
                    {selectedDiamond.measurements}
                  </span>
                </p>
                <p className="flex flex-col">
                  <span className="text-xs text-gray-400">Cut Design</span>
                  <span className="text-sm">
                    {selectedDiamond.diamondCutDesign}
                  </span>
                </p>
              </div>
              <div className="flex justify-between items-center mb-6 p-4 rounded-lg shadow-inner">
                <span className="font-medium">Price</span>
                <span className="text-xl font-light text-brown">
                  {selectedDiamond.price} £
                </span>
              </div>

              {/* Add to cart button */}
              <button
                className="w-full bg-brown hover:bg-white text-white hover:text-black py-3 text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-amber-80 flex items-center justify-center gap-2 group cursor-pointer"
                onClick={handleAddToCart}
              >
                <span>Add to cart</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Similar diamonds section */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <h2 className="text-2xl font-light mb-8 relative">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Similar {selectedDiamond.cut} Diamonds
              </span>
              <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mt-2"></div>
            </h2>
            <div className="w-full flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 items-center justify-items-center">
                {allDiamonds
                  .filter(
                    (diamond: Diamond) =>
                      diamond.shape === selectedDiamond.shape &&
                      diamond.id !== selectedDiamond.id
                  )
                  .slice(0, 3)
                  .map((diamond: Diamond) => (
                    <ProductCards key={diamond.id} diamond={diamond} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center" theme="dark" />
    </>
  );
}

export default DiamondDisplay;
