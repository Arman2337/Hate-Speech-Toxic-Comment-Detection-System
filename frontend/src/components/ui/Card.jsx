import React from 'react'

const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div
      className={`
        glass-card p-6
        ${hover ? 'hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
