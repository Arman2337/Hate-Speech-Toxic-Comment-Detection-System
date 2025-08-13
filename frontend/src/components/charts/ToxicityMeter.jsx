import React from 'react'

const ToxicityMeter = ({ score = 0, size = 'md' }) => {
  const percentage = Math.min(Math.max(score * 100, 0), 100)
  
  const getColor = (score) => {
    if (score < 0.3) return 'text-green-400'
    if (score < 0.6) return 'text-yellow-400'
    return 'text-red-400'
  }
  
  const getBarColor = (score) => {
    if (score < 0.3) return 'bg-green-400'
    if (score < 0.6) return 'bg-yellow-400'
    return 'bg-red-400'
  }

  const sizes = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40'
  }

  return (
    <div className="text-center">
      <div className={`relative ${sizes[size]} mx-auto mb-4`}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={score < 0.3 ? '#10B981' : score < 0.6 ? '#F59E0B' : '#EF4444'}
            strokeWidth="2"
            strokeDasharray={`${percentage}, 100`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${getColor(score)}`}>
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>
      <p className="text-white/70 text-sm">Toxicity Score</p>
    </div>
  )
}

export default ToxicityMeter
