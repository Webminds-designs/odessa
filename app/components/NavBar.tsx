"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
//use react-icons
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";

import { useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkStyle = (path: string) =>
    `${
      pathname === path ? "text-brown" : "text-white hover:text-brown"
    } cursor-pointer transition-colors`;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full relative md:p-4">
      <div className="w-full bg-[#181818] flex items-center justify-between px-4 py-3 text-white rounded-full">
        {/* Left side */}
        <div className="flex items-center space-x-2">
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="cursor-pointer focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <IoMdClose className="w-6 h-6" />
              ) : (
                <RxHamburgerMenu className="w-6 h-6" />
              )}
            </button>
          </div>
          <span className="font-bold text-xl font-vasion">ODESSA</span>
        </div>

        {/* Center links - Desktop */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className={linkStyle("/")}>
            Home
          </Link>
          <Link href="/products" className={linkStyle("/products")}>
            Products
          </Link>
          <Link href="/about" className={linkStyle("/about")}>
            About Us
          </Link>
          <Link href="/contact" className={linkStyle("/contact")}>
            Contact Us
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <Link
            href="/collection"
            className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition cursor-pointer"
          >
            See Collection
          </Link>
          <Link href="/profile" className="cursor-pointer">
            <div className="w-8 h-8 bg-white rounded-full">
              <img
                src="/images/person1.png"
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </Link>
          <Link href="/cart" className="cursor-pointer">
            <FaShoppingCart className="w-6 h-6 hover:text-amber-400" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-[#181818] transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        } rounded-b-lg mt-1 z-50`}
      >
        <div className="flex flex-col space-y-3 px-4 py-4">
          <Link
            href="/"
            onClick={toggleMobileMenu}
            className={`${linkStyle("/")} py-2`}
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={toggleMobileMenu}
            className={`${linkStyle("/products")} py-2`}
          >
            Products
          </Link>
          <Link
            href="/about"
            onClick={toggleMobileMenu}
            className={`${linkStyle("/about")} py-2`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            onClick={toggleMobileMenu}
            className={`${linkStyle("/contact")} py-2`}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
