import React from 'react'
import { FiActivity, FiShield, FiAlertTriangle, FiCheckCircle, FiTrendingUp, FiUsers } from 'react-icons/fi'
import Card from '../components/ui/Card'
import AnalyticsChart from '../components/charts/AnalyticsChart'
import ToxicityMeter from '../components/charts/ToxicityMeter'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Analyses',
      value: '12,847',
      change: '+12%',
      positive: true,
      icon: FiActivity,
      color: 'bg-blue-500'
    },
    {
      title: 'Toxic Detected',
      value: '1,247',
      change: '-8%',
      positive: true,
      icon: FiAlertTriangle,
      color: 'bg-red-500'
    },
    {
      title: 'Clean Content',
      value: '11,600',
      change: '+15%',
      positive: true,
      icon: FiCheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Protection Rate',
      value: '97.2%',
      change: '+2%',
      positive: true,
      icon: FiShield,
      color: 'bg-purple-500'
    }
  ]

  const recentActivity = [
    { id: 1, action: 'Toxic content detected and blocked', time: '2 minutes ago', type: 'warning' },
    { id: 2, action: 'Batch analysis completed (500 items)', time: '5 minutes ago', type: 'success' },
    { id: 3, action: 'New user registered', time: '10 minutes ago', type: 'info' },
    { id: 4, action: 'API rate limit reached', time: '15 minutes ago', type: 'warning' },
    { id: 5, action: 'Weekly report generated', time: '1 hour ago', type: 'success' }
  ]

  return (
    <div className="min-h-screen lg:ml-64 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Dashboard
          </h1>
          <p className="text-white/70 text-lg">
            Monitor your content analysis and system performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} hover className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium flex items-center ${
                  stat.positive ? 'text-green-400' : 'text-red-400'
                }`}>
                  <FiTrendingUp className="w-4 h-4 mr-1" />
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-white/60 text-sm">{stat.title}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Analytics Chart */}
          <div className="lg:col-span-2">
            <AnalyticsChart title="Weekly Analysis Trends" />
          </div>

          {/* Current Toxicity Level */}
          <Card className="text-center p-8">
            <h3 className="text-xl font-semibold text-white mb-6">Current Toxicity Level</h3>
            <ToxicityMeter score={0.23} size="lg" />
            <p className="text-white/70 text-sm mt-4">
              Based on last 100 analyzed texts
            </p>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
            <FiActivity className="w-6 h-6 text-white/60" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-400' :
                    activity.type === 'warning' ? 'bg-yellow-400' :
                    'bg-blue-400'
                  }`}></div>
                  <span className="text-white">{activity.action}</span>
                </div>
                <span className="text-white/60 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
