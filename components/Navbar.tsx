'use client'

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu } from "lucide-react";
import { useState } from 'react';
import useCartStore from '@/store/userCartStore';

export default function Navbar() {
  const { cartCount } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-[1200px] w-full px-4 md:px-32 flex items-center justify-between py-3 mx-auto">

          {/* Logo */}
          <Link href="/">
            <Image
              src="/images/logo/pharmalogo.png"
              alt="Pharma Logo"
              width={170}
              height={10}
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-black font-semibold hover:text-gray-400">Home</Link>
            <Link href="/about" className="text-black font-semibold hover:text-gray-400">About</Link>
            <Link href="/shop" className="text-black font-semibold hover:text-gray-400">Shop</Link>
            <Link href="/contact" className="text-black font-semibold hover:text-gray-400">Contact</Link>
          </div>

          {/* Right Section (Search, Register, Cart) */}
          <div className="hidden md:flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-md bg-gray-200 text-black"
            />
            <Link href="/register" className="text-white font-semibold bg-[#1FB271] px-4 py-2 rounded-md hover:bg-green-700">
              Register
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingCart size={34} className="text-green" />
              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={28} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-[64px] left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden">
            <Link href="/" className="text-black font-semibold hover:text-gray-400">Home</Link>
            <Link href="/about" className="text-black font-semibold hover:text-gray-400">About</Link>
            <Link href="/shop" className="text-black font-semibold hover:text-gray-400">Shop</Link>
            <Link href="/contact" className="text-black font-semibold hover:text-gray-400">Contact</Link>
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-md bg-gray-200 text-black w-3/4"
            />
            <Link href="/register" className="text-white font-semibold bg-[#1FB271] px-4 py-2 rounded-md hover:bg-green-700">
              Register
            </Link>
          </div>
        )}
      </nav>

      {/* Prevent Content Overlap */}
      <div className="mt-[64px]"></div>
    </>
  );
}
