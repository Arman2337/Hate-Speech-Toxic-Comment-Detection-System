import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SwatchIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';

const ThemeSelector = () => {
  const { currentTheme, changeTheme, isThemeMenuOpen, setIsThemeMenuOpen, themes } = useTheme();

  const currentThemeData = themes[currentTheme];

  return (
    <div className="relative">
      <button
        onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
      >
        <SwatchIcon className="w-4 h-4" />
        <span className="text-sm font-medium">{currentThemeData?.name}</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${isThemeMenuOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isThemeMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl z-50"
          >
            <div className="p-2 space-y-1">
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => changeTheme(key)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentTheme === key
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{theme.name}</span>
                    {currentTheme === key && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{theme.description}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isThemeMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsThemeMenuOpen(false)}
            className="fixed inset-0 z-40"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;
