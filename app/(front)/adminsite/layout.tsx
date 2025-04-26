'use client'

import Link from "next/link";
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  //check the user is admin or not
  const router = useRouter()
  const [isloading, setisloading] = useState(true)

  useEffect(() => {
    const check = async () => {
      const access_token = localStorage.getItem('access')
      const refresh_token = localStorage.getItem('refresh')
      console.log(access_token)

      if (!access_token) {
        router.push('/')
        return
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/protected/", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        console.log(response.data);

        if (response.data.message === 'user') {
          router.push('/')
        } else {
          setisloading(false)
        }
      } catch (e) {
        console.error('Error:', e)


        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh: refresh_token
        });


        localStorage.setItem('access', response.data.access);
        setTimeout(() => {
          router.push('/adminsite/dashboard');
        }, 3000);

        console.log(response.data);
      }
    };

    check();  // Invoke the function inside the effect
  }, []);

  if (isloading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <div className="text-black font-semibold text-2xl">Loading.....</div>
      </div>
    );

  };

  if (!isloading) {
    return (

      <div className="flex flex-col max-h-screen bg-gray-100 text-black">
        {/* Main Section */}
        <div className="flex flex-1 text-black">
          {/* Sidebar */}
          <aside className="w-1/5 bg-white shadow-md px-4 py-6 space-y-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/adminsite/dashboard" className="text-gray-700 hover:text-green-600">
                Dashboard
              </Link>
              <Link href="/adminsite/products" className="text-gray-700 hover:text-green-600">
                Products
              </Link>
              <Link href="/adminsite/users" className="text-gray-700 hover:text-green-600">
                Users
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="w-4/5 p-6 mx-10 mt-4">
            {children}
          </main>
        </div>
      </div>
    );
  }

}
