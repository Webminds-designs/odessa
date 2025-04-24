"use client";
import React from "react";
import { FaPlus, FaSearch, FaBell } from "react-icons/fa";

interface PageHeaderProps {
  /** Title displayed at the top (e.g. "Order Management") */
  title: string;
  /** If true, show the "Add new order" button */
  showAddButton?: boolean;
  /** Callback when the "Add new order" button is clicked */
  onAddClick?: () => void;
}

export default function PageHeader({
  title,
  showAddButton,
  onAddClick,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>

      {/* Actions (Add, Search, Notifications, Admin) */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* Conditionally render the "Add new order" button */}
        {showAddButton && (
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 bg-brown text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            <FaPlus />
            <span>Add new order</span>
          </button>
        )}

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

        {/* Admin Avatar */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="font-bold">A</span>
          </div>
          <span className="hidden md:inline">Admin</span>
        </div>
      </div>
    </div>
  );
}
