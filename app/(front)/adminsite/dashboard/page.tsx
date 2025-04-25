'use client'

import React, { useEffect } from 'react'
import WeeklySales from '@/components/ui/WeeklySales'
import TotalOrders from '@/components/ui/TotalOrders'
import TotalSales from '@/components/ui/TotalSales'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useState } from 'react'

const page = () => {
  const router = useRouter()
  const [isloading, setisloading] = useState(true)

  useEffect(() => {
    const check = async () => {
      const access_token = localStorage.getItem('access')
      const refresh_token = localStorage.getItem('refresh')
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/protected/", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        console.log(response.data);

        if (response.data.message === 'user') {
          router.push('/')
        }
        setisloading(false)
      } catch (e) {
        console.error('Error:', e)


        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh: refresh_token
        });


        localStorage.setItem('access', response.data.access);
        router.push('/adminsite/dashboard');

        console.log(response.data);
      }
    };

    check();  // Invoke the function inside the effect
  }, []);  // Empty dependency array to run the effect only once on mount


  if (isloading) {
    <div className="">loading.........</div>

  };

  if (!isloading) {
    return (<div className="mt-3 flex flex-col h-[80vh] w-full p-1 gap-8">

      <div className="w-full flex gap-10">
        <div className="bg-white h-48 rounded-lg w-full">
          <WeeklySales />
        </div>
        <div className="bg-white h-48 rounded-lg w-full">
          <TotalOrders />
        </div>
      </div>
      <div className="bg-white h-96 w-full rounded-lg">
        <TotalSales />
      </div>
    </div>);
  }
}

export default page;
