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
