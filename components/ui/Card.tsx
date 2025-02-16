import React from 'react'
import Image from 'next/image'
import { ShoppingCart, Heart } from 'lucide-react'
import Link from 'next/link'


const Card = () => {
  return (
    <div className='border-2 mt-10 h-70 w-64 rounded-sm flex flex-col justify-between items-center gap-2'>
      <Image
        src="/images/slider/medicine.png"
        alt="Cards.png"
        width={100}
        height={200}
        className='rounded-md object-cover h-[200px] w-[250px]'
      />

      <div className="card_name">name is here</div>
      <div className="flex justify-between border-t-2 w-full p-4">
        <div className="price">price</div>
        <div className="card_whilist flex gap-3">
          <Link href='/cart'><ShoppingCart /></Link>
          <Link href='/cart'><Heart /></Link>
        </div>
      </div>

    </div>
  )
}

export default Card
