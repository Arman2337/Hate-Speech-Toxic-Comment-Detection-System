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
