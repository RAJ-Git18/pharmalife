import React from 'react'
import WeeklySales from '@/components/ui/WeeklySales'
import TotalOrders from '@/components/ui/TotalOrders'
import TotalSales from '@/components/ui/TotalSales'

const page = () => {
  return (
    <div className="mt-3 flex flex-col h-[80vh] w-full p-1 gap-8">
      <div className="w-full flex gap-10">
        <div className="bg-white h-48 rounded-lg w-full">
          <WeeklySales/>
        </div>
        <div className="bg-white h-48 rounded-lg w-full">
          <TotalOrders/>
        </div>
      </div>
      <div className="bg-yellow-200 h-96 w-full rounded-lg">
        <TotalSales/>
      </div>
    </div>
  )
}

export default page
