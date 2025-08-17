// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  UsersIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import api from '../services/api';

// Components
import Card from '../components/ui/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatTimestamp, truncateText, getToxicityLevel } from '../utils/helpers'; // Assuming you have this file

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get('/predict/dashboard-stats');
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // You might want to show a toast error here
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <LoadingSpinner className="w-12 h-12 mx-auto mb-4" />
          <p className="text-lg">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Calculate derived stats
  const cleanContent = stats.totalAnalyzed - stats.toxicDetected;
  const protectionRate = stats.totalAnalyzed > 0 ? ((cleanContent / stats.totalAnalyzed) * 100).toFixed(1) : '0.0';

  const statCards = [
    {
      title: 'Total Texts Analyzed',
      value: stats.totalAnalyzed.toLocaleString(),
      icon: DocumentTextIcon,
      color: 'blue',
      change: `+${stats.todayAnalyzed} today`
    },
    {
      title: 'Toxic Content Detected',
      value: stats.toxicDetected.toLocaleString(),
      icon: ExclamationTriangleIcon,
      color: 'red',
      percentage: stats.totalAnalyzed > 0 ? ((stats.toxicDetected / stats.totalAnalyzed) * 100).toFixed(1) : '0.0'
    },
    {
      title: 'Clean Content',
      value: cleanContent.toLocaleString(),
      icon: CheckCircleIcon,
      color: 'green',
    },
    {
      title: 'Protection Rate',
      value: `${protectionRate}%`,
      icon: ShieldCheckIcon,
      color: 'purple',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      icon: UsersIcon,
      color: 'indigo',
    }
  ];

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    red: 'from-red-500 to-red-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          <ChartBarIcon className="w-10 h-10 inline-block mr-3" />
          Analytics Dashboard
        </h1>
        <p className="text-white/80 text-lg">
          Monitor your AI-powered content moderation system
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-6 hover:shadow-2xl h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[stat.color]} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    {stat.title}
                  </div>
                </div>

                {stat.change && (
                  <div className="text-sm text-gray-500">
                    {stat.change}
                  </div>
                )}
                
                {stat.percentage && (
                  <div className="text-sm text-gray-500">
                    {stat.percentage}% of total content
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <ClockIcon className="w-6 h-6 mr-2 text-purple-500" />
            Recent Activity
          </h3>
          
          <div className="space-y-4">
            {stats.recentActivity.length > 0 ? stats.recentActivity.map((activity) => {
                const level = getToxicityLevel(activity.results.overallScore);
                let severityClass = 'bg-blue-500';
                if (level === 'high') severityClass = 'bg-red-500';
                else if (level === 'medium') severityClass = 'bg-yellow-500';
                else if (level === 'low') severityClass = 'bg-green-500';

                return (
                    <div key={activity._id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${severityClass}`}></div>
                        <div className="flex-1">
                        <p className="text-gray-900 font-medium">
                            "{truncateText(activity.inputText, 60)}"
                        </p>
                        <p className="text-xs text-gray-500">
                            Analyzed by {activity.userId ? activity.userId.username : 'Anonymous'}
                        </p>
                        </div>
                        <div className="text-sm text-gray-500">{formatTimestamp(activity.createdAt)}</div>
                    </div>
                )
            }) : (
                <p className="text-gray-500 text-center py-4">No recent activity to display.</p>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
