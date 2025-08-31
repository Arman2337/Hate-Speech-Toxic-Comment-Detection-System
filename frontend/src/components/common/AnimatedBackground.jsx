import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const AnimatedBackground = () => {
  const { currentTheme } = useTheme();

  const renderTheme = () => {
    switch (currentTheme) {
      case 'dark-particles':
        return <DarkParticles />;
      case 'glassmorphism':
        return <Glassmorphism />;
      case 'mesh-gradient':
        return <MeshGradient />;
      case 'cyberpunk-grid':
        return <CyberpunkGrid />;
      case 'dynamic-gradient':
        return <DynamicGradient />;
      case 'neural-network':
        return <NeuralNetwork />;
      default:
        return <DarkParticles />;
    }
  };

  return (
    <div className="fixed inset-0 -z-10">
      {renderTheme()}
    </div>
  );
};

// Dark Particles Theme
const DarkParticles = () => {
  return (
    <div className="relative w-full h-full bg-gray-900 overflow-hidden">
      <div className="particles-container">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Glassmorphism Theme
const Glassmorphism = () => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 animate-gradient-shift" />
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-400 via-cyan-500 to-teal-500 animate-gradient-shift-reverse" />
      <div className="absolute inset-0 backdrop-blur-3xl bg-white/10" />
    </div>
  );
};

// Mesh Gradient Theme
const MeshGradient = () => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 animate-mesh-shift" />
      <div className="absolute inset-0 bg-gradient-to-tl from-orange-500 via-red-500 to-purple-500 animate-mesh-shift-delayed" />
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 animate-mesh-shift-reverse" />
    </div>
  );
};

// Cyberpunk Grid Theme
const CyberpunkGrid = () => {
  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <div className="cyberpunk-grid" />
      <div className="scan-lines" />
      <div className="cyberpunk-glow" />
    </div>
  );
};

// Dynamic Gradient Theme
const DynamicGradient = () => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 animate-dynamic-rotate" />
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-500 via-purple-500 to-pink-500 animate-dynamic-rotate-reverse" />
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-teal-500 to-emerald-500 animate-dynamic-rotate-fast" />
    </div>
  );
};

// Neural Network Theme
const NeuralNetwork = () => {
  return (
    <div className="relative w-full h-full bg-gray-900 overflow-hidden">
      <div className="neural-network">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="neural-node"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`connection-${i}`}
            className="neural-connection"
            style={{
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
