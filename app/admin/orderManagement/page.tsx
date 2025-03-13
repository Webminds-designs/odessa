"use client";

import React, { useState } from "react";
import { FaTrash, FaEdit, FaPlus, FaSearch, FaBell } from "react-icons/fa";

type OrderStatus = "Complete" | "Delivered" | "Pending" | "Cancelled";

interface DiamondDetail {
  name: string;
  carat: number;
  cut: string;
}

interface Order {
  id: string;
  date: string;
  customer: string;
  price: string;
  status: OrderStatus;
  address: string;
  email: string;
  contact: string;
  diamondDetails: DiamondDetail[];
}

// Extended mock orders with additional details
const mockOrders: Order[] = [
  {
    id: "#000001",
    date: "02/02/2002",
    customer: "Emma",
    price: "1700$",
    status: "Complete",
    address: "123 Diamond Ave, New York, NY",
    email: "emma@example.com",
    contact: "+1 555-1234",
    diamondDetails: [
      { name: "Brilliant Cut", carat: 1.2, cut: "Round" },
      { name: "Princess Cut", carat: 1.5, cut: "Square" },
    ],
  },
  {
    id: "#000002",
    date: "02/02/2002",
    customer: "Alexander",
    price: "1700$",
    status: "Delivered",
    address: "456 Gemstone Rd, Los Angeles, CA",
    email: "alex@example.com",
    contact: "+1 555-5678",
    diamondDetails: [{ name: "Emerald Cut", carat: 2.0, cut: "Rectangle" }],
  },
  {
    id: "#000003",
    date: "02/02/2002",
    customer: "Amelia",
    price: "1700$",
    status: "Pending",
    address: "789 Sparkle Ln, Miami, FL",
    email: "amelia@example.com",
    contact: "+1 555-9012",
    diamondDetails: [{ name: "Oval Cut", carat: 1.0, cut: "Oval" }],
  },
  {
    id: "#000004",
    date: "02/02/2002",
    customer: "Harrison",
    price: "1700$",
    status: "Complete",
    address: "1011 Shine Blvd, Seattle, WA",
    email: "harrison@example.com",
    contact: "+1 555-3456",
    diamondDetails: [{ name: "Pear Cut", carat: 1.8, cut: "Pear" }],
  },
];

export default function OrderManagementPage() {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  // Toggle expansion when a row is clicked
  const handleRowClick = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Update status inline
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Order Management</h1>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Add new order button */}
          <button className="flex items-center gap-2 bg-brown text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
            <FaPlus />
            <span>Add new order</span>
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

      {/* Orders Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-2 font-semibold">Order ID</th>
              <th className="py-3 px-2 font-semibold">Date</th>
              <th className="py-3 px-2 font-semibold">Customer</th>
              <th className="py-3 px-2 font-semibold">Price</th>
              <th className="py-3 px-2 font-semibold">Status</th>
              <th className="py-3 px-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                {/* Main row */}
                <tr
                  className="border-b border-gray-800 hover:bg-[#1a1a1a] cursor-pointer"
                  onClick={() => handleRowClick(order.id)}
                >
                  <td className="py-3 px-2">{order.id}</td>
                  <td className="py-3 px-2">{order.date}</td>
                  <td className="py-3 px-2">{order.customer}</td>
                  <td className="py-3 px-2">{order.price}</td>
                  <td className="py-3 px-2">
                    <span
                      className={`
                        font-semibold 
                        ${order.status === "Complete" ? "text-green-400" : ""}
                        ${order.status === "Delivered" ? "text-yellow-400" : ""}
                        ${order.status === "Pending" ? "text-red-400" : ""}
                      `}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-4">
                      {/* Prevent row toggle on clicking these buttons */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Trigger edit functionality if needed
                        }}
                        className="p-1 hover:text-green-400 transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Trigger delete functionality if needed
                        }}
                        className="p-1 hover:text-red-400 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Expanded row for additional details */}
                {expandedOrderId === order.id && (
                  <tr className="bg-[#1a1a1a]">
                    <td colSpan={6} className="py-4 px-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Left column: Basic Info */}
                        <div className="flex-1 space-y-2">
                          <p>
                            <span className="font-semibold">Customer:</span>{" "}
                            {order.customer}
                          </p>
                          <p>
                            <span className="font-semibold">Email:</span>{" "}
                            {order.email}
                          </p>
                          <p>
                            <span className="font-semibold">Contact:</span>{" "}
                            {order.contact}
                          </p>
                          <p>
                            <span className="font-semibold">Address:</span>{" "}
                            {order.address}
                          </p>
                        </div>
                        {/* Right column: Diamond Details & Status Update */}
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold">Diamond Details</h3>
                          <ul className="list-disc list-inside space-y-1">
                            {order.diamondDetails.map((diamond, i) => (
                              <li key={i}>
                                {diamond.name} - {diamond.carat}ct (
                                {diamond.cut})
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4">
                            <label className="block mb-1 font-semibold">
                              Change Status:
                            </label>
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  order.id,
                                  e.target.value as OrderStatus
                                )
                              }
                              className="bg-black text-white border border-gray-600 rounded-md px-3 py-2"
                            >
                              <option value="Complete">Complete</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Pending">Pending</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
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
    </div>
  );
}
