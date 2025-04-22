"use client";

import React, { useEffect, useState } from "react";

// Minimal order fields to display in the main table
interface Order {
  _id: string;
  productName: string;
  productImage: string;
  orderNo: string;
  orderDate: string;
  total: string; // or number
  createdAt: string;
  orderStatus: "Pending" | "Complete" | "Canceled" | "Shipping";
}

// Extended order details for the expanded view
interface CheckoutItem {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  total: number;
}

interface OrderDetails extends Order {
  transactionId: string;
  payerName: string;
  payerEmail: string;
  payerContact: string;
  payerCountry: string;
  checkoutItems: CheckoutItem[];
  createdAt: string;
  _id: string;
  // ... any additional fields from your backend
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<{
    [key: string]: OrderDetails;
  }>({});

  useEffect(() => {
    // 1. Retrieve user from localStorage
    const userStr = localStorage.getItem("user");
    if (!userStr) return;
    const user = JSON.parse(userStr);
    if (!user || !user.id) return;

    // 2. Fetch the initial list of orders for this user
    async function fetchOrders() {
      try {
        const res = await fetch(`/api/order?userId=${user.id}`);
        if (!res.ok) {
          console.error("Failed to fetch orders");
          return;
        }
        const data: Order[] = await res.json();
        setOrders(data);
        console.log("Fetched orders:", data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, []);

  // Toggles expansion of a row and fetches order details (including item details) if needed
  const handleViewDetails = async (orderId: string) => {
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

    // Otherwise, fetch order details from /api/order/[id]
    try {
      const res = await fetch(`/api/order/${orderId}`);

      if (!res.ok) {
        console.error("Failed to fetch order details");
        return;
      }
      const details: OrderDetails = await res.json();

      // Cache the details in state, then expand
      setOrderDetails((prev) => ({ ...prev, [orderId]: details }));
      setExpandedOrderId(orderId);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <div className="min-h-screen font-sans text-white bg-black py-10 px-4 md:px-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl mb-8">Order History</h1>

        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="pl-4 sm:pl-6 text-left font-light bg-[#202020]">
                  Product
                </th>
                <th className="p-2 sm:p-4 text-left font-light bg-[#202020]">
                  Order no
                </th>
                <th className="p-2 sm:p-4 text-left font-light bg-[#202020]">
                  Order date
                </th>
                <th className="p-2 sm:p-4 text-left font-light bg-[#202020]">
                  Total
                </th>
                <th className="p-2 sm:p-4 text-left font-light bg-[#202020]">
                  Order Status
                </th>
                <th className="p-2 sm:p-4 text-left font-light bg-[#202020]"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  {/* Main row (basic order info) */}
                  <tr className="border-b border-white/30">
                    <td className="px-2 sm:px-4 py-4 sm:py-12 flex items-center space-x-3">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border border-white/20 rounded-md">
                        <img
                          src="/images/diamond1.png"
                          alt={order.productName}
                          className="w-12 sm:w-16 p-2"
                        />
                      </div>
                      <span className="text-sm sm:text-base">
                        {order.productName}
                      </span>
                    </td>
                    <td className="p-2 sm:p-4 text-sm sm:text-base">
                      {order._id}
                    </td>
                    <td className="p-2 sm:p-4 text-sm sm:text-base">
                      {order.createdAt}
                    </td>
                    <td className="p-2 sm:p-4 text-sm sm:text-base">
                      {order.total}
                    </td>
                    <td className="p-2 sm:p-4 text-sm sm:text-base">
                      {order.orderStatus === "Pending" ? (
                        <span className="text-red-500 font-medium">
                          {order.orderStatus}
                        </span>
                      ) : order.orderStatus === "Complete" ? (
                        <span className="text-green-500 font-medium">
                          {order.orderStatus}
                        </span>
                      ) : order.orderStatus === "Shipping" ? (
                        <span className="text-blue-500 font-medium">
                          {order.orderStatus}
                        </span>
                      ) : order.orderStatus === "Canceled" ? (
                        <span className="text-yellow-500 font-medium">
                          {order.orderStatus}
                        </span>
                      ) : (
                        <span className="text-white font-medium">
                          {order.orderStatus}
                        </span>
                      )}
                    </td>
                    <td className="p-2 sm:p-4">
                      <button
                        onClick={() => handleViewDetails(order._id)}
                        className="px-2 sm:px-4 py-2 border border-[#0D0D0D] text-white bg-[#202020] rounded-md hover:bg-black transition cursor-pointer text-xs sm:text-sm"
                      >
                        {expandedOrderId === order._id
                          ? "Hide details"
                          : "View details"}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded row (detailed view, including item details) */}
                  {expandedOrderId === order._id && orderDetails[order._id] && (
                    <tr className="bg-[#1c1c1c] border-b border-white/30">
                      <td colSpan={6} className="p-4 text-sm sm:text-base">
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <p>
                              <strong>Transaction ID:</strong>{" "}
                              {orderDetails[order._id].transactionId}
                            </p>
                            <p>
                              <strong>Payer Name:</strong>{" "}
                              {orderDetails[order._id].payerName}
                            </p>
                            <p>
                              <strong>Payer Email:</strong>{" "}
                              {orderDetails[order._id].payerEmail}
                            </p>
                            <p>
                              <strong>Payer Contact:</strong>{" "}
                              {orderDetails[order._id].payerContact}
                            </p>
                            <p>
                              <strong>Payer Country:</strong>{" "}
                              {orderDetails[order._id].payerCountry}
                            </p>
                          </div>

                          {/* Show the checkout items */}
                          <div className="mt-4">
                            <h3 className="text-lg mb-2">Items:</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {orderDetails[order._id].checkoutItems.map(
                                (item) => (
                                  <div
                                    key={item.productId}
                                    className="flex items-center space-x-4 bg-[#2a2a2a] p-2 rounded-md"
                                  >
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-16 h-16 object-cover rounded"
                                    />
                                    <div>
                                      <p className="font-semibold">
                                        {item.name}
                                      </p>
                                      <p>
                                        {item.quantity} x{" "}
                                        {item.price.toFixed(2)} ={" "}
                                        {item.total.toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                )
                              )}
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
    </div>
  );
}
