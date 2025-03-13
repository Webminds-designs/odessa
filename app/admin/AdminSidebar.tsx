"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import {
  FaTachometerAlt,
  FaUsers,
  FaShoppingCart,
  FaBox,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
// const pathname = usePathname();

const AdminSidebar = () => {
  const router = useRouter();
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user") || "{}");

  //   if (user.role !== "admin") {
  //     router.push("/login");
  //   }
  // }, [router]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div
      className={`bg-[#2a2a2a] text-white transition-all duration-300 flex  justify-center ${
        isCollapsed ? "w-16" : "w-64"
      } h-full flex flex-col`}
      onClick={toggleSidebar}
    >
      {/* Sidebar Header with Logo */}

      <div className="flex items-center justify-center h-16 border-b gap-4 border-brown">
        <img src="/images/odessa.png" alt="Logo" className="h-8 w-auto" />
        {!isCollapsed && (
          <>
            <span className="font-bold text-xl font-vasion">ODESSA</span>
            {/* <FiMenu size={20} /> */}
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 ">
        <ul className="flex flex-col gap-4">
          <li className="px-4 py-2 hover:bg-brown">
            <Link href="/admin" className="flex items-center gap-4">
              <FaTachometerAlt size={20} />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-brown">
            <Link href="/admin/users" className="flex items-center gap-4">
              <FaUsers size={20} />
              {!isCollapsed && <span>User Management</span>}
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-brown">
            <Link
              href="/admin/orderManagement"
              className="flex items-center gap-4"
            >
              <FaShoppingCart size={20} />
              {!isCollapsed && <span>Order Management</span>}
            </Link>
          </li>
          <li className="px-4 py-2  hover:bg-brown">
            <Link
              href="/admin/productsManagement"
              className="flex items-center gap-4"
            >
              <FaBox size={20} />
              {!isCollapsed && <span>Product Management</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
