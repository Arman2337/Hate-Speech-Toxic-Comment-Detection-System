import React from 'react'

const Badge = ({ children, variant = 'default', size = 'md' }) => {
  const variants = {
    default: 'bg-white/20 text-white',
    success: 'bg-green-500/20 text-green-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
    error: 'bg-red-500/20 text-red-400',
    info: 'bg-blue-500/20 text-blue-400'
  }
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      ${variants[variant]}
      ${sizes[size]}
    `}>
      {children}
    </span>
  )
}

export default Badge
