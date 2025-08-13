export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const getToxicityLevel = (score) => {
  if (score < 0.3) return 'low'
  if (score < 0.6) return 'medium'
  return 'high'
}

export const getToxicityColor = (score) => {
  if (score < 0.3) return 'text-green-400'
  if (score < 0.6) return 'text-yellow-400'
  return 'text-red-400'
}

export const truncateText = (text, maxLength = 100) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const formatPercentage = (value) => {
  return `${(value * 100).toFixed(1)}%`
}

export const getStatusColor = (status) => {
  switch (status) {
    case 'clean':
      return 'text-green-400'
    case 'toxic':
      return 'text-red-400'
    case 'warning':
      return 'text-yellow-400'
    default:
      return 'text-white/70'
  }
}

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`
  return formatDate(timestamp)
}

export const calculateToxicityPercentage = (score) => {
  return Math.min(Math.max(score * 100, 0), 100)
}

export const validateTextLength = (text, maxLength = 5000) => {
  if (!text) return { isValid: false, error: 'Text is required' }
  if (text.length > maxLength) {
    return { isValid: false, error: `Text must be less than ${maxLength} characters` }
  }
  return { isValid: true, error: null }
}
