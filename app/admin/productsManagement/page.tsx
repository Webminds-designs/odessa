"use client";
import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaBell,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCamera,
} from "react-icons/fa";

type Product = {
  _id?: string; // MongoDB ID
  id: number; // Internal numeric ID
  productId: string; // Display ID, e.g. "#0934"
  name: string; // Product name
  shape: string; // Shape (e.g. "Round Diamond")
  price: string; // e.g. "1,750.00 $"
  diamondCutDesign: string; // e.g. "Cushion brilliant"
  measurements: string; // e.g. "5.95*5.86*3.74"
  shortDescription: string; // short desc
  description: string; // longer desc
  image?: string; // image URL or path
  cut?: string; // Added from API model
  carat?: number; // Added from API model
  images?: string[]; // Added from API model
};

export default function ProductManagementPage() {
  // List of products
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Track which row is expanded for "view"
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  // Search query
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product");

        if (!res.ok) {
          throw new Error(`API responded with status: ${res.status}`);
        }

        const data = await res.json();

        if (data.products && Array.isArray(data.products)) {
          console.log("Products fetched successfully:", data.products);
          // Detailed inspection of first product (if exists)
          if (data.products.length > 0) {
            console.log("First product details:", {
              id: data.products[0].id,
              _id: data.products[0]._id,
              name: data.products[0].name,
              price: data.products[0].price,
              shape: data.products[0].shape,
              diamondCutDesign: data.products[0].diamondCutDesign,
              measurements: data.products[0].measurements,
              shortDescription: data.products[0].shortDescription,
              description: data.products[0].description,
              images: data.products[0].images,
              cut: data.products[0].cut,
              carat: data.products[0].carat,
            });
          }
          setProducts(data.products);
        } else {
          console.warn("API response doesn't contain products array:", data);
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products from the database.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle row expansion
  const handleRowClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Handle delete
  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // prevent row expand
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      // Find the product with MongoDB _id to delete
      const productToDelete = products.find((p) => p.id === id);
      if (!productToDelete || !productToDelete._id) {
        throw new Error("Product not found or missing _id");
      }

      // API call to delete the product from database
      const res = await fetch(`/api/product/${productToDelete._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete product");
      }

      // Update UI on success
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      setError(
        "Failed to delete product: " +
          (err instanceof Error ? err.message : String(err))
      );
    }
  };

  // Handle edit
  const handleEdit = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // prevent row expand
    setModalProduct(product);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  // Handle add new
  const handleAddNew = () => {
    setModalProduct({
      id: Math.max(0, ...products.map((p) => p.id || 0)) + 1,
      productId: `#${Math.floor(1000 + Math.random() * 9000)}`,
      name: "",
      shape: "",
      price: "",
      diamondCutDesign: "",
      measurements: "",
      shortDescription: "",
      description: "",
    });
    setModalMode("add");
    setIsModalOpen(true);
  };

  // Handle modal save
  const handleModalSave = async (product: Product) => {
    try {
      if (modalMode === "add") {
        // Make sure we have all required fields with proper types
        const productToSend = {
          ...product,
          // Convert id to string if it's not already
          id: String(product.id),
          // Ensure these required fields are present
          cut: product.cut || product.shape, // Fallback to shape if cut isn't provided
          carat: product.carat || 1.0, // Default carat value if not provided
          // Ensure images is an array
          images:
            product.images || product.image
              ? [product.image]
              : ["/images/default-diamond.png"],
        };

        console.log("Sending product data:", productToSend);

        // API call to add a new product
        const res = await fetch("/api/product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productToSend),
        });

        // Log response for debugging
        const responseText = await res.text();
        console.log("API response status:", res.status);
        console.log("API response text:", responseText);

        if (!res.ok) {
          throw new Error(`Failed to create product: ${responseText}`);
        }

        // Parse the response as JSON (after we've already read it as text)
        const data = JSON.parse(responseText);
        setProducts([...products, data.product]);
      } else {
        // Get the existing product with MongoDB _id
        const existingProduct = products.find((p) => p.id === product.id);
        if (!existingProduct || !existingProduct._id) {
          throw new Error("Product not found or missing _id");
        }

        // API call to update an existing product
        const res = await fetch(`/api/product/${existingProduct._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to update product");
        }

        const data = await res.json();
        console.log("Product updated:", data);

        // Update the UI
        setProducts(
          products.map((p) => (p.id === product.id ? { ...p, ...product } : p))
        );
      }

      // Close the modal on success
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving product:", err);
      setError(
        "Failed to save product: " +
          (err instanceof Error ? err.message : String(err))
      );
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      (product.name &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.productId &&
        product.productId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.shape &&
        product.shape.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Display error if any */}
      {error && <div className="bg-red-800 p-2 mb-4 rounded">{error}</div>}

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Product Management</h1>
        <div className="flex items-center gap-3">
          {/* Add Product */}
          <button
            className="bg-brown text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-900 transition"
            onClick={handleAddNew}
          >
            <FaPlus /> Add Product
          </button>
          {/* Search Bar */}
          <div className="relative text-gray-400 focus-within:text-gray-600">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch />
            </span>
            <input
              type="search"
              className="bg-[#1a1a1a] text-white rounded-md pl-10 pr-4 py-2 focus:outline-none"
              placeholder="Search..."
            />
          </div>

          {/* Notification Icon */}
          <button className="relative p-2 rounded-full hover:bg-[#1a1a1a] transition-colors">
            <FaBell />
          </button>

          {/* Admin Avatar / Name */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="font-bold">A</span>
            </div>
            <span className="hidden md:inline">Admin</span>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-2 font-semibold">Product</th>
              <th className="py-3 px-2 font-semibold">Product ID</th>
              <th className="py-3 px-2 font-semibold">Product name</th>
              <th className="py-3 px-2 font-semibold">Price</th>
              <th className="py-3 px-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <React.Fragment key={product._id || product.id}>
                  <tr
                    className={`border-b border-gray-700 hover:bg-gray-900 cursor-pointer transition ${
                      expandedId === product.id ? "bg-gray-900" : ""
                    }`}
                    onClick={() => handleRowClick(product.id)}
                  >
                    <td className="py-3 px-2">
                      <div className="h-10 w-10 rounded-lg bg-gray-700 flex items-center justify-center">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 object-cover rounded-lg"
                          />
                        ) : product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-10 w-10 object-cover rounded-lg"
                          />
                        ) : (
                          <FaCamera className="text-gray-500" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2">{product.id}</td>
                    <td className="py-3 px-2">{product.name}</td>
                    <td className="py-3 px-2">{product.price}</td>
                    <td className="py-3 px-2">
                      <div className="flex gap-2">
                        <button
                          className="p-2 bg-none rounded cursor-pointer transition"
                          onClick={(e) => handleEdit(e, product)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="p-2 bg-red-600 rounded hover:bg-red-700 transition"
                          onClick={(e) => handleDelete(e, product.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedId === product.id && (
                    <tr className="bg-gray-900">
                      <td colSpan={5} className="py-4 px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold mb-2">Shape</h3>
                            <p>{product.shape}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">
                              Diamond Cut Design
                            </h3>
                            <p>{product.diamondCutDesign}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Measurements</h3>
                            <p>{product.measurements}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">
                              Short Description
                            </h3>
                            <p>{product.shortDescription}</p>
                          </div>
                          <div className="md:col-span-2">
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p>{product.description}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center">
                  {searchQuery
                    ? "No products found matching your search."
                    : "No products available in the database."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Product Modal */}
      {isModalOpen && modalProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {modalMode === "add" ? "Add New Product" : "Edit Product"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Product ID</label>
                <input
                  type="text"
                  className="bg-gray-700 text-white px-3 py-2 rounded w-full"
                  value={modalProduct.id}
                  onChange={(e) =>
                    setModalProduct({
                      ...modalProduct,
                      productId: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block mb-1">Product Name</label>
                <input
                  type="text"
                  className="bg-gray-700 text-white px-3 py-2 rounded w-full"
                  value={modalProduct.name}
                  onChange={(e) =>
                    setModalProduct({
                      ...modalProduct,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block mb-1">Shape</label>
                <input
                  type="text"
                  className="bg-gray-700 text-white px-3 py-2 rounded w-full"
                  value={modalProduct.shape}
                  onChange={(e) =>
                    setModalProduct({
                      ...modalProduct,
                      shape: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block mb-1">Price</label>
                <input
                  type="text"
                  className="bg-gray-700 text-white px-3 py-2 rounded w-full"
                  value={modalProduct.price}
                  onChange={(e) =>
                    setModalProduct({
                      ...modalProduct,
                      price: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block mb-1">Diamond Cut Design</label>
                <input
                  type="text"
                  className="bg-gray-700 text-white px-3 py-2 rounded w-full"
                  value={modalProduct.diamondCutDesign}
                  onChange={(e) =>
                    setModalProduct({
                      ...modalProduct,
                      diamondCutDesign: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block mb-1">Measurements</label>
                <input
                  type="text"
                  className="bg-gray-700 text-white px-3 py-2 rounded w-full"
                  value={modalProduct.measurements}
                  onChange={(e) =>
                    setModalProduct({
                      ...modalProduct,
                      measurements: e.target.value,
                    })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1">Short Description</label>
                <input
                  type="text"
                  className="bg-gray-700 text-white px-3 py-2 rounded w-full"
                  value={modalProduct.shortDescription}
                  onChange={(e) =>
                    setModalProduct({
                      ...modalProduct,
                      shortDescription: e.target.value,
                    })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1">Description</label>
                <textarea
                  className="bg-gray-700 text-white px-3 py-2 rounded w-full h-32"
                  value={modalProduct.description}
                  onChange={(e) =>
                    setModalProduct({
                      ...modalProduct,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1">Image URL</label>
                <input
                  type="text"
                  className="bg-gray-700 text-white px-3 py-2 rounded w-full"
                  value={modalProduct.images || ""}
                  onChange={(e) =>
                    setModalProduct({
                      ...modalProduct,
                      image: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-brown rounded hover:bg-yellow-900 transition"
                onClick={() => handleModalSave(modalProduct)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
