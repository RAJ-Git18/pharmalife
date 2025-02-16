import React from 'react'
import Image from 'next/image'

const Cart = () => {
  return (
    <div className='bg-blue-300 h-80 w-60 rounded-sm'>
          <Image
            src = "/images/slider/masks.jpg"
            alt = "carts.png"
            width={240}
            height={100}
          />
    </div>
  )
}

export default Cart
