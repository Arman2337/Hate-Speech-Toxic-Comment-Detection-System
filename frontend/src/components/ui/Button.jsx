import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-300',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-300',
    outline: 'border-2 border-gray-300 hover:border-gray-400 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-300',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl focus:ring-red-300',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl focus:ring-green-300'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;