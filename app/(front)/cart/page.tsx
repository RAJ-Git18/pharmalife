'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Loader from '@/components/Loader'  // Assuming you have a Loader component

const apiUrl = process.env.NEXT_PUBLIC_API_URL

interface ProductItemsInterface {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string;
  is_latest: boolean;
  is_featured: boolean;
}

interface CartItemsInterface {
  cartid: string,
  userid: number,
  productid: string,
  quantity: number,
  product: ProductItemsInterface
}

const page = () => {
  const router = useRouter()
  const [cartItems, setcartItems] = useState<CartItemsInterface[]>([])
  const [isLoading, setIsLoading] = useState(true)  // Track loading state

  useEffect(() => {
    const accessToken = localStorage.getItem('access')
    const refreshToken = localStorage.getItem('refresh')
    if (!accessToken) {
      alert('Login to see the cart')
    }

    const ShowCart = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/protected/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.data.message === 'admin') {
          alert('Admin cannot see the carts')
          return
        }

        const userid = response.data.userid

        const response2 = await axios.get(`${apiUrl}/api/cart/${userid}/`)
        setcartItems(response2.data.message)
        setIsLoading(false)  // Data fetched, set loading to false

      } catch (error: any) {
        if (error.response.status === 401) {
          try {
            const response = await axios.post(`${apiUrl}/api/token/refresh/`, {
              'refresh': refreshToken
            });
            localStorage.setItem('access', response.data.access);
          } catch (error) {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('cartCount')
          }
        }

        router.refresh()
      }
    }

    ShowCart()
  }, [])

  const handleIncrease = (cart: string) => {
    const newcartitem = cartItems.map((items) =>
      items.cartid === cart
        ? { ...items, quantity: items.quantity + 1 }
        : items
    );
    setcartItems(newcartitem);
  };

  const handleDecrease = (cart: string) => {
    const newcartitem = cartItems.map((items) =>
      items.cartid === cart && items.quantity > 1
        ? { ...items, quantity: items.quantity - 1 }
        : items
    );
    setcartItems(newcartitem);
  };

  // Render loader while fetching data
  if (isLoading) {
    return (
        <Loader />
    );
  }
  return (
    <div className='flex flex-col items-center gap-5 mb-10 w-full min-h-screen'>
      <h1 className='text-2xl font-bold'>Cart Items</h1>
      {cartItems &&
        cartItems.map((items) => (
          <div
            key={items.cartid}
            className="flex items-center justify-between bg-white p-4 shadow-md mb-4 rounded-lg w-full"
          >
            {/* Image */}
            <div className="flex-shrink-0">
              <Image
                src={`${apiUrl}${items.product.image}`}
                alt={items.product.name}
                height={50}
                width={50}
                className="object-cover rounded-md"
              />
            </div>

            {/* Product details */}
            <div className="flex-grow ml-4">
              <h3 className="text-lg font-semibold">{items.product.name}</h3>
              <p className="text-sm text-gray-500">{items.product.description}</p>
              <p className="text-md text-gray-700 mt-2">Price: Rs. {items.product.price}</p>
            </div>

            {/* Quantity and buttons */}
            <div className="flex items-center ml-4 border-2">
              <button
                className="text-xl text-gray-500 hover:text-gray-700 border-2 px-2"
                onClick={() => handleDecrease(items.cartid)}
                disabled={items.quantity <= 1}
              >
                -
              </button>
              <span className="mx-2 text-lg">{items.quantity}</span>
              <button
                className="text-xl text-gray-500 hover:text-gray-700 border-2 px-2"
                onClick={() => handleIncrease(items.cartid)}
              >
                +
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default page
