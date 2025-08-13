import React, { useState, useEffect } from 'react'
import { FiSearch, FiFilter, FiDownload, FiTrash2, FiEye } from 'react-icons/fi'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { formatDate, getToxicityColor, truncateText } from '../utils/helpers'

const History = () => {
  const [historyItems, setHistoryItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [loading, setLoading] = useState(true)

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockHistory = [
      {
        id: 1,
        text: "This is a sample text that was analyzed for toxic content detection...",
        toxicityScore: 0.12,
        status: 'clean',
        timestamp: '2024-01-15T14:30:22Z',
        categories: {
          toxic: 0.12,
          severe_toxic: 0.05,
          obscene: 0.08,
          threat: 0.02,
          insult: 0.06,
          identity_hate: 0.03
        }
      },
      {
        id: 2,
        text: "Another example of analyzed content that was flagged by our system...",
        toxicityScore: 0.78,
        status: 'toxic',
        timestamp: '2024-01-15T13:45:10Z',
        categories: {
          toxic: 0.78,
          severe_toxic: 0.23,
          obscene: 0.45,
          threat: 0.12,
          insult: 0.56,
          identity_hate: 0.34
        }
      },
      {
        id: 3,
        text: "Safe content example for demonstration purposes in our application...",
        toxicityScore: 0.05,
        status: 'clean',
        timestamp: '2024-01-15T12:20:35Z',
        categories: {
          toxic: 0.05,
          severe_toxic: 0.01,
          obscene: 0.02,
          threat: 0.00,
          insult: 0.01,
          identity_hate: 0.00
        }
      }
    ]
    
    setTimeout(() => {
      setHistoryItems(mockHistory)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredItems = historyItems.filter(item => {
    const matchesSearch = item.text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting history...')
  }

  const handleDelete = (id) => {
    setHistoryItems(items => items.filter(item => item.id !== id))
  }

  if (loading) {
    return (
      <div className="min-h-screen lg:ml-64 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white/70">Loading history...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen lg:ml-64 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Analysis History
            </h1>
            <p className="text-white/70 text-lg">
              Review your past content analysis results
            </p>
          </div>
          <Button 
            onClick={handleExport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 mt-4 md:mt-0"
          >
            <FiDownload className="w-4 h-4" />
            <span>Export History</span>
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <input
                type="text"
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All Status</option>
                <option value="clean">Clean</option>
                <option value="toxic">Toxic</option>
              </select>
              <Button variant="outline" className="border border-white/30 text-white hover:bg-white/10 px-4 py-3 rounded-xl flex items-center space-x-2">
                <FiFilter className="w-4 h-4" />
                <span>Filter</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* History Items */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <Card className="text-center p-12">
              <p className="text-white/70">No history items found</p>
            </Card>
          ) : (
            filteredItems.map((item) => (
              <Card key={item.id} className="p-6 hover:bg-white/20 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-white mb-3 leading-relaxed">
                      {truncateText(item.text, 150)}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <Badge variant={item.status === 'clean' ? 'success' : 'error'}>
                        {item.status === 'clean' ? 'Clean' : 'Toxic'}
                      </Badge>
                      <span className={`text-sm font-medium ${getToxicityColor(item.toxicityScore)}`}>
                        Score: {(item.toxicityScore * 100).toFixed(1)}%
                      </span>
                      <span className="text-white/60 text-sm">
                        {formatDate(item.timestamp)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/70 hover:text-white"
                    >
                      <FiEye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Category Breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-4">
                  {Object.entries(item.categories).map(([category, score]) => (
                    <div key={category} className="bg-white/5 rounded-lg p-2">
                      <p className="text-xs text-white/60 capitalize">
                        {category.replace('_', ' ')}
                      </p>
                      <p className={`text-sm font-medium ${getToxicityColor(score)}`}>
                        {(score * 100).toFixed(1)}%
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Pagination could go here */}
        {filteredItems.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">Previous</Button>
              <span className="text-white/70 px-4">Page 1 of 1</span>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default History // This is the crucial default export
