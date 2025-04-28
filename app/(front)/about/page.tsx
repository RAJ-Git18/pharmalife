'use client'

import Link from 'next/link'

export default function About() {
  return (
    <div className="flex flex-col items-center">
      <div className="">
        <h1 className="text-4xl font-bold text-slate-800 mb-6 ">About PharmaLife</h1>
      </div>

      <div className="">
        <p className="text-lg text-gray-700 mb-8 text-justify">
          At PharmaLife, we believe that good health is the foundation of a happy life, and we are proud to be your reliable partner on this journey. Our mission is to make quality healthcare accessible to everyone by offering a wide range of genuine pharmaceutical products, wellness supplies, personal care items, and expert guidance all in one convenient platform. We are committed to upholding the highest standards of trust, affordability, and customer satisfaction, ensuring that every product we deliver contributes to your well-being. Whether you are looking for daily health essentials, specialized medications, or simply advice to lead a healthier life, PharmaLife is here to serve with dedication and care. With a focus on fast delivery, excellent service, and an easy shopping experience, we are constantly evolving to meet the changing needs of individuals, families, and communities across the country. At PharmaLife, your health is not just a priority — it’s our purpose.
        </p>
      </div>

      <div className="">
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-gray-950 transition"
        >
          Explore Our Shop
        </Link>
      </div>
    </div>
  )
}
