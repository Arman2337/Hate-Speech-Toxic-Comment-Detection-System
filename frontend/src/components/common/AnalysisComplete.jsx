import React from 'react';
import { motion } from 'framer-motion';
// 1. IMPORT THE NEW ICON
import { CheckCircle, Shield, Clock, FileText, TrendingUp, ShieldAlert } from 'lucide-react';

const AnalysisComplete = ({ text, categories, overallScore, processingTime, wordCount }) => {
  // Calculate confidence based on highest category score
  const confidence = Math.max(...Object.values(categories || {}));
  const results = {
    words: wordCount || text?.split(' ').length || 1,
    confidence: Math.round(confidence) || 6,
    time: processingTime || "6.21",
    toxicityLevel: "Low",
    status: "Safe"
  };

  // 2. DEFINE SAFETY LOGIC AND DYNAMIC STYLES
  const TOXICITY_THRESHOLD = 75; // Set your threshold here
  const isToxic = overallScore > TOXICITY_THRESHOLD;

  const badgeStyles = isToxic
    ? "bg-red-500/20 border-red-500/30 text-red-400"
    : "bg-green-500/20 border-green-500/30 text-green-400";
  
  const badgeText = isToxic ? "Toxicity Detected" : "Content Safe";
  const BadgeIcon = isToxic ? ShieldAlert : Shield;


  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Main Results Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card bg-slate-800/80 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8 shadow-2xl"
      >
        {/* Header, Status Text, Progress Bar, and Stats Grid remain the same... */}
        
        {/* Header with Success Icon */}
        <div className="flex items-center justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="relative"
          >
            {/* Outer Glow Ring */}
            <motion.div
              className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 opacity-30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Middle Ring */}
            <motion.div
              className="absolute inset-1 w-18 h-18 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 opacity-40"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />

            {/* Main Icon Container */}
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg relative z-10">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            {/* Background blur effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-20 blur-lg"></div>
          </motion.div>
        </div>

        {/* Status Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-3">
            Analysis Complete
          </h2>
          <p className="text-slate-300 text-lg">
            Content has been successfully analyzed for toxicity
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full shadow-lg"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 1.5,
                delay: 0.8,
                ease: "easeOut"
              }}
            />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-3 gap-6 mb-8"
        >
          {/* Words */}
          <div className="text-center p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
            <div className="flex items-center justify-center mb-2">
              <FileText className="w-5 h-5 text-blue-400 mr-2" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
              >
                {results.words}
              </motion.span>
            </div>
            <p className="text-slate-400 text-sm uppercase tracking-wide">Words</p>
          </div>

          {/* Confidence */}
          <div className="text-center p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400 mr-2" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4, type: "spring" }}
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
              >
                {results.confidence}%
              </motion.span>
            </div>
            <p className="text-slate-400 text-sm uppercase tracking-wide">Confidence</p>
          </div>

          {/* Time */}
          <div className="text-center p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-green-400 mr-2" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.6, type: "spring" }}
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"
              >
                {results.time}s
              </motion.span>
            </div>
            <p className="text-slate-400 text-sm uppercase tracking-wide">Time</p>
          </div>
        </motion.div>

        {/* 3. UPDATED DYNAMIC SAFETY BADGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, type: "spring" }}
          className="flex items-center justify-center"
        >
          <div className={`flex items-center rounded-full px-6 py-3 ${badgeStyles}`}>
            <BadgeIcon className="w-5 h-5 mr-2" />
            <span className="font-semibold">{badgeText}</span>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default AnalysisComplete;