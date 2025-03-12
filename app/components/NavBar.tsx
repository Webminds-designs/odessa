"use client";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const pathname = usePathname();
  // If the pathname starts with /admin, don't render the NavBar
  if (pathname.startsWith("/admin")) {
    return null;
  }
  return (
    <nav className="w-full relative md:p-4 cursor-pointer z-20">
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
        <div className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="cursor-pointer">
                Home
              </Link>
            </li>

            <li>
              <Link href="/aboutus" className="cursor-pointer">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="cursor-pointer">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Right side */}
        <div className="flex items-center">
          <ul className="flex items-center space-x-4">
            <li>
              <Link
                href="/collection"
                className="px-4 py-2 border hidden md:flex border-white rounded-full  hover:bg-white hover:text-black transition cursor-pointer"
              >
                See Collection
              </Link>
            </li>
            <li>
              <Link href="/profile" className="cursor-pointer">
                <div className="w-8 h-8 bg-white rounded-full">
                  <img
                    src="/images/person1.png"
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              </Link>
            </li>
            <li>
              <Link href="/cart" className="cursor-pointer">
                <FaShoppingCart className="w-6 h-6 hover:text-amber-400" />
              </Link>
            </li>
          </ul>
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
        <ul className="flex flex-col space-y-3 px-4 py-4">
          <li>
            <Link
              href="/"
              onClick={toggleMobileMenu}
              className="cursor-pointer"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#collection"
              onClick={toggleMobileMenu}
              className="cursor-pointer"
            >
              Collection
            </Link>
          </li>

          <li>
            <Link
              href="/aboutus"
              onClick={toggleMobileMenu}
              className="cursor-pointer"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/#contact"
              onClick={toggleMobileMenu}
              className="cursor-pointer"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
