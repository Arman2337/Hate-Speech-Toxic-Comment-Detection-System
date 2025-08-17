// import React from 'react'
// import { FiActivity, FiShield, FiAlertTriangle, FiCheckCircle, FiTrendingUp, FiUsers } from 'react-icons/fi'
// import Card from '../components/ui/Card'
// import AnalyticsChart from '../components/charts/AnalyticsChart'
// import ToxicityMeter from '../components/charts/ToxicityMeter'

// const Dashboard = () => {
//   const stats = [
//     {
//       title: 'Total Analyses',
//       value: '12,847',
//       change: '+12%',
//       positive: true,
//       icon: FiActivity,
//       color: 'bg-blue-500'
//     },
//     {
//       title: 'Toxic Detected',
//       value: '1,247',
//       change: '-8%',
//       positive: true,
//       icon: FiAlertTriangle,
//       color: 'bg-red-500'
//     },
//     {
//       title: 'Clean Content',
//       value: '11,600',
//       change: '+15%',
//       positive: true,
//       icon: FiCheckCircle,
//       color: 'bg-green-500'
//     },
//     {
//       title: 'Protection Rate',
//       value: '97.2%',
//       change: '+2%',
//       positive: true,
//       icon: FiShield,
//       color: 'bg-purple-500'
//     }
//   ]

//   const recentActivity = [
//     { id: 1, action: 'Toxic content detected and blocked', time: '2 minutes ago', type: 'warning' },
//     { id: 2, action: 'Batch analysis completed (500 items)', time: '5 minutes ago', type: 'success' },
//     { id: 3, action: 'New user registered', time: '10 minutes ago', type: 'info' },
//     { id: 4, action: 'API rate limit reached', time: '15 minutes ago', type: 'warning' },
//     { id: 5, action: 'Weekly report generated', time: '1 hour ago', type: 'success' }
//   ]

//   return (
//     <div className="min-h-screen lg:ml-64 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Dashboard
//           </h1>
//           <p className="text-white/70 text-lg">
//             Monitor your content analysis and system performance
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {stats.map((stat, index) => (
//             <Card key={index} hover className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className={`p-3 rounded-xl ${stat.color}`}>
//                   <stat.icon className="w-6 h-6 text-white" />
//                 </div>
//                 <span className={`text-sm font-medium flex items-center ${
//                   stat.positive ? 'text-green-400' : 'text-red-400'
//                 }`}>
//                   <FiTrendingUp className="w-4 h-4 mr-1" />
//                   {stat.change}
//                 </span>
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
//               <p className="text-white/60 text-sm">{stat.title}</p>
//             </Card>
//           ))}
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8 mb-12">
//           {/* Analytics Chart */}
//           <div className="lg:col-span-2">
//             <AnalyticsChart title="Weekly Analysis Trends" />
//           </div>

//           {/* Current Toxicity Level */}
//           <Card className="text-center p-8">
//             <h3 className="text-xl font-semibold text-white mb-6">Current Toxicity Level</h3>
//             <ToxicityMeter score={0.23} size="lg" />
//             <p className="text-white/70 text-sm mt-4">
//               Based on last 100 analyzed texts
//             </p>
//           </Card>
//         </div>

//         {/* Recent Activity */}
//         <Card className="p-8">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
//             <FiActivity className="w-6 h-6 text-white/60" />
//           </div>
//           <div className="space-y-4">
//             {recentActivity.map((activity) => (
//               <div key={activity.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
//                 <div className="flex items-center space-x-3">
//                   <div className={`w-2 h-2 rounded-full ${
//                     activity.type === 'success' ? 'bg-green-400' :
//                     activity.type === 'warning' ? 'bg-yellow-400' :
//                     'bg-blue-400'
//                   }`}></div>
//                   <span className="text-white">{activity.action}</span>
//                 </div>
//                 <span className="text-white/60 text-sm">{activity.time}</span>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export default Dashboard


// // src/pages/Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import {
//   ChartBarIcon,
//   DocumentTextIcon,
//   ExclamationTriangleIcon,
//   CheckCircleIcon,
//   ClockIcon,
//    ArrowTrendingUpIcon,
//   ArrowTrendingDownIcon,
//   UsersIcon
// } from '@heroicons/react/24/outline';

// // Components
// import Card from '../components/ui/Card';
// import LoadingSpinner from '../components/common/LoadingSpinner';

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate API call to fetch dashboard data
//     const fetchDashboardData = async () => {
//       setIsLoading(true);
//       // Simulate delay
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       setStats({
//         totalAnalyzed: 2847,
//         toxicDetected: 342,
//         accuracy: 94.7,
//         avgResponseTime: 0.23,
//         todayAnalyzed: 156,
//         weeklyGrowth: 12.5,
//         monthlyGrowth: -3.2,
//         activeUsers: 1234
//       });
      
//       setIsLoading(false);
//     };

//     fetchDashboardData();
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center text-white">
//           <LoadingSpinner className="w-12 h-12 mx-auto mb-4" color="white" />
//           <p className="text-lg">Loading dashboard data...</p>
//         </div>
//       </div>
//     );
//   }

//   const statCards = [
//     {
//       title: 'Total Texts Analyzed',
//       value: stats.totalAnalyzed.toLocaleString(),
//       icon: DocumentTextIcon,
//       color: 'blue',
//       change: `+${stats.todayAnalyzed} today`
//     },
//     {
//       title: 'Toxic Content Detected',
//       value: stats.toxicDetected,
//       icon: ExclamationTriangleIcon,
//       color: 'red',
//       percentage: ((stats.toxicDetected / stats.totalAnalyzed) * 100).toFixed(1)
//     },
//     {
//       title: 'Model Accuracy',
//       value: `${stats.accuracy}%`,
//       icon: CheckCircleIcon,
//       color: 'green',
//       trend: 'stable'
//     },
//     {
//       title: 'Avg Response Time',
//       value: `${stats.avgResponseTime}s`,
//       icon: ClockIcon,
//       color: 'purple',
//       performance: 'excellent'
//     },
//     {
//       title: 'Weekly Growth',
//       value: `${stats.weeklyGrowth > 0 ? '+' : ''}${stats.weeklyGrowth}%`,
//       icon: stats.weeklyGrowth > 0 ?  ArrowTrendingUpIcon : ArrowTrendingDownIcon,
//       color: stats.weeklyGrowth > 0 ? 'green' : 'red',
//       trend: stats.weeklyGrowth > 0 ? 'up' : 'down'
//     },
//     {
//       title: 'Active Users',
//       value: stats.activeUsers.toLocaleString(),
//       icon: UsersIcon,
//       color: 'indigo',
//       change: 'this month'
//     }
//   ];

//   const colorClasses = {
//     blue: 'from-blue-500 to-blue-600',
//     red: 'from-red-500 to-red-600',
//     green: 'from-green-500 to-green-600',
//     purple: 'from-purple-500 to-purple-600',
//     indigo: 'from-indigo-500 to-indigo-600',
//     yellow: 'from-yellow-500 to-yellow-600'
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-7xl">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-center mb-12"
//       >
//         <h1 className="text-4xl font-bold text-white mb-4">
//           <ChartBarIcon className="w-10 h-10 inline-block mr-3" />
//           Analytics Dashboard
//         </h1>
//         <p className="text-white/80 text-lg">
//           Monitor your AI-powered content moderation system
//         </p>
//       </motion.div>

//       {/* Stats Grid */}
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
//       >
//         {statCards.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <motion.div key={index} variants={itemVariants}>
//               <Card className="p-6 hover:shadow-2xl">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[stat.color]} rounded-lg flex items-center justify-center`}>
//                     <Icon className="w-6 h-6 text-white" />
//                   </div>
//                   {stat.trend === 'up' && (
//                     <div className="text-green-500 text-sm font-medium">↗ Trending</div>
//                   )}
//                   {stat.trend === 'down' && (
//                     <div className="text-red-500 text-sm font-medium">↘ Declining</div>
//                   )}
//                 </div>
                
//                 <div className="mb-2">
//                   <div className="text-3xl font-bold text-gray-900 mb-1">
//                     {stat.value}
//                   </div>
//                   <div className="text-gray-600 text-sm font-medium">
//                     {stat.title}
//                   </div>
//                 </div>

//                 {stat.change && (
//                   <div className="text-sm text-gray-500">
//                     {stat.change}
//                   </div>
//                 )}
                
//                 {stat.percentage && (
//                   <div className="text-sm text-gray-500">
//                     {stat.percentage}% of total content
//                   </div>
//                 )}
                
//                 {stat.performance && (
//                   <div className="text-sm text-green-600 font-medium">
//                     Performance: {stat.performance}
//                   </div>
//                 )}
//               </Card>
//             </motion.div>
//           );
//         })}
//       </motion.div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//         {/* Usage Chart Placeholder */}
//         <motion.div
//           variants={itemVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <Card className="p-6">
//             <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
//               <ChartBarIcon className="w-6 h-6 mr-2 text-blue-500" />
//               Usage Analytics
//             </h3>
            
//             <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
//               <div className="text-center">
//                 <ChartBarIcon className="w-16 h-16 text-blue-400 mx-auto mb-4" />
//                 <p className="text-gray-600 font-medium">Interactive Chart</p>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Integrate with Chart.js or Recharts
//                 </p>
//               </div>
//             </div>
//           </Card>
//         </motion.div>

//         {/* Toxicity Trends */}
//         <motion.div
//           variants={itemVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <Card className="p-6">
//             <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
//               <ExclamationTriangleIcon className="w-6 h-6 mr-2 text-red-500" />
//               Toxicity Trends
//             </h3>
            
//             <div className="space-y-4">
//               {[
//                 { category: 'Toxic', percentage: 12, trend: 'down' },
//                 { category: 'Severe Toxic', percentage: 3, trend: 'stable' },
//                 { category: 'Obscene', percentage: 8, trend: 'up' },
//                 { category: 'Threat', percentage: 1, trend: 'down' },
//                 { category: 'Insult', percentage: 15, trend: 'stable' },
//                 { category: 'Identity Hate', percentage: 2, trend: 'down' }
//               ].map((item, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full"></div>
//                     <span className="font-medium text-gray-700">{item.category}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <span className="text-gray-900 font-semibold">{item.percentage}%</span>
//                     <div className={`w-2 h-2 rounded-full ${
//                       item.trend === 'up' ? 'bg-red-500' :
//                       item.trend === 'down' ? 'bg-green-500' : 'bg-gray-400'
//                     }`}></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </motion.div>
//       </div>

//       {/* Recent Activity */}
//       <motion.div
//         variants={itemVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <Card className="p-6">
//           <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
//             <ClockIcon className="w-6 h-6 mr-2 text-purple-500" />
//             Recent Activity
//           </h3>
          
//           <div className="space-y-4">
//             {[
//               { time: '2 minutes ago', action: 'High toxicity detected', severity: 'high' },
//               { time: '5 minutes ago', action: 'Batch processing completed', severity: 'success' },
//               { time: '12 minutes ago', action: 'API rate limit warning', severity: 'warning' },
//               { time: '25 minutes ago', action: 'New user registered', severity: 'info' },
//               { time: '1 hour ago', action: 'System maintenance completed', severity: 'success' }
//             ].map((activity, index) => (
//               <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
//                 <div className={`w-2 h-2 rounded-full ${
//                   activity.severity === 'high' ? 'bg-red-500' :
//                   activity.severity === 'warning' ? 'bg-yellow-500' :
//                   activity.severity === 'success' ? 'bg-green-500' : 'bg-blue-500'
//                 }`}></div>
//                 <div className="flex-1">
//                   <p className="text-gray-900 font-medium">{activity.action}</p>
//                 </div>
//                 <div className="text-sm text-gray-500">{activity.time}</div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </motion.div>
//     </div>
//   );
// };

// export default Dashboard;



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
