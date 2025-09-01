import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AIAnalysisLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-80 flex flex-col items-center justify-center">
      {/* Dark blue and purple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900" />
      
      {/* Centered Circular Loading Icon */}
      <div className="relative z-10 mb-8">
        <div className="relative w-32 h-32">
          {/* Outer rotating orbit rings */}
          <motion.div
            className="absolute inset-0 w-32 h-32 border-2 rounded-full"
            style={{
              borderColor: 'rgba(96, 165, 250, 0.3)',
              borderTopColor: '#60a5fa'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -inset-3 w-38 h-38 border-2 rounded-full"
            style={{
              borderColor: 'rgba(139, 92, 246, 0.3)',
              borderTopColor: '#8b5cf6'
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Dark Gray Outer Ring */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
            {/* Background Ring - Dark Gray */}
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#374151"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress Ring - Bright Blue */}
            <motion.circle
              cx="64"
              cy="64"
              r="56"
              stroke="#3b82f6"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 352" }}
              animate={{ strokeDasharray: `${(progress / 100) * 352} 352` }}
              transition={{ duration: 0.1 }}
            />
          </svg>
          
          {/* Inner Purple Circle */}
          <motion.div 
            className="absolute inset-4 w-24 h-24 rounded-full bg-purple-500 shadow-lg"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 10px 25px rgba(139, 92, 246, 0.5)",
                "0 10px 35px rgba(139, 92, 246, 0.8)",
                "0 10px 25px rgba(139, 92, 246, 0.5)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Brain Icon */}
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                className="text-4xl"
                animate={{
                  scale: [1, 1.1, 1],
                  filter: [
                    "drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))",
                    "drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))",
                    "drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🧠
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Text Section */}
      <div className="text-center z-10">
        {/* Main Text - "Analyzing..." in bright blue */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0.8, 1, 0.8], 
            y: 0 
          }}
          transition={{ 
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 0.8 }
          }}
          className="text-2xl font-medium text-blue-400 mb-3 tracking-wide"
        >
          Analyzing...
        </motion.h2>

        {/* Subtitle in light gray */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 text-base"
        >
          This may take a few seconds
        </motion.p>
      </div>
    </div>
  );
};

export default AIAnalysisLoader;