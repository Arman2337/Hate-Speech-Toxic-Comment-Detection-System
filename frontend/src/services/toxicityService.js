// import api from './api'

// export const toxicityService = {
//   // Analyze single text
//   analyzeText: async (text) => {
//     try {
//       const response = await api.post('/analyze', { text })
//       return response.data
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Analysis failed')
//     }
//   },

//   // Batch analyze multiple texts
//   batchAnalyze: async (texts) => {
//     try {
//       const response = await api.post('/analyze/batch', { texts })
//       return response.data
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Batch analysis failed')
//     }
//   },

//   // Get analysis history
//   getHistory: async (page = 1, limit = 10) => {
//     try {
//       const response = await api.get(`/history?page=${page}&limit=${limit}`)
//       return response.data
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to fetch history')
//     }
//   },

//   // Get analytics data
//   getAnalytics: async (timeRange = '7d') => {
//     try {
//       const response = await api.get(`/analytics?range=${timeRange}`)
//       return response.data
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to fetch analytics')
//     }
//   },

//   // Export history
//   exportHistory: async (format = 'csv') => {
//     try {
//       const response = await api.get(`/history/export?format=${format}`, {
//         responseType: 'blob'
//       })
//       return response.data
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Export failed')
//     }
//   }
// }

// // Add the missing analyzeToxicity function
// export const analyzeToxicity = async (text) => {
//   try {
//     // For development, return mock data
//     if (import.meta.env.MODE === 'development') {
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1500))
      
//       const toxicityScore = Math.random() * 0.4 // Generate random score between 0-0.4
      
//       return {
//         score: toxicityScore,
//         isToxic: toxicityScore > 0.3,
//         categories: {
//           toxic: toxicityScore,
//           severe_toxic: toxicityScore * 0.2,
//           obscene: toxicityScore * 0.3,
//           threat: toxicityScore * 0.1,
//           insult: toxicityScore * 0.4,
//           identity_hate: toxicityScore * 0.15
//         },
//         timestamp: new Date().toISOString(),
//         text: text
//       }
//     }
    
//     // Production API call
//     const response = await api.post('/analyze', { text })
//     return response.data
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Toxicity analysis failed')
//   }
// }

// // Export default service object
// export default toxicityService


// src/services/toxicityService.js
import api from './api';

// normalize backend response so UI can rely on { overallScore, categories, text, timestamp }
const normalizeAnalysis = (data, inputText) => {
  // Support a few common shapes
  const overallScore =
    data.overallScore ??
    data.score ??
    data.toxicity ??
    0;

  const categories =
    data.categories ??
    data.scores ??
    {};

  const text = data.text ?? inputText ?? '';
  const timestamp = data.timestamp ?? new Date().toISOString();

  return { overallScore, categories, text, timestamp, raw: data };
};

export const toxicityService = {
  analyzeText: async (text) => {
    try {
      const res = await api.post('/predict', { text });
      return normalizeAnalysis(res.data, text);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Analysis failed');
    }
  },

  getHistory: async (userId, page, limit) => {
    try {
      // Your backend: GET /api/predict/history/:userId
      const res = await api.get(`/predict/history/${userId}`, {
        params: { page, limit },
      });

      // If backend returns an array, normalize each item
      if (Array.isArray(res.data)) {
        return res.data.map((item) => normalizeAnalysis(item, item.text));
      }
      // If backend returns { items: [], total: n } pattern
      if (res.data?.items) {
        return {
          ...res.data,
          items: res.data.items.map((i) => normalizeAnalysis(i, i.text)),
        };
      }
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch history');
    }
  },
};

// Backward-compatible helper so existing imports keep working
export const analyzeToxicity = async (text) => {
  return toxicityService.analyzeText(text);
};

export default toxicityService;
