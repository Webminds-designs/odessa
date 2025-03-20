"use client";

import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus, FaSearch, FaBell } from "react-icons/fa";

type OrderStatus = "Complete" | "Delivered" | "Pending" | "Cancelled";

interface DiamondDetail {
  name: string;
  carat: number;
  cut: string;
}

interface Order {
  _id: string;
  transactionId: string;
  userid: string;
  payerName: string;
  payerEmail: string;
  payerContact: string;
  payerCountry: string;
  checkoutItems: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
}

export default function OrderManagementPage() {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<{ [key: string]: Order }>({});

  // Fetch all orders on component mount
  useEffect(() => {
    async function fetchAllOrders() {
      try {
        // You may need to change this to fetch all orders, not just by userId
        const res = await fetch('/api/order?userId=admin');
        
        if (!res.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Could not load orders');
      } finally {
        setLoading(false);
      }
    }
    
    fetchAllOrders();
  }, []);

  // Toggle expansion when a row is clicked and fetch order details
  const handleRowClick = async (orderId: string) => {
    // If already expanded, collapse
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
      return;
    }
    
    // If we already have details, just expand
    if (orderDetails[orderId]) {
      setExpandedOrderId(orderId);
      return;
    }
    
    // Otherwise, fetch order details
    try {
      const res = await fetch(`/api/order/${orderId}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch order details');
      }
      
      const details = await res.json();
      
      // Cache the details in state, then expand
      setOrderDetails((prev) => ({ ...prev, [orderId]: details }));
      setExpandedOrderId(orderId);
    } catch (err) {
      console.error('Error fetching order details:', err);
    }
  };

  // Update status
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    // Here you would implement the API call to update the order status
    // For now, we'll just update the local state
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );
    
    // If the details are expanded, update those too
    if (orderDetails[orderId]) {
      setOrderDetails((prev) => ({
        ...prev,
        [orderId]: { ...prev[orderId], orderStatus: newStatus }
      }));
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex justify-center items-center">
        <p>Loading orders...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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
              <th className="py-3 px-2 font-semibold">Total</th>
              <th className="py-3 px-2 font-semibold">Status</th>
              <th className="py-3 px-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                {/* Main row */}
                <tr
                  className="border-b border-gray-800 hover:bg-[#1a1a1a] cursor-pointer"
                  onClick={() => handleRowClick(order._id)}
                >
                  <td className="py-3 px-2">{order.transactionId}</td>
                  <td className="py-3 px-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-2">{order.payerName}</td>
                  <td className="py-3 px-2">{order.total} £</td>
                  <td className="py-3 px-2">
                    <span
                      className={`
                        font-semibold 
                        ${order.orderStatus === "Complete" ? "text-green-400" : ""}
                        ${order.orderStatus === "Delivered" ? "text-yellow-400" : ""}
                        ${order.orderStatus === "Pending" ? "text-red-400" : ""}
                      `}
                    >
                      {order.orderStatus}
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
                {expandedOrderId === order._id && orderDetails[order._id] && (
                  <tr className="bg-[#1a1a1a]">
                    <td colSpan={6} className="py-4 px-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Left column: Basic Info */}
                        <div className="flex-1 space-y-2">
                          <p>
                            <span className="font-semibold">Customer:</span>{" "}
                            {orderDetails[order._id].payerName}
                          </p>
                          <p>
                            <span className="font-semibold">Email:</span>{" "}
                            {orderDetails[order._id].payerEmail}
                          </p>
                          <p>
                            <span className="font-semibold">Contact:</span>{" "}
                            {orderDetails[order._id].payerContact}
                          </p>
                          <p>
                            <span className="font-semibold">Country:</span>{" "}
                            {orderDetails[order._id].payerCountry}
                          </p>
                          <p>
                            <span className="font-semibold">Transaction ID:</span>{" "}
                            {orderDetails[order._id].transactionId}
                          </p>
                          <p>
                            <span className="font-semibold">Payment Method:</span>{" "}
                            {orderDetails[order._id].paymentMethod}
                          </p>
                          <p>
                            <span className="font-semibold">Payment Status:</span>{" "}
                            {orderDetails[order._id].paymentStatus}
                          </p>
                        </div>
                        {/* Right column: Order Items & Status Update */}
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold">Order Items</h3>
                          <ul className="space-y-2">
                            {orderDetails[order._id].checkoutItems.map((item, i) => (
                              <li key={i} className="bg-[#2a2a2a] p-2 rounded-md">
                                <div className="flex justify-between">
                                  <span>{item.name}</span>
                                  <span>{item.quantity} x {item.price.toFixed(2)} = {item.total.toFixed(2)}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 space-y-2">
                            <p><span className="font-semibold">Subtotal:</span> {orderDetails[order._id].subtotal}</p>
                            <p><span className="font-semibold">Shipping:</span> {orderDetails[order._id].shipping}</p>
                            <p><span className="font-semibold">Tax:</span> {orderDetails[order._id].tax}</p>
                            <p><span className="font-semibold">Total:</span> {orderDetails[order._id].total}</p>
                          </div>
                          <div className="mt-4">
                            <label className="block mb-1 font-semibold">
                              Change Status:
                            </label>
                            <select
                              value={orderDetails[order._id].orderStatus}
                              onChange={(e) =>
                                handleStatusChange(
                                  order._id,
                                  e.target.value
                                )
                              }
                              className="bg-black text-white border border-gray-600 rounded-md px-3 py-2"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Complete">Complete</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Shipping">Shipping</option>
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