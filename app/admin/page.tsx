"use client";

import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaSearch, FaBell } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  // Example bar chart data
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [20, 30, 40, 50, 60, 70, 80, 85, 90, 95, 100, 110],
        backgroundColor: "#888",
      },
    ],
  };

  // Example chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#333",
        },
        ticks: {
          color: "#ccc",
        },
      },
      x: {
        grid: {
          color: "#333",
        },
        ticks: {
          color: "#ccc",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
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
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Sales Card */}
        <div className="bg-[#1a1a1a] rounded-lg p-4 flex flex-col gap-2">
          <h2 className="text-gray-400 text-sm">Sales</h2>
          <div className="text-2xl font-bold">$230,220</div>
          <span className="text-xs text-gray-500">May 2025</span>
        </div>
        {/* Customers Card */}
        <div className="bg-[#1a1a1a] rounded-lg p-4 flex flex-col gap-2">
          <h2 className="text-gray-400 text-sm">Customers</h2>
          <div className="text-2xl font-bold">20,000</div>
          <span className="text-xs text-gray-500">May 2025</span>
        </div>
        {/* Avg Revenue Card */}
        <div className="bg-[#1a1a1a] rounded-lg p-4 flex flex-col gap-2">
          <h2 className="text-gray-400 text-sm">Avg Revenue</h2>
          <div className="text-2xl font-bold">$2,300</div>
          <span className="text-xs text-gray-500">May 2025</span>
        </div>
        {/* Example 4th Card */}
        <div className="bg-[#1a1a1a] rounded-lg p-4 flex flex-col gap-2">
          <h2 className="text-gray-400 text-sm">Some Metric</h2>
          <div className="text-2xl font-bold">95%</div>
          <span className="text-xs text-gray-500">May 2025</span>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="bg-[#1a1a1a] rounded-lg p-4" style={{ height: "400px" }}>
        <h2 className="text-xl font-bold mb-2">Revenue</h2>
        <div className="w-full h-full">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
