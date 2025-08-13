import api from './api'

export const toxicityService = {
  // Analyze single text
  analyzeText: async (text) => {
    try {
      const response = await api.post('/analyze', { text })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Analysis failed')
    }
  },

  // Batch analyze multiple texts
  batchAnalyze: async (texts) => {
    try {
      const response = await api.post('/analyze/batch', { texts })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Batch analysis failed')
    }
  },

  // Get analysis history
  getHistory: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/history?page=${page}&limit=${limit}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch history')
    }
  },

  // Get analytics data
  getAnalytics: async (timeRange = '7d') => {
    try {
      const response = await api.get(`/analytics?range=${timeRange}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch analytics')
    }
  },

  // Export history
  exportHistory: async (format = 'csv') => {
    try {
      const response = await api.get(`/history/export?format=${format}`, {
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Export failed')
    }
  }
}
