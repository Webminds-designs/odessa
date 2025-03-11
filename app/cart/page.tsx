"use client";
import React from "react";
import ComingSoon from "../components/ComingSoonProps";
import { FaShoppingCart } from "react-icons/fa"; // Make sure to install @heroicons/react

const CartPage = () => {
  return (
    <ComingSoon
      title="Cart"
      icon={<FaShoppingCart className="w-16 h-16 text-gray-500" />}
    />
  );
};

export default CartPage;
