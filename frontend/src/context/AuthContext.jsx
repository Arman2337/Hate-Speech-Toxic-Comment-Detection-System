import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token on mount
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    
    if (token && userData) {
      setUser(JSON.parse(userData))
      setIsAuthenticated(true)
    }
    
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulate API call
      const userData = {
        id: 1,
        name: 'John Doe',
        email: email,
        avatar: null
      }
      
      localStorage.setItem('authToken', 'mock-token')
      localStorage.setItem('userData', JSON.stringify(userData))
      
      setUser(userData)
      setIsAuthenticated(true)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (name, email, password) => {
    try {
      // Simulate API call
      const userData = {
        id: 1,
        name: name,
        email: email,
        avatar: null
      }
      
      localStorage.setItem('authToken', 'mock-token')
      localStorage.setItem('userData', JSON.stringify(userData))
      
      setUser(userData)
      setIsAuthenticated(true)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }
