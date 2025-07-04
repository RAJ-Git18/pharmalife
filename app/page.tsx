'use client'
import Card from "@/components/ui/Card";
import { Slider } from "@/components/ui/carousel";
import { ShoppingCart } from 'lucide-react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/context/CartContext";
import Loader from "@/components/Loader";


const apiUrl = process.env.NEXT_PUBLIC_API_URL


const card_images: string[] = [
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
  is_featured?: boolean;
}


export default function Home() {
  const [accessToken, setaccessToken] = useState<string | null>(null)
  const [refreshToken, setrefreshToken] = useState<string | null>(null)
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSpinner, setshowSpinner] = useState(false)

  const router = useRouter()


  const { cartCount, setCartCount } = useCartContext()
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smooth scrolling
    });
  };



  useEffect(() => {
    setaccessToken(localStorage.getItem('access'))
    setrefreshToken(localStorage.getItem('refresh'))
    const fetchProducts = async () => {
      try {
        // Fetch latest products
        console.log('API URL:', `${apiUrl}/products/latest/`);
        const latestResponse = await fetch(`${apiUrl}/products/latest/`);
        if (!latestResponse.ok) {
          throw new Error(`HTTP error! status: ${latestResponse.status}`);
        }
        const latestData = await latestResponse.json();
        setLatestProducts(latestData);

        // Fetch featured products
        const featuredResponse = await fetch(`${apiUrl}/products/featured/`);
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



  //maile yaha bata cart haru add gardai xu
  const addToCart = async (product_id: Number) => {
    scrollToTop()
    setshowSpinner(true)

    if (!accessToken) {
      alert('Login to add to cart')
      return
    }

    if (localStorage.getItem('isadmin') === 'admin') {
      alert('Admin cannot add to cart')
      return
    }

    try {
      const userid = localStorage.getItem('userid')
      const response = await axios.post(`${apiUrl}/api/cart/`,
        {
          userid: userid,
          productid: product_id
        }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      )

      if (response.status === 201) {
        setshowSpinner(false)
        setCartCount(cartCount + 1)
        return
      }
    } catch (error) {
      alert('Cart cannot be added!')
      window.location.reload()
    }
  }

  if (showSpinner) {
    return (
      <div className="h-screen flex justify-center items-center -mt-24 backdrop-blur-sm">
        <Loader />
      </div>
    )
  }


  return (
    <div className="md:mx-32 mx-8 ">

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
                  <p className="text-gray-600 mt-2">Npr.{product.price}</p>
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

                      onClick={() => (addToCart(product.id))}
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

                    <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition duration-300">
                      <div className="card_whilist flex items-center gap-2">
                        <ShoppingCart />
                        <button onClick={() => (addToCart(product.id))}>Add to Cart</button>
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