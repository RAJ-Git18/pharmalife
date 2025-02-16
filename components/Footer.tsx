"use client";
import React from "react";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Youtube, Send } from "lucide-react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="container mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-12"> {/* Increased gap */}
        {/* Company Info */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo/pharmalogo.png"
              alt="Pharma Logo"
              width={170}
              height={10}
            />
          </div>
          <p className="mt-4 text-lg"> {/* Increased text size */}
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          <div className="mt-4 space-y-3 text-md"> {/* Increased gap */}
            <p className="flex items-center gap-3"> {/* Increased gap */}
              <MapPin size={16} className="text-green-500" /> Swayambu, Kathmandu</p>
            <p className="flex items-center gap-3"> {/* Increased gap */}
              <Phone size={16} className="text-green-500" /> +977 900000000
            </p>
            <p className="flex items-center gap-3"> {/* Increased gap */}
              <Mail size={16} className="text-green-500" /> fristchoice@info.com
            </p>
          </div>
        
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold text-xl"> {/* Increased text size */}
            Company
          </h3>
          <div className="mt-4 space-y-3 text-lg"> {/* Increased gap and text size */}
            <a href="#" className="block">About</a>
            <a href="#" className="block">All Products</a>
            <a href="/location" className="block">Locations Map</a>
            {/* <a href="#" className="block">FAQ</a> */}
            <a href="#" className="block">Contact us</a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold text-xl"> {/* Increased text size */}
            Services
          </h3>
          <div className="mt-4 space-y-3 text-lg"> {/* Increased gap and text size */}
            <a href="#" className="block">Wish List</a>
            <a href="#" className="block">Login</a>
            <a href="#" className="block">Terms & Conditions</a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          
          <div className="mt-4 flex items-center">
            <input
              type="email"
              placeholder="Email*"
              className="w-full p-2 border rounded-l-md focus:outline-none text-lg" 
            />
            <button className="bg-green-500 p-2 rounded-r-md text-white text-lg">
              <Send size={18} />
            </button>
          </div>
          <h3 className="font-semibold text-xl mt-6"> {/* Increased text size */}
            We Accept
          </h3>
          <div className="mt-2">
            <Image
              src="/images/payment/esewa.jpg" // Replace with actual payment methods image
              alt="Payment Methods"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-800 text-white text-lg py-4 text-center flex flex-col md:flex-row items-center justify-between px-8"> {/* Increased text size */}
        <p>All Rights Reserved @ Company 2025</p>
        <div className="flex gap-8 mt-2 md:mt-0"> {/* Increased gap */}
          <a href="#" className="text-lg">Terms & Conditions</a> {/* Increased text size */}
          <a href="#" className="text-lg">Claim</a> {/* Increased text size */}
          <a href="#" className="text-lg">Privacy & Policy</a> {/* Increased text size */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
