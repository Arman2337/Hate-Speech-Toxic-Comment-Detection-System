// src/components/common/DotWaveLoader.jsx
import React, { useMemo } from 'react'

const DotWaveLoader = ({ className = '' }) => {
  const particles = useMemo(() => {
    const count = 28
    return Array.from({ length: count }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 2.5,
      dx: -8 + Math.random() * 16,
      dy: -8 + Math.random() * 16,
    }))
  }, [])

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="dotwave-bg rounded-xl"></div>
      <div className="dotwave-sweep rounded-xl" />
      <div className="dotwave-particles">
        {particles.map((p, i) => (
          <span
            key={i}
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              ['--dx']: `${p.dx}px`,
              ['--dy']: `${p.dy}px`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 dotwave-pulse">
            <span className="dotwave-orbit" />
            <span className="dotwave-core" />
          </div>
          <p className="text-gray-300">Analyzing...</p>
          <p className="text-gray-400 text-sm mt-1">This may take a few seconds</p>
        </div>
      </div>
    </div>
  )
}

export default DotWaveLoader


