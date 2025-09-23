import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldAlert, Clock, FileText, BarChart2 } from 'lucide-react';

const AnalysisComplete = ({ overallScore, processingTime, wordCount }) => {
  const score = Math.round(overallScore);

  // --- DYNAMIC CHANGE 1: Setup dynamic content based on the score ---
  const isToxic = score > 60; // Set your toxicity threshold

  const status = {
    icon: isToxic ? ShieldAlert : CheckCircle,
    iconGradient: isToxic 
      ? "from-red-500 to-orange-500" 
      : "from-green-500 to-emerald-500",
    title: isToxic ? "Toxicity Detected" : "Content Clear",
    titleGradient: isToxic 
      ? "from-red-400 to-orange-400" 
      : "from-green-400 to-cyan-400",
    subtitle: isToxic 
      ? "This content has been flagged for potentially harmful language." 
      : "Content has been successfully analyzed and appears safe.",
    meterColor: isToxic ? "bg-red-500" : "bg-green-500",
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, staggerChildren: 0.15 }}
        className="bg-slate-800/80 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 sm:p-8 shadow-2xl"
      >
        {/* --- DYNAMIC CHANGE 2: Header Icon is now dynamic --- */}
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex justify-center mb-6">
          <div className={`w-20 h-20 bg-gradient-to-br ${status.iconGradient} rounded-full flex items-center justify-center shadow-lg`}>
            <status.icon className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* --- DYNAMIC CHANGE 3: Title and Subtitle are now dynamic --- */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
          <h2 className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${status.titleGradient} mb-2`}>
            {status.title}
          </h2>
          <p className="text-slate-300">{status.subtitle}</p>
        </motion.div>

        {/* --- DYNAMIC CHANGE 4: This is now a "Toxicity Meter", not a progress bar --- */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <div className="w-full h-3 bg-slate-700 rounded-full">
            <motion.div
              className={`h-full rounded-full ${status.meterColor}`}
              initial={{ width: "0%" }}
              animate={{ width: `${score}%` }} // Width is now the actual score
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* --- DYNAMIC CHANGE 5: Stats are now clear, readable, and have better labels --- */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-4 sm:gap-6">
          {/* Words */}
          <div className="text-center p-4 bg-slate-700/50 rounded-xl">
            <FileText className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            {/* REMOVED GRADIENT FOR READABILITY */}
            <span className="text-2xl font-bold text-slate-100">{wordCount}</span>
            <p className="text-slate-400 text-xs uppercase tracking-wide mt-1">Words</p>
          </div>

          {/* Toxicity Score */}
          <div className="text-center p-4 bg-slate-700/50 rounded-xl">
            <BarChart2 className={`w-6 h-6 mx-auto mb-2 ${isToxic ? 'text-red-400' : 'text-green-400'}`} />
            {/* RENAMED "Confidence", REMOVED GRADIENT */}
            <span className={`text-2xl font-bold ${isToxic ? 'text-red-400' : 'text-green-400'}`}>{score}%</span>
            <p className="text-slate-400 text-xs uppercase tracking-wide mt-1">Toxicity Score</p>
          </div>

          {/* Time */}
          <div className="text-center p-4 bg-slate-700/50 rounded-xl">
            <Clock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            {/* REMOVED GRADIENT FOR READABILITY */}
            <span className="text-2xl font-bold text-slate-100">{processingTime}s</span>
            <p className="text-slate-400 text-xs uppercase tracking-wide mt-1">Time</p>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default AnalysisComplete;