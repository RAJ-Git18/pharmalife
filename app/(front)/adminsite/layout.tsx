'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Loader from '@/components/Loader'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  const [isloading, setisloading] = useState(true)

  useEffect(() => {
    const check = async () => {
      const access_token = localStorage.getItem('access')
      const refresh_token = localStorage.getItem('refresh')

      if (!access_token) {
        router.push('/')
        setTimeout(() => {
          setisloading(false)
        }, 1000);
        return
      }

      try {
        const response = await axios.get(`${apiUrl}/api/protected/`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (response.data.message === 'user') {
          router.push('/')
        } else {
          setisloading(false)
        }
      } catch (e) {
        console.error('Error:', e)

        const response = await axios.post(`${apiUrl}/api/token/refresh/`, {
          'refresh': refresh_token
        });

        localStorage.setItem('access', response.data.access);
        setTimeout(() => {
          router.push('/adminsite/dashboard');
        }, 3000);
      }
    };

    check();
  }, []);

  if (isloading) {
    return (
      <Loader/>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 fixed top-18 left-0 h-screen">
        <nav className="flex flex-col space-y-4">
          <Link href="/adminsite/dashboard" className="text-gray-700 hover:text-green-600 font-semibold">
            Dashboard
          </Link>
          <Link href="/adminsite/products" className="text-gray-700 hover:text-green-600 font-semibold">
            Products
          </Link>
          <Link href="/adminsite/users" className="text-gray-700 hover:text-green-600 font-semibold">
            Users
          </Link>
          <Link href="/adminsite/inquiry" className="text-gray-700 hover:text-green-600 font-semibold">
            Customer Inquiry
          </Link>
          <Link href="/adminsite/status" className="text-gray-700 hover:text-green-600 font-semibold">
            Status
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 overflow-y-auto p-10">
        {children}
      </main>
    </div>
  );
}
