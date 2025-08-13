import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const AnalyticsChart = ({ data, title = 'Analytics Overview' }) => {
  const chartData = data || [
    { name: 'Mon', toxic: 12, clean: 45 },
    { name: 'Tue', toxic: 19, clean: 52 },
    { name: 'Wed', toxic: 8, clean: 38 },
    { name: 'Thu', toxic: 15, clean: 48 },
    { name: 'Fri', toxic: 22, clean: 61 },
    { name: 'Sat', toxic: 18, clean: 55 },
    { name: 'Sun', toxic: 14, clean: 42 }
  ]

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
            <YAxis stroke="rgba(255,255,255,0.7)" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="toxic" 
              stroke="#EF4444" 
              strokeWidth={3}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="clean" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AnalyticsChart
