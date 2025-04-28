'use client'

import React from 'react'
import Image from 'next/image'
import { ShoppingCart, Heart } from 'lucide-react'
import Link from 'next/link'
import useCartStore from '@/store/userCartStore'


const Card = ({ image_path }: { image_path: string }) => {
  const backendUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : 'https://your-production-url.com'; // Adjust this for production

  const fullImagePath = `${backendUrl}${image_path}`; // This ensures the full URL is used


  //add the cart to the backend
  


  return (
    <div className='border-2 mt-10 h-70 w-64 rounded-sm flex flex-col justify-between items-center gap-2'>
      <Image
        src={fullImagePath}
        alt="Cards.png"
        width={340}
        height={400}
        // style={{ width: "auto", height: "auto" }}
        className='rounded-md object-cover h-[200px] w-[250px]'
      />

      <div className="flex justify-between  w-full p-4">
        
      </div>

    </div>
  )
}

export default Card
