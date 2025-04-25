'use client'

import React from 'react'
import WeeklySales from '@/components/ui/WeeklySales'
import TotalOrders from '@/components/ui/TotalOrders'
import TotalSales from '@/components/ui/TotalSales'

import { useEffect } from 'react'
import axios from 'axios'

const page = () => {


  useEffect(() => {
    const check = async () => {

      const response = await axios.get('http://127.0.0.1:8000/api/login/',{
        'withCredentials' : true
      })

      console.log(response.data)

    }

    check()
  }, [])






  return (
    <div className="mt-3 flex flex-col h-[80vh] w-full p-1 gap-8">
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
    </div>
  )
}

export default page
