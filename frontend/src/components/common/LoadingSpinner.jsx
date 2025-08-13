import React from 'react';

const LoadingSpinner = ({ className = 'w-8 h-8', color = 'blue' }) => {
  const colorClasses = {
    blue: 'border-blue-500',
    white: 'border-white',
    gray: 'border-gray-500',
    purple: 'border-purple-500'
  };

  return (
    <div className={`
      animate-spin rounded-full border-4 border-gray-200 ${colorClasses[color]}
      ${className}
    `} 
    style={{ borderTopColor: 'currentColor' }}>
    </div>
  );
};

export default LoadingSpinner;