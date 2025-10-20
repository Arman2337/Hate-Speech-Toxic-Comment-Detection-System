import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  ChartBarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  UsersIcon,
  BeakerIcon,
  ArrowTrendingUpIcon, // Correct icon
  ClockIcon
} from '@heroicons/react/24/outline';
// --- Assuming correct paths for your actual project ---
import api from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AnimatedStatCounter from '../components/common/AnimatedStatCounter';
// If RadialGauge is specifically for toxicity, keep the name or rename file
import ToxicityRadialGauge from '../components/charts/RadialGauge'; // Use the updated Gauge
import CustomTooltip from '../components/charts/CustomTooltip';
import { formatTimestamp, truncateText, getToxicityLevel } from '../utils/helpers';
// --- End assuming correct paths ---
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';


// --- Main Dashboard Component ---
const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // Use Promise.all for potentially faster loading
        const [statsRes, recentRes] = await Promise.all([
          api.get('/predict/dashboard-stats'), // Fetch main stats
          api.get('/predict/history?limit=5') // Fetch recent 5 analyses
        ]);
        setStats(statsRes.data);
        const normalized = (Array.isArray(recentRes.data) ? recentRes.data : recentRes.data.analyses || []).map(a => ({
          _id: a._id,
          text: a.inputText || a.text || "N/A",
          overallScore: a.results?.overallScore ?? 0,
          createdAt: a.createdAt || new Date(),
        }));

        setRecent(normalized.slice(0, 5)); // Set recent analyses
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // Maybe set an error state here to show in the UI
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  // Loading State
  if (isLoading || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <LoadingSpinner className="w-12 h-12 mx-auto mb-4" />
          <p className="text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // --- Prepare Data ---
  // Overall Toxicity Rate for the gauge
  const overallToxicityRate = stats.totalAnalyzed > 0
    ? (stats.toxicDetected / stats.totalAnalyzed) * 100
    : 0;

  // Data for Analysis Volume Chart
  const volumeData = (stats.dailyAnalyses || []).map(item => ({
    date: new Date(item._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Analyses: item.count || 0,
  }));

  // Data for the Toxicity Trend chart (ensure your API provides toxicCount)
  const trendData = (stats.dailyAnalyses || []).map(item => ({
    date: new Date(item._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    'Toxicity Rate (%)': (item.count || 0) > 0 ? parseFloat(((item.toxicCount || 0) / item.count * 100).toFixed(1)) : 0,
  }));

  // Data for Category Breakdown Chart
  const categoryData = Object.entries(stats.categoryBreakdown || {})
    .filter(([key]) => key !== '_id')
    .map(([name, value]) => ({
      name: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      Prevalence: Math.round(value || 0),
    }))
    .sort((a, b) => b.Prevalence - a.Prevalence);

  // Bento Card Component Definition (Needs to be defined before use or imported)
  // Ensure AnimatedStatCounter is imported or defined above
  const BentoCard = ({ icon: Icon, title, value, colorClass, className = "" }) => (
    <motion.div
      variants={itemVariants}
      className={`glass-card relative overflow-hidden p-6 border border-white/10 rounded-xl ${className} group`} // Added group here too
      whileHover={{
        scale: 1.03,
        boxShadow: `0 0 30px rgba(${colorClass.includes('blue') ? '59, 130, 246' :
          colorClass.includes('red') ? '239, 68, 68' :
            colorClass.includes('purple') ? '168, 85, 247' :
              '255, 255, 255'
          }, 0.2)`
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        style={{
          background: `radial-gradient(circle at top right, rgba(${colorClass.includes('blue') ? '59, 130, 246' :
            colorClass.includes('red') ? '239, 68, 68' :
              colorClass.includes('purple') ? '168, 85, 247' :
                '255, 255, 255'
            }, 0.1) 0%, transparent 70%)`
        }}
      // removed initial/whileHover/transition from here as it's handled by group-hover
      />
      <div className="relative z-10">
        <Icon className={`w-8 h-8 mb-4 ${colorClass}`} />
        <p className="text-sm text-white/70 mb-1">{title}</p>
        <h3 className="text-4xl font-bold text-white">
          <AnimatedStatCounter to={value || 0} />
        </h3>
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-white/80 text-lg">
          An overview of your AI-powered content moderation.
        </p>
      </motion.div>

      {/* --- Bento Grid --- */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Overall Toxicity Rate Gauge */}
        <motion.div
          variants={itemVariants}
          className="glass-card flex flex-col items-center justify-center p-6 border border-white/10 rounded-xl lg:col-span-1 md:col-span-2 group"
        >
          <h3 className="text-lg font-semibold text-white mb-4 opacity-80 group-hover:opacity-100 transition-opacity">Overall Toxicity Rate</h3>
          {/* Use the ToxicityRadialGauge which should be imported */}
          <ToxicityRadialGauge score={overallToxicityRate} />
          <p className="text-xs text-center text-white/60 mt-2">
            Percentage of all analyses flagged as toxic.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <BentoCard icon={DocumentTextIcon} title="Total Analyses" value={stats.totalAnalyzed} colorClass="text-blue-400" />
        <BentoCard icon={ExclamationTriangleIcon} title="Toxic Detected" value={stats.toxicDetected} colorClass="text-red-400" />
        <BentoCard icon={UsersIcon} title="Active Users" value={stats.activeUsers} colorClass="text-purple-400" />

        {/* Analysis Volume Chart */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-6 border border-white/10 rounded-xl lg:col-span-2 md:col-span-2 group"
          whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(59, 130, 246, 0.15)" }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center opacity-90 group-hover:opacity-100 transition-opacity">
            <ChartBarIcon className="w-6 h-6 mr-2 text-blue-400" />
            Analysis Volume (Last 7 Days)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255, 255, 255, 0.1)" strokeDasharray="5 5" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} width={30} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(59, 130, 246, 0.5)', strokeWidth: 1, strokeDasharray: '3 3' }} />
                <Area type="monotone" dataKey="Analyses" stroke="#60a5fa" strokeWidth={2} fill="url(#colorVolume)"
                  activeDot={{ r: 6, strokeWidth: 2, fill: '#bfdbfe', stroke: '#60a5fa' }}
                  isAnimationActive={true} animationDuration={800} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Toxicity Trend Chart */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-6 border border-white/10 rounded-xl lg:col-span-2 md:col-span-2 group"
          whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(239, 68, 68, 0.15)" }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center opacity-90 group-hover:opacity-100 transition-opacity">
            <ArrowTrendingUpIcon className="w-6 h-6 mr-2 text-red-400" />
            Daily Toxicity Trend (%)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 30, left: -10, bottom: 5 }}>
                <CartesianGrid stroke="rgba(255, 255, 255, 0.1)" strokeDasharray="5 5" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 'dataMax + 10']} unit="%" width={40} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(239, 68, 68, 0.5)', strokeWidth: 1, strokeDasharray: '3 3' }} />
                <Line type="monotone" dataKey="Toxicity Rate (%)" stroke="#f87171" strokeWidth={2}
                  dot={{ r: 4, fill: '#f87171' }} activeDot={{ r: 7, strokeWidth: 2, fill: '#fecaca', stroke: '#f87171' }}
                  isAnimationActive={true} animationDuration={800} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Breakdown Chart */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-6 border border-white/10 rounded-xl lg:col-span-2 md:col-span-1 group"
          whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(239, 68, 68, 0.15)" }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center opacity-90 group-hover:opacity-100 transition-opacity">
            <BeakerIcon className="w-6 h-6 mr-2 text-red-400" />
            Toxicity Categories
          </h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorBar" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f87171" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#b91c1c" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255, 255, 255, 0.1)" strokeDasharray="5 5" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" width={110} tick={{ fill: '#cbd5e1', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
                <Bar dataKey="Prevalence" fill="url(#colorBar)" radius={[0, 8, 8, 0]} barSize={12}
                  isAnimationActive={true} animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Analyses Feed */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-6 border border-white/10 rounded-xl lg:col-span-2 md:col-span-1 group"
          whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(255, 255, 255, 0.08)" }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4 opacity-90 group-hover:opacity-100 transition-opacity">
            Recent Analyses
          </h3>
          <div className="space-y-4 h-96 overflow-y-auto pr-2 styled-scrollbar">
            {(recent || []).length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-white/70 text-center">No recent activity found.</p>
              </div>
            ) : (
              (recent || []).map((item, index) => {
                const level = getToxicityLevel(item.overallScore);
                return (
                  <motion.div
                    key={item._id || index}
                    className="border-b border-white/10 pb-3 last:border-b-0"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      {/* Included score in the recent feed item */}
                      <span className={`font-semibold text-sm ${level.colorClass}`}>{level.label} ({item.overallScore}%)</span>
                      <span className="text-xs text-white/60">{formatTimestamp(item.createdAt)}</span>
                    </div>
                    <p className="text-sm text-white/80 italic">"{truncateText(item.text, 60)}"</p>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Dashboard;