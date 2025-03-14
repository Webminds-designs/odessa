"use client";

import React, { useEffect, useState } from "react";

interface Order {
  _id: string; // MongoDB ObjectId
  orderNo: string;
  orderDate: string;
  total: number;
  status: "Pending" | "Complete";
}

interface OrderDetails extends Order {
  checkoutItems: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
  // Additional order fields can be added as needed
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return;

    // Parse the stored user data. Assumes it is stored as a JSON string.
    const user = JSON.parse(userStr);
    if (!user || !user.id) return;

    // Fetch orders for the current user.
    async function fetchOrders() {
      try {
        const res = await fetch(`/api/order?userId=${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, []);

  const handleViewDetails = async (orderId: string) => {
    try {
      const res = await fetch(`/api/order/${orderId}`);
      if (res.ok) {
        const details: OrderDetails = await res.json();
        setExpandedOrder(details);
      } else {
        console.error("Failed to fetch order details");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <div className="min-h-screen font-aeonikregular text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl mb-8">Order History</h1>
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="pl-4 sm:pl-6 text-left font-light bg-[#202020]">
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
                <th className="p-2 sm:p-4"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-white/30">
                  <td className="p-2 sm:p-4 text-sm sm:text-base">
                    {order.orderNo}
                  </td>
                  <td className="p-2 sm:p-4 text-sm sm:text-base">
                    {order.orderDate}
                  </td>
                  <td className="p-2 sm:p-4 text-sm sm:text-base">
                    {order.total.toFixed(2)}
                  </td>
                  <td className="p-2 sm:p-4 text-sm sm:text-base">
                    {order.status === "Pending" ? (
                      <span className="text-red-500 font-medium">
                        {order.status}
                      </span>
                    ) : (
                      <span className="text-green-500 font-medium">
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="p-2 sm:p-4">
                    <button
                      onClick={() => handleViewDetails(order._id)}
                      className="px-2 sm:px-4 py-2 border border-[#0D0D0D] text-white bg-[#202020] rounded-md hover:bg-black transition cursor-pointer text-xs sm:text-sm"
                    >
                      View details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {expandedOrder && (
            <div className="mt-6 p-4 bg-gray-800 rounded-md">
              <h2 className="text-xl mb-4">Order Details</h2>
              <p>
                <strong>Order Number:</strong> {expandedOrder.orderNo}
              </p>
              <p>
                <strong>Order Date:</strong> {expandedOrder.orderDate}
              </p>
              <p>
                <strong>Total:</strong> {expandedOrder.total.toFixed(2)}
              </p>
              <p>
                <strong>Status:</strong> {expandedOrder.status}
              </p>
              {expandedOrder.checkoutItems && (
                <div>
                  <h3 className="mt-4 text-lg">Ordered Items:</h3>
                  <ul>
                    {expandedOrder.checkoutItems.map((item, idx) => (
                      <li key={idx}>
                        {item.productName} — {item.quantity} x {item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
