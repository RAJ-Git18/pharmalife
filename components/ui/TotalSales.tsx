'use client'

import React, { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'

const salesDataByYear: Record<number, { month: string; sales: number }[]> = {
  2023: [
    { month: 'Jan', sales: 2000 },
    { month: 'Feb', sales: 2200 },
    { month: 'Mar', sales: 2500 },
    { month: 'Apr', sales: 2700 },
    { month: 'May', sales: 3000 },
    { month: 'Jun', sales: 2800 },
    { month: 'Jul', sales: 3200 },
    { month: 'Aug', sales: 3100 },
    { month: 'Sep', sales: 3400 },
    { month: 'Oct', sales: 3600 },
    { month: 'Nov', sales: 4000 },
    { month: 'Dec', sales: 4500 },
  ],
  2024: [
    { month: 'Jan', sales: 2500 },
    { month: 'Feb', sales: 2600 },
    { month: 'Mar', sales: 2700 },
    { month: 'Apr', sales: 2900 },
    { month: 'May', sales: 3100 },
    { month: 'Jun', sales: 3300 },
    { month: 'Jul', sales: 3500 },
    { month: 'Aug', sales: 3700 },
    { month: 'Sep', sales: 3900 },
    { month: 'Oct', sales: 4200 },
    { month: 'Nov', sales: 4500 },
    { month: 'Dec', sales: 4800 },
  ]
}

const TotalSales = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024)

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value))
  }

  const chartData = salesDataByYear[selectedYear]

  return (
    <div className="p-4 w-full">
      <div className="flex items-center justify-between mb-4 px-7">
        <h2 className="text-xl font-semibold">Monthly Sales</h2>
        <select
          className="border p-1 rounded"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {Object.keys(salesDataByYear).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="h-72 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default TotalSales
