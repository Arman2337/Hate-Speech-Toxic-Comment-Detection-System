// src/components/common/AnimatedStatCounter.jsx
import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const AnimatedStatCounter = ({ to, prefix = '', suffix = '' }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const display = useTransform(rounded, (latest) => `${prefix}${latest.toLocaleString()}${suffix}`);

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 1.5,
      ease: "easeOut"
    });
    return controls.stop;
  }, [to]);

  return <motion.span>{display}</motion.span>;
};

export default AnimatedStatCounter;