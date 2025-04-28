'use client'
import Card from "@/components/ui/Card";
import { Slider } from "@/components/ui/carousel";
import Image from "next/image";
import { ShoppingCart, Heart } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from "react";
import useCartStore from '@/store/userCartStore'


const card_images : string[] = [
  "/images/slider/medicine.png",
  "/images/products/aniseptic.png",
  "/images/slider/medicine.png",
  "/images/products/aniseptic.png",
                                                                 
]
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  is_latest?: boolean;
  is_featured?:boolean;
}


export default function Home() {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {cartCount, addToCart} = useCartStore()

const cartClicked = async () => {
    addToCart()
    console.log(cartCount)
    const response = await fetch("http://127.0.0.1:8000/api/cart")
    const data = await response.json()
    console.log(data)
  }
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch latest products
        const latestResponse = await fetch("http://127.0.0.1:8000/products/latest/");
        if (!latestResponse.ok) {
          throw new Error(`HTTP error! status: ${latestResponse.status}`);
        }
        const latestData = await latestResponse.json();
        setLatestProducts(latestData);
  
        // Fetch featured products
        const featuredResponse = await fetch("http://127.0.0.1:8000/products/featured/");
        if (!featuredResponse.ok) {
          throw new Error(`HTTP error! status: ${featuredResponse.status}`);
        }
        const featuredData = await featuredResponse.json();
        setFeaturedProducts(featuredData);
  
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  
  return (
    <div className="md:mx-32 mx-8 mt-20">

    {/* SLIDER */}
    <div className="slider">
      <Slider />
    </div>
  
    {/* FEATURED PRODUCTS */}
    <section className="mt-20">
      <h1 className="md:text-5xl text-3xl font-bold text-center border-t-2 pt-10 mb-10">
        Featured Products
      </h1>
  
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition duration-300"
              >
                <Card image_path={product.image || "/images/default-product.png"} />
                <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
                <p className="text-gray-600 mt-2">${product.price}</p>
                <p className="text-gray-500 mt-2 text-sm">{product.description}</p>
  
                {/* BUTTONS */}
                <div className="flex gap-4 mt-6">
                  <button
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition duration-300"
                  >
                    View Details
                  </button>
                  <button
                    className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full py-10 text-gray-500">
              No featured products available
            </p>
          )}
        </div>
      )}
    </section>
  
    {/* LATEST PRODUCTS */}
    <section className="mt-20">
      <h1 className="md:text-5xl text-3xl font-bold text-center border-t-2 pt-10 mb-10">
        Latest Products
      </h1>
  
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {latestProducts.length > 0 ? (
            latestProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-2xl shadow-lg p-2 flex flex-col items-center text-center hover:shadow-2xl transition duration-300"
              >
                <Card image_path={product.image || "/images/default-product.png"} />
                <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
                <p className="text-gray-600 mt-2">Npr.{product.price}</p>
                {/* <p className="text-gray-500 mt-2 text-sm">{product.description}</p> */}
  
                {/* BUTTONS */}
               <div className="flex gap-4 mt-6">
  <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition duration-300">
    View Details
  </button>

  <button onClick={cartClicked} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition duration-300">
    <div className="card_whilist flex items-center gap-2">
      <ShoppingCart />
      <span>Add to Cart</span> {/* Added span for the text */}
    </div>
  </button>
</div>

              </div>
            ))
          ) : (
            <p className="text-center w-full py-10 text-gray-500">
              No latest products available
            </p>
          )}
        </div>
      )}
    </section>
  
  </div>
  
  )
}