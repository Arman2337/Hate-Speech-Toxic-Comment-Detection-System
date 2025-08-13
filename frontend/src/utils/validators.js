export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  return {
    isValid: password.length >= 8,
    errors: password.length < 8 ? ['Password must be at least 8 characters long'] : []
  }
}

export const validateText = (text, maxLength = 5000) => {
  if (!text || text.trim().length === 0) {
    return { isValid: false, error: 'Text cannot be empty' }
  }
  
  if (text.length > maxLength) {
    return { isValid: false, error: `Text cannot exceed ${maxLength} characters` }
  }
  
  return { isValid: true, error: null }
}

export const validateBatchTexts = (texts, maxItems = 100) => {
  if (!Array.isArray(texts) || texts.length === 0) {
    return { isValid: false, error: 'Please provide at least one text to analyze' }
  }
  
  if (texts.length > maxItems) {
    return { isValid: false, error: `Cannot process more than ${maxItems} texts at once` }
  }
  
  for (let i = 0; i < texts.length; i++) {
    const textValidation = validateText(texts[i])
    if (!textValidation.isValid) {
      return { isValid: false, error: `Text ${i + 1}: ${textValidation.error}` }
    }
  }
  
  return { isValid: true, error: null }
}
