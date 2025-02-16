import React from 'react'
import Image from 'next/image'
import { ShoppingCart, Heart } from 'lucide-react'

const card_images = [
  "images/slider/medicine2.png",
  "images/slider/medicine2.png",
  "images/slider/medicine2.png",
  "images/slider/medicine2.png"
]

const Card = () => {
  return (
    <div className='bg-blue-300 h-80 w-64 rounded-sm flex flex-col justify-between items-center'>
        <Image
          src="/images/slider/medicine.png"
          alt="Cards.png"
          width={240}
        height={100}
        className='rounded-md'
      />
      
      <div className="card_name">name is here</div>
      <div className="flex justify-between bg-blue-600 w-full p-4">
        <div className="price">price</div>
        <div className="card_whilist flex gap-2">
          <ShoppingCart />
          <Heart/>
        </div>
      </div>

    </div>
  )
}

export default Card
