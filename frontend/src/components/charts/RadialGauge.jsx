import React from 'react';
import { motion } from 'framer-motion';

const RadialGauge = ({ score, size = 180 }) => {
  const radius = size * 0.4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - score / 100);

  let color = 'text-green-400';
  let trackColor = 'stroke-green-400/20';
  let progressColor = 'stroke-green-400';
  let shadowColor = 'drop-shadow(0 0 8px rgba(74, 222, 128, 0.5))'; // Green shadow

  if (score < 75) {
    color = 'text-yellow-400';
    trackColor = 'stroke-yellow-400/20';
    progressColor = 'stroke-yellow-400';
    shadowColor = 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.5))'; // Yellow shadow
  }
  if (score < 50) {
    color = 'text-red-400';
    trackColor = 'stroke-red-400/20';
    progressColor = 'stroke-red-400';
    shadowColor = 'drop-shadow(0 0 8px rgba(248, 113, 113, 0.5))'; // Red shadow
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="10" // Thinner track
          className={`fill-none ${trackColor}`}
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="10" // Thinner progress
          className={`fill-none ${progressColor}`}
          strokeLinecap="round"
          strokeDasharray={circumference}
          filter={shadowColor} // Apply glow/shadow
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} // Smoother ease
        />
      </svg>
      {/* Pulsing Outer Glow */}
      <motion.div
        className={`absolute rounded-full border-2 ${trackColor.replace('stroke-', 'border-').replace('/20', '/30')}`} // Slightly stronger color
        style={{ width: size * 0.9, height: size * 0.9 }}
        animate={{ scale: [1, 1.05, 1], opacity: [0, 0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className={`absolute flex flex-col items-center justify-center ${color}`}>
        <motion.span
          className="text-4xl font-bold"
          style={{ filter: shadowColor.replace('8px', '4px') }} // Add subtle glow to text
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
        >
          {Math.round(score)}%
        </motion.span>
        <motion.span
          className="text-sm font-medium uppercase tracking-wider opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          Health Score
        </motion.span>
      </div>
    </div>
  );
};

export default RadialGauge;