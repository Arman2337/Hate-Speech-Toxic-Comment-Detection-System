export const TOXICITY_CATEGORIES = {
  TOXIC: 'toxic',
  SEVERE_TOXIC: 'severe_toxic',
  OBSCENE: 'obscene',
  THREAT: 'threat',
  INSULT: 'insult',
  IDENTITY_HATE: 'identity_hate'
}

export const TOXICITY_THRESHOLDS = {
  LOW: 0.3,
  MEDIUM: 0.6,
  HIGH: 0.8
}

export const API_ENDPOINTS = {
  ANALYZE: '/analyze',
  BATCH_ANALYZE: '/analyze/batch',
  HISTORY: '/history',
  ANALYTICS: '/analytics',
  EXPORT: '/history/export'
}

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  HISTORY: '/history',
  BATCH_PROCESS: '/batch-process',
  API_DOCS: '/api-docs',
  SETTINGS: '/settings'
}

export const COLORS = {
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6'
}

// Add the missing EXAMPLE_TEXTS export
export const EXAMPLE_TEXTS = [
  {
    label: "Clean Text Example",
    text: "Thank you for sharing your thoughts! I really appreciate your perspective on this topic and look forward to more discussions."
  },
  {
    label: "Neutral Comment",
    text: "This is an interesting article about technology trends. The points made about AI development are quite insightful."
  },
  {
    label: "Positive Feedback",
    text: "Great work on this project! The user interface is intuitive and the features work exactly as expected."
  },
  {
    label: "Constructive Criticism",
    text: "While I appreciate the effort put into this, I think there might be room for improvement in the user experience design."
  },
  {
    label: "Educational Content",
    text: "Here's a helpful explanation of machine learning: It's a subset of AI that enables computers to learn and improve from experience."
  }
]

export const STATUS_COLORS = {
  CLEAN: 'text-green-400',
  TOXIC: 'text-red-400',
  WARNING: 'text-yellow-400',
  PROCESSING: 'text-blue-400'
}

export const ANALYSIS_LABELS = {
  CLEAN: 'Clean',
  TOXIC: 'Toxic',
  WARNING: 'Warning',
  PROCESSING: 'Processing...'
}
