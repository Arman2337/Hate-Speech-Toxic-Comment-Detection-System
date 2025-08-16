// src/pages/History.jsx
import React, { useState, useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { 
  ClockIcon, 
  EyeIcon, 
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import api from '../services/api';

// Components
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ToxicityMeter from '../components/charts/ToxicityMeter';

// Utils - You can place these in src/utils/helpers.js
const formatTimestamp = (isoString) => {
  if (!isoString) return 'N/A';
  return new Date(isoString).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const getToxicityLevel = (score) => {
  if (score > 75) return 'high';
  if (score > 40) return 'medium';
  return 'low';
};

const getToxicityColor = (level) => {
  if (level === 'high') return 'bg-red-500';
  if (level === 'medium') return 'bg-yellow-500';
  return 'bg-green-500';
};

const truncateText = (text, length = 100) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};


const History = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    filterAndSortHistory();
  }, [history, searchTerm, filterLevel, sortOrder]);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/predict/history'); // Replace with actual user ID or auth context
      setHistory(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch history');
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortHistory = () => {
    let filtered = history.filter(item => {
      const textToSearch = item.inputText || '';
      const scoreToFilter = item.results?.overallScore ?? 0;
      const matchesSearch = textToSearch.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterLevel === 'all' || getToxicityLevel(scoreToFilter) === filterLevel;
      return matchesSearch && matchesFilter;
    });

    filtered.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : 0;
      const dateB = b.createdAt ? new Date(b.createdAt) : 0;
      if (sortOrder === 'newest') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    setFilteredHistory(filtered);
  };

  // --- REMOVED exportHistory function ---

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <LoadingSpinner className="w-12 h-12 mx-auto mb-4" />
          <p className="text-lg">Loading analysis history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants} className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Analysis History</h1>
                <p className="text-xl text-white/90">Review your past text analyses</p>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Card className="p-6 mb-8">
                    {/* --- UPDATED: Grid layout for controls --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        {/* Search */}
                        <div className="relative">
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Text</label>
                            <MagnifyingGlassIcon className="absolute left-3 top-9 w-5 h-5 text-gray-400"/>
                            <input 
                                type="text"
                                id="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search in text..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        {/* Filter */}
                        <div>
                            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">Toxicity Level</label>
                            <select id="filter" value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                <option value="all">All Levels</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        {/* Sort */}
                        <div>
                            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                            <select id="sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </div>
                    </div>
                </Card>
            </motion.div>
            
            {filteredHistory.length > 0 ? (
                <motion.div variants={containerVariants} className="space-y-4">
                    {filteredHistory.map(item => (
                        <motion.div key={item._id} variants={itemVariants}>
                            <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                                    <div className="flex-1 mb-4 md:mb-0 md:pr-4">
                                        <p className="text-gray-800">{truncateText(item.inputText, 150)}</p>
                                        <div className="text-sm text-gray-500 mt-2 flex items-center">
                                            <ClockIcon className="w-4 h-4 mr-1.5"/>
                                            {formatTimestamp(item.createdAt)}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 w-full md:w-auto">
                                        <div className={`px-3 py-1 text-sm font-medium text-white rounded-full ${getToxicityColor(getToxicityLevel(item.results.overallScore))}`}>
                                            {getToxicityLevel(item.results.overallScore)}
                                        </div>
                                        <Button size="sm" variant="icon" onClick={() => setSelectedItem(item)}>
                                            <EyeIcon className="w-5 h-5"/>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div variants={itemVariants} className="text-center py-16">
                    <Card className="p-8 inline-block">
                        <MagnifyingGlassIcon className="w-16 h-16 mx-auto text-gray-300 mb-4"/>
                        <h3 className="text-xl font-semibold text-gray-800">No History Found</h3>
                        <p className="text-gray-500 mt-2">Your analysis history will appear here.</p>
                    </Card>
                </motion.div>
            )}
        </motion.div>

        {/* Details Modal */}
        <AnimatePresence>
            {selectedItem && (
                <Transition appear show as={Fragment}>
                    <Dialog as="div" className="relative z-50" onClose={() => setSelectedItem(null)}>
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <div className="fixed inset-0 bg-black bg-opacity-50" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                    <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center">
                                            Analysis Details
                                            <button onClick={() => setSelectedItem(null)} className="p-1 rounded-full hover:bg-gray-100">
                                                <XMarkIcon className="w-6 h-6 text-gray-500"/>
                                            </button>
                                        </Dialog.Title>
                                        <div className="mt-4">
                                            <div className="mb-6">
                                                <ToxicityMeter score={selectedItem.results.overallScore / 100} />
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                                <h4 className="font-medium text-gray-800 mb-2">Full Text:</h4>
                                                <p className="text-gray-700 break-words max-h-40 overflow-y-auto">
                                                    {selectedItem.inputText}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800 mb-2">Category Breakdown:</h4>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                    {Object.entries(selectedItem.results.categories).map(([category, score]) => (
                                                        <div key={category} className="bg-gray-100 p-3 rounded-md text-center">
                                                            <div className="text-sm text-gray-600 capitalize">{category.replace(/_/g, ' ')}</div>
                                                            <div className="text-xl font-bold text-gray-800">{Math.round(score)}%</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )}
        </AnimatePresence>
    </div>
  );
};

export default History;
