import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  type = 'text', 
  className = '',
  labelClassName = '',
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className={`block text-sm font-medium mb-2 ${labelClassName || 'text-gray-800'}`}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`
          w-full bg-white border border-gray-300 rounded-lg px-4 py-3
          text-black placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
          transition-all duration-200
          ${error ? 'border-red-500 focus:ring-red-400' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
