'use client'

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const orderDataByYear: {
  [year: number]: { month: string; orders: number }[];
} = {
  2023: [
    { month: 'Jan', orders: 150 },
    { month: 'Feb', orders: 220 },
    { month: 'Mar', orders: 300 },
    { month: 'Apr', orders: 180 },
    { month: 'May', orders: 360 },
    { month: 'Jun', orders: 200 },
    { month: 'Jul', orders: 470 },
    { month: 'Aug', orders: 380 },
    { month: 'Sep', orders: 510 },
    { month: 'Oct', orders: 420 },
    { month: 'Nov', orders: 590 },
    { month: 'Dec', orders: 690 },
  ],
  2024: [
    { month: 'Jan', orders: 120 },
    { month: 'Feb', orders: 210 },
    { month: 'Mar', orders: 390 },
    { month: 'Apr', orders: 280 },
    { month: 'May', orders: 450 },
    { month: 'Jun', orders: 300 },
    { month: 'Jul', orders: 600 },
    { month: 'Aug', orders: 480 },
    { month: 'Sep', orders: 700 },
    { month: 'Oct', orders: 540 },
    { month: 'Nov', orders: 620 },
    { month: 'Dec', orders: 760 },
  ],
};

const MonthlyOrdersAreaChart = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const data = orderDataByYear[selectedYear];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center px-4 mb-2">
        <h2 className="text-xl font-semibold">Monthly Orders</h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          {Object.keys(orderDataByYear).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="h-64 p-3">
        <ResponsiveContainer width="100%" height="55%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#15803D" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#15803D" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            {/* Custom Tooltip */}
            <Tooltip
              content={({ payload }) => {
                if (!payload || !payload.length) return null;
                const { month, orders } = payload[0].payload;
                return (
                  <div className="bg-white p-2 border rounded shadow text-sm text-black">
                    <p>{month}</p>
                    <p className="font-medium">Orders: {orders}</p>
                  </div>
                );
              }}
            />

            <Area
              type="monotone"
              dataKey="orders"
              stroke="#15803D"
              fill="url(#greenGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyOrdersAreaChart;
