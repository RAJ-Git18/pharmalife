'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Loader from '@/components/Loader'
import { Trash } from 'lucide-react'
import { useCartContext } from '@/context/CardContext'
import Link from 'next/link'

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
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const { cartCount, setCartCount } = useCartContext()

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true)
      const accessToken = localStorage.getItem('access')
      const refreshToken = localStorage.getItem('refresh')

      if (!accessToken) {
        alert('Please login to view your cart')
        router.push('/')
        return
      }

      try {
        const response = await axios.get(`${apiUrl}/api/protected/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.data.message === 'admin') {
          alert('Admin cannot see the carts')
          router.push('/')
          return
        }

        const userid = response.data.userid
        const cartResponse = await axios.get(`${apiUrl}/api/cart/${userid}/`)
        setcartItems(cartResponse.data.message)

      } catch (error: any) {
        if (error.response?.status === 401) {
          try {
            const refreshResponse = await axios.post(`${apiUrl}/api/token/refresh/`, {
              'refresh': refreshToken
            });
            localStorage.setItem('access', refreshResponse.data.access);
            window.location.reload()
          } catch (refreshError) {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('cartCount')
            router.push('/')
          }
        } else {
          console.error('Error fetching cart:', error)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchCart()
  }, [])

  const handleIncrease = (cart: string) => {
    const newcartitem = cartItems.map((items) =>
      items.cartid === cart
        ? { ...items, quantity: items.quantity + 1 }
        : items
    );
    setcartItems(newcartitem);
    setCartCount(cartCount + 1)
  };

  const handleDecrease = (cart: string) => {
    const newcartitem = cartItems.map((items) =>
      items.cartid === cart && items.quantity > 1
        ? { ...items, quantity: items.quantity - 1 }
        : items
    );
    setcartItems(newcartitem);
    setCartCount(cartCount - 1)
  };

  const DeleteCart = async (cartid: string, quantity:number) => {
    setIsDeleting(true)
    try {
      await axios.delete(`${apiUrl}/api/cart/${cartid}/`)
      const updatedCart = cartItems.filter(item => item.cartid !== cartid)
      setcartItems(updatedCart)
      // setCartCount(cartCount - 1)
      localStorage.setItem('cartCount', (cartCount - quantity).toString())
    } catch (error) {
      alert('Unable to delete the cart item.')
    } finally {
      setIsDeleting(false)
      window.location.reload()
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 overflow-x-auto w-full min-h-screen p-4">
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}

      {cartItems.length > 0 ? (
        <>
          {/* Left side - Cart items */}
          <div className="w-full md:w-2/3 flex flex-col gap-4">
            {cartItems.map((items) => (
              <div
                key={items.cartid}
                className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg"
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

                {/* Quantity controls */}
                <div className="flex items-center ml-4 gap-5">
                  <div className="flex items-center">
                    <button
                      className="text-xl text-gray-500 hover:text-gray-700 border-2 px-2"
                      onClick={() => handleDecrease(items.cartid)}
                      disabled={items.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-2 text-lg font-semibold">{items.quantity}</span>
                    <button
                      className="text-xl text-gray-500 hover:text-gray-700 border-2 px-2"
                      onClick={() => handleIncrease(items.cartid)}
                    >
                      +
                    </button>
                  </div>
                  {/* Delete button */}
                  <button
                    onClick={() => DeleteCart(items.cartid, items.quantity)}
                    disabled={isDeleting}
                  >
                    <Trash className={isDeleting ? "opacity-50" : ""} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Summary & Proceed */}
          <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-6 flex flex-col items-center gap-4 justify-center">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="">
                <Image src='/images/logo/pharmalogo.png' height={200} width={150} alt='logo' />
              </div>
              <h2 className="text-xl font-bold text-gray-800 border-y w-full text-center py-2">Cart Summary</h2>
            </div>
            <p className="text-md font-semibold text-gray- w-full">
              <div className="flex justify-between w-full">
                <div className="">
                  {cartItems.map((item) => (
                    <ul key={item.cartid}>
                      <li>{item.product.name}</li>
                    </ul>
                  ))}
                </div>
                <div className="">
                  {cartItems.map((item) => (
                    <ul key={item.cartid}>
                      <li>Rs. {(parseFloat(item.product.price) * (item.quantity)).toFixed(2)}</li>
                    </ul>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center py-2 mt-2 border-y">
                <div className="">Total</div>
                <div className="">Rs.
                  {cartItems.reduce((total, item) =>
                    total + parseFloat(item.product.price) * item.quantity, 0
                  )}
                </div>
              </div>
            </p>
            <button
              onClick={() => router.push('/scan')}
              className="bg-[#20B472] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition"
            >
              Ok, Proceed
            </button>
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col items-center justify-center py-20">
          <h1 className="font-semibold text-2xl text-black mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
          <Link
            href="/"
            className="bg-[#20B472] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition"
          >
            Shop Now
          </Link>
        </div>
      )}
    </div>
  )
}

export default page