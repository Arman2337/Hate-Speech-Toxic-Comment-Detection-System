import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', onClick, disabled, className = '', ...props }) => {
    // Base styles for all buttons
    const baseStyle = `
        inline-flex items-center justify-center font-semibold rounded-lg 
        transition-all duration-200 ease-in-out 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 
        disabled:opacity-50 disabled:cursor-not-allowed
    `;

    // Size styles
    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        icon: 'p-2 rounded-full', // Ensure padding and rounded shape
    };

    // Variant styles - **Make sure 'icon' variant has visible styles**
    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500',
        outline: 'bg-transparent border-2 border-white/40 text-white/80 hover:bg-white/10 hover:border-white/60 focus:ring-white/50',
        icon: `
            bg-white/5 text-white/60 
            hover:bg-white/10 hover:text-white 
            focus:ring-blue-500 focus:bg-white/10 focus:text-white 
        `, // Styles for visibility on dark background
    };

    const combinedClassName = `
        ${baseStyle} 
        ${sizeStyles[size] || sizeStyles.md} 
        ${variantStyles[variant] || variantStyles.primary} 
        ${className}
    `;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={combinedClassName.trim()}
            {...props} // Pass any other props like 'type'
        >
            {children}
        </button>
    );
};

export default Button;