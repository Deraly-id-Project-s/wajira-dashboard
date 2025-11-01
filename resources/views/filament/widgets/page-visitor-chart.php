import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import useFetchData from '@/Components/useFetchData'

export default function PageVisitorChart() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const { data, loading, error, refetch } = useFetchData('/page-visitor', {
    params: { start_date: startDate, end_date: endDate },
  })

  const handleFilter = (e) => {
    e.preventDefault()
    refetch()
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">📈 Page Click Statistics</h2>

      {/* Filter */}
      <form onSubmit={handleFilter} className="flex gap-3 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Filter
        </button>
      </form>

      {/* Chart */}
      <div className="w-full h-64">
        {loading ? (
          <div className="text-center text-gray-500 mt-10">Loading chart...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error loading data</div>
        ) : data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total_clicks"
                stroke="#ef4444" // merah
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, fill: '#ef4444' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-500 mt-10">No data available</div>
        )}
      </div>
    </div>
  )
}
