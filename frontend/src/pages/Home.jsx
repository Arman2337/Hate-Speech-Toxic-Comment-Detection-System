// src/pages/Home.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, SparklesIcon, ClockIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

// Components
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ToxicityMeter from '../components/charts/ToxicityMeter';

// Services
import { analyzeToxicity } from '../services/toxicityService';

// Utils
import { EXAMPLE_TEXTS } from '../utils/constants';

const Home = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [analysisTime, setAnalysisTime] = useState(0);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to analyze');
      return;
    }

    setIsAnalyzing(true);
    const startTime = Date.now();

    try {
      // Simulate API call
      const analysisResults = await analyzeToxicity(text);
      const endTime = Date.now();
      
      setResults(analysisResults);
      setAnalysisTime((endTime - startTime) / 1000);
      
      toast.success('Analysis completed successfully!');
    } catch (error) {
      toast.error('Analysis failed. Please try again.');
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setText('');
    setResults(null);
    setAnalysisTime(0);
  };

  const loadExample = () => {
    const randomExample = EXAMPLE_TEXTS[Math.floor(Math.random() * EXAMPLE_TEXTS.length)];
    setText(randomExample);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center mb-12"
      >
        <motion.div variants={itemVariants} className="flex justify-center items-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-float">
              <ShieldCheckIcon className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse opacity-70"></div>
          </div>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold text-white mb-4">
          ToxiGuard{' '}
          <span className="text-yellow-400 animate-pulse">AI</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-xl text-white/90 mb-2">
          Advanced AI-powered toxic speech detection system
        </motion.p>

        <motion.p variants={itemVariants} className="text-sm text-white/70 uppercase tracking-wider font-medium">
          Smart Content Moderation
        </motion.p>
      </motion.div>

      {/* Main Analyzer Card */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <Card className="p-8">
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              <SparklesIcon className="w-6 h-6 inline-block mr-2 text-blue-500" />
              Enter text to analyze for toxicity
            </label>
            
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-40 p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-none text-gray-700 placeholder-gray-400"
              placeholder="Type or paste your text here to check for toxic content..."
              disabled={isAnalyzing}
            />
            
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {text.length} characters
              </span>
              {text.length > 500 && (
                <span className="text-sm text-orange-500">
                  Long texts may take more time to analyze
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !text.trim()}
              className="flex-1 sm:flex-none"
              variant="primary"
            >
              {isAnalyzing ? (
                <LoadingSpinner className="w-4 h-4 mr-2" />
              ) : (
                <ShieldCheckIcon className="w-4 h-4 mr-2" />
              )}
              {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
            </Button>

            <Button
              onClick={handleClear}
              variant="secondary"
              disabled={isAnalyzing}
            >
              Clear
            </Button>

            <Button
              onClick={loadExample}
              variant="outline"
              disabled={isAnalyzing}
            >
              Load Example
            </Button>
          </div>

          {/* Loading State */}
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <LoadingSpinner className="w-12 h-12 mx-auto mb-4" />
              <p className="text-gray-600">Analyzing text with AI model...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
            </motion.div>
          )}

          {/* Results Section */}
          {results && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-l-4 border-blue-500"
            >
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <ShieldCheckIcon className="w-6 h-6 mr-2 text-blue-500" />
                  Analysis Results
                </h3>
                
                <div className="flex items-center text-sm text-gray-600">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {analysisTime}s processing time
                </div>
              </div>

              {/* Toxicity Meter */}
              <div className="mb-6">
                <ToxicityMeter score={results.overallScore} />
              </div>

              {/* Analyzed Text Preview */}
              <div className="bg-white rounded-lg p-4 mb-6 border">
                <h4 className="font-medium text-gray-700 mb-2">Analyzed Text:</h4>
                <p className="text-gray-600 italic">
                  "{text.length > 200 ? `${text.substring(0, 200)}...` : text}"
                </p>
              </div>

              {/* Category Breakdown */}
              <div>
                <h4 className="font-medium text-gray-700 mb-4">Category Breakdown:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(results.categories).map(([category, score]) => {
                    const percentage = Math.round(score * 100);
                    let colorClass = 'text-green-600 bg-green-100';
                    
                    if (percentage > 30) {
                      colorClass = 'text-red-600 bg-red-100';
                    } else if (percentage > 10) {
                      colorClass = 'text-yellow-600 bg-yellow-100';
                    }

                    return (
                      <div key={category} className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="font-medium text-gray-700 mb-2 capitalize">
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className={`text-2xl font-bold ${colorClass} rounded-full w-16 h-16 flex items-center justify-center mx-auto`}>
                          {percentage}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card className="text-center p-6">
          <div className="text-3xl font-bold text-blue-600 mb-2">2,847</div>
          <div className="text-gray-600">Total Analyzed</div>
        </Card>
        
        <Card className="text-center p-6">
          <div className="text-3xl font-bold text-red-600 mb-2">342</div>
          <div className="text-gray-600">Toxic Detected</div>
        </Card>
        
        <Card className="text-center p-6">
          <div className="text-3xl font-bold text-green-600 mb-2">94.7%</div>
          <div className="text-gray-600">Accuracy</div>
        </Card>
        
        <Card className="text-center p-6">
          <div className="text-3xl font-bold text-purple-600 mb-2">0.23s</div>
          <div className="text-gray-600">Avg Response</div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Home;