"use client";
import React, { useState } from "react";
import {
  FaSearch,
  FaBell,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCamera,
} from "react-icons/fa";

type Product = {
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
};

// Sample data
const mockProducts: Product[] = [
  {
    id: 1,
    productId: "#0934",
    name: "Round Diamond",
    shape: "Round",
    price: "1,750.00 $",
    diamondCutDesign: "Brilliant cut",
    measurements: "5.95 × 5.86 × 3.74",
    shortDescription: "Lab-grown round brilliant diamond",
    description:
      "This 100-carat cushion brilliant cut diamond features an F color and VVS1 clarity, certified by IGI",
  },
  {
    id: 2,
    productId: "#0935",
    name: "Princess Diamond",
    shape: "Princess",
    price: "2,100.00 $",
    diamondCutDesign: "Princess cut",
    measurements: "6.00 × 6.00 × 4.00",
    shortDescription: "Lab-grown princess cut diamond",
    description:
      "A sparkling princess cut diamond with a color grade of G and SI1 clarity, IGI certified.",
  },
  {
    id: 3,
    productId: "#0936",
    name: "Oval Diamond",
    shape: "Oval",
    price: "1,650.00 $",
    diamondCutDesign: "Oval cut",
    measurements: "7.00 × 5.00 × 3.00",
    shortDescription: "Lab-grown oval cut diamond",
    description:
      "Elegant oval cut diamond with an E color grade, featuring excellent brilliance and fire.",
  },
];

export default function ProductManagementPage() {
  // List of products
  const [products, setProducts] = useState<Product[]>(mockProducts);

  // Track which row is expanded for "view"
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  // Handle row expansion
  const handleRowClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Handle delete
  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // prevent row expand
    if (!confirm("Are you sure you want to delete this product?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Open modal to add a new product
  const handleAddNew = () => {
    setModalMode("add");
    setModalProduct({
      id: Date.now(), // temporary ID
      productId: "",
      name: "",
      shape: "",
      price: "",
      diamondCutDesign: "",
      measurements: "",
      shortDescription: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  // Open modal to edit existing product
  const handleEdit = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // prevent row expand
    setModalMode("edit");
    setModalProduct({ ...product });
    setIsModalOpen(true);
  };

  // Close modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalProduct(null);
  };

  // Save product (both add/edit)
  const handleSave = () => {
    if (!modalProduct) return;

    if (modalMode === "add") {
      // Add new product
      setProducts((prev) => [...prev, modalProduct]);
    } else {
      // Edit existing product
      setProducts((prev) =>
        prev.map((p) => (p.id === modalProduct.id ? modalProduct : p))
      );
    }
    handleModalClose();
  };

  // Update modal product fields
  const updateField = (field: keyof Product, value: string) => {
    if (!modalProduct) return;
    setModalProduct({ ...modalProduct, [field]: value });
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Product Management</h1>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Add new product button */}
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-brown text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            <FaPlus />
            <span>Add new product</span>
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
            {products.map((product) => (
              <React.Fragment key={product.id}>
                {/* Main Row */}
                <tr
                  className="border-b border-gray-800 hover:bg-[#1a1a1a] cursor-pointer"
                  onClick={() => handleRowClick(product.id)}
                >
                  {/* Product image (placeholder) */}
                  <td className="py-3 px-2">
                    <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
                      {/* Replace with <img src={product.image} /> if you have a real image */}
                      <span>💎</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">{product.productId}</td>
                  <td className="py-3 px-2">{product.name}</td>
                  <td className="py-3 px-2">{product.price}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-4">
                      {/* Edit */}
                      <button
                        onClick={(e) => handleEdit(e, product)}
                        className="p-1 hover:text-green-400 transition-colors"
                      >
                        <FaEdit />
                      </button>
                      {/* Delete */}
                      <button
                        onClick={(e) => handleDelete(e, product.id)}
                        className="p-1 hover:text-red-400 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Expanded Row */}
                {expandedId === product.id && (
                  <tr className="bg-[#1a1a1a]">
                    <td colSpan={5} className="py-4 px-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Left column: Basic Info */}
                        <div className="flex-1 space-y-2">
                          <p>
                            <span className="font-semibold">Shape:</span>{" "}
                            {product.shape}
                          </p>
                          <p>
                            <span className="font-semibold">
                              Diamond Cut Design:
                            </span>{" "}
                            {product.diamondCutDesign}
                          </p>
                          <p>
                            <span className="font-semibold">Measurements:</span>{" "}
                            {product.measurements}
                          </p>
                        </div>
                        {/* Right column: Descriptions */}
                        <div className="flex-1 space-y-2">
                          <p>
                            <span className="font-semibold">
                              Short Description:
                            </span>{" "}
                            {product.shortDescription}
                          </p>
                          <p>
                            <span className="font-semibold">Description:</span>{" "}
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && modalProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] text-white p-6 rounded-md w-full max-w-3xl relative">
            <button
              onClick={handleModalClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {modalMode === "add" ? "Add New Product" : "Edit Product"}
            </h2>
            {/* Image Upload Placeholder */}
            <div className="flex items-center justify-center mb-4">
              <div className="rounded-full h-24 w-24 bg-gray-700 flex items-center justify-center text-2xl text-gray-300 cursor-pointer">
                <FaCamera />
              </div>
            </div>
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ID */}
              <div>
                <label className="block mb-1">ID</label>
                <input
                  type="text"
                  disabled
                  value={modalProduct.id}
                  className="bg-[#2a2a2a] w-full rounded px-3 py-2"
                />
              </div>
              {/* Product ID */}
              <div>
                <label className="block mb-1">Product ID</label>
                <input
                  type="text"
                  value={modalProduct.productId}
                  onChange={(e) => updateField("productId", e.target.value)}
                  className="bg-[#2a2a2a] w-full rounded px-3 py-2"
                />
              </div>
              {/* Price */}
              <div>
                <label className="block mb-1">Price</label>
                <input
                  type="text"
                  value={modalProduct.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  className="bg-[#2a2a2a] w-full rounded px-3 py-2"
                />
              </div>
              {/* Shape */}
              <div>
                <label className="block mb-1">Shape</label>
                <input
                  type="text"
                  value={modalProduct.shape}
                  onChange={(e) => updateField("shape", e.target.value)}
                  className="bg-[#2a2a2a] w-full rounded px-3 py-2"
                />
              </div>
              {/* Diamond Cut Design */}
              <div>
                <label className="block mb-1">Diamond cut design</label>
                <input
                  type="text"
                  value={modalProduct.diamondCutDesign}
                  onChange={(e) =>
                    updateField("diamondCutDesign", e.target.value)
                  }
                  className="bg-[#2a2a2a] w-full rounded px-3 py-2"
                />
              </div>
              {/* Measurements */}
              <div>
                <label className="block mb-1">Measurements</label>
                <input
                  type="text"
                  value={modalProduct.measurements}
                  onChange={(e) => updateField("measurements", e.target.value)}
                  className="bg-[#2a2a2a] w-full rounded px-3 py-2"
                />
              </div>
              {/* Name */}
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  value={modalProduct.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="bg-[#2a2a2a] w-full rounded px-3 py-2"
                />
              </div>
              {/* Short Description */}
              <div>
                <label className="block mb-1">Short description</label>
                <input
                  type="text"
                  value={modalProduct.shortDescription}
                  onChange={(e) =>
                    updateField("shortDescription", e.target.value)
                  }
                  className="bg-[#2a2a2a] w-full rounded px-3 py-2"
                />
              </div>
              {/* Full Description */}
              <div className="col-span-1 md:col-span-2">
                <label className="block mb-1">Description</label>
                <textarea
                  value={modalProduct.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="bg-[#2a2a2a] w-full rounded px-3 py-2 h-20"
                />
              </div>
            </div>
            {/* Modal Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleModalClose}
                className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-brown px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
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
