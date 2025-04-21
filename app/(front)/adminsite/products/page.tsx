import React from 'react'

const page = () => {
  return (
    <div >
      <h1 className='text-2xl mb-10'>Products</h1>
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded'>Add Product</button>
          <button className='bg-red-500 text-white px-4 py-2 rounded'>Delete Product</button>
        </div>
        <input type="text" placeholder="Search..." className='border p-2 rounded' />
      </div>
      {/* Add your product table here */}
          
    </div>
  )
}

export default page
