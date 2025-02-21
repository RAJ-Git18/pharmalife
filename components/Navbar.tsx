'use client'

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart } from "lucide-react"


export default function Navbar() {

  return (
    <nav className="mx-32 bg-white p-2 my-4 rounded-md flex items-center justify-between ">

      <Link href="/">
        <Image
          src="/images/logo/pharmalogo.png"
          alt="Pharma Logo"
          width={170}
          height={10}

        />
      </Link>
      <div className="hidden md:flex space-x-4 gap-8">
        <Link href="/" className="text-black font-semibold hover:text-gray-400">Home</Link>
        <Link href="/about" className="text-black font-semibold hover:text-gray-400">About</Link>
        <Link href="/shop" className="text-black font-semibold hover:text-gray-400">Shop</Link>
        <Link href="/contact" className="text-black font-semibold hover:text-gray-400">Contact</Link>
      </div>


      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-md bg-gray-200 text-white"
        />
        <Link href="/register" className="text-white font-semibold bg-[#1FB271] px-4 py-2 rounded-md hover:bg-green-700">
          Register
        </Link>
        <Link href="/cart" className="text-green">
        <ShoppingCart size={34} />
        </Link>
      </div>



    </nav>
  )
}