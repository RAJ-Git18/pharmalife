'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'

const data = [
  { "day": "Sunday", "sales": 3000 },
  { "day": "Monday", "sales": 4000 },
  { "day": "Tuesday", "sales": 5200 },
  { "day": "Wednesday", "sales": 3200 },
  { "day": "Thursday", "sales": 2800 },
  { "day": "Friday", "sales": 3900 },
  { "day": "Saturday", "sales": 4500 }
]

// const [WeeklySalesData, setWeeklySalesData] = useState([])

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { day, sales } = payload[0].payload;
    return (
      <div className="bg-white border border-gray-300 px-3 py-2 rounded shadow">
        <p className="text-sm font-medium">{`${day}: ${sales}`}</p>
      </div>
    );
  }

  return null;
};



const WeeklySales = () => {

  // useEffect(() => {
  //   const response = 
  // }, [])


  return (
    <div>
      <div className="h-48 w-full flex justify-between p-5">
        <div className="sales flex flex-col w-1/2 items-center">
          <div className="h-1/2 p-10 text-center font-medium">Weekly Sales</div>
          <div className=" h-1/2 text-3xl font-semibold">Npr.400K</div>
        </div>
        <div className="barchart w-[33%]">

          <ResponsiveContainer>
            <BarChart data={data}>
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="sales"
                fill="#15803D"
                barSize={10}
                activeBar={false}
              />
            </BarChart>
          </ResponsiveContainer>



        </div>
      </div>
    </div>
  )
}

export default WeeklySales
