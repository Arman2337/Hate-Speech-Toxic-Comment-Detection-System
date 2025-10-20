// // src/pages/Home.jsx
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ShieldCheckIcon, SparklesIcon, ClockIcon, ChartBarIcon, ExclamationTriangleIcon, ArrowPathIcon, LockClosedIcon } from '@heroicons/react/24/outline';
// import toast from 'react-hot-toast';
// import { useAuth } from '../hooks/useAuth'; // Import useAuth
// import { Link } from 'react-router-dom';

// // Components
// import Card from '../components/ui/Card';
// import Button from '../components/ui/Button';
// import LoadingSpinner from '../components/common/LoadingSpinner';
// import ToxicityMeter from '../components/charts/ToxicityMeter';
// import AIAnalysisLoader from '../components/common/AIAnalysisLoader';
// import AnalysisComplete from '../components/common/AnalysisComplete';

// // Services
// import api from '../services/api'; // Use the central api instance

// const Home = () => {
//   const [text, setText] = useState('');
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [results, setResults] = useState(null);
//   const [analysisTime, setAnalysisTime] = useState(0);
//   const [stats, setStats] = useState({ total: 0, toxic: 0 });
//   const [isLoadingExample, setIsLoadingExample] = useState(false);
//   const { isAuthenticated, freeTrialsUsed, incrementFreeTrials, getRemainingTrials, canAnalyze } = useAuth();
//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const { data } = await api.get('/predict/stats');
//         setStats({
//           total: data.totalAnalyzed,
//           toxic: data.toxicDetected
//         });
//       } catch (error) {
//         console.error("Failed to fetch stats:", error);
//       }
//     };
//     fetchStats();
//   }, []);

//   const handleAnalyze = async () => {
//     if (!text.trim()) {
//       toast.error('Please enter some text to analyze');
//       return;
//     }

//     if (!canAnalyze()) {
//       toast.error('Free trial limit reached. Please login to continue analyzing.');
//       return;
//     }

//     setIsAnalyzing(true);
//     const startTime = Date.now();

//     try {
//       const payload = { text };
//       const { data: analysisResults } = await api.post('/predict', payload);
      
//       const endTime = Date.now();
      
//       setResults(analysisResults);
//       setAnalysisTime(((endTime - startTime) / 1000).toFixed(2));
      
//       // Increment free trials if user is not logged in
//       if (!isAuthenticated) {
//         const newCount = incrementFreeTrials();
//         if (newCount >= 2) {
//           toast.success('Analysis completed! You have used all free trials. Please login to continue.');
//         } else {
//           toast.success(`Analysis completed! You have ${2 - newCount} free trial${2 - newCount === 1 ? '' : 's'} remaining.`);
//         }
//       } else {
//         toast.success('Analysis completed successfully!');
//       }

//       // If a user is logged in, their analysis was saved, so we should refresh the stats.
//       if (isAuthenticated) {
//        const { data } = await api.get('/predict/stats');
//        setStats({ total: data.totalAnalyzed, toxic: data.toxicDetected });
//       }

//     } catch (error) {
//       toast.error(error?.response?.data?.message || 'Analysis failed. Please try again.');
//       console.error('Analysis error:', error);
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const handleClear = () => {
//     setText('');
//     setResults(null);
//     setAnalysisTime(0);
//   };

//   const loadExample = async () => {
//     setIsLoadingExample(true);
//     try {
//       const { data } = await api.get('/predict/example');
//       setText(data.comment_text);
//       setResults(null); // Clear previous results
//     } catch (error) {
//       toast.error('Could not load example. Please try again.');
//       console.error("Failed to load example:", error);
//     } finally {
//       setIsLoadingExample(false);
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   const remainingTrials = getRemainingTrials();

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-7xl">
//       {/* Hero Section */}
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="text-center mb-12"
//       >
//         <motion.div variants={itemVariants} className="flex justify-center items-center mb-6">
//           <div className="relative">
//             <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-float">
//               <ShieldCheckIcon className="w-10 h-10 text-white" />
//             </div>
//             <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse opacity-70"></div>
//           </div>
//         </motion.div>

//         <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold text-white mb-4">
//           ToxiGuard{' '}
//           <span className="text-yellow-400 animate-pulse">AI</span>
//         </motion.h1>

//         <motion.p variants={itemVariants} className="text-xl text-white/90 mb-2">
//           Advanced AI-powered toxic speech detection system
//         </motion.p>

//         <motion.p variants={itemVariants} className="text-sm text-white/70 uppercase tracking-wider font-medium">
//           Smart Content Moderation
//         </motion.p>

//         {/* Free Trial Counter */}
//         {!isAuthenticated && (
//           <motion.div variants={itemVariants} className="mt-4">
//             <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
//               <LockClosedIcon className="w-4 h-4 text-yellow-400" />
//               <span className="text-white text-sm">
//                 Free Trials: {remainingTrials}/2 remaining
//               </span>
//             </div>
//             {remainingTrials === 0 && (
//               <div className="mt-2">
//                 <Link 
//                   to="/login" 
//                   className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Login to Continue
//                 </Link>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </motion.div>

//       {/* Main Analyzer Card */}
//       <motion.div
//         variants={itemVariants}
//         initial="hidden"
//         animate="visible"
//         className="mb-8"
//       >
//         <div className="glass-card p-8 rounded-2xl">
//           <div className="mb-6">
//             <label className="block text-lg font-semibold text-white mb-4">
//               <SparklesIcon className="w-6 h-6 inline-block mr-2 text-blue-400" />
//               Enter text to analyze for toxicity
//             </label>
            
//             <textarea
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               className="w-full h-40 p-4 border-2 border-white/20 rounded-lg focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 resize-none text-white placeholder-white/60 bg-white/10 backdrop-blur-sm"
//               placeholder="Type or paste your text here to check for toxic content... (Supports English, Hindi, and Hinglish)"
//               disabled={isAnalyzing || !canAnalyze()}
//             />
            
//             <div className="flex justify-between items-center mt-2">
//               <span className="text-sm text-white/70">
//                 {text.length} characters
//               </span>
//               {text.length > 500 && (
//                 <span className="text-sm text-orange-400">
//                   Long texts may take more time to analyze
//                 </span>
//               )}
//             </div>

//             {/* Language Support Info */}
//             {/* <div className="mt-2 text-xs text-white/60">
//               💡 Supports: English, Hindi, Hinglish (mixed language)
//             </div> */}
//           </div>

//           <div className="flex flex-wrap gap-3 mb-6">
//             <Button
//               onClick={handleAnalyze}
//               disabled={isAnalyzing || !text.trim() || !canAnalyze()}
//               className="flex-1 sm:flex-none"
//               variant="primary"
//             >
//               {isAnalyzing ? (
//                 <LoadingSpinner className="w-4 h-4 mr-2" />
//               ) : (
//                 <ShieldCheckIcon className="w-4 h-4 mr-2" />
//               )}
//               {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
//             </Button>

//             <Button
//               onClick={handleClear}
//               variant="secondary"
//               disabled={isAnalyzing || isLoadingExample}
//             >
//               Clear
//             </Button>

//             <Button
//               onClick={loadExample}
//               variant="outline"
//               disabled={isAnalyzing || isLoadingExample}
//             >
//                {isLoadingExample ? (
//                 <LoadingSpinner className="w-4 h-4 mr-2" />
//               ) : (
//                 <ArrowPathIcon className="w-4 h-4 mr-2" />
//               )}
//               {isLoadingExample ? 'Loading...' : 'Load Example'}
//             </Button>
//           </div>

//           {/* Trial Limit Warning */}
//           {!isAuthenticated && remainingTrials === 0 && (
//             <div className="mb-4 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
//               <div className="flex items-center space-x-2 text-yellow-400">
//                 <LockClosedIcon className="w-5 h-5" />
//                 <span className="font-medium">Free trial limit reached</span>
//               </div>
//               <p className="text-yellow-300 text-sm mt-1">
//                 You've used all 2 free analyses. Please login or register to continue using the service.
//               </p>
//               <div className="mt-3 flex space-x-3">
//                 <Link 
//                   to="/login" 
//                   className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
//                 >
//                   Login
//                 </Link>
//                 <Link 
//                   to="/register" 
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
//                 >
//                   Register
//                 </Link>
//               </div>
//             </div>
//           )}

//           {isAnalyzing && (
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//               <AIAnalysisLoader />
//             </motion.div>
//           )}

//           {results && !isAnalyzing && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="space-y-6"
//             >
//               {/* Analysis Complete Screen */}
//               <AnalysisComplete
//                 text={text}
//                 categories={results.categories}
//                 overallScore={results.overallScore}
//                 processingTime={analysisTime}
//                 wordCount={text.split(' ').length}
//               />

//               {/* Detailed Results */}
//               <div className="glass-card rounded-lg p-6 border border-white/20">
//                 <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
//                   <h3 className="text-xl font-semibold text-white flex items-center">
//                     <ShieldCheckIcon className="w-6 h-6 mr-2 text-blue-400" />
//                     Detailed Analysis Results
//                   </h3>
                  
//                   <div className="flex items-center text-sm text-white/70">
//                     <ClockIcon className="w-4 h-4 mr-1" />
//                     {analysisTime}s processing time
//                   </div>
//                 </div>

//                 <div className="mb-6">
//                   <ToxicityMeter score={results.overallScore / 100} />
//                 </div>

//                 {/* Simple text display */}
//                 <div className="glass-card p-4 mb-6 border border-white/20">
//                   <h4 className="font-medium text-white mb-2">Analyzed Text:</h4>
//                   <p className="text-white/80 italic">
//                     "{text.length > 200 ? `${text.substring(0, 200)}...` : text}"
//                   </p>
//                 </div>

//                 <div>
//                   <h4 className="font-medium text-white mb-4">Category Breakdown:</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {Object.entries(results.categories).map(([category, score]) => {
//                       const percentage = Math.round(score); 
                      
//                       let colorClass = 'text-green-400 bg-green-400/20';
//                       if (percentage > 75) {
//                         colorClass = 'text-red-400 bg-red-400/20';
//                       } else if (percentage > 40) {
//                         colorClass = 'text-yellow-400 bg-yellow-400/20';
//                       }

//                       return (
//                         <div key={category} className="bg-slate-800 p-4 text-center border border-white/20 rounded-lg">
//                           {/* --- ALSO IMPROVED THIS LINE FOR BETTER VISIBILITY --- */}
//                           <div className="font-bold text-gray-100 mb-3 capitalize">
//                             {category.replace(/_/g, ' ')}
//                           </div>
//                           <div className={`text-2xl font-bold ${colorClass} rounded-full w-16 h-16 flex items-center justify-center mx-auto`}>
//                             {percentage}%
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </motion.div>

//       <motion.div
//         variants={itemVariants}
//         initial="hidden"
//         animate="visible"
//         className="grid grid-cols-1 md:grid-cols-2 gap-6"
//       >
//         <div className="glass-card text-center p-6 border border-white/20">
//           <ChartBarIcon className="w-8 h-8 mx-auto text-blue-400 mb-2" />
//           <div className="text-3xl font-bold text-blue-400 mb-2">{stats.total.toLocaleString()}</div>
//           <div className="text-white/70">Total Analyses by All Users</div>
//         </div>
        
//         <div className="glass-card text-center p-6 border border-white/20">
//           <ExclamationTriangleIcon className="w-8 h-8 mx-auto text-red-400 mb-2" />
//           <div className="text-3xl font-bold text-red-400 mb-2">{stats.toxic.toLocaleString()}</div>
//           <div className="text-white/70">Toxic Texts Detected</div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Home;

// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheckIcon, 
  SparklesIcon, 
  ChartBarIcon, 
  ArrowRightIcon, 
  CpuChipIcon, 
  GlobeAltIcon,
  CodeBracketIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import Button from '../components/ui/Button'; // Assuming you have this
import { useAuth } from '../hooks/useAuth';

// --- Animation Variants ---

// This variant is for containers that animate *as you scroll into view*
const containerOnScroll = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      staggerChildren: 0.2
    }
  }
};

// This is for the children of the on-scroll containers
const itemOnScroll = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

// This is for the initial hero section (slight variation)
const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2
    }
  }
};

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [quickText, setQuickText] = useState('');
  const navigate = useNavigate();

  const handleQuickAnalyze = () => {
    // This is the magic: navigate to the analyzer and pass the text
    navigate('/analyzer', { state: { initialText: quickText } });
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl text-white overflow-hidden">
      
      {/* --- Hero Section --- */}
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="text-center flex flex-col items-center"
      >
        <motion.div 
          variants={heroItem} 
          className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg"
        >
          <ShieldCheckIcon className="w-12 h-12 text-white" />
        </motion.div>
        
        <motion.h1 
          variants={heroItem} 
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Protect Your Community with <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            ToxiGuard AI
          </span>
        </motion.h1>
        
        <motion.p 
          variants={heroItem} 
          className="text-xl text-white/80 max-w-2xl mx-auto mb-8"
        >
          Our advanced AI model instantly detects toxicity, hate speech, and insults in multiple languages to keep your platform safe and welcoming.
        </motion.p>
        
        <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-4">
          <Link to={isAuthenticated ? "/analyzer" : "/register"}>
            <Button variant="primary" size="lg" className="text-lg">
              {isAuthenticated ? "Go to Analyzer" : "Get Started for Free"}
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg"
            onClick={() => document.getElementById('quick-analyzer').scrollIntoView({ behavior: 'smooth' })}
          >
            Try it Now &darr;
          </Button>
        </motion.div>
      </motion.div>

      {/* --- NEW: How It Works Section --- */}
      <motion.div
        variants={containerOnScroll}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Triggers when 30% is visible
        className="mt-32 pt-16 border-t border-white/20"
      >
        <h2 className="text-4xl font-bold text-center mb-12">
          Get Started in 3 Simple Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <motion.div variants={itemOnScroll} className="text-center p-6">
            <div className="text-5xl font-bold text-blue-400 mb-4">1</div>
            <ChatBubbleBottomCenterTextIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Paste Your Text</h3>
            <p className="text-white/70">
              Write or paste any comment, post, or message into the analyzer.
            </p>
          </motion.div>
          {/* Step 2 */}
          <motion.div variants={itemOnScroll} className="text-center p-6">
            <div className="text-5xl font-bold text-yellow-400 mb-4">2</div>
            <SparklesIcon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Run the AI Analysis</h3>
            <p className="text-white/70">
              Our model scans the text for 6 different categories of toxicity.
            </p>
          </motion.div>
          {/* Step 3 */}
          <motion.div variants={itemOnScroll} className="text-center p-6">
            <div className="text-5xl font-bold text-green-400 mb-4">3</div>
            <ShieldCheckIcon className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Take Action</h3>
            <p className="text-white/70">
              Use the clear results to moderate content and protect your users.
            </p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* --- NEW: Use Cases (Bento Grid) Section --- */}
      <motion.div
        variants={containerOnScroll}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-24"
      >
        <h2 className="text-4xl font-bold text-center mb-12">
          A Moderation Co-pilot for Everyone
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            variants={itemOnScroll} 
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="glass-card p-8 border border-white/20 rounded-lg"
          >
            <UserGroupIcon className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">For Community Managers</h3>
            <p className="text-white/70">
              Quickly approve or reject pending comments. Use the dashboard to find repeat offenders and see toxicity trends over time.
            </p>
          </motion.div>
          <motion.div 
            variants={itemOnScroll}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="glass-card p-8 border border-white/20 rounded-lg"
          >
            <CodeBracketIcon className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">For Developers</h3>
            <p className="text-white/70">
              Integrate ToxiGuard directly into your app. Our API (coming soon) will let you build automated moderation queues.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* --- NEW: Quick Analyzer Section --- */}
      <motion.div
        id="quick-analyzer"
        variants={containerOnScroll}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-24"
      >
        <div className="glass-card p-8 md:p-12 rounded-lg border border-white/20 text-center">
          <h2 className="text-4xl font-bold mb-4">See it in Action.</h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Paste any text below to get an instant analysis. This free demo uses the same powerful model as our full tool.
          </p>
          <textarea
            value={quickText}
            onChange={(e) => setQuickText(e.target.value)}
            className="w-full h-32 p-4 border-2 border-white/20 rounded-lg focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 resize-none text-white placeholder-white/60 bg-white/10 backdrop-blur-sm"
            placeholder="Try pasting a comment... like 'You are the best!'"
          />
          <Button
            onClick={handleQuickAnalyze}
            disabled={!quickText.trim()}
            variant="primary"
            size="lg"
            className="mt-6 text-lg"
          >
            Analyze This Text
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>

      {/* --- Your Original Features Section (Still good!) --- */}
      <motion.div
        variants={containerOnScroll}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-24 pt-16 border-t border-white/20"
      >
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose <span className="text-yellow-400">ToxiGuard</span>?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div 
            variants={itemOnScroll}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="glass-card p-6 border border-white/20 rounded-lg"
          >
            <CpuChipIcon className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Powerful AI Engine</h3>
            <p className="text-white/70">
              Built on a state-of-the-art Transformer model (XLM-R) for high accuracy and contextual understanding.
            </p>
          </motion.div>
          {/* Feature 2 */}
          <motion.div 
            variants={itemOnScroll}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="glass-card p-6 border border-white/20 rounded-lg"
          >
            <GlobeAltIcon className="w-10 h-10 text-green-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Multi-Language Support</h3>
            <p className="text-white/70">
              Accurately analyzes text in English, Hindi, and even Hinglish (mixed code) with ease.
            </p>
          </motion.div>
          {/* Feature 3 */}
          <motion.div 
            variants={itemOnScroll}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="glass-card p-6 border border-white/20 rounded-lg"
          >
            <ChartBarIcon className="w-10 h-10 text-yellow-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Detailed Breakdown</h3>
            <p className="text-white/70">
              Get granular scores across 6 categories: Toxic, Severe Toxic, Obscene, Threat, Insult, and Identity Hate.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* --- NEW: Testimonials Section --- */}
      <motion.div
        variants={containerOnScroll}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-24 pt-16 border-t border-white/20"
      >
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div 
            variants={itemOnScroll}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="glass-card p-8 border border-white/20 rounded-lg"
          >
            <blockquote className="text-white/80 italic mb-4">
              "ToxiGuard is a game-changer. It filters out 99% of the hate on our forums, and the multi-language support is exactly what we needed."
            </blockquote>
            <p className="font-semibold text-white">Sarah K.</p>
            <p className="text-sm text-blue-400">Community Manager, TechForum</p>
          </motion.div>
          <motion.div 
            variants={itemOnScroll}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="glass-card p-8 border border-white/20 rounded-lg"
          >
            <blockquote className="text-white/80 italic mb-4">
              "As an indie developer, I don't have time for manual moderation. The dashboard gives me a perfect overview. Highly recommend."
            </blockquote>
            <p className="font-semibold text-white">Alex J.</p>
            <p className="text-sm text-blue-400">Indie Game Developer</p>
          </motion.div>
          <motion.div 
            variants={itemOnScroll}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="glass-card p-8 border border-white/20 rounded-lg"
          >
            <blockquote className="text-white/80 italic mb-4">
              "The accuracy is impressive. It catches nuanced insults that our old keyword filter always missed. The detailed breakdown is super helpful."
            </blockquote>
            <p className="font-semibold text-white">David L.</p>
            <p className="text-sm text-blue-400">SaaS Product Lead</p>
          </motion.div>
        </div>
      </motion.div>

      {/* --- NEW: Final CTA Section --- */}
      <motion.div
        variants={containerOnScroll}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="mt-24"
      >
        <div className="relative p-12 text-center bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-white/10 opacity-50"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="text-4xl font-bold mb-4 z-10 relative">
            Ready to build a safer community?
          </h2>
          <p className="text-xl text-white/90 max-w-lg mx-auto mb-8 z-10 relative">
            Sign up for free and start moderating your content with the power of AI.
          </p>
          <Link to={isAuthenticated ? "/analyzer" : "/register"} className="z-10 relative">
            <Button variant="outline" size="lg" className="text-lg bg-white text-blue-700 hover:bg-white/90">
              {isAuthenticated ? "Open Analyzer" : "Get Started Now"}
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </motion.div>

    </div>
  );
};

export default HomePage;