import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2, scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
      className={`
        bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20
        ${hover ? 'hover:shadow-xl' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;