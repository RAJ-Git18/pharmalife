'use client'

import React from 'react'
import Image from 'next/image'
import { ShoppingCart, Heart } from 'lucide-react'
import Link from 'next/link'
import useCartStore from '@/store/userCartStore'


const Card = ({ image_path }: { image_path: string }) => {

  const {cartCount, addToCart} = useCartStore()

  //add the cart to the backend
  const cartClicked = async () => {
    addToCart()
    console.log(cartCount)
    const response = await fetch("http://127.0.0.1:8000/api/cart")
    const data = await response.json()
    console.log(data)
  }


  return (
    <div className='border-2 mt-10 h-70 w-64 rounded-sm flex flex-col justify-between items-center gap-2'>
      <Image
        src={image_path}
        alt="Cards.png"
        width={100}
        height={200}
        // style={{ width: "auto", height: "auto" }}
        className='rounded-md object-cover h-[200px] w-[250px]'
      />

      <div className="card_name">name is here</div>
      <div className="flex justify-between border-t-2 w-full p-4">
        <div className="price">price</div>
        <div className="card_whilist flex gap-3">

            <button onClick={cartClicked}>
              <ShoppingCart />

            </button>

          <Link href='/cart'><Heart /></Link>
        </div>
      </div>

    </div>
  )
}

export default Card
