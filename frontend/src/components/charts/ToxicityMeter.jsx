import React from 'react';
import { motion } from 'framer-motion';

const ToxicityMeter = ({ score }) => {
  const safetyPercentage = Math.round((1 - score) * 100);
  
  let color = 'green';
  let bgColor = 'bg-green-500';
  let textColor = 'text-green-700';
  
  if (safetyPercentage < 50) {
    color = 'red';
    bgColor = 'bg-red-500';
    textColor = 'text-red-700';
  } else if (safetyPercentage < 80) {
    color = 'yellow';
    bgColor = 'bg-yellow-500';
    textColor = 'text-yellow-700';
  }

  return (
    <div className="text-center">
      <div className="relative w-32 h-32 mx-auto mb-4">
        {/* Outer ring */}
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="50"
            fill="transparent"
            stroke={color === 'green' ? '#10b981' : color === 'yellow' ? '#f59e0b' : '#ef4444'}
            strokeWidth="8"
            strokeDasharray={314}
            initial={{ strokeDashoffset: 314 }}
            animate={{ strokeDashoffset: 314 - (314 * safetyPercentage) / 100 }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className={`text-2xl font-bold ${textColor}`}
            >
              {safetyPercentage}%
            </motion.div>
            <div className="text-xs text-gray-500 font-medium">SAFE</div>
          </div>
        </div>
      </div>
      
      <div className={`inline-flex items-center px-4 py-2 rounded-full ${bgColor} text-white text-sm font-medium`}>
        {safetyPercentage >= 80 ? '✓ Content appears safe' : 
         safetyPercentage >= 50 ? '⚠ Potentially problematic' : 
         '⚠ High toxicity detected'}
      </div>
    </div>
  );
};

export default ToxicityMeter;