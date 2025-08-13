import React from 'react'
import { FiX } from 'react-icons/fi'

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className={`relative glass-card ${sizeClasses[size]} w-full mx-4 p-6 scale-in`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
