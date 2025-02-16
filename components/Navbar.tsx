'use client'

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';


export default function Navbar() {

  return (
    <nav className="bg-slate-100 p-2 mx-4 my-2 rounded-md flex items-center justify-between ">

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
        <Link href="/register" className="text-white font-semibold bg-green-600 px-4 py-2 rounded-md hover:bg-green-700">
          Register
        </Link>
        <Link href="/cart" className="text-green hover:text-gray-100">
          <Image
            src="/images/cart/image.png"
            width={40}
            height={0}
            alt='cart iamge'
          />
        </Link>
      </div>



    </nav>
  );
}
