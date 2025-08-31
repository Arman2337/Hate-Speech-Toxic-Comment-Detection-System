import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const themes = {
  'dark-particles': {
    name: 'Dark Particles',
    description: 'Dark background with floating particles'
  },
  'glassmorphism': {
    name: 'Glassmorphism', 
    description: 'Frosted glass effect with blur'
  },
  'mesh-gradient': {
    name: 'Mesh Gradient',
    description: 'Shifting multi-colored gradients'
  },
  'cyberpunk-grid': {
    name: 'Cyberpunk Grid',
    description: 'Neon grid with scan lines'
  },
  'dynamic-gradient': {
    name: 'Dynamic Gradient',
    description: 'Rotating corner gradients'
  },
  'neural-network': {
    name: 'Neural Network',
    description: 'Animated neural network nodes'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('dark-particles');
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const changeTheme = (themeKey) => {
    if (themes[themeKey]) {
      setCurrentTheme(themeKey);
      localStorage.setItem('selectedTheme', themeKey);
      setIsThemeMenuOpen(false);
    }
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      changeTheme,
      isThemeMenuOpen,
      setIsThemeMenuOpen,
      themes
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };


